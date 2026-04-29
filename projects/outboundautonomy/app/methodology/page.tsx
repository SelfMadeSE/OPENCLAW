import { Container, Section, AnimatedSection } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import {
  Palette,
  MousePointerClick,
  Gauge,
  Target,
  Search,
  Shield,
  Code2,
  BarChart3,
  Zap,
  ArrowRight,
  FileCheck,
  Layers,
} from 'lucide-react'
import SiteAuditTool from '@/components/site-audit/SiteAuditTool'
import Link from 'next/link'

export const metadata = {
  title: 'Methodology — How We Audit Websites | Outbound Autonomy',
  description:
    'Our audit methodology covers design scoring, conversion analysis, technical checks, and competitor benchmarking. Specific, actionable, honest.',
  openGraph: {
    title: 'Methodology — How We Audit Websites | Outbound Autonomy',
    description:
      'Four audit pillars: Design, Conversion, Technical, and Competitor Benchmarking. No vague reports — every finding comes with a fix.',
    type: 'website',
    url: 'https://outboundautonomy.com/methodology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Methodology — How We Audit Websites | Outbound Autonomy',
    description:
      'Four audit pillars with specific scoring criteria. Every finding is actionable.',
  },
}

const pillars = [
  {
    icon: Palette,
    title: 'Design Scoring',
    color: 'signal',
    description:
      'We evaluate visual quality, layout coherence, and brand consistency — not by opinion, but by measurable criteria.',
    criteria: [
      {
        label: 'Visual Hierarchy',
        detail: 'Does the page guide the eye to the most important element first? We check heading sizes, color contrast, and whitespace use.',
      },
      {
        label: 'Brand Consistency',
        detail: 'Are colors, typography, and imagery consistent across pages? Inconsistent branding erodes trust in under 50ms.',
      },
      {
        label: 'Mobile Responsiveness',
        detail: 'Does the layout adapt cleanly to phone, tablet, and desktop? Over 60% of service-business traffic is mobile.',
      },
      {
        label: 'Readability',
        detail: 'Are font sizes comfortable? Is line-height generous? Do text blocks stay under 75 characters per line?',
      },
      {
        label: 'Trust Signals',
        detail: 'Are testimonials, certifications, licenses, and reviews visible and verifiable?',
      },
    ],
  },
  {
    icon: MousePointerClick,
    title: 'Conversion Analysis',
    color: 'warm',
    description:
      'We map the path from landing to lead — every friction point, every dead end, every missing CTA.',
    criteria: [
      {
        label: 'CTA Placement & Clarity',
        detail: 'Is there a call-to-action above the fold? Is it specific ("Get a quote") or vague ("Learn more")? Every page needs a next step.',
      },
      {
        label: 'Form Design',
        detail: 'How many fields? Are they necessary? Every extra field reduces conversion. We check autofill support and mobile keyboard types.',
      },
      {
        label: 'Lead Capture Mechanics',
        detail: 'Phone numbers clickable? Contact forms working? Chat widgets functional? We test every lead path.',
      },
      {
        label: 'Page Speed Impact',
        detail: 'Conversion drops 7% per second of load time on mobile. We measure and prioritize speed fixes.',
      },
      {
        label: 'Social Proof Placement',
        detail: 'Are reviews and case results placed near CTAs? Social proof directly next to a form increases conversion rates measurably.',
      },
    ],
  },
  {
    icon: Code2,
    title: 'Technical Checks',
    color: 'signal',
    description:
      'Under the hood: meta tags, schema, Core Web Vitals, crawlability, and security. The stuff Google cares about and users feel.',
    criteria: [
      {
        label: 'Core Web Vitals',
        detail: 'LCP (loading), INP (interactivity), CLS (visual stability). We measure real metrics, not lab simulations.',
      },
      {
        label: 'SEO Foundation',
        detail: 'Title tags, meta descriptions, heading structure, alt text, canonical URLs, and robots.txt — the table stakes.',
      },
      {
        label: 'Schema & Structured Data',
        detail: 'Is your site sending rich data to Google? LocalBusiness, Service, FAQ, and Review schema help you stand out in SERPs.',
      },
      {
        label: 'HTTPS & Security',
        detail: 'SSL certificate valid? Mixed content warnings? Security headers present? A single warning can kill conversion.',
      },
      {
        label: 'Crawlability & Indexing',
        detail: 'Are important pages indexed? Are there orphan pages? Is the sitemap clean and submitted?',
      },
    ],
  },
  {
    icon: Target,
    title: 'Competitor Benchmarking',
    color: 'warm',
    description:
      'We compare your site against local competitors — what they do better, where they fall short, and exactly where you can win.',
    criteria: [
      {
        label: 'Local Competitor Analysis',
        detail: 'We identify 3-5 direct competitors in your market and service area. Not global SaaS companies — your actual local rivals.',
      },
      {
        label: 'Design Comparison',
        detail: 'Side-by-side evaluation: whose site looks more credible? Whose mobile experience is better? Screenshots included.',
      },
      {
        label: 'Conversion Feature Gap',
        detail: 'Do competitors have chat, booking, quote calculators, or instant callback? We flag features you are missing.',
      },
      {
        label: 'Content Depth',
        detail: 'Who answers customer questions better? We compare service pages, FAQ depth, and helpfulness.',
      },
      {
        label: 'Winnable Gaps',
        detail: 'We highlight the gaps where a modest investment creates a clear lead over your competitors — the highest-ROI moves.',
      },
    ],
  },
]

