import twilio from 'twilio';
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

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

const DEFAULT_ADDRESS = '123 Dental Street, Suite 100';
const DEFAULT_EMERGENCY_NUMBER = process.env.EMERGENCY_PHONE_NUMBER || '970-555-0199';

export function isBusinessHours(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  if (day >= 1 && day <= 5) {
    const timeInMinutes = hour * 60 + minute;
    return timeInMinutes >= 8 * 60 && timeInMinutes < 18 * 60;
  }
  return false;
}

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sayBlocks(text: string): string {
  return text
    .split('\n')
    .filter(line => line.trim())
    .map(line => `  <Say>${esc(line.trim())}</Say>`)
    .join('\n');
}

export function generateBusinessHoursTwiml(businessName: string, sessionId: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(businessHoursGreeting(businessName))}
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}">
  </Gather>
</Response>`;
}

export function generateAfterHoursTwiml(businessName: string, sessionId: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(afterHoursGreeting(businessName))}
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=afterhours">
  </Gather>
</Response>`;
}

export function generateAppointmentFlowTwiml(sessionId: string, step: 'newOrReturning' | 'day' | 'time' | 'reason' | 'confirm' = 'day'): string {
  const scripts: Record<string, () => string> = {
    newOrReturning: appointmentNewOrReturning,
    day: appointmentAskDay,
    time: appointmentAskTime,
    reason: appointmentAskReason,
  };

  if (step !== 'confirm' && scripts[step]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(scripts[step]())}
  <Gather input="dtmf" timeout="15" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=appointment&step=${step}">
  </Gather>
</Response>`;
  }

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
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(emergencyRoute(DEFAULT_EMERGENCY_NUMBER))}
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}&flow=emergency">
  </Gather>
</Response>`;
}

export function generateHoursTwiml(businessName: string, sessionId: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(hoursAndLocation(DEFAULT_ADDRESS))}
  <Gather input="dtmf" timeout="10" numDigits="1" action="/api/twilio/gather?sessionId=${sessionId}">
  </Gather>
</Response>`;
}

export function generateVoicemailTwiml(sessionId: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
${sayBlocks(voicemailPrompt())}
  <Record timeout="10" maxLength="60" transcribe="true" action="/api/twilio/recording?sessionId=${sessionId}" />
  <Say>I didn't receive a recording. Goodbye.</Say>
  <Hangup/>
</Response>`;
}

export async function sendSms(to: string, body: string): Promise<void> {
  if (!twilioClient || !process.env.TWILIO_PHONE_NUMBER?.trim()) {
    console.log('SMS would be sent but Twilio credentials not configured:', { to, body });
    return;
  }
  try {
    await twilioClient.messages.create({ 
      body, 
      from: process.env.TWILIO_PHONE_NUMBER?.trim(), 
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
  return days[parseInt(digit) - 1] || 'Unknown';
}

export function getReasonFromDigit(digit: string): string {
  const reasons = ['routine cleaning', 'dental emergency', 'consultation', 'other'];
  return reasons[parseInt(digit) - 1] || 'other';
}

export function getTimeSlotFromDigit(digit: string): string {
  return digit === '1' ? 'morning (8 AM – 12 PM)' : 'afternoon (12 PM – 6 PM)';
}

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
