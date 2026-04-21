# Setup Guide — AI Receptionist Demo

This guide walks you through configuring ngrok and Twilio so your local dev server can receive real phone calls.

## Prerequisites

- Node.js 18+
- A [Twilio](https://www.twilio.com/) account (free trial works)
- [ngrok](https://ngrok.com/) installed and authenticated

## 1. Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `TWILIO_ACCOUNT_SID` | Found on Twilio Console dashboard |
| `TWILIO_AUTH_TOKEN` | Found on Twilio Console dashboard |
| `TWILIO_PHONE_NUMBER` | Your purchased Twilio number (E.164 format, e.g. `+19705550199`) |
| `OWNER_PHONE_NUMBER` | Your personal number to receive lead/voicemail SMS notifications |
| `EMERGENCY_PHONE_NUMBER` | Emergency line shown to callers (optional, defaults to placeholder) |

## 2. Start the Dev Server

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## 3. Start ngrok

In a separate terminal:

```bash
ngrok http 3000
```

ngrok will output a forwarding URL like:

```
https://a1b2c3d4.ngrok-free.app -> http://localhost:3000
```

Copy the `https://` URL — you'll need it for Twilio.

> **Tip:** ngrok's free tier gives you a random subdomain each time. For a stable URL, use a paid plan or the ngrok agent config with a reserved domain.

## 4. Configure Twilio Phone Number

1. Go to [Twilio Console → Phone Numbers → Manage → Active Numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/active)
2. Click your purchased number (or buy one — ~$1.15/mo)
3. Under **Voice Configuration**, set:
   - **A CALL COMES IN**: `Webhook`
   - **URL**: `https://YOUR-NGROK-URL/api/twilio/voice`
   - **Method**: `HTTP POST`
4. Click **Save**

### How Webhooks Work

```
Caller dials Twilio number
  → Twilio POSTs to /api/twilio/voice?sessionId=XXX
    → Server returns TwiML with <Gather> for menu choices
      → Caller presses a digit
        → Twilio POSTs to /api/twilio/gather?sessionId=XXX&flow=...&step=...
          → Server routes to booking / hours / voicemail
```

The `sessionId` is created when a user submits the demo form on the landing page. It ties all webhook callbacks to a single demo session.

## 5. Test It

1. Open `http://localhost:3000` in your browser
2. Fill in a business name and phone number, submit the form
3. Call your Twilio number from a real phone
4. The AI receptionist answers and guides you through the flow

### What to Check

- [ ] Business hours greeting plays during M-F 8am–6pm MT
- [ ] After-hours greeting plays outside those hours
- [ ] Pressing 1 starts the appointment booking flow
- [ ] Booking state persists across day → time → reason steps
- [ ] Confirmation SMS arrives (requires Twilio credentials)
- [ ] Voicemail records and sends transcription to owner (requires OWNER_PHONE_NUMBER)

## 6. Production Notes

- Replace the in-memory `SessionStore` with Redis or a database for persistence
- Use a stable domain (not ngrok) for webhooks in production
- Set `NODE_ENV=production` and run `next build && next start`
- Add rate limiting on the `/api/demo` endpoint
- Review TCPA and call recording disclosure requirements for your jurisdiction

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Twilio says "Application Error" | Check your ngrok URL is correct and the dev server is running |
| No SMS received | Verify `TWILIO_PHONE_NUMBER` and `TWILIO_AUTH_TOKEN` in `.env.local` |
| After-hours always plays | Check your server timezone; business hours use local time |
| ngrok session expired | Restart ngrok and update the Twilio webhook URL |