const scoringHow = [
  {
    icon: Layers,
    title: 'Per-Criterion Scoring',
    description:
      'Each criterion is scored 0-100. The pillar score is the weighted average of its criteria. The overall score is the weighted average of the four pillars.',
  },
  {
    icon: BarChart3,
    title: 'Letter Grades',
    description:
      'Scores translate to letter grades: A (90+), B (80-89), C (70-79), D (60-69), F (below 60). Each grade triggers specific, tiered recommendations.',
  },
  {
    icon: FileCheck,
    title: 'Actionable Findings',
    description:
      'Every finding includes: what the issue is, why it matters for your business, a specific fix, and an estimated effort level. No vague language.',
  },
  {
    icon: Shield,
    title: 'No Inflated Scores',
    description:
      'We do not manufacture problems to sell fixes. If a criterion is solid, it gets a high score. If your site is genuinely strong, we tell you.',
  },
]

const methodologySchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Website Audit Methodology',
  description:
    'Our methodology for auditing service business websites across four pillars: design, conversion, technical, and competitor benchmarking.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Design Scoring',
      text: 'Evaluate visual hierarchy, brand consistency, mobile responsiveness, readability, and trust signals.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Conversion Analysis',
      text: 'Map the lead path from landing to conversion, checking CTAs, forms, lead capture mechanics, and social proof placement.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Technical Checks',
      text: 'Audit Core Web Vitals, SEO foundation, structured data, HTTPS, and crawlability.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Competitor Benchmarking',
      text: 'Compare against 3-5 local competitors on design, conversion features, content depth, and winnable gaps.',
    },
  ],
}

