import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/receptionist/session-store';
import { sendSms } from '@/lib/receptionist/twilio-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, appointmentId, callerNumber } = body;

    if (!sessionId || !appointmentId || !callerNumber) {
      return NextResponse.json({ error: 'sessionId, appointmentId, and callerNumber are required' }, { status: 400 });
    }

    const session = sessionStore.getSession(sessionId);
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const appointment = session.appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });

    sessionStore.confirmAppointment(sessionId, appointmentId);

    const callerMessage = `Appointment confirmation for ${session.businessName}:\nDate: ${appointment.day || 'To be scheduled'}\nTime: ${appointment.time || 'To be scheduled'}\nThank you for choosing us!`;
    try { await sendSms(callerNumber, callerMessage); } catch { /* best effort */ }

    if (process.env.OWNER_PHONE_NUMBER) {
      const ownerMessage = `New appointment booked for ${session.businessName}:\nCustomer: ${callerNumber}\nDate: ${appointment.day || 'TBD'}\nTime: ${appointment.time || 'TBD'}`;
      try { await sendSms(process.env.OWNER_PHONE_NUMBER, ownerMessage); } catch { /* best effort */ }
    }

    return NextResponse.json({ success: true, message: 'Appointment confirmed and SMS notifications sent', appointmentId });
  } catch (error) {
    console.error('Error in SMS confirmation:', error);
    return NextResponse.json({ error: 'Failed to confirm appointment and send SMS' }, { status: 500 });
  }
}
