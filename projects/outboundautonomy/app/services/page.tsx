import { Container, Section, Button } from '@/components/ui'

const scoreBands = [
  {
    score: '0–35',
    label: 'Critical',
    meaning: 'Design overhaul, conversion rebuild, technical debt cleanup',
    scope: 'Full website + workflow rebuild',
  },
  {
    score: '36–60',
    label: 'Needs Work',
    meaning: 'Good bones, broken conversion path, missing lead capture',
    scope: 'Targeted fixes + automation integration',
  },
  {
    score: '61–85',
    label: 'Fair',
    meaning: 'Mostly solid, leaking on follow-up and routing',
    scope: 'Workflow automation + optimization',
  },
  {
    score: '86–100',
    label: 'Strong',
    meaning: 'Well-built but manual processes slow response',
    scope: 'Lead routing + admin automation',
  },
]

const services = [
  {
    title: 'Site redesign & conversion repair',
    subtitle: 'Fix what the audit found — scores 0–60',
    description:
      'The audit found design problems, slow pages, broken CTAs, or unclear offers. We rebuild the pages that cost you leads — not a full redesign by default, only the components the audit flagged.',
    builds: [
      'Page-level fixes for every issue surfaced in the audit (CTA placement, load speed, mobile layout, form UX)',
      'Lead capture components tested against your current conversion baseline',
      'Redirect and crawl fixes for technical issues',
      'Preview/approval workflow so you see changes before they go live',
    ],
    timeline: '2–4 weeks for a targeted fix pass. 4–8 weeks for a full site rebuild.',
    investment: '$1,500–$5,000 depending on scope',
    signals:
      'Your audit showed a score below 60. Your phone isn\u2019t ringing from the website. You know the site looks dated but don\u2019t know what to fix first.',
  },
  {
    title: 'Intake, qualification & routing',
    subtitle: 'Close the lead gaps — any score',
    description:
      'Forms are submitted. Emails arrive. But leads go cold because there\u2019s no structured intake, qualification, or routing. We build the workflow between the form submission and the booked call.',
    builds: [
      'Multi-step intake forms that pre-qualify before routing (saves your team time)',
      'Automated lead triage: high-intent leads get immediate notifications, lower-intent leads go to a nurture sequence',
      'Calendar + CRM routing: leads land in the right pipeline stage with the right owner',
      'Fallback for missed responses: if nobody follows up within a window, automated text/email re-engagement fires',
    ],
    timeline: '1–3 weeks per workflow',
    investment: '$1,500–$5,000 depending on number of workflows',
    signals:
      'Your audit showed strong technical scores but conversion gaps. You\u2019re getting leads but losing them in the follow-up. Your team spends too much time on \u201Cwho handles this one?\u201D',
  },
  {
    title: 'Admin automation',
    subtitle: 'Replace repetitive manual tasks',
    description:
      'After the site is fixed and leads are routing, the next bottleneck is usually manual work: follow-up sequences, status checks, reporting, customer communication, invoice reminders, review requests.',
    builds: [
      'Follow-up automation: scheduled email/text sequences for new leads, past clients, review requests',
      'Status-monitoring workflows: notify you when a lead hasn\u2019t progressed, a job is at risk, or a client needs attention',
      'Admin report generation: pull pipeline status, lead sources, response times without manual spreadsheet work',
      'Two-way communication flows: client can reply to an automated message and a human sees it in your CRM with context',
    ],
    timeline: '1–2 weeks per automation',
    investment: '$1,500–$5,000 per automation. Combined scopes usually fall into the $5,000+ band.',
    signals:
      'Your audit was fine on the surface but your team is drowning in manual follow-up. You know leads are being lost in the gap between form submission and human response.',
  },
  {
    title: 'Partner / white-label',
    subtitle: 'For agencies and marketing shops',
    description:
      'You audit your client\u2019s site (or we audit it). We build the fixes and automation. You own the relationship. We\u2019re the implementation layer you don\u2019t need to hire for.',
    builds: [
      'Audit + proposal generation under your brand',
      'Implementation of website fixes, CRM workflows, and automation',
      'Ongoing maintenance if you don\u2019t want to manage it',
      'Training materials you can share with your client',
    ],
    timeline: 'Custom — scoped per client',
    investment: 'Starting at $1,000/month retainer, per-client implementation at cost.',
    signals:
      'You\u2019re an agency that already sells websites or marketing services. Clients are asking about \u201CAI\u201D or \u201Cautomation\u201D and you need a credible implementation partner.',
  },
]

