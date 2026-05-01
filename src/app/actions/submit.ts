'use server';

import { headers } from 'next/headers';
import { Resolver } from 'node:dns/promises';
import freeEmailDomains from 'free-email-domains';
import disposableDomains from 'disposable-email-domains';
import { saveToGoogleSheets, removeFromGoogleSheets, checkIfExistsInGoogleSheets } from '@/lib/googleSheets';
import { sendThankYouEmail } from '@/lib/sendEmail';

import { createErrorResponse, createSuccessResponse, type ActionResponse, ValidationErrors, SuccessMessages } from '@/lib/error-handler';

// Instantiate the resolver outside the function to reuse it across requests
const resolver = new Resolver();
// Use reliable public DNS servers to avoid ETIMEOUT in serverless environments
resolver.setServers(['1.1.1.1', '8.8.8.8']);

export async function validateContactForm(prevState: unknown, formData: FormData): Promise<ActionResponse> {
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string || '';

  if (!email || !email.includes('@')) {
    return createErrorResponse(ValidationErrors.INVALID_EMAIL);
  }

  const alreadyExists = await checkIfExistsInGoogleSheets(email, phone);
  if (alreadyExists) {
    return createErrorResponse(ValidationErrors.ALREADY_SUBMITTED);
  }

  const domain = email.split('@')[1].toLowerCase();
  
  // Dynamically determine the baseUrl from headers
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;
  const firstName = formData.get('firstName') as string || '';

  // 1. Block standard free/spam domains (Local check)
  if (freeEmailDomains.includes(domain) || disposableDomains.includes(domain)) {
    return createErrorResponse(ValidationErrors.PUBLIC_EMAIL_PROVIDER);
  }

  try {
    // 2. Check if the domain actually has Mail Servers (Network check)
    // We add a racing timeout promise to ensure the action doesn't hang forever
    const mxRecords = await Promise.race([
      resolver.resolveMx(domain),
      new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 4000))
    ]) as Array<{ priority: number; exchange: string }>;

    if (!mxRecords || mxRecords.length === 0) {
      return createErrorResponse(ValidationErrors.NO_MX_RECORDS);
    }

    // Process form... (DB logic, Email sending, etc.)
    const savedDate = await saveToGoogleSheets(email, formData);
    
    if (!savedDate) {
      return createErrorResponse(ValidationErrors.DATABASE_ERROR, true);
    }

    const emailSent = await sendThankYouEmail(email, firstName, baseUrl);
    console.log(`Email to ${email} sent status: ${emailSent} via ${baseUrl}`);
    
    if (!emailSent) {
      await removeFromGoogleSheets(email, savedDate);
      return createErrorResponse(ValidationErrors.EMAIL_SEND_FAILURE, true);
    }
    
    return createSuccessResponse(SuccessMessages.SUBMISSION_SUCCESS);

  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    const nodeError = e as NodeJS.ErrnoException | undefined;
    const errorCode = nodeError?.code || (error as NodeJS.ErrnoException | undefined)?.code;
    console.error(`DNS MX Lookup Error for ${domain}:`, errorCode || error.message);

    // If the domain strictly does not exist (ENOTFOUND) 
    // or has no DNS records at all (ENODATA)
    if (errorCode === 'ENOTFOUND' || errorCode === 'ENODATA') {
      return createErrorResponse(ValidationErrors.DOMAIN_NOT_FOUND);
    }

    /** * FAIL-SAFE: 
     * For ETIMEOUT, ESERVFAIL, or our custom 'TIMEOUT' error, 
     * we let the form pass. It's better to receive one spam email 
     * than to block a real client because a DNS server was slow.
     */
    const savedDateFail = await saveToGoogleSheets(email, formData);
    
    if (!savedDateFail) {
      return createErrorResponse(ValidationErrors.DATABASE_ERROR, true);
    }

    const emailSentFailSafe = await sendThankYouEmail(email, firstName, baseUrl);
    console.log(`Email to ${email} (fail-safe) sent status: ${emailSentFailSafe} via ${baseUrl}`);
    
    if (!emailSentFailSafe) {
      await removeFromGoogleSheets(email, savedDateFail);
      return createErrorResponse(ValidationErrors.EMAIL_SEND_FAILURE_DNS, true);
    }
    
    return createSuccessResponse(SuccessMessages.FAILSAFE_SUCCESS);
  }
}