import { Container, Section } from '@/components/ui'
import { ContactForm } from '@/components/contact/ContactForm'

interface ContactPageProps {
  searchParams?: {
    intent?: string | string[]
    url?: string | string[]
  }
}

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

function getHostname(url?: string) {
  if (!url) return ''

  try {
    return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname
  } catch {
    return ''
  }
}

export default function Contact({ searchParams }: ContactPageProps) {
  const intent = firstValue(searchParams?.intent)
  const auditUrl = firstValue(searchParams?.url)
  const auditHostname = getHostname(auditUrl)
  const isAuditIntent = intent === 'audit'

  return (
    <>
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">
                  {isAuditIntent ? 'Request your proposal and implementation plan.' : 'Tell us which site or funnel needs attention.'}
                </h1>
                <p className="text-xl text-muted max-w-3xl mx-auto">
                  {isAuditIntent
                    ? auditHostname
                      ? `We captured ${auditHostname} from the audit flow. Use this form to turn the findings into a scoped implementation plan.`
                      : 'Use this form to turn the audit findings into a scoped implementation plan.'
                    : 'Share the website, page, or funnel you want reviewed and we’ll focus on the highest-impact fixes first.'}
                </p>
              </div>
            </Section>
          </Container>

          <ContactForm initialIntent={intent} initialAuditUrl={auditUrl} />

          <Container>
            <Section className="py-16">
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="bg-depth rounded-lg border border-steel p-8">
                  <h3 className="text-xl font-bold text-static mb-4">Best first step</h3>
                  <div className="space-y-3 text-muted">
                    <p>
                      Share the exact URL you want reviewed so the proposal stays tied to real conversion,
                      technical, and lead-capture gaps.
                    </p>
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:owner@outboundautonomy.com" className="text-signal hover:text-signal/80 underline">
                        owner@outboundautonomy.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="bg-depth rounded-lg border border-steel p-8">
                  <h3 className="text-xl font-bold text-static mb-4">What happens next</h3>
                  <div className="space-y-3 text-muted">
                    <p>1) We review the submitted URL and audit context.</p>
                    <p>2) We prioritize the highest-impact conversion, technical, and lead-capture fixes.</p>
                    <p>3) If there is a fit, we outline the implementation sequence and proposal path.</p>
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
  description: 'Request a proposal review based on your website audit, URL analysis, and highest-impact conversion fixes.',
  openGraph: {
    title: 'Contact — Outbound Autonomy',
    description: 'Request a proposal review based on your website audit, URL analysis, and highest-impact conversion fixes.',
    type: 'website',
    url: 'https://outboundautonomy.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Outbound Autonomy',
    description: 'Request a proposal review based on your website audit, URL analysis, and highest-impact conversion fixes.',
  },
}
