import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/session-store';
import { sendSms } from '@/lib/twilio-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, appointmentId, callerNumber } = body;

    if (!sessionId || !appointmentId || !callerNumber) {
      return NextResponse.json(
        { error: 'sessionId, appointmentId, and callerNumber are required' },
        { status: 400 }
      );
    }

    const session = sessionStore.getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Find the appointment
    const appointment = session.appointments.find(apt => apt.id === appointmentId);
    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Verify callerNumber matches the appointment (prevent SMS relay abuse)
    if (appointment.callerNumber !== callerNumber) {
      return NextResponse.json(
        { error: 'Caller number does not match appointment record' },
        { status: 403 }
      );
    }

    // Mark the appointment as confirmed
    sessionStore.confirmAppointment(sessionId, appointmentId);

    // Send confirmation SMS to caller
    const callerMessage = `Appointment confirmation for ${session.businessName}:
Date: ${appointment.day || 'To be scheduled'}
Time: ${appointment.time || 'To be scheduled'}
Thank you for choosing us! Reply STOP to opt out.`;

    try {
      await sendSms(callerNumber, callerMessage);
    } catch (error) {
      console.error('Failed to send confirmation SMS to caller:', error);
    }

    // Send lead details SMS to business owner
    if (process.env.OWNER_PHONE_NUMBER) {
      const ownerMessage = `New appointment booked for ${session.businessName}:
Customer: ${callerNumber}
Appointment ID: ${appointmentId}
Date: ${appointment.day || 'To be scheduled'}
Time: ${appointment.time || 'To be scheduled'}
Booked: ${appointment.createdAt.toLocaleString()}`;

      try {
        await sendSms(process.env.OWNER_PHONE_NUMBER, ownerMessage);
      } catch (error) {
        console.error('Failed to send lead SMS to owner:', error);
      }
    } else {
      console.log('OWNER_PHONE_NUMBER not configured, would have sent appointment confirmation');
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment confirmed and SMS notifications sent',
      appointmentId: appointmentId
    });
  } catch (error) {
    console.error('Error in SMS confirmation:', error);
    return NextResponse.json(
      { error: 'Failed to confirm appointment and send SMS' },
      { status: 500 }
    );
  }
}