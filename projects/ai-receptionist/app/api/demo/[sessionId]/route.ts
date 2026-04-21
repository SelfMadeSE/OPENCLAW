import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/session-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  try {
    const session = sessionStore.getSession(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Return session status (without sensitive details)
    const sessionStatus = {
      id: session.id,
      businessName: session.businessName,
      createdAt: session.createdAt,
      callCount: session.calls.length,
      appointmentCount: session.appointments.length,
      recentActivity: {
        calls: session.calls.slice(-3).map(call => ({
          id: call.id,
          timestamp: call.timestamp,
          status: call.status,
          hasVoicemail: !!call.voicemailUrl
        })),
        appointments: session.appointments.slice(-3).map(appointment => ({
          id: appointment.id,
          callerNumber: appointment.callerNumber.replace(/\d(\d{4})$/, '***$1'),
          createdAt: appointment.createdAt,
          confirmed: appointment.confirmed
        }))
      }
    };

    return NextResponse.json(sessionStatus);
  } catch (error) {
    console.error('Error fetching session status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session status' },
      { status: 500 }
    );
  }
}