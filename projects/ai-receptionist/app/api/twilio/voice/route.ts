import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/session-store';
import { isBusinessHours, generateBusinessHoursTwiml, generateAfterHoursTwiml, validateTwilioWebhook } from '@/lib/twilio-utils';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!validateTwilioWebhook(request, request.url, rawBody)) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const url = new URL(request.url);
    let sessionId = url.searchParams.get('sessionId');
    
    // If no sessionId provided, create a default session
    if (!sessionId) {
      const defaultSession = sessionStore.createSession('AI Receptionist', 'unknown');
      sessionId = defaultSession.id;
    }

    let session = sessionStore.getSession(sessionId);
    
    if (!session) {
      // If session not found (e.g., server restart), create a new one
      session = sessionStore.createSession('AI Receptionist', 'unknown');
    }

    // Parse form data from raw body
    const params = new URLSearchParams(rawBody);
    const from = params.get('From') as string;
    const callSid = params.get('CallSid') as string;

    // Record the call
    sessionStore.addCallRecord(sessionId, callSid, from);

    // Generate appropriate TwiML based on business hours
    const twiml = isBusinessHours() 
      ? generateBusinessHoursTwiml(session.businessName, sessionId)
      : generateAfterHoursTwiml(session.businessName, sessionId);

    return new NextResponse(twiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  } catch (error) {
    console.error('Error in voice webhook:', error);
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Sorry, we're experiencing technical difficulties. Please try again later.</Say>
  <Hangup/>
</Response>`;
    return new NextResponse(twiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }
}