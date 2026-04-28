import { Container, Section, AnimatedSection } from '@/components/ui'
import SiteAuditTool from '@/components/site-audit/SiteAuditTool'

const steps = [
  {
    step: '1',
    title: 'Drop your URL',
    description: 'No account needed. No email gate. Just your website address.',
  },
  {
    step: '2',
    title: 'We scan it',
    description:
      'Our system checks design quality, page speed, mobile experience, lead capture, technical SEO, and CTA placement.',
  },
  {
    step: '3',
    title: 'You see findings',
    description:
      'A preview shows your biggest issues immediately — no signup required.',
  },
  {
    step: '4',
    title: 'Full report (free)',
    description:
      'Enter your email. Get your complete breakdown: scores, specific fixes, competitor examples, and an implementation estimate.',
  },
  {
    step: '5',
    title: 'Pick what to build',
    description:
      'Choose the fixes that matter most. We give you a price and timeline.',
  },
]

const reportSections = [
  {
    title: 'Design Score',
    items: [
      'Visual quality, layout, brand consistency',
      'Mobile responsiveness',
      'Trust signals (reviews, credentials, social proof)',
      'Call-to-action placement and clarity',
    ],
  },
  {
    title: 'Conversion Score',
    items: [
      'Lead capture setup (forms, chat, phone)',
      'Form length, friction points, follow-up readiness',
      'Intake flow evaluation',
      'Booking / scheduling path',
    ],
  },
  {
    title: 'Technical Score',
    items: [
      'Page speed (Core Web Vitals)',
      'SEO basics (titles, meta, structure)',
      'SSL, hosting, security headers',
      'Crawlability and indexation',
    ],
  },
  {
    title: 'Competitor Gap Analysis',
    items: [
      '3–5 local competitors benchmarked against your site',
      'What they do better (design, conversion, messaging)',
      'Specific gaps you can close — with examples',
    ],
    note: 'Implementation Estimate: What it would cost and how long each fix takes. Tiered options: quick wins vs. full rebuild. No pressure. No pitch. Just the numbers.',
  },
]

const tiers = [
  {
    name: 'Quick Fixes',
    timeline: '1–2 weeks',
    items: [
      'Page speed improvements',
      'CTA and button placement fixes',
      'Lead capture form installation',
      'Mobile layout fixes',
      'SEO title/meta cleanup',
      'Trust badge placement',
    ],
  },
  {
    name: 'Lead Machine',
    timeline: '2–4 weeks',
    items: [
      'Everything in Quick Fixes, plus:',
      'Homepage or landing page redesign',
      'Full intake form with routing',
      'CRM connection (lead goes straight into your pipeline)',
      'Follow-up automation (text, email, or both)',
      'Booking / appointment scheduling flow',
    ],
  },
  {
    name: 'Full System',
    timeline: '4–8 weeks',
    items: [
      'Everything in Lead Machine, plus:',
      'Complete site rebuild (design + dev)',
      'Automated lead qualification and scoring',
      'Customer communication sequences',
      'Admin workflow automation (reports, approvals, notifications)',
      'Agency white-label package (if applicable)',
    ],
  },
]

const signals = [
  'You get fewer calls than competitors',
  'Your contact form collects dust',
  'Your bounce rate is over 60%',
  "You've had the same site for 3+ years",
  'Nobody can find you on Google',
]

const industries = [
  'HVAC, plumbing, roofing, landscaping, cleaning, electrical',
  'Dental, chiropractic, med spa, legal',
  'Home services, trades, professional services',
  'Any operator-led SMB losing leads because their site is bad',
]

