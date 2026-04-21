import { Container, Section, Button } from '@/components/ui'

export function PricingTable() {
  const aiReceptionistPlans = [
    {
      name: "Standard",
      price: "$299/month",
      featured: true,
      features: [
        "24/7 AI call answering",
        "Natural conversation flow",
        "Appointment booking",
        "Call routing",
        "CRM integration",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      name: "Business",
      price: "$499/month",
      featured: false,
      features: [
        "Everything in Standard",
        "Multi-department routing",
        "Advanced analytics",
        "Custom integrations",
        "Priority support",
        "Performance reporting",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      featured: false,
      features: [
        "Everything in Business",
        "Unlimited calls",
        "Custom AI training",
        "White-label option",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom development"
      ]
    }
  ]

  return (
    <Section className="py-16">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-static mb-4">AI Receptionist Plans</h2>
          <p className="text-lg text-muted">Choose the plan that fits your business needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {aiReceptionistPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg border ${
                plan.featured 
                  ? 'border-signal bg-depth/50' 
                  : 'border-steel bg-depth'
              } p-8 relative`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-warm text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-static mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-warm mb-6">{plan.price}</div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="text-signal mt-1">•</span>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                href="/contact" 
                className={`w-full ${
                  plan.featured 
                    ? 'bg-signal hover:bg-signal/90' 
                    : 'bg-steel hover:bg-steel/80'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-static mb-8 text-center">Other Services</h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-depth rounded-lg border border-steel p-8">
              <h4 className="text-xl font-bold text-static mb-4">Web Design & Development</h4>
              <div className="space-y-3 mb-6">
                <p className="text-muted">Starter: <span className="text-warm font-semibold">$250</span></p>
                <p className="text-muted">Professional: <span className="text-warm font-semibold">$1,500</span></p>
                <p className="text-muted">Business: <span className="text-warm font-semibold">$5,000</span></p>
                <p className="text-muted">Enterprise: <span className="text-warm font-semibold">$15,000+</span></p>
              </div>
              <Button href="/contact" variant="secondary" className="w-full">
                Get Quote
              </Button>
            </div>

            <div className="bg-depth rounded-lg border border-steel p-8">
              <h4 className="text-xl font-bold text-static mb-4">Automation & Marketing</h4>
              <div className="space-y-3 mb-6">
                <p className="text-muted">Setup: <span className="text-warm font-semibold">$5,000-$20,000</span></p>
                <p className="text-muted">Monthly Retainer: <span className="text-warm font-semibold">$2,000-$10,000/mo</span></p>
              </div>
              <Button href="/contact" variant="secondary" className="w-full">
                Book Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}