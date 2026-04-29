import { Container, Section, AnimatedSection } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import {
  Handshake,
  Percent,
  Users,
  FileCheck,
  BadgeCheck,
  Shield,
  Sparkles,
  BarChart3,
  ArrowRight,
  Layers,
  Send,
  Globe,
  MessageCircle,
} from 'lucide-react'
import SiteAuditTool from '@/components/site-audit/SiteAuditTool'
import Link from 'next/link'

export const metadata = {
  title: 'Partner & Referral Program — Outbound Autonomy',
  description:
    'Offer website audits to your clients under your own brand or earn 15% referral commissions. Free to join, flexible terms.',
  openGraph: {
    title: 'Partner & Referral Program | Outbound Autonomy',
    description:
      'White-label website audits, 15% referral commissions, and agency partnerships. Your brand, our analysis.',
    type: 'website',
    url: 'https://outboundautonomy.com/partners',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner & Referral Program — Outbound Autonomy',
    description:
      'White-label audits and referral commissions for agencies, freelancers, and business owners.',
  },
}

const tiers = [
  {
    icon: Globe,
    title: 'Free — Public Tool Access',
    color: 'signal',
    price: '$0',
    description: 'Use the free audit tool with unlimited scans.',
    features: [
      'Unlimited free website audits',
      'Instant design, conversion & technical scores',
      'Exportable report summaries',
      'No commitment required',
    ],
  },
  {
    icon: BadgeCheck,
    title: 'Referral Commission',
    color: 'warm',
    price: '15%',
    description: 'Send us clients. Earn on every closed project.',
    features: [
      '15% commission on every implementation project',
      'Paid within 14 days of project start',
      'Track referrals by unique URL',
      'No minimum or cap on commissions',
      'Projects range from $1,500–$15,000+',
    ],
    highlighted: true,
  },
  {
    icon: Sparkles,
    title: 'White-Label Partner',
    color: 'signal',
    price: 'Custom',
    description: 'Full white-label audits under your brand.',
    features: [
      'Branded audit landing page with your logo & colors',
      'White-label reports your clients see as your product',
      'We never contact your clients directly',
      'Custom pricing per partner arrangement',
      'Implementation handled by our team',
    ],
  },
]

const steps = [
  {
    icon: Send,
    title: 'Share your link',
    description:
      'We give you a unique audit link — either your referral URL or a branded partner page. Send it to your clients or contacts.',
  },
  {
    icon: BarChart3,
    title: 'They run a free audit',
    description:
      'Your client enters their URL and gets an instant scored report. No cost, no obligation, no account required.',
  },
  {
    icon: FileCheck,
    title: 'Review findings together',
    description:
      'Use the scored breakdown to identify what is working and what needs fixing. The audit does the diagnosis — you guide the conversation.',
  },
  {
    icon: Handshake,
    title: 'Choose your path',
    description:
      'For referrals: send the client to us and earn 15%. For white-label: we build under your brand. Either way, the client gets what they need.',
  },
]

const faqs = [
  {
    q: 'What does the partner program cost to join?',
    a: 'Zero. The free tier gives you unlimited access to the public audit tool. White-label and commission tiers activate when you have a client ready.',
  },
  {
    q: 'How does white-label work exactly?',
    a: 'We set up a branded audit landing page with your logo and colors. Your client runs the audit, sees your brand, and the report feels like your product. We never contact your client directly — your relationship stays intact.',
  },
  {
    q: 'How much commission do you pay?',
    a: '15% of the total implementation project value. If the project is $5,000, your commission is $750. Paid within 14 days of project start.',
  },
  {
    q: 'Do I need to be a web designer or agency?',
    a: 'No. The referral program is open to anyone — fellow business owners, freelancers, or anyone who knows a business with a weak website. White-label partnerships are designed for agencies and consultancies.',
  },
  {
    q: 'What if the audit shows nothing wrong?',
    a: 'That is fine. Some sites are genuinely solid. The audit confirms it, and your client trusts you more for running the check honestly.',
  },
  {
    q: 'Do you require exclusivity?',
    a: 'No. Partner with us alongside any other tools or vendors you use. No lock-in.',
  },
]

const partnerSchema = {
  '@context': 'https://schema.org',
  '@type': 'BusinessProgram',
  name: 'Outbound Autonomy Partner Program',
  description:
    'White-label website audits and referral commission program for agencies, freelancers, and business owners.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CAD',
    description: 'Free to join. 15% referral commission on implementation projects.',
  },
}

