import { Container, Section, Button } from '@/components/ui'

export function AutomationMarketing() {
  const features = [
    "Email automation workflows",
    "Social media scheduling",
    "Lead generation funnels",
    "CRM integration",
    "Customer segmentation",
    "A/B testing",
    "Analytics & reporting",
    "Multi-channel campaigns",
    "Personalization",
    "ROI tracking",
    "Marketing automation setup",
    "Ongoing optimization"
  ]

  return (
    <Section id="automation" className="py-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-static mb-6">Automation & Marketing</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-static mb-3">What we automate:</h3>
              <ul className="grid grid-cols-1 gap-2 text-muted">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-static mb-3">Investment:</h3>
              <div className="space-y-4">
                <div className="bg-depth rounded-lg p-4 border border-steel">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-static">Setup</h4>
                    <span className="text-warm font-bold">$5,000-$20,000</span>
                  </div>
                  <p className="text-sm text-muted">
                    One-time setup of automation workflows, integrations, and strategy implementation.
                  </p>
                </div>
                <div className="bg-depth rounded-lg p-4 border border-steel">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-static">Monthly Retainer</h4>
                    <span className="text-warm font-bold">$2,000-$10,000/mo</span>
                  </div>
                  <p className="text-sm text-muted">
                    Ongoing campaign management, optimization, and reporting based on your needs.
                  </p>
                </div>
              </div>
            </div>

            <Button href="/contact">
              Book a Discovery Call →
            </Button>
          </div>

          <div className="bg-gradient-to-br from-signal/10 to-transparent p-8 rounded-lg">
            <div className="aspect-video bg-steel/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-signal rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <p className="text-static">Marketing Automation</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}