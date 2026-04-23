import { Container, Section } from '@/components/ui'

export default function Terms() {
  return (
    <>
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">Terms of Service</h1>
                <p className="text-muted">Last updated: April 22, 2026</p>
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="max-w-4xl mx-auto prose prose-invert">
                <h2 className="text-2xl font-bold text-static mb-4">Acceptance</h2>
                <p className="text-muted leading-relaxed">
                  By accessing and using Outbound Autonomy services, you agree to these terms.
                  If you do not agree, do not use the services.
                </p>

                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Services</h2>
                <p className="text-muted leading-relaxed">
                  Outbound Autonomy provides custom AI workflow implementation, website + automation builds,
                  and private AI system architecture services. Service availability and scope are defined in each engagement.
                </p>

                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Payment Terms</h2>
                <p className="text-muted leading-relaxed">
                  Engagement pricing is proposal-based. Discovery/scoping and implementation terms are documented
                  in client agreements. Invoices are due according to the signed agreement.
                </p>

                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Intellectual Property</h2>
                <p className="text-muted leading-relaxed">
                  Platform content remains property of Outbound Autonomy. Deliverable ownership and transfer terms
                  for custom work are defined in each client agreement.
                </p>

                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Limitation of Liability</h2>
                <p className="text-muted leading-relaxed">
                  Outbound Autonomy is not liable for indirect, incidental, special, consequential,
                  or exemplary damages. Total liability is limited to fees paid for the applicable engagement.
                </p>

                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Termination</h2>
                <p className="text-muted leading-relaxed">
                  We may suspend or terminate services for breach, non-payment, or misuse. Client termination
                  rights follow the active agreement for that engagement.
                </p>

                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Governing Law</h2>
                <p className="text-muted leading-relaxed">
                  These terms are governed by the laws of the state of Colorado, United States.
                </p>

                <h2 className="text-2xl font-bold text-static mb-4 mt-8">Contact</h2>
                <p className="text-muted leading-relaxed">
                  Questions about these Terms of Service:
                  <br /><br />
                  Ecosystem Global Solutions
                  <br />
                  9601 64 Ave, Grande Prairie, AB
                  <br />
                  Email: owner@outboundautonomy.com
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
  title: 'Terms of Service — Outbound Autonomy',
  description: 'Terms of Service for Outbound Autonomy custom AI workflow and implementation services.',
  openGraph: {
    title: 'Terms of Service — Outbound Autonomy',
    description: 'Terms of Service for Outbound Autonomy custom AI workflow and implementation services.',
    type: 'website',
    url: 'https://outboundautonomy.com/terms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — Outbound Autonomy',
    description: 'Terms of Service for Outbound Autonomy custom AI workflow and implementation services.',
  },
}
