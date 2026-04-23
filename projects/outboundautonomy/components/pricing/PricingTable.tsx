import { Container, Section, Button } from '@/components/ui'

const lanes = [
  {
    name: 'Lane 1 — Premium Website + Automation',
    detail: 'Implementation timeline is confirmed after discovery and technical scoping.',
    bullets: [
      'High-end website with backend logic',
      'Lead capture and intake routing',
      'Automated booking and meeting routing',
      'Follow-up automation scoped during discovery'
    ],
    cta: 'Apply for a pilot slot',
    href: '/contact?intent=pilot-lane-1'
  },
  {
    name: 'Lane 2 — Custom AI Workflow Builds',
    detail: 'Custom scoping before implementation.',
    bullets: [
      'Workflow discovery session before build',
      'Custom automation deployed in your stack',
      'Examples: inbox triage, approval routing, reporting automation',
      'Escalation logic for human judgment points'
    ],
    cta: 'Tell us what you repeat',
    href: '/contact?intent=workflow'
  },
  {
    name: 'Lane 3 — Private AI Operating Systems',
    detail: 'Architecture-led engagement for sensitive workflows.',
    bullets: [
      'Local-model deployment inside your environment',
      'Internal knowledge and compliance agents',
      'Reduced external API dependency for sensitive operations',
      'Designed for audit and oversight requirements'
    ],
    cta: 'Tell us your constraints',
    href: '/contact?intent=architecture'
  }
]

export function PricingTable() {
  return (
    <Section className="py-16">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-static mb-4">Three ways we work with you</h2>
          <p className="text-lg text-muted">We scope first, then quote based on your workflow and environment.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {lanes.map((lane, index) => (
            <div key={index} className="rounded-lg border border-steel bg-depth p-8">
              <h3 className="text-2xl font-bold text-static mb-2">{lane.name}</h3>
              <div className="text-sm text-warm mb-6">{lane.detail}</div>

              <ul className="space-y-3 mb-8">
                {lane.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    <span className="text-muted">{bullet}</span>
                  </li>
                ))}
              </ul>

              <Button href={lane.href} className="w-full bg-signal hover:bg-signal/90">
                {lane.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
