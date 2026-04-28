import { Container, Section } from '@/components/ui'
import { PricingTable } from '@/components/pricing/PricingTable'
import { PricingFAQ } from '@/components/pricing/PricingFAQ'

export default function Pricing() {
  return (
    <>
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold text-static mb-6">
                  Transparent pricing based on{' '}
                  <span className="text-signal">what the audit finds</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                  Your free audit scores your site on design, conversion, and technical health. Your score determines
                  the scope you need — and the scope determines the price. No mystery, no hidden tiers.
                </p>
              </div>
            </Section>
          </Container>

          <div className="space-y-16 pb-24">
            <PricingTable />
            <PricingFAQ />
          </div>
        </div>
      </main>
    </>
  )
}

export const metadata = {
  title: 'Pricing — Audit-Led | Outbound Autonomy',
  description:
    'Pricing is based on what your free website audit finds. Score determines scope. Scope determines price. Quick Fixes, Lead Machine, or Full System — starting at $1,500.',
  openGraph: {
    title: 'Pricing — Audit-Led | Outbound Autonomy',
    description:
      'Pricing is based on what your free website audit finds. Score determines scope. Scope determines price.',
    type: 'website',
    url: 'https://outboundautonomy.com/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Audit-Led | Outbound Autonomy',
    description:
      'Pricing is based on what your free website audit finds. Score determines scope. Scope determines price.',
  },
}
