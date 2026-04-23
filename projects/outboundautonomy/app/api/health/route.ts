import { NextResponse } from 'next/server';
import { demoSessionStore } from '@/lib/demo/session-store';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    telephony: {
      enabled: false,
      reason: 'public pivot: receptionist and Twilio endpoints are disabled',
    },
    sessions: {
      active: demoSessionStore.activeCount(),
    },
  });
}
