import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/receptionist/session-store';
import {
  generateAppointmentFlowTwiml,
  generateEmergencyTwiml,
  generateHoursTwiml,
  generateVoicemailTwiml,
  generateBusinessHoursTwiml,
  getDayFromDigit,
  getReasonFromDigit,
  getTimeSlotFromDigit,
  sendSms,
  smsToCaller,
  smsToOwner,
  emergencyTextSent,
  smsEmergencyInfo,
} from '@/lib/receptionist/twilio-utils';

function xml(twiml: string) {
  return new NextResponse(twiml, { status: 200, headers: { 'Content-Type': 'text/xml' } });
}

function errorTwiml(msg: string) {
  return xml(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>${msg}</Say><Hangup/></Response>`);
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');
    const flow = url.searchParams.get('flow');
    const step = url.searchParams.get('step');

    if (!sessionId) return errorTwiml('System error: No session ID provided.');
    const session = sessionStore.getSession(sessionId);
    if (!session) return errorTwiml('Session not found. Please contact support.');

    const formData = await request.formData();
    const digits = formData.get('Digits') as string;
    const from = formData.get('From') as string;

    // After-hours flow
    if (flow === 'afterhours') {
      if (digits === '1') return xml(generateEmergencyTwiml(session.businessName, sessionId));
      return xml(generateVoicemailTwiml(sessionId));
    }

    // Emergency sub-flow
    if (flow === 'emergency') {
      if (digits === '1') {
        try { await sendSms(from, smsEmergencyInfo(session.businessName, '970-555-0199')); } catch { /* best effort */ }
        return xml(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>${emergencyTextSent()}</Say><Hangup/></Response>`);
      }
      return xml(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>Take care. Goodbye.</Say><Hangup/></Response>`);
    }

    // Appointment flow
    if (flow === 'appointment') {
      if (step === 'newOrReturning') {
        sessionStore.setBookingField(sessionId, 'patientType', digits === '1' ? 'new' : 'returning');
        return xml(generateAppointmentFlowTwiml(sessionId, 'day'));
      }
      if (step === 'day') {
        const day = getDayFromDigit(digits);
        if (day === 'Unknown') return xml(generateAppointmentFlowTwiml(sessionId, 'day'));
        sessionStore.setBookingField(sessionId, 'day', day);
        return xml(generateAppointmentFlowTwiml(sessionId, 'time'));
      }
      if (step === 'time') {
        sessionStore.setBookingField(sessionId, 'time', getTimeSlotFromDigit(digits));
        return xml(generateAppointmentFlowTwiml(sessionId, 'reason'));
      }
      if (step === 'reason') {
        const reason = getReasonFromDigit(digits);
        sessionStore.setBookingField(sessionId, 'reason', reason);
        const booking = sessionStore.getBookingState(sessionId);
        const appointmentId = sessionStore.addAppointment(sessionId, from, booking.day, booking.time, booking.reason);
        sessionStore.clearBookingState(sessionId);

        try { await sendSms(from, smsToCaller(session.businessName, booking.day ?? 'TBD', booking.time ?? 'TBD', booking.reason ?? 'appointment')); } catch { /* best effort */ }
        try {
          if (process.env.OWNER_PHONE_NUMBER) {
            await sendSms(process.env.OWNER_PHONE_NUMBER, smsToOwner(session.businessName, booking.patientType === 'new' ? 'New patient' : 'Returning patient', booking.day ?? 'TBD', booking.time ?? 'TBD', booking.reason ?? 'appointment', from, sessionId));
          }
        } catch { /* best effort */ }

        return xml(generateAppointmentFlowTwiml(sessionId, 'confirm'));
      }
    }

    // Main menu
    switch (digits) {
      case '1': return xml(generateAppointmentFlowTwiml(sessionId, 'newOrReturning'));
      case '2': return xml(generateHoursTwiml(session.businessName, sessionId));
      case '3': return xml(generateVoicemailTwiml(sessionId));
      default: return xml(generateBusinessHoursTwiml(session.businessName, sessionId));
    }
  } catch (error) {
    console.error('Error in gather webhook:', error);
    return errorTwiml('Sorry, we\'re experiencing technical difficulties. Please try again later.');
  }
}
