'use server';

import { Resolver } from 'node:dns/promises';
// @ts-ignore
import freeEmailDomains from 'free-email-domains';
// @ts-ignore
import disposableDomains from 'disposable-email-domains';
import { ValidationErrors, createErrorResponse, createSuccessResponse, type ActionResponse } from '@/lib/error-handler';

const resolver = new Resolver();
resolver.setServers(['1.1.1.1', '8.8.8.8']);

export async function validateEmail(email: string): Promise<ActionResponse> {
  if (!email || !email.includes('@')) {
    return createErrorResponse(ValidationErrors.INVALID_EMAIL);
  }

  const domain = email.split('@')[1].toLowerCase();

  // 1. Block standard free/spam domains
  if (freeEmailDomains.includes(domain) || disposableDomains.includes(domain)) {
    return createErrorResponse(ValidationErrors.PUBLIC_EMAIL_PROVIDER);
  }

  try {
    // 2. Check if the domain actually has Mail Servers (Network check)
    const mxRecords = await Promise.race([
      resolver.resolveMx(domain),
      new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 3000))
    ]) as any[];

    if (!mxRecords || mxRecords.length === 0) {
      return createErrorResponse(ValidationErrors.NO_MX_RECORDS);
    }

    return createSuccessResponse();
  } catch (e: any) {
    if (e.code === 'ENOTFOUND' || e.code === 'ENODATA') {
      return createErrorResponse(ValidationErrors.DOMAIN_NOT_FOUND);
    }
    
    // For timeouts or other DNS errors during live validation, 
    // we return success to allow the user to proceed (fail-safe).
    return createSuccessResponse();
  }
}
