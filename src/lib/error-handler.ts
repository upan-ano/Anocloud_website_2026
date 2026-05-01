export interface ActionResponse {
  valid: boolean;
  error: string;
  successMessage: string;
  emailFailed: boolean;
  timestamp: number;
}

export class ValidationErrors {
  static readonly INVALID_EMAIL = "A valid email is required.";
  static readonly ALREADY_SUBMITTED = "You have already submitted a request with this email or phone number.";
  static readonly PUBLIC_EMAIL_PROVIDER = "Please use a work email rather than public providers (like Gmail/Yahoo).";
  static readonly NO_MX_RECORDS = "This domain cannot receive emails.";
  static readonly DATABASE_ERROR = "Failed to process your request (Database Error). Please try again.";
  static readonly EMAIL_SEND_FAILURE = "Confirmation email failed to send. Your data has been removed for privacy. Please try again.";
  static readonly DOMAIN_NOT_FOUND = "The domain provided does not exist.";
  static readonly EMAIL_SEND_FAILURE_DNS = "Confirmation email failed to send (DNS Timeout). Data removed for privacy. Please try again.";
}

export class SuccessMessages {
  static readonly SUBMISSION_SUCCESS = "Thank you! Your project request has been submitted successfully.";
  static readonly FAILSAFE_SUCCESS = "Your project request has been submitted successfully. Thank You!";
}

export function createErrorResponse(
  message: string,
  emailFailed: boolean = false
): ActionResponse {
  return {
    valid: false,
    error: message,
    successMessage: "",
    emailFailed,
    timestamp: Date.now(),
  };
}

export function createSuccessResponse(
  message: string = "Success"
): ActionResponse {
  return {
    valid: true,
    error: "",
    successMessage: message,
    emailFailed: false,
    timestamp: Date.now(),
  };
}
