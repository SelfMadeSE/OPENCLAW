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
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">
                  Scope first. Then price.
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                  During pilot, engagement pricing is set after discovery and workflow mapping.
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
  title: 'Pricing — Outbound Autonomy',
  description: 'Pilot engagement pricing is scoped per workflow after discovery. No fixed SaaS tiers are published for the current offer model.',
  openGraph: {
    title: 'Pricing — Outbound Autonomy',
    description: 'Pilot engagement pricing is scoped per workflow after discovery. No fixed SaaS tiers are published for the current offer model.',
    type: 'website',
    url: 'https://outboundautonomy.com/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Outbound Autonomy',
    description: 'Pilot engagement pricing is scoped per workflow after discovery. No fixed SaaS tiers are published for the current offer model.',
  },
}
