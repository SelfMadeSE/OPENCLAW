// Environment variable type definitions
export interface EnvVars {
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
  OWNER_PHONE_NUMBER: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
}

// Type guard to check if required environment variables are set
export function validateEnvVars(requiredVars: (keyof EnvVars)[]): boolean {
  const missing: string[] = [];
  
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
    return false;
  }

  return true;
}

// Get Twilio configuration with fallbacks
export function getTwilioConfig() {
  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    isConfigured: validateEnvVars(['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER'])
  };
}

// Get business configuration
export function getBusinessConfig() {
  return {
    ownerPhone: process.env.OWNER_PHONE_NUMBER,
    businessHours: {
      weekdays: [1, 2, 3, 4, 5], // Monday to Friday
      startHour: 8, // 8 AM
      endHour: 18, // 6 PM (6 PM)
      timezone: 'America/Denver' // Mountain Time
    },
    address: '123 Dental Street, Suite 100',
    isConfigured: !!process.env.OWNER_PHONE_NUMBER
  };
}