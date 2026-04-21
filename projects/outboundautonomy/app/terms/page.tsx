import { Container, Section } from '@/components/ui'

export default function Terms() {
  return (
    <>
      
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">
                  Terms of Service
                </h1>
                <p className="text-muted">Last updated: April 20, 2026</p>
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="max-w-4xl mx-auto prose prose-invert">
                <h2 className="text-2xl font-bold text-static mb-4">Acceptance</h2>
                <p className="text-muted leading-relaxed">
                  By accessing and using Outbound Autonomy services, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Services</h2>
                <p className="text-muted leading-relaxed">
                  Outbound Autonomy provides AI receptionist services, web design and development, application 
                  development, and marketing automation services. All services are provided "as is" and subject to 
                  availability. We reserve the right to modify, suspend, or discontinue services at any time.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Payment Terms</h2>
                <p className="text-muted leading-relaxed">
                  Monthly subscription fees for AI Receptionist services are billed in advance. Project-based services 
                  require a deposit before work begins. All payments are non-refundable except as specified in our 
                  cancellation policy. Late payments may result in service suspension.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Intellectual Property</h2>
                <p className="text-muted leading-relaxed">
                  All content, features, and functionality of our services are owned by Outbound Autonomy and are 
                  protected by copyright, trademark, and other intellectual property laws. For custom design and 
                  development work, intellectual property rights transfer to the client upon full payment.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Limitation of Liability</h2>
                <p className="text-muted leading-relaxed">
                  Outbound Autonomy shall not be liable for any indirect, incidental, special, consequential, or 
                  exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, 
                  or other intangible losses. Our total liability for any claim arising from these terms shall not 
                  exceed the fees paid by you for the services in the preceding 12 months.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Termination</h2>
                <p className="text-muted leading-relaxed">
                  We reserve the right to terminate or suspend access to our services immediately, without prior 
                  notice or liability, for any reason whatsoever. Upon termination, your right to use the services 
                  will cease immediately.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Governing Law</h2>
                <p className="text-muted leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of the state of Colorado, 
                  United States, without regard to its conflict of law provisions.
                </p>
                
                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Contact</h2>
                <p className="text-muted leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
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
  title: "Terms of Service — Outbound Autonomy",
  description: "Terms of Service for Outbound Autonomy services. Legal agreement for using our AI receptionist, web design, and automation services.",
  openGraph: {
    title: "Terms of Service — Outbound Autonomy",
    description: "Terms of Service for Outbound Autonomy services. Legal agreement for using our AI receptionist, web design, and automation services.",
    type: "website",
    url: "https://outboundautonomy.com/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — Outbound Autonomy",
    description: "Terms of Service for Outbound Autonomy services. Legal agreement for using our AI receptionist, web design, and automation services.",
  },
}