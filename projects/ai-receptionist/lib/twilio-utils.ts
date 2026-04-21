import twilio from 'twilio';
import { consentStore } from './consent-store';
import {
  businessHoursGreeting,
  afterHoursGreeting,
  appointmentNewOrReturning,
  appointmentAskDay,
  appointmentAskTime,
  appointmentAskReason,
  appointmentConfirm,
  appointmentGoodbye,
  hoursAndLocation,
  emergencyRoute,
  emergencyTextSent,
  voicemailPrompt,
  smsToCaller,
  smsToOwner,
  smsEmergencyInfo,
} from './scripts';

// Initialize Twilio client (will be undefined if env vars not set)
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

/** Validate that a request came from Twilio (prevents spoofing). */
export function validateTwilioWebhook(request: Request, url: string, body: string): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    console.warn('TWILIO_AUTH_TOKEN not set — skipping webhook validation (dev only)');
    return process.env.NODE_ENV !== 'production';
  }
  const signature = request.headers.get('X-Twilio-Signature');
  if (!signature) return false;
  // Parse URL-encoded body into params object for Twilio validation
  const params: Record<string, string> = {};
  for (const [key, value] of new URLSearchParams(body).entries()) {
    params[key] = value;
  }
  return twilio.validateRequest(authToken, signature, url, params);
}

const DEFAULT_ADDRESS = '123 Dental Street, Suite 100';
const DEFAULT_EMERGENCY_NUMBER = process.env.EMERGENCY_PHONE_NUMBER || '970-555-0199';

export function isBusinessHours(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Mon-Fri (1-5) between 8:00 AM and 6:00 PM MT
  if (day >= 1 && day <= 5) {
    const timeInMinutes = hour * 60 + minute;
    return timeInMinutes >= 8 * 60 && timeInMinutes < 18 * 60;
  }
  return false;
}

/** Escape text for safe embedding inside TwiML <Say> — strips bare XML chars. */
function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Split multi-line script text into separate <Say> elements
 * so Twilio pauses naturally between paragraphs.
 */
function sayBlocks(text: string): string {
  return text
    .split('\n')
    .filter(line => line.trim())
    .map(line => `  <Say>${esc(line.trim())}</Say>`)
    .join('\n');
}

export function generateBusinessHoursTwiml(businessName: string, sessionId: string): string {
  const greeting = businessHoursGreeting(businessName);
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(greeting)}
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}">
  </Gather>
</Response>`;
}

export function generateAfterHoursTwiml(businessName: string, sessionId: string): string {
  const greeting = afterHoursGreeting(businessName);
  // After-hours: emergency (1) or voicemail (2)
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(greeting)}
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=afterhours">
  </Gather>
</Response>`;
}

export function generateAppointmentFlowTwiml(
  sessionId: string,
  step: 'newOrReturning' | 'day' | 'time' | 'reason' | 'confirm' = 'day'
): string {
  if (step === 'newOrReturning') {
    const script = appointmentNewOrReturning();
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(script)}
  <Gather input="dtmf" timeout="15" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=appointment&step=newOrReturning">
  </Gather>
</Response>`;
  }

  if (step === 'day') {
    const script = appointmentAskDay();
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(script)}
  <Gather input="dtmf" timeout="15" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=appointment&step=day">
  </Gather>
</Response>`;
  }

  if (step === 'time') {
    const script = appointmentAskTime();
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(script)}
  <Gather input="dtmf" timeout="15" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=appointment&step=time">
  </Gather>
</Response>`;
  }

  if (step === 'reason') {
    const script = appointmentAskReason();
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(script)}
  <Gather input="dtmf" timeout="15" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=appointment&step=reason">
  </Gather>
</Response>`;
  }

  // confirm — caller hears summary then good-bye
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you. Your appointment has been scheduled. You will receive a confirmation text message shortly.</Say>
  <Say>Is there anything else I can help you with today?</Say>
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}">
    <Say>Press 1 to schedule another appointment, or 2 to end this call.</Say>
  </Gather>
</Response>`;
}

export function generateEmergencyTwiml(businessName: string, sessionId: string): string {
  const script = emergencyRoute(DEFAULT_EMERGENCY_NUMBER);
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(script)}
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=emergency">
  </Gather>
</Response>`;
}

export function generateHoursTwiml(businessName: string, sessionId: string): string {
  const script = hoursAndLocation(DEFAULT_ADDRESS);
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(script)}
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}">
  </Gather>
</Response>`;
}

export function generateVoicemailTwiml(sessionId: string): string {
  const script = voicemailPrompt();
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(script)}
  <Record
    timeout="10"
    maxLength="60"
    transcribe="true"
    action="/api/twilio/recording?sessionId=${sessionId}"
  />
  <Say>I didn't receive a recording. Goodbye.</Say>
  <Hangup/>
</Response>`;
}

export async function sendSms(to: string, body: string): Promise<void> {
  if (consentStore.isOptedOut(to)) {
    console.log('SMS suppressed for opted-out number:', to);
    return;
  }

  if (!twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
    console.log('SMS would be sent but Twilio credentials not configured:', { to, body });
    return;
  }

  try {
    await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
    console.log('SMS sent successfully to', to);
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
}

export function getDayFromDigit(digit: string): string {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const index = parseInt(digit) - 1;
  return days[index] || 'Unknown';
}

export function getReasonFromDigit(digit: string): string {
  const reasons = ['routine cleaning', 'dental emergency', 'consultation', 'other'];
  const index = parseInt(digit) - 1;
  return reasons[index] || 'other';
}

export function formatTimeFromDigits(digits: string): string {
  if (digits.length !== 4) return digits;

  const hour = parseInt(digits.substring(0, 2));
  const minute = parseInt(digits.substring(2, 4));

  if (isNaN(hour) || isNaN(minute) || hour > 23 || minute > 59) {
    return digits;
  }

  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

export function getTimeSlotFromDigit(digit: string): string {
  return digit === '1' ? 'morning (8 AM – 12 PM)' : 'afternoon (12 PM – 6 PM)';
}

// Re-export script functions for direct use in routes
export {
  businessHoursGreeting,
  afterHoursGreeting,
  appointmentConfirm,
  appointmentGoodbye,
  hoursAndLocation,
  emergencyRoute,
  emergencyTextSent,
  voicemailPrompt,
  smsToCaller,
  smsToOwner,
  smsEmergencyInfo,
};
