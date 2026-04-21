// Gmail SMTP setup for OpenClaw
const nodemailer = require('nodemailer');

// Gmail SMTP configuration
const gmailConfig = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'your-google-email@gmail.com', // Replace with your Gmail
    clientId: 'YOUR_GOOGLE_CLIENT_ID', // Need to create Google Cloud project
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    refreshToken: 'YOUR_REFRESH_TOKEN',
    accessToken: 'YOUR_ACCESS_TOKEN'
  }
};

// Alternative: App Password (less secure but simpler)
const appPasswordConfig = {
  service: 'gmail',
  auth: {
    user: 'your-google-email@gmail.com',
    pass: 'YOUR_APP_PASSWORD' // Generate from Google Account -> Security -> App Passwords
  }
};

// Create transporter
async function createTransporter(config) {
  return nodemailer.createTransporter(config);
}

// Test email function
async function sendTestEmail(config) {
  const transporter = await createTransporter(config);
  
  const mailOptions = {
    from: `"Rylee Benson" <${config.auth.user}>`,
    to: config.auth.user,
    subject: 'Test Email from OpenClaw',
    text: 'This is a test email from OpenClaw email service.',
    html: `<p>This is a test email from <strong>OpenClaw</strong> email service.</p>`
  };
  
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Instructions for setup
const setupInstructions = `
GMAIL SMTP SETUP FOR OPENCLAW

Option 1: App Password (Recommended for testing)
1. Go to: https://myaccount.google.com/
2. Enable 2-factor authentication if not already enabled
3. Go to Security -> App passwords
4. Generate new app password:
   - App: "OpenClaw Email"
   - Device: "Other (Custom name)"
   - Name: "OpenClaw Agent"
5. Copy the 16-character password (no spaces)
6. Use this password in the appPasswordConfig.pass field

Option 2: OAuth2 (More secure, more complex)
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create new project or select existing
3. Enable Gmail API
4. Create OAuth 2.0 credentials:
   - Application type: "Web application"
   - Name: "OpenClaw Email"
   - Add authorized redirect URIs (if needed)
5. Note Client ID and Client Secret
6. Use OAuth2 flow to get refresh token

CONFIGURATION:
Add your email config to OpenClaw as environment variables:
EMAIL_SERVICE=gmail
EMAIL_USER=your-google-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_NAME=Rylee Benson

Then use this config in your email sending scripts.
`;

console.log(setupInstructions);

// Example usage with app password
if (process.env.TEST_EMAIL) {
  const testConfig = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  };
  
  sendTestEmail(testConfig).catch(console.error);
}

module.exports = {
  createTransporter,
  sendTestEmail,
  gmailConfig,
  appPasswordConfig
};