import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function sendThankYouEmail(toAddress: string, firstName: string, baseUrl: string) {
  const fromEmail = process.env.SES_FROM_EMAIL;

  if (!fromEmail) {
    console.warn("SES_FROM_EMAIL is not defined. Skipping email sending.");
    return false;
  }

  const name = firstName || 'there';

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          .container { font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; }
          .header { background: #005241; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { padding: 40px; background: #ffffff; border: 1px solid #f0f0f0; border-radius: 0 0 12px 12px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 24px; background: #005241; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
          h1 { color: #fcfcfc; margin: 0; font-size: 24px; letter-spacing: -0.5px; }
          p { margin: 0 0 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AnoCloud</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to AnoCloud. We've successfully received your project inquiry and our engineering team is currently reviewing your details.</p>
            <p>We pride ourselves on our technical depth and responsiveness. You can expect a detailed follow-up from one of our consultants within the next 24 hours.</p>
            <p>In the meantime, feel free to visit our website to learn more about our recent case studies and solution blueprints.</p>
            <a href="${baseUrl}" class="button">Visit AnoCloud</a>
            <p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 14px;">
              Best regards,<br/><strong>Vishal Kumar Gupta</strong><br/>Founder, AnoCloud
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} AnoCloud. All rights reserved.<br/>
            Modernizing for Agility. Scaling with Intelligence.
          </div>
        </div>
      </body>
    </html>
  `;

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Subject: {
        Data: "Thank you for contacting AnoCloud",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: "UTF-8",
        },
      },
    },
  });

  try {
    const response = await sesClient.send(command);
    console.log("Email sent successfully", response.MessageId);
    return true;
  } catch (error: any) {
    console.error("Error sending email via SES:", {
      message: error.message,
      code: error.name || error.code,
      requestId: error.$metadata?.requestId
    });
    return false;
  }
}
