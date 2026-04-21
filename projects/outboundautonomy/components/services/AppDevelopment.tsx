import { Container, Section, Button } from '@/components/ui'

export function AppDevelopment() {
  const features = [
    "Native iOS & Android apps",
    "Cross-platform React Native",
    "Web applications",
    "API development & integration",
    "Database design & architecture",
    "User authentication & security",
    "Real-time features",
    "Scalable infrastructure",
    "Cloud deployment",
    "Performance optimization",
    "Testing & QA",
    "Maintenance & support"
  ]

  const pricing = [
    {
      name: "MVP",
      price: "$5,000",
      description: "Minimum viable product with core features",
      includes: [
        "Native app for one platform",
        "Core functionality",
        "Basic UI/UX design",
        "App store submission",
        "Basic analytics"
      ]
    },
    {
      name: "Full Product",
      price: "$15,000-$50,000",
      description: "Complete application with advanced features",
      includes: [
        "Cross-platform development",
        "Advanced features",
        "Professional UI/UX",
        "Backend integration",
        "Advanced analytics",
        "Maintenance plan"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Large-scale applications with enterprise needs",
      includes: [
        "Custom architecture",
        "Enterprise integrations",
        "Advanced security",
        "Scalability planning",
        "Dedicated team",
        "Priority support"
      ]
    }
  ]

  return (
    <Section id="app-development" className="py-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-static mb-6">App Development</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-static mb-3">What we build:</h3>
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
              <h3 className="text-lg font-semibold text-static mb-3">Pricing:</h3>
              <div className="space-y-4">
                {pricing.map((tier, index) => (
                  <div key={index} className="bg-depth rounded-lg p-4 border border-steel">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-static">{tier.name}</h4>
                      <span className="text-warm font-bold">{tier.price}</span>
                    </div>
                    <p className="text-sm text-muted mb-3">{tier.description}</p>
                    <ul className="text-sm text-muted space-y-1">
                      {tier.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-1">
                          <span className="text-signal text-xs mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <Button href="/contact">
              Discuss Your Project →
            </Button>
          </div>

          <div className="bg-gradient-to-br from-signal/10 to-transparent p-8 rounded-lg">
            <div className="aspect-square bg-steel/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-signal rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <p className="text-static">Custom App Development</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}