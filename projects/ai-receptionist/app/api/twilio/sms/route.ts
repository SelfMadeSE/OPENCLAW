import { NextRequest, NextResponse } from 'next/server';
import { consentStore } from '@/lib/consent-store';
import { validateTwilioWebhook } from '@/lib/twilio-utils';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!validateTwilioWebhook(request, request.url, rawBody)) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  const params = new URLSearchParams(rawBody);
  const from = params.get('From') || '';
  const body = (params.get('Body') || '').trim().toUpperCase();

  if (body === 'STOP' || body === 'UNSUBSCRIBE' || body === 'CANCEL' || body === 'END' || body === 'QUIT') {
    consentStore.optOut(from);
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Message>You have been unsubscribed and will no longer receive texts.</Message></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }

  if (body === 'START' || body === 'UNSTOP') {
    consentStore.optIn(from);
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Message>You have been resubscribed to texts.</Message></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
  }

  return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Message>Reply STOP to opt out.</Message></Response>', {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}