export default function Services() {
  return (
    <main>
      {/* Hero */}
      <AnimatedSection><div className="bg-gradient-to-b from-void to-depth">
        <Container>
          <Section className="py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold text-static mb-6">
                Your website is leaking leads. We&apos;ll show you where{' '}
                <span className="text-signal">— and how to fix it.</span>
              </h1>
              <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto">
                One URL is all it takes. Drop in your site, get a full
                diagnostic on design, conversion, technical health, and how you
                stack against competitors. Then get a plan to fix what matters
                most.
              </p>
            </div>
          </Section>
        </Container>
      </div></AnimatedSection>

      {/* How It Works - 5-step audit funnel */}
      <AnimatedSection><div className="bg-depth">
        <Container>
          <Section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-static mb-4">
                The Audit — How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="bg-void border border-steel rounded-lg p-6 text-center"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-signal/10 border border-signal/30 text-signal font-bold text-sm mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-static mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </div></AnimatedSection>

      {/* What the Report Contains */}
      <AnimatedSection><div className="bg-void">
        <Container>
          <Section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-static mb-4">
                What the Report Contains
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {reportSections.map((section) => (
                <div
                  key={section.title}
                  className="bg-depth border border-steel rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-static mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-muted text-sm">
                        <span className="text-signal flex-shrink-0 mt-0.5">
                          ▸
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {section.note && (
                    <p className="mt-4 text-sm text-muted italic border-t border-steel/30 pt-4">
                      {section.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </div></AnimatedSection>

      {/* Implementation Tiers */}
      <div className="bg-depth">
        <Container>
          <Section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-static mb-4">
                What You Can Build
              </h2>
              <p className="text-lg text-muted max-w-xl mx-auto">
                Pick the scope that matches your business. Every option starts
                with the audit.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="bg-void border border-steel rounded-xl p-6 flex flex-col"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-static">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-signal font-mono tracking-wider mt-1">
                      {tier.timeline}
                    </p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {tier.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-muted text-sm">
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
          </Section>
        </Container>
      </div>

      {/* Target Audience */}
      <div className="bg-void">
        <Container>
          <Section className="py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-static mb-4">
                Who This Is For
              </h2>
              <p className="text-lg text-muted max-w-xl mx-auto">
                Local service businesses whose website is costing them money.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-depth border border-steel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-static mb-4">
                  Industries we work with
                </h3>
                <ul className="space-y-2">
                  {industries.map((industry, i) => (
                    <li key={i} className="flex gap-3 text-muted text-sm">
                      <span className="text-signal flex-shrink-0 mt-0.5">
                        ▸
                      </span>
                      <span>{industry}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-depth border border-steel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-static mb-4">
                  You know your website isn&apos;t working if:
                </h3>
                <ul className="space-y-2">
                  {signals.map((signal, i) => (
                    <li key={i} className="flex gap-3 text-muted text-sm">
                      <span className="text-red-400 flex-shrink-0 mt-0.5">
                        ✕
                      </span>
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* CTA — URL Input */}
      <div className="bg-depth">
        <Container>
          <Section className="py-20">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-static mb-4">
                Stop guessing.{' '}
                <span className="text-signal">Start fixing.</span>
              </h2>
              <p className="text-lg text-muted mb-8">
                Enter your URL. Get your audit. See exactly what&apos;s broken,
                how it compares, and what to do about it.
              </p>
              <SiteAuditTool />
              <p className="text-sm text-muted mt-6">
                No spam. No sales calls unless you ask. Full report in under 60
                seconds.
              </p>
            </div>
          </Section>
        </Container>
      </div>

      {/* Trust Notes */}
      <div className="bg-void">
        <Container>
          <Section className="py-16">
            <div className="max-w-3xl mx-auto space-y-3 text-center">
              <p className="text-sm text-muted">
                Every audit is automated and honest. We don&apos;t inflate
                scores to sell more work.
              </p>
              <p className="text-sm text-muted">
                Competitor analysis is public data only — we don&apos;t access
                private analytics.
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
    </main>
  )
}

export const metadata = {
  title: 'Website Audit for Service Businesses | Outbound Autonomy',
  description:
    'Free website audit that scores your design, conversion, technical health, and competitor gaps. Get specific fixes and an implementation estimate — no pressure.',
  openGraph: {
    title: 'Website Audit for Service Businesses | Outbound Autonomy',
    description:
      'Free website audit that scores your design, conversion, technical health, and competitor gaps. Get specific fixes — no pressure.',
    type: 'website',
    url: 'https://outboundautonomy.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Audit for Service Businesses | Outbound Autonomy',
    description:
      'Free website audit that scores your design, conversion, technical health, and competitor gaps.',
  },
}
