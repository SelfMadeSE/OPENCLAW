import { NextResponse } from 'next/server';
import { demoSessionStore } from '@/lib/demo/session-store';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    sessions: {
      active: demoSessionStore.activeCount(),
    },
  });
}