export default function MethodologyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologySchema) }}
      />

      {/* Hero */}
      <AnimatedSection>
        <div className="bg-gradient-to-b from-void to-depth">
          <Container>
            <Section className="py-24">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal text-xs font-mono mb-6">
                  <Search className="h-3.5 w-3.5" aria-hidden="true" />
                  Audit Methodology
                </div>
                <h1 className="text-5xl font-bold text-static mb-6">
                  Four pillars.{' '}
                  <span className="text-signal">Twenty criteria.</span>{' '}
                  Zero guesswork.
                </h1>
                <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto">
                  Every website audit we run follows the same rigorous
                  methodology — design, conversion, technical, and competitor
                  scoring. No vague observations. Every finding is specific and
                  actionable.
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Pillars */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-static mb-4">
                  The four audit pillars
                </h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  Each pillar is scored independently, then combined into an
                  overall grade. Every criterion produces a specific finding
                  with a fix.
                </p>
              </div>

              <div className="max-w-5xl mx-auto space-y-12">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={pillar.title}
                      className="bg-void border border-steel/30 rounded-xl p-8 md:p-10"
                    >
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Pillar header */}
                        <div className="shrink-0 md:w-64">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`h-12 w-12 rounded-xl ${
                                pillar.color === 'signal'
                                  ? 'bg-signal/10 border-signal/20'
                                  : 'bg-warm/10 border-warm/20'
                              } border flex items-center justify-center`}
                            >
                              <Icon
                                className={`h-6 w-6 ${
                                  pillar.color === 'signal'
                                    ? 'text-signal'
                                    : 'text-warm'
                                }`}
                                aria-hidden="true"
                              />
                            </div>
                            <span className="text-xs text-muted font-mono">
                              Pillar {idx + 1}
                            </span>
                          </div>
                          <h2
                            className={`text-2xl font-bold ${
                              pillar.color === 'signal'
                                ? 'text-signal'
                                : 'text-warm'
                            } mb-2`}
                          >
                            {pillar.title}
                          </h2>
                          <p className="text-sm text-muted mb-4">
                            {pillar.description}
                          </p>
                        </div>

                        {/* Criteria */}
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-static uppercase tracking-wider mb-4">
                            What we check:
                          </p>
                          <div className="space-y-4">
                            {pillar.criteria.map((criterion) => (
                              <div
                                key={criterion.label}
                                className="border-l-2 border-steel/30 pl-4 hover:border-signal/50 transition-colors"
                              >
                                <h3 className="text-sm font-semibold text-static mb-1">
                                  {criterion.label}
                                </h3>
                                <p className="text-sm text-muted leading-relaxed">
                                  {criterion.detail}
                                </p>
                              </div>
                            ))}
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

      {/* How we score */}
      <AnimatedSection>
        <div className="bg-void">
          <Container>
            <Section className="py-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-static mb-4">
                  How we score
                </h2>
                <p className="text-lg text-muted max-w-xl mx-auto">
                  Transparent scoring so you know exactly what the numbers mean.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {scoringHow.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="bg-depth border border-steel/30 rounded-lg p-6 hover:border-signal/20 transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-lg bg-signal/10 border border-signal/20 flex items-center justify-center mb-4">
                        <Icon className="h-5 w-5 text-signal" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold text-static mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* What makes audits different */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-20">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-static mb-4">
                    What makes our audits different
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-void border border-steel/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-static mb-2">
                      No automated PDF generators
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Many audit tools run a generic scan and spit out the same
                      report for every site. Our system crawls your actual pages,
                      scores against specific criteria, and surfaces real issues —
                      not template placeholders.
                    </p>
                  </div>

                  <div className="bg-void border border-steel/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-static mb-2">
                      Competitor context included
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Most audits tell you about your site in isolation. We
                      compare you against local competitors because your score
                      means nothing without context. A B-grade site in a market
                      full of Ds is winning. A B-grade site surrounded by As has
                      work to do.
                    </p>
                  </div>

                  <div className="bg-void border border-steel/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-static mb-2">
                      Every finding maps to a fix
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      We do not leave you with &ldquo;improve your design
                      score.&rdquo; Every finding says: what is broken, why it
                      matters for revenue, what to change, and how much effort it
                      takes.
                    </p>
                  </div>

                  <div className="bg-void border border-steel/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-static mb-2">
                      Honest scores, honest recommendations
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      If your site is genuinely strong, we tell you — and we back
                      it up with data. If the fixes are minor, the proposal is
                      small. We do not manufacture urgency or inflate problem
                      lists.
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
                  See the methodology in action
                </h2>
                <p className="text-lg text-muted mb-8">
                  Enter your URL. In under two minutes, you will see exactly how
                  each pillar applies to your site — with real scores and
                  specific findings.
                </p>
                <SiteAuditTool />
                <p className="text-sm text-muted mt-6">
                  No account required. The preview is instant. Full report free
                  with email.
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
                  Want the step-by-step process?
                </p>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 text-signal hover:text-signal/80 font-medium transition-colors"
                >
                  See how it works from audit to build
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
