import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/receptionist/session-store';
import { isBusinessHours, generateBusinessHoursTwiml, generateAfterHoursTwiml } from '@/lib/receptionist/twilio-utils';

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    let sessionId = url.searchParams.get('sessionId');
    const formData = await request.formData();
    const from = formData.get('From') as string;

    // Auto-create session if none provided — allows direct Twilio calls
    if (!sessionId) {
      const newSession = sessionStore.createSession('AI Receptionist', from || 'unknown');
      sessionId = newSession.id;
    }

    let session = sessionStore.getSession(sessionId);
    if (!session) {
      // Session expired or server restart — create fresh
      session = sessionStore.createSession('AI Receptionist', from || 'unknown');
      sessionId = session.id;
    }

    const callSid = formData.get('CallSid') as string;

    sessionStore.addCallRecord(sessionId, callSid, from);

    const twiml = isBusinessHours()
      ? generateBusinessHoursTwiml(session.businessName, sessionId)
      : generateAfterHoursTwiml(session.businessName, sessionId);

    return new NextResponse(twiml, { status: 200, headers: { 'Content-Type': 'text/xml' } });
  } catch (error) {
    console.error('Error in voice webhook:', error);
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, we're experiencing technical difficulties. Please try again later.</Say><Hangup/></Response>`, {
      status: 200, headers: { 'Content-Type': 'text/xml' }
    });
  }
}
