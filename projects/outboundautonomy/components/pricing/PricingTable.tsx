import { Container, Section, Button } from '@/components/ui'

const tiers = [
  {
    name: 'Quick Fixes',
    range: '$1,500 – $4,500',
    score: '60–79 (moderate issues)',
    description: 'Your site works but has obvious leaks. We patch the highest-impact problems fast.',
    bullets: [
      'Page speed optimization (images, scripts, caching)',
      'CTA placement and clarity fixes',
      'Lead capture form installation or redesign',
      'Mobile layout fixes',
      'SEO title, meta, and structure cleanup',
      'Trust badge and social proof placement',
    ],
    timeline: '1–2 weeks',
  },
  {
    name: 'Lead Machine',
    range: '$2,500 – $6,500',
    score: '40–59 (major gaps)',
    description: 'Your site looks fine but isn\'t converting. We rebuild the lead path from scratch.',
    bullets: [
      'Everything in Quick Fixes, plus',
      'Homepage or landing page redesign',
      'Full intake form with smart routing',
      'CRM connection — leads go straight into your pipeline',
      'Follow-up automation (text, email, or both)',
      'Booking and appointment scheduling flow',
    ],
    timeline: '2–4 weeks',
  },
  {
    name: 'Full System',
    range: '$4,000 – $12,000',
    score: '0–39 (critical overhaul)',
    description: 'Your site is actively repelling leads. We rebuild design, conversion, and technical foundation.',
    bullets: [
      'Everything in Lead Machine, plus',
      'Complete site rebuild (design + development)',
      'Automated lead qualification and scoring',
      'Customer communication sequences',
      'Admin workflow automation (reports, approvals, notifications)',
      'Agency white-label package (if applicable)',
    ],
    timeline: '4–8 weeks',
  },
]

export function PricingTable() {
  return (
    <Section className="py-16">
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-static mb-4">Pricing based on what the audit finds</h2>
          <p className="text-lg text-muted">
            Your audit score determines the scope. The scope determines the price. No mystery, no upsells — you see
            exactly what needs to be done and what it costs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div key={index} className="rounded-lg border border-steel bg-depth p-8 flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-signal">{tier.score}</span>
              </div>
              <h3 className="text-2xl font-bold text-static mb-1">{tier.name}</h3>
              <div className="text-2xl font-bold text-signal mb-2">{tier.range}</div>
              <p className="text-sm text-warm mb-6">{tier.description}</p>

              <div className="text-xs font-mono uppercase tracking-wider text-muted mb-4">{tier.timeline}</div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start gap-2">
                    <span className="text-signal mt-1">▸</span>
                    <span className="text-muted text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-muted mb-4">
            These are ranges, not quotes. Your actual price is determined by the audit findings and your preferred scope.
          </p>
          <Button href="/services" className="bg-signal hover:bg-signal/90 text-lg px-8 py-4">
            Get your free audit first — then we&apos;ll scope the work
          </Button>
        </div>
      </Container>
    </Section>
  )
}
