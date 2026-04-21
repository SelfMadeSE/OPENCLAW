import { Container, Section, Button } from '@/components/ui'

export function WebDesign() {
  const features = [
    "Custom design tailored to your brand",
    "Mobile-first responsive design",
    "SEO optimized from day one",
    "Fast loading speeds",
    "Content management system",
    "Analytics integration",
    "Contact forms & lead capture",
    "Ongoing support & maintenance"
  ]

  const pricingTiers = [
    {
      name: "Starter",
      price: "$250",
      delivery: "3-5 days",
      includes: [
        "5-page website",
        "Custom design",
        "Mobile responsive",
        "Contact form",
        "Basic SEO"
      ]
    },
    {
      name: "Professional",
      price: "$1,500",
      delivery: "7-10 days",
      includes: [
        "10-page website",
        "Custom design & branding",
        "Advanced animations",
        "Blog functionality",
        "SEO optimization",
        "Analytics setup"
      ]
    },
    {
      name: "Business",
      price: "$5,000",
      delivery: "2-3 weeks",
      includes: [
        "15+ page website",
        "Custom branding package",
        "E-commerce integration",
        "Advanced features",
        "SEO strategy",
        "Content creation"
      ]
    },
    {
      name: "Enterprise",
      price: "$15,000+",
      delivery: "4-6 weeks",
      includes: [
        "Unlimited pages",
        "Custom web application",
        "Advanced integrations",
        "Custom APIs",
        "Enterprise features",
        "Priority support"
      ]
    }
  ]

  return (
    <Section id="web-design" className="py-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-static mb-6">Web Design & Development</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-static mb-3">Features:</h3>
              <ul className="grid grid-cols-1 gap-2 text-muted">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button href="/contact">
              Get a Quote →
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-static mb-4">Pricing Tiers:</h3>
            <div className="grid grid-cols-2 gap-4">
              {pricingTiers.map((tier, index) => (
                <div key={index} className="bg-depth rounded-lg p-4 border border-steel">
                  <h4 className="font-semibold text-static">{tier.name}</h4>
                  <p className="text-xl text-warm font-bold mb-2">{tier.price}</p>
                  <p className="text-sm text-muted mb-3">{tier.delivery}</p>
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
        </div>
      </Container>
    </Section>
  )
}