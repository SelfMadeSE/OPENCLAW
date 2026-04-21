# AI Receptionist API Documentation

## Overview
This backend API provides a complete AI-powered phone receptionist system for dental practices using Twilio. The system handles inbound calls, appointment booking, voicemail, and SMS notifications.

## API Routes

### 1. POST /api/demo
Creates a new demo session for testing.

**Request Body:**
```json
{
  "businessName": "string",
  "phoneNumber": "string"
}
```

**Response:**
```json
{
  "sessionId": "string",
  "message": "string"
}
```

### 2. POST /api/twilio/voice
Twilio webhook for handling inbound voice calls.

**Query Parameters:**
- `sessionId` (required): The session ID from /api/demo

**Behavior:**
- During business hours (Mon-Fri 8AM-6PM MT): Presents main menu
- After hours: Offers voicemail recording
- Returns TwiML for call flow

### 3. POST /api/twilio/gather
Handles digit input from callers.

**Query Parameters:**
- `sessionId` (required): The session ID
- `flow` (optional): "appointment" for appointment flow
- `step` (optional): "day" or "time" for appointment steps

**Behavior:**
- Digit 1: Start appointment booking flow
- Digit 2: Read business hours and location
- Digit 3: Record voicemail
- Handles appointment day/time selection

### 4. POST /api/twilio/recording
Handles voicemail recordings.

**Query Parameters:**
- `sessionId` (required): The session ID

**Behavior:**
- Processes voicemail recording
- Sends SMS summary to business owner
- Returns confirmation TwiML

### 5. POST /api/twilio/sms-confirm
Sends SMS confirmations for appointments.

**Request Body:**
```json
{
  "sessionId": "string",
  "appointmentId": "string",
  "callerNumber": "string"
}
```

**Behavior:**
- Confirms appointment in session
- Sends SMS to caller with appointment details
- Sends SMS to business owner with lead information

### 6. GET /api/demo/[sessionId]
Retrieves demo session status for polling.

**Response:**
```json
{
  "id": "string",
  "businessName": "string",
  "createdAt": "Date",
  "callCount": "number",
  "appointmentCount": "number",
  "recentActivity": {
    "calls": [],
    "appointments": []
  }
}
```

## Environment Variables

Create a `.env.local` file with:

```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
OWNER_PHONE_NUMBER=+1234567890
```

## Session Structure

Sessions are stored in-memory with the following structure:

```typescript
interface DemoSession {
  id: string;
  businessName: string;
  phoneNumber: string;
  createdAt: Date;
  calls: CallRecord[];
  appointments: Appointment[];
}
```

## Testing

1. Create a demo session: `POST /api/demo`
2. Use the returned `sessionId` in Twilio webhook URLs
3. Call your Twilio number to test the flow
4. Poll `/api/demo/[sessionId]` to see session activity

## Features

- **Business Hours Detection**: Automatically handles calls differently during vs after hours
- **Appointment Booking**: Interactive appointment scheduling with day/time selection
- **Voicemail Recording**: Records and transcribes voicemails
- **SMS Notifications**: Automated confirmations and lead notifications
- **Session Tracking**: In-memory session management for demo purposes
- **Graceful Degradation**: Works without Twilio credentials (logs instead of sending)

## Notes

- This is a demo implementation using in-memory storage
- For production, you'll want to:
  - Use persistent storage (database)
  - Add proper authentication
  - Implement rate limiting
  - Add error monitoring
  - Use a proper session store (Redis, etc.)