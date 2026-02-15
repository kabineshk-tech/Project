This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Setup

This application requires the following environment variables:

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Configure the following variables in `.env.local`:
   - `RESEND_API_KEY` - Your Resend API key from https://resend.com/api-keys
   - `ADMIN_EMAIL` - Email address to receive registration notifications

**Important:** Never commit `.env.local` to version control.

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended for first deployment)

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Login to your Vercel account:
   ```bash
   vercel login
   ```

3. Deploy from the project root:
   ```bash
   cd /path/to/my-app
   vercel
   ```

4. Set environment variables in Vercel:
   ```bash
   vercel env add RESEND_API_KEY
   vercel env add ADMIN_EMAIL
   ```

5. Deploy to production:
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration (Recommended for continuous deployment)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Configure environment variables in Project Settings → Environment Variables:
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
5. Deploy - Vercel will automatically deploy on every push to main branch

### Production Checklist

Before deploying to production, ensure:

- [ ] Local build succeeds: `npm run build`
- [ ] Environment variables are set in Vercel dashboard
- [ ] `.env.local` is NOT committed to git
- [ ] Test the registration form functionality
- [ ] Verify emails are being sent to the correct admin email
- [ ] Test rate limiting (try submitting form 6+ times)

### Post-Deployment Verification

After deployment:

1. Visit your deployed URL
2. Test the registration form at `/registerform`
3. Verify email delivery in your inbox and Resend dashboard
4. Check Vercel deployment logs for any errors
5. Run a Lighthouse audit for performance metrics
