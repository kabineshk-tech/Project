# Email Not Received - Debug Steps

## Step 1: Test the Form and Check Browser Console

1. Open your Vercel deployment URL in browser
2. Press F12 to open Developer Tools
3. Go to "Console" tab
4. Go to "Network" tab
5. Navigate to `/registerform`
6. Fill out and submit the form
7. In Network tab, click on "send-email" request
8. Look at the Response

### What to check:
- **Status Code**: Should be 200 (success)
  - If 500: Server error (check Vercel logs)
  - If 400: Invalid data
  - If 429: Rate limited
  - If 415: Wrong content type

- **Response Body**: Should contain:
  ```json
  {
    "success": true,
    "message": "Registration email sent successfully",
    "emailId": "some-id"
  }
  ```

- **Console Errors**: Any red error messages?

## Step 2: Check Vercel Function Logs

1. Go to https://vercel.com/dashboard
2. Click your project
3. Click "Deployments"
4. Click latest deployment
5. Click "Functions" tab
6. Look for `/api/send-email` logs
7. Look for errors or "Registration email sent successfully"

## Step 3: Check Resend Dashboard

1. Go to https://resend.com/emails
2. Look for recent emails
3. Check status:
   - Delivered ✅
   - Bounced ❌
   - Failed ❌
   - Queued ⏳

## Step 4: Verify Email Settings

### Check what email you used for Resend:
1. Go to https://resend.com/settings
2. Look at "Account Email"
3. **CRITICAL**: This must match your ADMIN_EMAIL or you need to verify the recipient

### If emails don't match:
- Option A: Change ADMIN_EMAIL in Vercel to match Resend account email
- Option B: Verify kabinesh.k@centilio.com in Resend (Settings → Audiences)

## Common Issues:

### Issue 1: Wrong Recipient Email
**Symptom**: API returns success but no email received
**Cause**: ADMIN_EMAIL doesn't match Resend account email
**Fix**: Use the same email you signed up for Resend with

### Issue 2: Environment Variables Not Set
**Symptom**: 500 error with "Email service is not configured"
**Cause**: RESEND_API_KEY not set in Vercel
**Fix**: Add env vars in Vercel Dashboard → Settings → Environment Variables

### Issue 3: Invalid API Key
**Symptom**: API call fails or returns error
**Cause**: Wrong or expired API key
**Fix**: Generate new API key from https://resend.com/api-keys

### Issue 4: Domain Not Verified (for custom domains)
**Symptom**: Emails bounce or fail
**Cause**: Using custom domain without verification
**Fix**: Use onboarding@resend.dev or verify your domain

## Quick Test Command

Replace YOUR_URL with your actual Vercel URL:

```bash
curl -X POST https://YOUR_URL.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phoneNumber": "1234567890",
    "countryCode": "+1"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Registration email sent successfully",
  "emailId": "..."
}
```
