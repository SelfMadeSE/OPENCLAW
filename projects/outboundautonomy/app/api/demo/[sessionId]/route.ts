import { NextRequest, NextResponse } from 'next/server';
import { demoSessionStore } from '@/lib/demo/session-store';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;
  const session = demoSessionStore.getSession(sessionId);
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

  return NextResponse.json({
    id: session.id,
    businessName: session.businessName,
    createdAt: session.createdAt,
    callCount: session.calls.length,
    appointmentCount: session.appointments.length,
    recentActivity: {
      calls: session.calls.slice(-3).map(call => ({ id: call.id, timestamp: call.timestamp, status: call.status, hasVoicemail: !!call.voicemailUrl })),
      appointments: session.appointments.slice(-3).map(apt => ({ id: apt.id, callerNumber: apt.callerNumber, createdAt: apt.createdAt, confirmed: apt.confirmed })),
    }
  });
}
