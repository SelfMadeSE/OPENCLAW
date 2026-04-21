import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/session-store';
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
  validateTwilioWebhook,
} from '@/lib/twilio-utils';

function xml(twiml: string) {
  return new NextResponse(twiml, { status: 200, headers: { 'Content-Type': 'text/xml' } });
}

function errorTwiml(msg: string) {
  return xml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>${msg}</Say>
  <Hangup/>
</Response>`);
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!validateTwilioWebhook(request, request.url, rawBody)) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');
    const flow = url.searchParams.get('flow');
    const step = url.searchParams.get('step');

    if (!sessionId) return errorTwiml('System error: No session ID provided.');

    const session = sessionStore.getSession(sessionId);
    if (!session) return errorTwiml('Session not found. Please contact support.');

    const params = new URLSearchParams(rawBody);
    const digits = params.get('Digits') as string;
    const from = params.get('From') as string;

    // ─── After-hours flow ──────────────────────────────────────────
    if (flow === 'afterhours') {
      if (digits === '1') {
        // Dental emergency
        return xml(generateEmergencyTwiml(session.businessName, sessionId));
      }
      // Voicemail
      return xml(generateVoicemailTwiml(sessionId));
    }

    // ─── Emergency sub-flow ────────────────────────────────────────
    if (flow === 'emergency') {
      if (digits === '1') {
        // Text emergency info
        try {
          const { smsEmergencyInfo } = await import('@/lib/scripts');
          await sendSms(from, smsEmergencyInfo(session.businessName, '970-555-0199'));
        } catch { /* best effort */ }
        const script = emergencyTextSent();
        return xml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>${script}</Say>
  <Hangup/>
</Response>`);
      }
      return xml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Take care. Goodbye.</Say>
  <Hangup/>
</Response>`);
    }

    // ─── Appointment flow ──────────────────────────────────────────
    if (flow === 'appointment') {
      if (step === 'newOrReturning') {
        // Persist new vs returning, then ask day
        sessionStore.setBookingField(sessionId, 'patientType', digits === '1' ? 'new' : 'returning');
        return xml(generateAppointmentFlowTwiml(sessionId, 'day'));
      }

      if (step === 'day') {
        const day = getDayFromDigit(digits);
        if (day === 'Unknown') {
          return xml(generateAppointmentFlowTwiml(sessionId, 'day')); // retry
        }
        sessionStore.setBookingField(sessionId, 'day', day);
        return xml(generateAppointmentFlowTwiml(sessionId, 'time'));
      }

      if (step === 'time') {
        const timeSlot = getTimeSlotFromDigit(digits);
        sessionStore.setBookingField(sessionId, 'time', timeSlot);
        return xml(generateAppointmentFlowTwiml(sessionId, 'reason'));
      }

      if (step === 'reason') {
        const reason = getReasonFromDigit(digits);
        sessionStore.setBookingField(sessionId, 'reason', reason);

        const booking = sessionStore.getBookingState(sessionId);

        // Create the appointment with all collected data
        const appointmentId = sessionStore.addAppointment(
          sessionId,
          from,
          booking.day,
          booking.time,
          booking.reason
        );
        sessionStore.clearBookingState(sessionId);

        // Send confirmation SMS
        try {
          const callerMsg = smsToCaller(
            session.businessName,
            booking.day ?? 'TBD',
            booking.time ?? 'TBD',
            booking.reason ?? 'appointment'
          );
          await sendSms(from, callerMsg);
        } catch { /* best effort */ }

        try {
          if (process.env.OWNER_PHONE_NUMBER) {
            const ownerMsg = smsToOwner(
              session.businessName,
              booking.patientType === 'new' ? 'New patient' : 'Returning patient',
              booking.day ?? 'TBD',
              booking.time ?? 'TBD',
              booking.reason ?? 'appointment',
              from,
              sessionId
            );
            await sendSms(process.env.OWNER_PHONE_NUMBER, ownerMsg);
          }
        } catch { /* best effort */ }

        return xml(generateAppointmentFlowTwiml(sessionId, 'confirm'));
      }
    }

    // ─── Main menu ─────────────────────────────────────────────────
    switch (digits) {
      case '1': // Book appointment
        return xml(generateAppointmentFlowTwiml(sessionId, 'newOrReturning'));

      case '2': // Hours & location
        return xml(generateHoursTwiml(session.businessName, sessionId));

      case '3': // Voicemail
        return xml(generateVoicemailTwiml(sessionId));

      default:
        // Invalid — replay main menu
        return xml(generateBusinessHoursTwiml(session.businessName, sessionId));
    }
  } catch (error) {
    console.error('Error in gather webhook:', error);
    return errorTwiml('Sorry, we\'re experiencing technical difficulties. Please try again later.');
  }
}
