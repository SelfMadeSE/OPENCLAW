import Link from 'next/link'
import { AnimatedSection } from '@/components/ui'
import { Container, Section } from '@/components/ui'
import SiteAuditTool from '@/components/site-audit/SiteAuditTool'

const auditPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Free Website Audit — Outbound Autonomy',
  description:
    'Enter your URL to get a website audit with design, conversion, and technical scoring, targeted fixes, and an implementation proposal path.',
  url: 'https://outboundautonomy.com/audit',
  about: {
    '@type': 'Service',
    serviceType: 'Website audit and implementation planning',
    name: 'Free Website Audit With Targeted Fixes',
    provider: {
      '@type': 'Organization',
      name: 'Outbound Autonomy',
      url: 'https://outboundautonomy.com',
    },
  },
}

const auditFeatures = [
  {
    title: 'Design Score',
    items: [
      'Visual quality, layout, and brand consistency',
      'Mobile responsiveness and cross-device checks',
      'Trust signal placement (reviews, credentials, social proof)',
      'Call-to-action clarity and positioning',
    ],
  },
  {
    title: 'Conversion Score',
    items: [
      'Lead capture setup (forms, chat, phone)',
      'Form length, friction points, follow-up readiness',
      'Intake flow evaluation',
      'Booking and scheduling path analysis',
    ],
  },
  {
    title: 'Technical Score',
    items: [
      'Page speed (Core Web Vitals indicators)',
      'SEO basics (titles, meta tags, heading structure)',
      'SSL, hosting, and security header checks',
      'Crawlability and indexation signals',
    ],
  },
  {
    title: 'Competitor Gap View',
    items: [
      'Local competitor benchmark against your site',
      'Design, conversion, and messaging gaps',
      'Specific fixes with real-world examples',
    ],
  },
]

export default function AuditPage() {
  return (
    <main>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditPageSchema) }}
      />

      {/* Breadcrumb strip */}
      <AnimatedSection>
        <div className="border-b border-steel/30 bg-depth/50">
          <Container>
            <div className="flex items-center gap-2 py-3 text-sm text-muted">
              <Link href="/" className="hover:text-signal transition-colors">
                Home
              </Link>
              <span className="text-steel">/</span>
              <span className="text-static">Website Audit</span>
            </div>
          </Container>
        </div>
      </AnimatedSection>

      {/* Audit tool — same component used on the homepage */}
      <SiteAuditTool />

      {/* What happens after the audit — contextual for standalone page visitors */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-20">
              <div className="mx-auto max-w-5xl">
                <div className="text-center mb-12">
                  <p className="text-sm uppercase tracking-[0.35em] text-signal">
                    What you get
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-static md:text-4xl">
                    The audit shows you what is broken, what matters most, and what to fix first.
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {auditFeatures.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-xl border border-steel bg-void/70 p-5"
                    >
                      <h3 className="text-lg font-semibold text-static">
                        {feature.title}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {feature.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm text-muted"
                          >
                            <span className="text-signal flex-shrink-0 mt-0.5">
                              ▸
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <p className="text-sm text-muted">
                    Already have your audit?{' '}
                    <Link
                      href="/contact"
                      className="font-semibold text-signal hover:text-signal/80 underline underline-offset-2"
                    >
                      Request a proposal and build timeline →
                    </Link>
                  </p>
                </div>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Trust section */}
      <AnimatedSection>
        <div className="bg-void">
          <Container>
            <Section className="py-16">
              <div className="mx-auto max-w-3xl space-y-3 text-center">
                <p className="text-sm text-muted">
                  Every audit is automated and honest. We do not inflate scores to sell more work.
                </p>
                <p className="text-sm text-muted">
                  Competitor analysis uses public data only — we never access private analytics.
                </p>
                <p className="text-sm text-muted">
                  Your URL and email are never shared or sold.
                </p>
                <p className="text-sm text-muted">
                  Questions before you audit?{' '}
                  <a
                    href="mailto:owner@outboundautonomy.com"
                    className="text-signal hover:underline"
                  >
                    Talk to us
                  </a>
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>
    </main>
  )
}

export const metadata = {
  title: 'Free Website Audit — Get Design, Conversion & Technical Scores | Outbound Autonomy',
  description:
    'Enter your URL for a free website audit. Get scored on design, conversion, and technical health. See targeted fixes, competitor gaps, and an implementation estimate — no pitch.',
  openGraph: {
    title: 'Free Website Audit — Get Design, Conversion & Technical Scores',
    description:
      'Enter your URL for a free website audit. See targeted fixes, competitor gaps, and build estimates.',
    type: 'website',
    url: 'https://outboundautonomy.com/audit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Website Audit — Get Design, Conversion & Technical Scores',
    description:
      'Enter your URL for a free website audit. See targeted fixes and build estimates.',
  },
}
