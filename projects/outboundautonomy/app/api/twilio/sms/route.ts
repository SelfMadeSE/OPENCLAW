import { NextRequest, NextResponse } from 'next/server';
import { sendSms } from '@/lib/receptionist/twilio-utils';

/**
 * Inbound SMS webhook for the AI Receptionist Twilio number.
 * Handles incoming texts and sends an auto-reply.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get('From') as string;
    const body = (formData.get('Body') as string || '').trim();

    console.log(`Inbound SMS from ${from}: ${body}`);

    // Auto-reply to inbound SMS
    const reply = `Thanks for texting AI Receptionist! We'll get back to you shortly. ` +
      `For immediate assistance, please call us during business hours (Mon-Fri 8AM-6PM).`;

    try {
      await sendSms(from, reply);
    } catch (err) {
      console.error('Failed to send SMS auto-reply:', err);
    }

    // Notify owner
    if (process.env.OWNER_PHONE_NUMBER) {
      try {
        await sendSms(process.env.OWNER_PHONE_NUMBER, `New SMS from ${from}: "${body}"`);
      } catch { /* best effort */ }
    }

    // Return empty TwiML to acknowledge
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { status: 200, headers: { 'Content-Type': 'text/xml' } }
    );
  } catch (error) {
    console.error('Error in SMS webhook:', error);
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { status: 200, headers: { 'Content-Type': 'text/xml' } }
    );
  }
}
