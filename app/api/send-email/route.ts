import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting configuration
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const MAX_REQUESTS = 5; // Maximum 5 requests per minute per IP

// Clean up expired rate limit entries periodically to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of rateLimit.entries()) {
      if (now > data.resetTime) {
        rateLimit.delete(ip);
      }
    }
  }, 5 * 60 * 1000); // Clean up every 5 minutes
}

// Type definitions for type safety
interface RegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
}

/**
 * Sanitize HTML to prevent XSS attacks
 */
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate email data before sending
 */
function validateEmailData(data: any): data is RegistrationData {
  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length === 0) {
    return false;
  }
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    return false;
  }
  if (!data.phoneNumber || typeof data.phoneNumber !== 'string' || data.phoneNumber.trim().length === 0) {
    return false;
  }
  if (!data.countryCode || typeof data.countryCode !== 'string' || data.countryCode.trim().length === 0) {
    return false;
  }
  return true;
}

/**
 * Check rate limiting for the given IP address
 */
function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const limitData = rateLimit.get(ip);

  // Clean up expired entries periodically
  if (limitData && now > limitData.resetTime) {
    rateLimit.delete(ip);
  }

  const currentLimitData = rateLimit.get(ip);

  if (!currentLimitData) {
    // First request from this IP
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (now > currentLimitData.resetTime) {
    // Reset window has passed
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (currentLimitData.count >= MAX_REQUESTS) {
    // Rate limit exceeded
    return { allowed: false, resetTime: currentLimitData.resetTime };
  }

  // Increment count
  currentLimitData.count++;
  return { allowed: true };
}

/**
 * Create professional HTML email template
 */
function createEmailTemplate(data: RegistrationData): string {
  const sanitizedData = {
    fullName: sanitizeHtml(data.fullName),
    email: sanitizeHtml(data.email),
    phoneNumber: sanitizeHtml(data.phoneNumber),
    countryCode: sanitizeHtml(data.countryCode),
  };

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Registration</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Registration</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 24px; color: #333333; font-size: 16px; line-height: 1.5;">
                A new user has registered on your platform. Here are the details:
              </p>

              <!-- Registration Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <span style="color: #333333; font-size: 16px;">${sanitizedData.fullName}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <a href="mailto:${sanitizedData.email}" style="color: #667eea; font-size: 16px; text-decoration: none;">${sanitizedData.email}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <span style="color: #333333; font-size: 16px;">${sanitizedData.countryCode} ${sanitizedData.phoneNumber}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Registration Time</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #333333; font-size: 16px;">${timestamp}</span>
                  </td>
                </tr>
              </table>

              <!-- Security Note -->
              <div style="margin-top: 32px; padding: 16px; background-color: #f0f4ff; border-left: 4px solid #667eea; border-radius: 4px;">
                <p style="margin: 0; color: #555555; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #667eea;">Security Note:</strong> For security reasons, the user's password has not been included in this notification.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #888888; font-size: 13px; line-height: 1.5;">
                This is an automated notification from your registration system.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * POST endpoint to send registration email
 */
export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    if (!process.env.ADMIN_EMAIL) {
      console.error('ADMIN_EMAIL is not configured');
      return NextResponse.json(
        { error: 'Admin email is not configured' },
        { status: 500 }
      );
    }

    // Validate Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                request.headers.get('x-real-ip') ||
                'unknown';

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      const waitTime = rateLimitResult.resetTime
        ? Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        : 60;

      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: `Please wait ${waitTime} seconds before trying again.`
        },
        { status: 429 }
      );
    }

    // Parse request body
    const data = await request.json();

    // Validate data
    if (!validateEmailData(data)) {
      return NextResponse.json(
        { error: 'Invalid registration data' },
        { status: 400 }
      );
    }

    // Create email HTML
    const emailHtml = createEmailTemplate(data);

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: 'Registration System <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New Registration: ${data.fullName}`,
      html: emailHtml,
    });

    // Log success
    console.log('Registration email sent successfully:', emailResult.data?.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Registration email sent successfully',
        emailId: emailResult.data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error details for debugging
    console.error('Error sending registration email:', error);

    // Return user-friendly error message
    return NextResponse.json(
      {
        error: 'Failed to send email',
        message: 'An error occurred while processing your registration. Please try again later.'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint - returns method not allowed
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send registration emails.' },
    { status: 405 }
  );
}
