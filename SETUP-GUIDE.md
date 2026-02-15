# Contact Form Email Setup Guide

## Overview

The contact form now sends emails via **Brevo** (formerly Sendinblue) and automatically falls back to **WhatsApp** if the daily email limit is reached.

---

## Setup Instructions

### 1. Create a Brevo Account (Free Tier)

1. Go to [https://www.brevo.com/](https://www.brevo.com/)
2. Sign up for a **FREE** account
3. Free tier includes **300 emails per day**

### 2. Get Your API Key

1. Log in to Brevo
2. Go to [https://app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api)
3. Click **"Create a new API key"**
4. Give it a name (e.g., "VVM Contact Form")
5. Copy the API key (you'll only see it once!)

### 3. Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values:

```env
BREVO_API_KEY=your_actual_brevo_api_key_here
OWNER_EMAIL=school@example.com
```

**Example:**

```env
BREVO_API_KEY=xkeysib-abc123def456...
OWNER_EMAIL=vvmschool@gmail.com
```

### 4. Verify Sender Email in Brevo

For production, you need to verify your sender domain:

1. Go to **Brevo Dashboard** → **Senders & IP**
2. Add and verify your email domain
3. Follow the DNS verification steps

For testing, Brevo allows sending without verification, but emails might go to spam.

### 5. Restart Development Server

After setting up `.env.local`, restart your dev server:

```bash
npm run dev
```

---

## How It Works

### Email Flow (Primary Method)

1. User fills out the contact form
2. System attempts to send email via Brevo API
3. **Two emails are sent:**
   - **To Owner:** Notification with full form details
   - **To User:** Confirmation email thanking them for contacting

### WhatsApp Fallback (Automatic)

If email sending fails for any reason:

- Daily limit reached (300 emails/day on free tier)
- API key not configured
- Network error
- Any other failure

**The system automatically:**

1. Shows a notification to the user
2. Redirects to WhatsApp with the form data
3. Opens WhatsApp (app or web) pre-filled with the message

### User Experience

| Scenario                   | What Happens                         |
| -------------------------- | ------------------------------------ |
| ✅ Email sent successfully | Success message, form clears         |
| ⚠️ Daily limit reached     | "Redirecting to WhatsApp..." message |
| ❌ API not configured      | Falls back to WhatsApp silently      |
| 🌐 Network error           | Falls back to WhatsApp               |

---

## Testing

### Test Email Sending

1. Fill out the contact form with valid details
2. Click "Send Message"
3. Check:
   - Owner email inbox
   - User's email inbox (confirmation)
   - Browser console for any errors

### Test WhatsApp Fallback

To test the fallback, temporarily:

1. Set an invalid `BREVO_API_KEY` in `.env.local`
2. Restart dev server
3. Submit form → should redirect to WhatsApp

---

## Free Tier Limits

### Brevo Free Plan

- ✅ **300 emails/day**
- ✅ Unlimited contacts
- ✅ Email templates
- ✅ SMTP relay
- ✅ API access

When limit is reached, the system automatically uses WhatsApp for the rest of the day.

---

## Customization

### Change Owner Email

Edit `.env.local`:

```env
OWNER_EMAIL=newemail@example.com
```

### Customize Email Templates

Edit [src/app/api/send-email/route.ts](src/app/api/send-email/route.ts):

- `emailData.htmlContent` - Owner notification template
- `userEmailData.htmlContent` - User confirmation template

### Change WhatsApp Number

Edit [src/app/page.tsx](src/app/page.tsx) in the `sendViaWhatsApp` function:

```typescript
const whatsappUrl = `https://api.whatsapp.com/send?phone=919490670461&text=${encoded}`;
```

---

## Troubleshooting

### Emails Not Sending

1. **Check API Key:**
   - Is `BREVO_API_KEY` set in `.env.local`?
   - Did you restart the dev server after adding it?

2. **Check Console:**
   - Open browser DevTools → Console
   - Look for error messages

3. **Check Brevo Dashboard:**
   - Go to **Statistics** → **Email**
   - See if emails are being sent

### Emails Going to Spam

- Verify your sender domain in Brevo
- Set up SPF, DKIM, and DMARC records
- Use a business email domain (not Gmail/Yahoo)

### WhatsApp Not Opening

- Make sure WhatsApp is installed (mobile) or WhatsApp Web is accessible
- Check browser popup blocker settings

---

## Production Deployment

Before deploying to production:

1. ✅ Add environment variables to your hosting platform (Vercel, Netlify, etc.)
2. ✅ Verify sender domain in Brevo
3. ✅ Test with real email addresses
4. ✅ Monitor daily email usage in Brevo dashboard

### Example: Vercel Deployment

```bash
vercel env add BREVO_API_KEY
vercel env add OWNER_EMAIL
```

---

## Support

- **Brevo Documentation:** [https://developers.brevo.com/](https://developers.brevo.com/)
- **WhatsApp API:** [https://wa.me/](https://wa.me/)

---

## Summary

✅ **Primary:** Email via Brevo (300/day free)  
✅ **Fallback:** WhatsApp (unlimited)  
✅ **User Experience:** Seamless, no interruption  
✅ **Cost:** 100% FREE
