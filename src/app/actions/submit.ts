'use server';

import { headers } from 'next/headers';
import { Resolver } from 'node:dns/promises';
// @ts-ignore
import freeEmailDomains from 'free-email-domains';
// @ts-ignore
import disposableDomains from 'disposable-email-domains';
import { saveToGoogleSheets, removeFromGoogleSheets, checkIfExistsInGoogleSheets } from '@/lib/googleSheets';
import { sendThankYouEmail } from '@/lib/sendEmail';

// Instantiate the resolver outside the function to reuse it across requests
const resolver = new Resolver();
// Use reliable public DNS servers to avoid ETIMEOUT in serverless environments
resolver.setServers(['1.1.1.1', '8.8.8.8']);

export async function validateContactForm(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string || '';

  if (!email || !email.includes('@')) {
    return { valid: false, error: "A valid email is required.", successMessage: "", emailFailed: false, timestamp: Date.now() };
  }

  const alreadyExists = await checkIfExistsInGoogleSheets(email, phone);
  if (alreadyExists) {
    return { 
      valid: false, 
      error: "You have already submitted a request with this email or phone number.", 
      successMessage: "",
      emailFailed: false,
      timestamp: Date.now()
    };
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
    return { 
      valid: false, 
      error: "Please use a work email rather than public providers (like Gmail/Yahoo).", 
      successMessage: "",
      emailFailed: false,
      timestamp: Date.now()
    };
  }

  try {
    // 2. Check if the domain actually has Mail Servers (Network check)
    // We add a racing timeout promise to ensure the action doesn't hang forever
    const mxRecords = await Promise.race([
      resolver.resolveMx(domain),
      new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 4000))
    ]) as any[];

    if (!mxRecords || mxRecords.length === 0) {
      return { valid: false, error: "This domain cannot receive emails.", successMessage: "", emailFailed: false, timestamp: Date.now() };
    }

    // Process form... (DB logic, Email sending, etc.)
    const savedDate = await saveToGoogleSheets(email, formData);
    
    if (!savedDate) {
      return { 
        valid: false, 
        error: "Failed to process your request (Database Error). Please try again.", 
        successMessage: "",
        emailFailed: true,
        timestamp: Date.now() 
      };
    }

    const emailSent = await sendThankYouEmail(email, firstName, baseUrl);
    console.log(`Email to ${email} sent status: ${emailSent} via ${baseUrl}`);
    
    if (!emailSent) {
      await removeFromGoogleSheets(email, savedDate);
      return { 
        valid: false, 
        error: "Confirmation email failed to send. Your data has been removed for privacy. Please try again.", 
        successMessage: "",
        emailFailed: true,
        timestamp: Date.now() 
      };
    }
    
    return { valid: true, error: "", successMessage: "Thank you! Your project request has been submitted successfully.", emailFailed: false, timestamp: Date.now() };

  } catch (e: any) {
    console.error(`DNS MX Lookup Error for ${domain}:`, e.code || e.message);

    // If the domain strictly does not exist (ENOTFOUND) 
    // or has no DNS records at all (ENODATA)
    if (e.code === 'ENOTFOUND' || e.code === 'ENODATA') {
      return { valid: false, error: "The domain provided does not exist.", successMessage: "", emailFailed: false, timestamp: Date.now() };
    }

    /** * FAIL-SAFE: 
     * For ETIMEOUT, ESERVFAIL, or our custom 'TIMEOUT' error, 
     * we let the form pass. It's better to receive one spam email 
     * than to block a real client because a DNS server was slow.
     */
    const savedDateFail = await saveToGoogleSheets(email, formData);
    
    if (!savedDateFail) {
      return { 
        valid: false, 
        error: "Failed to process your request (Database Error). Please try again.", 
        successMessage: "",
        emailFailed: true,
        timestamp: Date.now() 
      };
    }

    const emailSentFailSafe = await sendThankYouEmail(email, firstName, baseUrl);
    console.log(`Email to ${email} (fail-safe) sent status: ${emailSentFailSafe} via ${baseUrl}`);
    
    if (!emailSentFailSafe) {
      await removeFromGoogleSheets(email, savedDateFail);
      return { 
        valid: false, 
        error: "Confirmation email failed to send (DNS Timeout). Data removed for privacy. Please try again.", 
        successMessage: "",
        emailFailed: true,
        timestamp: Date.now() 
      };
    }
    
    return { 
      valid: true, 
      error: "", 
      successMessage: "Your project request has been submitted successfully. Thank You!",
      emailFailed: false,
      timestamp: Date.now()
    };
  }
}