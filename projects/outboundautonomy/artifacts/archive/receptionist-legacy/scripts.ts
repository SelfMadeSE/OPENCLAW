/**
 * Dental AI Receptionist — Call Scripts
 */

export function businessHoursGreeting(businessName: string): string {
  return (
    `Thank you for calling ${businessName}. This call may be recorded. This is your virtual receptionist — I'm here to help.\n\n` +
    "Please choose one of the following:\n" +
    "Press 1 to schedule an appointment.\n" +
    "Press 2 for our hours and location.\n" +
    "Press 3 to leave a message."
  );
}

export function afterHoursGreeting(businessName: string): string {
  return (
    `Thank you for calling ${businessName}. This call may be recorded. We're closed right now, but I can still help.\n\n` +
    "Our regular hours are Monday through Friday, 8 AM to 6 PM.\n\n" +
    "If this is a dental emergency, press 1.\n" +
    "Otherwise, press 2 to leave a message and we'll call you back first thing tomorrow."
  );
}

export function appointmentNewOrReturning(): string {
  return (
    "Great, I'd love to help you book an appointment. Are you a new patient or have you visited us before?\n\n" +
    "Press 1 for new patient.\n" +
    "Press 2 for returning patient."
  );
}

export function appointmentAskDay(): string {
  return (
    "What day works best for you?\n\n" +
    "Press 1 for Monday.\n" +
    "Press 2 for Tuesday.\n" +
    "Press 3 for Wednesday.\n" +
    "Press 4 for Thursday.\n" +
    "Press 5 for Friday."
  );
}

export function appointmentAskTime(): string {
  return (
    "Morning or afternoon work better for you?\n\n" +
    "Press 1 for morning, 8 AM to 12 PM.\n" +
    "Press 2 for afternoon, 12 PM to 6 PM."
  );
}

export function appointmentAskReason(): string {
  return (
    "And what's the reason for your visit?\n\n" +
    "Press 1 for routine cleaning.\n" +
    "Press 2 for a dental emergency.\n" +
    "Press 3 for a consultation.\n" +
    "Press 4 for something else."
  );
}

export function appointmentConfirm(businessName: string, day: string, time: string, reason: string): string {
  return (
    `Perfect! I've got you requested for ${day} in the ${time} for a ${reason}. You'll receive a text shortly with the details.\n\n` +
    "Is there anything else I can help you with today?"
  );
}

export function appointmentGoodbye(): string {
  return "Wonderful — we look forward to seeing you! Have a great day.";
}

export function hoursAndLocation(address: string): string {
  return (
    `We're open Monday through Friday, 8 AM to 6 PM. You'll find us at ${address}.\n\n` +
    "Would you like to schedule an appointment?\n\n" +
    "Press 1 to book now.\n" +
    "Press 2 to go back to the main menu."
  );
}

export function emergencyRoute(emergencyNumber: string): string {
  return (
    "I understand — dental emergencies can be really stressful. Here's what to do:\n\n" +
    `Call our emergency line at ${emergencyNumber}, or visit your nearest emergency room if you need immediate care.\n\n` +
    "Would you like me to text you our emergency contact info so you have it handy?\n\n" +
    "Press 1 to receive a text.\n" +
    "Press 2 if you don't need one."
  );
}

export function emergencyTextSent(): string {
  return "Sent! You should have it now. Please don't hesitate to call the emergency line — they're there for you. Take care.";
}

export function voicemailPrompt(): string {
  return "Please leave your name, phone number, and a brief message after the tone. We'll return your call on the next business day.";
}

export function smsToCaller(businessName: string, day: string, time: string, reason: string): string {
  return `Hi! Your appointment at ${businessName} has been requested for ${day} at ${time} (${reason}). Our team will confirm shortly. Reply HELP for assistance.`;
}

export function smsToOwner(businessName: string, name: string, day: string, time: string, reason: string, phone: string, sessionId: string): string {
  return `📲 New appointment at ${businessName}: ${name} on ${day} at ${time} for ${reason}. Caller: ${phone}. Demo session: ${sessionId}`;
}

export function smsEmergencyInfo(businessName: string, emergencyNumber: string): string {
  return `${businessName} Emergency Line: ${emergencyNumber}. If you're in urgent pain, don't wait — call now or visit your nearest ER.`;
}
