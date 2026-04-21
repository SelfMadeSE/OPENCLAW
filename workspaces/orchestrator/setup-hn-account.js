const puppeteer = require('puppeteer');

async function setupHNAccount(googleEmail) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Go to Hacker News login
    await page.goto('https://news.ycombinator.com/login');
    
    // Click on Google login if available, or create account
    const createAccountLink = await page.$('a[href="create"]');
    if (createAccountLink) {
      await createAccountLink.click();
      await page.waitForNavigation();
    }
    
    // Look for Google OAuth option
    const googleButton = await page.$('button:contains("Google")') || 
                        await page.$('[data-testid="google-signup"]') ||
                        await page.$('[aria-label*="Google"]');
    
    if (googleButton) {
      await googleButton.click();
      
      // Wait for Google OAuth
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      
      // Enter Google email
      await page.waitForSelector('input[type="email"]');
      await page.type('input[type="email"]', googleEmail);
      await page.click('#identifierNext');
      
      // Wait for password page and enter password
      await page.waitForSelector('input[type="password"]');
      // Note: User will need to enter password manually
      console.log('Please enter your Google password in the browser window');
      
      // Complete any remaining OAuth steps
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      
      // Fill out HN username if needed
      const usernameInput = await page.$('input[name="username"]');
      if (usernameInput) {
        const baseUsername = googleEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        await usernameInput.type(baseUsername);
      }
      
      // Submit the form
      await page.click('button[type="submit"]');
      
      console.log('HN account creation initiated. Check the browser window.');
    } else {
      console.log('Google OAuth not found, please create account manually');
    }
    
    // Keep browser open for manual completion
    await new Promise(resolve => setTimeout(resolve, 60000));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

// Usage
setupHNAccount('your-google-email@gmail.com');