export default function Services() {
  return (
    <main>
      {/* Hero */}
      <div className="bg-gradient-to-b from-void to-depth">
        <Container>
          <Section className="py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold text-static mb-6">
                Turn audit findings into working systems
              </h1>
              <p className="text-xl text-muted leading-relaxed">
                Your website audit surfaced specific issues. This is how we fix
                them — mapped to your score, your industry, and your actual
                workflow.
              </p>
            </div>
          </Section>
        </Container>

        {/* Score Band Mapping */}
        <Container>
          <Section className="pb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-static mb-4">
                How the audit maps to services
              </h2>
            </div>
            <div className="bg-depth border border-steel rounded-xl overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-steel text-muted text-left">
                      <th className="p-4 font-medium">Audit Score</th>
                      <th className="p-4 font-medium">What It Usually Means</th>
                      <th className="p-4 font-medium">Typical Service Scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreBands.map((band) => (
                      <tr
                        key={band.score}
                        className="border-b border-steel last:border-0"
                      >
                        <td className="p-4">
                          <span className="inline-flex items-center gap-2">
                            <span className="text-signal font-bold text-lg">
                              {band.score}
                            </span>
                            <span className="text-xs text-muted font-mono uppercase">
                              {band.label}
                            </span>
                          </span>
                        </td>
                        <td className="p-4 text-muted">{band.meaning}</td>
                        <td className="p-4 text-static">{band.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* Service Categories */}
      <div className="bg-depth">
        <Container>
          <Section className="py-20">
            <div className="space-y-20">
              {services.map((service, i) => (
                <div
                  key={service.title}
                  className="max-w-4xl mx-auto"
                >
                  <div className="mb-8">
                    <p className="text-signal text-sm font-mono tracking-widest uppercase mb-2">
                      {service.subtitle}
                    </p>
                    <h2 className="text-3xl font-bold text-static mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-static mb-4">
                        What gets built:
                      </h3>
                      <ul className="space-y-3">
                        {service.builds.map((item, j) => (
                          <li key={j} className="flex gap-3 text-muted">
                            <span className="text-signal flex-shrink-0 mt-1">
                              ▸
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-void border border-steel rounded-lg p-5">
                        <p className="text-xs text-muted font-mono uppercase tracking-wider mb-1">
                          Timeline
                        </p>
                        <p className="text-sm text-static">{service.timeline}</p>
                      </div>
                      <div className="bg-void border border-steel rounded-lg p-5">
                        <p className="text-xs text-muted font-mono uppercase tracking-wider mb-1">
                          Investment
                        </p>
                        <p className="text-sm text-static">
                          {service.investment}
                        </p>
                        <a
                          href="/pricing"
                          className="text-xs text-signal hover:underline mt-1 inline-block"
                        >
                          See pricing →
                        </a>
                      </div>
                      <div className="bg-void border border-steel rounded-lg p-5">
                        <p className="text-xs text-muted font-mono uppercase tracking-wider mb-1">
                          Signal
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                          {service.signals}
                        </p>
                      </div>
                    </div>
                  </div>

                  {i < services.length - 1 && (
                    <hr className="mt-16 border-steel/30" />
                  )}
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </div>

      {/* How We Work */}
      <div className="bg-void">
        <Container>
          <Section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-static mb-4">
                How we work
              </h2>
              <p className="text-lg text-muted max-w-xl mx-auto">
                Every project starts the same way.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Audit',
                  description:
                    'We scan your site, review your current lead path, and identify what\u2019s losing you business.',
                },
                {
                  step: '2',
                  title: 'Scope',
                  description:
                    'We map the specific audit findings to a build plan. No generic proposals.',
                },
                {
                  step: '3',
                  title: 'Build',
                  description:
                    'We implement in order of impact. The biggest lead leak gets fixed first.',
                },
                {
                  step: '4',
                  title: 'Handoff',
                  description:
                    'You own the systems. We provide documentation, training, and a maintenance path.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-depth border border-steel rounded-lg p-6 text-center"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-signal/10 border border-signal/30 text-signal font-bold text-sm mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-static mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-muted mt-10 max-w-2xl mx-auto">
              We are currently accepting new clients in a controlled rollout.
              Each project is scoped case-by-case because every service business
              runs differently. We say no when the fit isn&apos;t right.
            </p>
          </Section>
        </Container>
      </div>

      {/* CTA */}
      <div className="bg-depth">
        <Container>
          <Section className="py-20">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-static mb-4">
                Ready to turn your audit into a fix?
              </h2>
              <p className="text-lg text-muted mb-8">
                You already know what&apos;s wrong. We know how to build the
                solution.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button href="/" variant="primary" size="lg">
                  Start with Your URL →
                </Button>
                <Button href="/sample-report" variant="secondary" size="lg">
                  See an Example Audit
                </Button>
              </div>
              <p className="text-sm text-muted mt-6">
                No commitment. No sales call first. If the score makes sense,
                the proposal will too.
              </p>
            </div>
          </Section>
        </Container>
      </div>
    </main>
  )
}

export const metadata = {
  title: 'Services — Outbound Autonomy',
  description:
    'Turn website audit findings into working systems. Site redesign, lead intake & routing, admin automation, and white-label for agencies. Score-band pricing.',
  openGraph: {
    title: 'Services — Outbound Autonomy',
    description:
      'Turn website audit findings into working systems. Mapped to your audit score, your industry, and your actual workflow.',
    type: 'website',
    url: 'https://outboundautonomy.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — Outbound Autonomy',
    description:
      'Turn website audit findings into working systems. Audit score to service scope.',
  },
}
