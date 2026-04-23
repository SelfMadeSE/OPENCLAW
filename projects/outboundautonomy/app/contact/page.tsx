import { Container, Section } from '@/components/ui'
import { ContactForm } from '@/components/contact/ContactForm'

export default function Contact() {
  return (
    <>
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">Let&apos;s scope your workflow.</h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                  Tell us what your team repeats and we&apos;ll tell you whether there&apos;s a clean build path.
                </p>
              </div>
            </Section>
          </Container>

          <ContactForm />

          <Container>
            <Section className="py-16">
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="bg-depth rounded-lg border border-steel p-8">
                  <h3 className="text-xl font-bold text-static mb-4">Direct Contact</h3>
                  <div className="space-y-3 text-muted">
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:owner@outboundautonomy.com" className="text-signal hover:text-signal/80 underline">
                        owner@outboundautonomy.com
                      </a>
                    </p>
                    <p><strong>Pilot status:</strong> Closed pilot intake active</p>
                  </div>
                </div>

                <div className="bg-depth rounded-lg border border-steel p-8">
                  <h3 className="text-xl font-bold text-static mb-4">What happens next</h3>
                  <div className="space-y-3 text-muted">
                    <p>1) We review your workflow.</p>
                    <p>2) We run a discovery call.</p>
                    <p>3) If fit exists, we provide scoped implementation options.</p>
                  </div>
                </div>
              </div>
            </Section>
          </Container>
        </div>
      </main>
    </>
  )
}

export const metadata = {
  title: 'Contact — Outbound Autonomy',
  description: 'Request discovery for pilot-safe custom AI workflows and deployment scoping.',
  openGraph: {
    title: 'Contact — Outbound Autonomy',
    description: 'Request discovery for pilot-safe custom AI workflows and deployment scoping.',
    type: 'website',
    url: 'https://outboundautonomy.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Outbound Autonomy',
    description: 'Request discovery for pilot-safe custom AI workflows and deployment scoping.',
  },
}
