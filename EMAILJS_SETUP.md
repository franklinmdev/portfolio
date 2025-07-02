# EmailJS Setup Guide

## Overview

Your contact form now uses [EmailJS](https://www.emailjs.com/) to send real emails directly from your GitHub Pages site. EmailJS is free for up to 200 emails/month and requires no server setup.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

## Step 2: Connect Email Service

1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Or any SMTP service

### For Gmail (Recommended)

1. Select **"Gmail"**
2. Click **"Connect Account"**
3. Sign in with your Gmail account
4. Allow EmailJS permissions
5. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in your dashboard
2. Click **"Create New Template"**
3. Use this template:

```text
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

1. **Important**: Use these exact variable names in your template:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_name}}` - Your name (Franklin Martinez)

2. Set the **"To Email"** to your email address
3. Save and note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in your dashboard
2. Find your **Public Key** (starts with a dash, e.g., `-abcdef123`)

## Step 5: Configure Environment Variables

Create a `.env` file in your project root and add your EmailJS credentials:

```env
PUBLIC_EMAILJS_SERVICE_ID=service_abc123
PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
PUBLIC_EMAILJS_PUBLIC_KEY=-abcdef123
```

Replace the example values with your actual EmailJS credentials:

- `service_abc123` - Your Service ID from EmailJS dashboard
- `template_xyz789` - Your Template ID from EmailJS dashboard
- `-abcdef123` - Your Public Key from EmailJS dashboard

**Important**: Use the `PUBLIC_` prefix for all environment variables since they need to be accessible on the client-side in React components.

## Step 6: Test Your Form

1. Test locally first:

   ```bash
   npm run dev
   ```

2. Visit `http://localhost:4321` and test the contact form
3. Check your email inbox for the test message
4. If it works locally, build and deploy your site:

   ```bash
   npm run build
   git add .
   git commit -m "feat: 📧 configure EmailJS with environment variables"
   git push
   ```

   **Note**: Make sure your hosting platform (GitHub Pages, Netlify, Vercel, etc.) has the same environment variables configured in their dashboard.

## Hosting Platform Configuration

Since your environment variables need to be available at build time, configure them on your hosting platform:

### GitHub Pages (via GitHub Actions)

Add the environment variables to your repository secrets:

1. Go to Settings → Secrets and variables → Actions
2. Add Repository secrets:
   - `PUBLIC_EMAILJS_SERVICE_ID`
   - `PUBLIC_EMAILJS_TEMPLATE_ID`
   - `PUBLIC_EMAILJS_PUBLIC_KEY`

### Netlify

1. Go to Site settings → Environment variables
2. Add the three environment variables with their values

### Vercel

1. Go to Project settings → Environment Variables
2. Add the three environment variables with their values

## Troubleshooting

### Common Issues

#### Error: "Invalid service ID"

- Double-check your Service ID in EmailJS dashboard
- Ensure you're using the correct service ID in the code

#### Error: "Template not found"

- Verify your Template ID
- Make sure the template is active/published

#### Emails not received

- Check your spam/junk folder
- Verify the "To Email" in your template settings
- Ensure your email service is properly connected

#### Rate limiting errors

- EmailJS free tier allows 200 emails/month
- Upgrade to paid plan if needed

### Test Configuration

You can test your setup with this temporary code:

```typescript
// Add this to test EmailJS (remove after testing)
const testEmailJS = async () => {
  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      {
        from_name: "Test User",
        from_email: "test@example.com",
        message: "This is a test message",
        to_name: "Franklin Martinez",
      },
      { publicKey: "YOUR_PUBLIC_KEY" }
    )
    console.log("EmailJS test successful!")
  } catch (error) {
    console.error("EmailJS test failed:", error)
  }
}
```

## Security Notes

- ✅ Public keys are safe to expose (they're meant to be public)
- ✅ EmailJS handles rate limiting and spam protection
- ✅ No sensitive credentials are exposed in your code
- ✅ Works perfectly with GitHub Pages static hosting

## Free Tier Limits

- **200 emails/month** - Perfect for portfolio contact forms
- **2 email services**
- **3 email templates**
- **Standard support**

Upgrade to paid plans for higher limits if needed.

## Alternative Services

If you prefer other services:

1. **Formspree** - Similar service, also free tier
2. **Netlify Forms** - Only works if you deploy to Netlify
3. **Web3Forms** - Another free alternative

---

**That's it!** Your contact form will now send real emails to your inbox. 🎉