export default function PartnersPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerSchema) }}
      />

      {/* Hero */}
      <AnimatedSection>
        <div className="bg-gradient-to-b from-void to-depth">
          <Container>
            <Section className="py-24">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal text-xs font-mono mb-6">
                  <Handshake className="h-3.5 w-3.5" aria-hidden="true" />
                  Partner & Referral Program
                </div>
                <h1 className="text-5xl font-bold text-static mb-6">
                  Offer audits to your clients.{' '}
                  <span className="text-signal">We handle the work.</span>
                </h1>
                <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto">
                  White-label audit reports. Performance scoring. Implementation
                  options. Your brand, your client relationship, your referral
                  commission.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  <Button href="mailto:owner@outboundautonomy.com?subject=Partner%20program">
                    Get partner access
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Button>
                  <Button href="mailto:owner@outboundautonomy.com?subject=Referral%20program" variant="secondary">
                    Get your referral link
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Partner Tiers */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-static mb-4">
                  Three ways to partner
                </h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  From unlimited free audits to full white-label partnerships.
                  Pick the path that fits your business.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {tiers.map((tier) => {
                  const Icon = tier.icon
                  return (
                    <div
                      key={tier.title}
                      className={`relative rounded-xl border p-8 transition-all duration-300 ${
                        tier.highlighted
                          ? 'bg-void border-warm/40 shadow-[0_0_20px_rgba(234,163,89,0.08)] hover:border-warm/60'
                          : 'bg-void border-steel/30 hover:border-steel/50'
                      }`}
                    >
                      {tier.highlighted && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warm text-void text-xs font-semibold px-4 py-1 rounded-full">
                          Most popular
                        </div>
                      )}
                      <div
                        className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-5 ${
                          tier.color === 'signal'
                            ? 'bg-signal/10 border-signal/20'
                            : 'bg-warm/10 border-warm/20'
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 ${
                            tier.color === 'signal' ? 'text-signal' : 'text-warm'
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-static mb-1">
                        {tier.title}
                      </h3>
                      <p className="text-3xl font-bold mb-2">
                        <span className={tier.color === 'signal' ? 'text-signal' : 'text-warm'}>
                          {tier.price}
                        </span>
                      </p>
                      <p className="text-sm text-muted mb-6">{tier.description}</p>
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                            <BadgeCheck className="h-4 w-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection>
        <div className="bg-void">
          <Container>
            <Section className="py-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-static mb-4">
                  How it works
                </h2>
                <p className="text-lg text-muted max-w-xl mx-auto">
                  From first link to closed project — the partner flow is
                  straightforward.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {steps.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="relative">
                      {/* Step number */}
                      <div className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-signal/10 border border-signal/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-signal">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="bg-depth border border-steel/30 rounded-lg p-6 pt-8 mt-3">
                        <Icon className="h-6 w-6 text-signal mb-3" aria-hidden="true" />
                        <h3 className="text-lg font-semibold text-static mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-3 text-steel">
                          <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Testimonial / Social proof placeholder */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-20">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm/10 border border-warm/20 text-warm text-xs font-mono mb-6">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  From our partners
                </div>
                <blockquote className="text-2xl text-static italic leading-relaxed mb-6">
                  &ldquo;I was spending hours doing manual website reviews for
                  clients. Now I send them a link, the audit does the talking,
                  and I earn commission when they move forward.&rdquo;
                </blockquote>
                <p className="text-sm text-muted">
                  — Agency partner, Grande Prairie AB
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection>
        <div className="bg-void">
          <Container>
            <Section className="py-20">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-static mb-4">
                    Partner program FAQ
                  </h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <details
                      key={faq.q}
                      className="group bg-depth border border-steel/30 rounded-lg overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer text-static font-medium hover:bg-steel/10 transition-colors">
                        {faq.q}
                        <span className="text-signal text-xl leading-none group-open:rotate-180 transition-transform">
                          ▾
                        </span>
                      </summary>
                      <div className="px-5 pb-5 text-sm text-muted leading-relaxed border-t border-steel/20 pt-4">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-20">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-static mb-4">
                  Ready to offer audits to your clients?
                </h2>
                <p className="text-lg text-muted mb-8">
                  Free to join. No exclusivity. Start with whichever tier fits
                  your business.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button href="mailto:owner@outboundautonomy.com?subject=Partner%20program">
                    Get partner access
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Button>
                  <Button href="mailto:owner@outboundautonomy.com?subject=Referral%20program" variant="secondary">
                    Get your referral link
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Button>
                </div>
                <p className="text-sm text-muted mt-6">
                  Questions? Email{' '}
                  <a
                    href="mailto:owner@outboundautonomy.com"
                    className="text-signal hover:text-signal/80"
                  >
                    owner@outboundautonomy.com
                  </a>
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Related pages */}
      <AnimatedSection>
        <div className="bg-void">
          <Container>
            <Section className="py-16">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted">Not a partner? See how the audit works first:</p>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 text-signal hover:text-signal/80 font-medium transition-colors"
                >
                  How it works from audit to build
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
