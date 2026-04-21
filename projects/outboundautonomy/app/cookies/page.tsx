import { Container, Section } from '@/components/ui'

export default function Cookies() {
  return (
    <>
      
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">
                  Cookie Policy
                </h1>
                <p className="text-muted">Last updated: April 20, 2026</p>
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="max-w-4xl mx-auto prose prose-invert">
                <h2 className="text-2xl font-bold text-static mb-4">What Are Cookies</h2>
                <p className="text-muted leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  They allow the website to recognize your device and remember information about your visit, such as 
                  your preferences and settings.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">How We Use Cookies</h2>
                <p className="text-muted leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and provide security. 
                  Specifically, we use cookies to:
                </p>
                <ul className="list-disc list-inside text-muted mt-4 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze how you use our website</li>
                  <li>Improve our website's performance</li>
                  <li>Provide security and prevent fraud</li>
                  <li>Understand which parts of our website are most popular</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Types of Cookies</h2>
                <p className="text-muted leading-relaxed">
                  We use the following types of cookies on our website:
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-static">Essential Cookies</h3>
                    <p className="text-muted">
                      These cookies are necessary for the website to function and cannot be switched off. They are 
                      usually only set in response to actions made by you, such as setting your privacy preferences, 
                      logging in, or filling in forms.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-static">Analytical Cookies</h3>
                    <p className="text-muted">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the 
                      performance of our site. They help us know which pages are the most and least popular and see 
                      how visitors move around the site.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-static">Functional Cookies</h3>
                    <p className="text-muted">
                      These cookies enable the website to provide enhanced functionality and personalization. They may 
                      be set by us or by third-party providers whose services we have added to our pages.
                    </p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Managing Cookies</h2>
                <p className="text-muted leading-relaxed">
                  You can manage your cookie preferences through your browser settings. Most web browsers allow you to 
                  control cookies through their settings preferences. However, if you choose to disable cookies, some 
                  features of our website may not function properly.
                </p>
                <p className="text-muted leading-relaxed mt-4">
                  To learn more about cookies, including how to see what cookies have been set and how to manage and 
                  delete them, visit <a href="https://www.aboutcookies.org" className="text-signal hover:text-signal/80 underline" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-signal hover:text-signal/80 underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Contact</h2>
                <p className="text-muted leading-relaxed">
                  If you have any questions about our Cookie Policy, please contact us at:
                  <br /><br />
                  Outbound Autonomy<br />
                  Email: owner@outboundautonomy.com<br />
                  Phone: (570) 989-4873
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </main>
      
    </>
  )
}

export const metadata = {
  title: "Cookie Policy — Outbound Autonomy",
  description: "Cookie Policy for Outbound Autonomy website. Learn how we use cookies and how you can manage your cookie preferences.",
  openGraph: {
    title: "Cookie Policy — Outbound Autonomy",
    description: "Cookie Policy for Outbound Autonomy website. Learn how we use cookies and how you can manage your cookie preferences.",
    type: "website",
    url: "https://outboundautonomy.com/cookies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy — Outbound Autonomy",
    description: "Cookie Policy for Outbound Autonomy website. Learn how we use cookies and how you can manage your cookie preferences.",
  },
}