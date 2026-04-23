import { Container, Section } from '@/components/ui'

export default function Privacy() {
  return (
    <>
      
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">
                  Privacy Policy
                </h1>
                <p className="text-muted">Last updated: April 20, 2026</p>
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="max-w-4xl mx-auto prose prose-invert">
                <h2 className="text-2xl font-bold text-static mb-4">Information We Collect</h2>
                <p className="text-muted leading-relaxed">
                  We collect information you provide directly to us, such as when you contact us through our website, 
                  use our services, or otherwise communicate with us. This may include your name, email address, 
                  phone number, company name, and other business-related information.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">How We Use Information</h2>
                <p className="text-muted leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, process transactions, 
                  send technical notices and support messages, respond to your comments and questions, and provide 
                  customer service.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Information Sharing</h2>
                <p className="text-muted leading-relaxed">
                  We do not sell, rent, or trade your personal information. We may share your information with 
                  third-party service providers who perform services on our behalf, such as payment processing and 
                  data analysis. These third parties are obligated to protect your information and may use it only 
                  to provide these services to us.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Data Security</h2>
                <p className="text-muted leading-relaxed">
                  We implement appropriate technical and organizational measures to protect the security of your 
                  personal information. However, no method of transmission over the internet or method of electronic 
                  storage is 100% secure.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Cookies</h2>
                <p className="text-muted leading-relaxed">
                  Our website uses cookies to enhance your experience, analyze site traffic, and for security purposes. 
                  You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
                  some features of our website may not function properly without cookies.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Third-Party Services</h2>
                <p className="text-muted leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy 
                  practices of these third-party websites. We encourage you to review the privacy policies of these 
                  third parties.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Your Rights</h2>
                <p className="text-muted leading-relaxed">
                  You have the right to access, update, or delete your personal information. To exercise these rights, 
                  please contact us using the information below. We will respond to your request in accordance with 
                  applicable law.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Contact Us</h2>
                <p className="text-muted leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br /><br />
                  Ecosystem Global Solutions<br />
                  9601 64 Ave, Grande Prairie, AB<br />
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
  title: "Privacy Policy — Outbound Autonomy",
  description: "Privacy Policy for Outbound Autonomy services. Learn how we collect, use, and protect your information.",
  openGraph: {
    title: "Privacy Policy — Outbound Autonomy",
    description: "Privacy Policy for Outbound Autonomy services. Learn how we collect, use, and protect your information.",
    type: "website",
    url: "https://outboundautonomy.com/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Outbound Autonomy",
    description: "Privacy Policy for Outbound Autonomy services. Learn how we collect, use, and protect your information.",
  },
}