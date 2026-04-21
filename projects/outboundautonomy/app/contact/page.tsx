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
                <h1 className="text-5xl font-bold text-static mb-4">
                  Let's talk.
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                  90 seconds to tell us what you need. We'll handle the rest.
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
                    <p>
                      <strong>Phone:</strong>{' '}
                      <a href="tel:5709894873" className="text-signal hover:text-signal/80 underline">
                        (570) 989-4873
                      </a>
                    </p>
                    <p>
                      <strong>Response time:</strong> Under 4 hours during business hours (MT)
                    </p>
                  </div>
                </div>

                <div className="bg-depth rounded-lg border border-steel p-8">
                  <h3 className="text-xl font-bold text-static mb-4">AI Receptionist Demo</h3>
                  <div className="space-y-3 text-muted">
                    <p>Want to hear it in action?</p>
                    <p className="text-lg font-semibold text-signal">
                      Call (570) 989-4873 right now.
                    </p>
                    <p>That's our AI answering. Ask it anything.</p>
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
  title: "Contact — Outbound Autonomy",
  description: "Get in touch. 90-second form, 4-hour response time. owner@outboundautonomy.com or call (570) 989-4873.",
  openGraph: {
    title: "Contact — Outbound Autonomy",
    description: "Get in touch. 90-second form, 4-hour response time. owner@outboundautonomy.com or call (570) 989-4873.",
    type: "website",
    url: "https://outboundautonomy.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Outbound Autonomy",
    description: "Get in touch. 90-second form, 4-hour response time. owner@outboundautonomy.com or call (570) 989-4873.",
  },
}