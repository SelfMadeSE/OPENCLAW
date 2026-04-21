import { NextResponse } from 'next/server';
import { sessionStore } from '@/lib/receptionist/session-store';

export async function GET() {
  const twilioConfigured = !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER);
  const ownerConfigured = !!process.env.OWNER_PHONE_NUMBER;

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    twilio: {
      configured: twilioConfigured,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER || null,
    },
    owner: {
      configured: ownerConfigured,
    },
    sessions: {
      active: (sessionStore as any).sessions?.size ?? 0,
    },
  });
}
