import { Container, Section, AnimatedSection } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { Search, ClipboardList, Zap, ArrowRight, ShieldCheck, BarChart3, FileText } from 'lucide-react'
import SiteAuditTool from '@/components/site-audit/SiteAuditTool'
import Link from 'next/link'

export const metadata = {
  title: 'How It Works — Website Audit & Implementation | Outbound Autonomy',
  description:
    'Enter your URL, get a full audit, receive a flat-price proposal, and we build the fixes. Three phases: Audit → Plan → Build. No email required to start.',
  openGraph: {
    title: 'How It Works — Website Audit & Implementation | Outbound Autonomy',
    description:
      'Enter your URL, get a full audit, receive a flat-price proposal, and we build the fixes. Three phases from audit to revenue.',
    type: 'website',
    url: 'https://outboundautonomy.com/how-it-works',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works — Website Audit & Implementation | Outbound Autonomy',
    description:
      'Three phases from audit to revenue. No email required to start.',
  },
}

const phases = [
  {
    phase: '01',
    title: 'Audit',
    icon: Search,
    color: 'signal',
    description: 'Drop your URL and get a live scan of your entire website — no email, no signup, no credit card.',
    steps: [
      'Enter any website URL in the audit tool',
      'Our system crawls your pages and scores four areas: Design, Conversion, Technical, and Competitor Gap',
      'You get a read-only preview immediately — scores, grade, and top issues identified',
      'Optionally unlock the full report with your email for specific fixes, competitor examples, and implementation estimates',
    ],
    timeframe: '90 seconds',
    outcome: 'A live audit report with scores, issues, and a grade. Zero commitment.',
  },
  {
    phase: '02',
    title: 'Plan',
    icon: ClipboardList,
    color: 'warm',
    description: 'We translate every audit finding into a scoped line item: what to change, why it matters, what it costs.',
    steps: [
      'Every issue becomes a work item — no vague recommendations, no upsells',
      'You get a flat-price proposal: each fix scoped with cost and timeline',
      'Three implementation tiers to choose from: Quick Fixes, Lead Machine, or Full System',
      'You decide what to build and when — no pressure, no hourly billing',
    ],
    timeframe: '3–5 business days',
    outcome: 'A prioritized proposal with timelines and exact pricing.',
  },
  {
    phase: '03',
    title: 'Build',
    icon: Zap,
    color: 'signal',
    description: 'We build the fixes, connect the automation, and hand you a working system.',
    steps: [
      'Site changes deployed — design updates, conversion flows, lead capture forms',
      'CRM and follow-up automation connected — leads go straight into your pipeline',
      'Handoff documentation so your team knows how everything works',
      'Post-launch check: we verify every fix against the original audit findings',
    ],
    timeframe: '1–8 weeks (depending on scope)',
    outcome: 'A site that converts. A follow-up system that runs itself.',
  },
]

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'No Commitments',
    description: 'The initial audit is completely free. You only pay if you choose to move forward with fixes.',
  },
  {
    icon: BarChart3,
    title: 'Flat Pricing',
    description: 'Every proposal is flat-price — no hourly billing, no scope creep, no surprise invoices.',
  },
  {
    icon: FileText,
    title: 'Honest Assessment',
    description: 'If your site doesn\'t need work, we\'ll tell you. We don\'t inflate scores to sell more services.',
  },
]

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero */}
      <AnimatedSection>
        <div className="bg-gradient-to-b from-void to-depth">
          <Container>
            <Section className="py-24">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold text-static mb-6">
                  Three phases.{' '}
                  <span className="text-signal">One week to a proposal.</span>
                </h1>
                <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto">
                  We turn a website URL into a diagnostic, a proposal, and a working
                  system — with flat pricing and no pressure at any step.
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Phase-by-phase breakdown */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-20">
              <div className="max-w-5xl mx-auto space-y-16">
                {phases.map((phase) => {
                  const Icon = phase.icon
                  return (
                    <div key={phase.phase} className="bg-void border border-steel/30 rounded-xl p-8 md:p-10">
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Phase header */}
                        <div className="shrink-0 md:w-56">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`h-12 w-12 rounded-xl ${phase.color === 'signal' ? 'bg-signal/10 border-signal/20' : 'bg-warm/10 border-warm/20'} border flex items-center justify-center`}>
                              <Icon className={`h-6 w-6 ${phase.color === 'signal' ? 'text-signal' : 'text-warm'}`} aria-hidden="true" />
                            </div>
                            <span className="text-xs text-muted font-mono">{phase.phase}</span>
                          </div>
                          <h2 className={`text-2xl font-bold ${phase.color === 'signal' ? 'text-signal' : 'text-warm'} mb-2`}>
                            {phase.title}
                          </h2>
                          <p className="text-sm text-muted mb-4">{phase.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted">
                            <span className="font-mono text-signal">⏱ {phase.timeframe}</span>
                          </div>
                        </div>

                        {/* Steps */}
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-static uppercase tracking-wider mb-4">
                            What happens in this phase:
                          </p>
                          <ol className="space-y-3">
                            {phase.steps.map((step, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted">
                                <span className={`font-mono text-xs ${phase.color === 'signal' ? 'text-signal' : 'text-warm'} shrink-0 mt-0.5`}>
                                  {i + 1}.
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                          <div className="mt-5 pt-4 border-t border-steel/20">
                            <p className="text-sm">
                              <span className="text-static font-medium">Outcome: </span>
                              <span className="text-muted">{phase.outcome}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Guarantees */}
      <AnimatedSection>
        <div className="bg-void">
          <Container>
            <Section className="py-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-static mb-4">
                  How we operate
                </h2>
                <p className="text-lg text-muted max-w-xl mx-auto">
                  Three principles that govern every engagement.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {guarantees.map((g) => {
                  const Icon = g.icon
                  return (
                    <div key={g.title} className="bg-depth border border-steel/30 rounded-lg p-6 text-center hover:border-signal/20 transition-all duration-300">
                      <div className="h-12 w-12 rounded-lg bg-signal/10 border border-signal/20 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-signal" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold text-static mb-2">{g.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{g.description}</p>
                    </div>
                  )
                })}
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* FAQ anchor points */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-20">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-static mb-4">
                    Common questions
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-void border border-steel/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-static mb-2">
                      Do I need to pay up front?
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      No. The audit is completely free. After you review the
                      findings, we provide a flat-price proposal. You only pay
                      when you approve the scope and timeline.
                    </p>
                  </div>

                  <div className="bg-void border border-steel/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-static mb-2">
                      How long does a typical engagement take?
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      The audit takes 90 seconds. The proposal takes 3-5 business
                      days. Implementation ranges from 1 week (Quick Fixes) to 8
                      weeks (Full System), depending on scope.
                    </p>
                  </div>

                  <div className="bg-void border border-steel/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-static mb-2">
                      What if my site is already good?
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      We&apos;ll tell you. Our audits are honest — we don&apos;t
                      inflate scores to sell work. If your site is performing
                      well, you get positive reinforcement and any minor
                      optimizations we notice, free of charge.
                    </p>
                  </div>

                  <div className="bg-void border border-steel/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-static mb-2">
                      What happens during the proposal phase?
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      We turn every audit finding into a concrete work item.
                      Each item includes what needs to change, why it matters,
                      and exactly what it costs. You choose what to build from
                      tiered options — no upsells, no hidden fees.
                    </p>
                  </div>
                </div>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Bottom CTA */}
      <AnimatedSection>
        <div className="bg-void">
          <Container>
            <Section className="py-20">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-static mb-4">
                  Ready to see your score?
                </h2>
                <p className="text-lg text-muted mb-8">
                  Enter your URL. We&apos;ll show you exactly what&apos;s
                  working and what isn&apos;t — in under two minutes.
                </p>
                <SiteAuditTool />
                <p className="text-sm text-muted mt-6">
                  No spam. No sales calls unless you ask. Full report with
                  targeted fixes and cost estimates included.
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Related pages */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-16">
              <div className="text-center">
                <p className="text-sm text-muted mb-4">
                  Want more detail on the methodology?
                </p>
                <Link
                  href="/methodology"
                  className="inline-flex items-center gap-2 text-signal hover:text-signal/80 font-medium transition-colors"
                >
                  Read the full methodology
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>
    </main>
  )
}
