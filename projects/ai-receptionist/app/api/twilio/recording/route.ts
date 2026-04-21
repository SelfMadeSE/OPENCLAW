import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/session-store';
import { sendSms, validateTwilioWebhook } from '@/lib/twilio-utils';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!validateTwilioWebhook(request, request.url, rawBody)) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');
    
    if (!sessionId) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>System error: No session ID provided.</Say>
  <Hangup/>
</Response>`;
      return new NextResponse(twiml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml' }
      });
    }

    const session = sessionStore.getSession(sessionId);
    if (!session) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Session not found. Please contact support.</Say>
  <Hangup/>
</Response>`;
      return new NextResponse(twiml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml' }
      });
    }

    const params = new URLSearchParams(rawBody);
    const recordingUrl = params.get('RecordingUrl') as string;
    const transcription = params.get('TranscriptionText') as string;
    const from = params.get('From') as string;
    const callSid = params.get('CallSid') as string;

    // Update the call record with voicemail info
    const callRecord = session.calls.find(call => call.id === callSid);
    if (callRecord && recordingUrl) {
      callRecord.status = 'completed';
      callRecord.voicemailUrl = recordingUrl;
    }

    // Send SMS summary to business owner
    if (process.env.OWNER_PHONE_NUMBER) {
      const voicemailSummary = `New voicemail for ${session.businessName}:
From: ${from}
Time: ${new Date().toLocaleString()}
${transcription ? `Message: ${transcription}` : 'No transcription available'}
${recordingUrl ? `Listen: ${recordingUrl}` : ''}`;

      try {
        await sendSms(process.env.OWNER_PHONE_NUMBER, voicemailSummary);
      } catch (smsError) {
        console.error('Failed to send voicemail SMS:', smsError);
      }
    } else {
      console.log('OWNER_PHONE_NUMBER not configured, would have sent:', {
        to: 'owner',
        body: 'New voicemail notification',
        details: { from, recordingUrl, transcription }
      });
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you for your message. We will call you back during our next business day.</Say>
  <Hangup/>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  } catch (error) {
    console.error('Error in recording webhook:', error);
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Sorry, we're experiencing technical difficulties saving your message.</Say>
  <Hangup/>
</Response>`;
    return new NextResponse(twiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }
}