import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/receptionist/session-store';
import { sendSms } from '@/lib/receptionist/twilio-utils';

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');

    if (!sessionId) {
      return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>System error.</Say><Hangup/></Response>`, {
        status: 200, headers: { 'Content-Type': 'text/xml' }
      });
    }

    const session = sessionStore.getSession(sessionId);
    if (!session) {
      return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>Session not found.</Say><Hangup/></Response>`, {
        status: 200, headers: { 'Content-Type': 'text/xml' }
      });
    }

    const formData = await request.formData();
    const recordingUrl = formData.get('RecordingUrl') as string;
    const transcription = formData.get('TranscriptionText') as string;
    const from = formData.get('From') as string;
    const callSid = formData.get('CallSid') as string;

    const callRecord = session.calls.find(call => call.id === callSid);
    if (callRecord && recordingUrl) {
      callRecord.status = 'completed';
      callRecord.voicemailUrl = recordingUrl;
    }

    if (process.env.OWNER_PHONE_NUMBER) {
      const voicemailSummary = `New voicemail for ${session.businessName}:\nFrom: ${from}\nTime: ${new Date().toLocaleString()}\n${transcription ? `Message: ${transcription}` : 'No transcription available'}\n${recordingUrl ? `Listen: ${recordingUrl}` : ''}`;
      try { await sendSms(process.env.OWNER_PHONE_NUMBER, voicemailSummary); } catch { /* best effort */ }
    }

    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>Thank you for your message. We will call you back during our next business day.</Say><Hangup/></Response>`, {
      status: 200, headers: { 'Content-Type': 'text/xml' }
    });
  } catch (error) {
    console.error('Error in recording webhook:', error);
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, we're experiencing technical difficulties.</Say><Hangup/></Response>`, {
      status: 200, headers: { 'Content-Type': 'text/xml' }
    });
  }
}
