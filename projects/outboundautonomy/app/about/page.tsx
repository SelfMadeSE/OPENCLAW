import { Container, Section } from '@/components/ui'

export default function About() {
  const values = [
    {
      title: "Reliability over novelty",
      description: "If it doesn't work consistently, it doesn't ship."
    },
    {
      title: "Honest pricing",
      description: "No bait-and-switch. No hidden fees. What you see is what you pay."
    },
    {
      title: "Built for the bootstrapped",
      description: "Every feature works for a 1-person team, not just enterprises with budgets."
    },
    {
      title: "No AI bullshit",
      description: "Our AI sounds professional and handles real business. If it can't, we tell you."
    }
  ]

  return (
    <>
      
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">
                  Built by people who missed calls too.
                </h1>
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-invert prose-lg">
                  <p className="text-lg text-muted leading-relaxed">
                    Outbound Autonomy started the way most businesses start — with a missed call that cost real money. 
                    A potential client called after hours, got voicemail, and hired someone else. That one missed call 
                    was worth $5,000.
                  </p>
                  
                  <p className="text-lg text-muted leading-relaxed mt-6">
                    We looked for a solution. Every option was either a glorified voicemail system, an expensive call 
                    center, or a chatbot that sounded like a chatbot. Nothing actually answered the phone like a 
                    competent human would.
                  </p>
                  
                  <p className="text-lg text-muted leading-relaxed mt-6">
                    So we built it ourselves.
                  </p>
                  
                  <p className="text-lg text-muted leading-relaxed mt-6">
                    The AI Receptionist was our first product — an autonomous system that answers calls, routes them 
                    correctly, books appointments, and never takes a day off. Then businesses started asking us to 
                    build their websites. Then automate their workflows. Then run their outreach.
                  </p>
                  
                  <p className="text-lg text-muted leading-relaxed mt-6">
                    One problem at a time, we became the autonomous operations layer for businesses that can't afford 
                    to miss anything.
                  </p>
                </div>
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-static mb-4">Our Values</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {values.map((value, index) => (
                  <div key={index} className="bg-depth rounded-lg border border-steel p-8">
                    <h3 className="text-xl font-bold text-signal mb-3">{value.title}</h3>
                    <p className="text-muted">{value.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="bg-depth rounded-lg border border-steel p-8 max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-static mb-4">Get in Touch</h3>
                <div className="space-y-2 text-muted">
                  <p>Email: owner@outboundautonomy.com</p>
                  <p>Phone: (570) 989-4873</p>
                </div>
              </div>
            </Section>
          </Container>
        </div>
      </main>
      
    </>
  )
}

export const metadata = {
  title: "About — Outbound Autonomy",
  description: "We build AI systems that answer calls, automate workflows, and design websites — so you can focus on growing your business.",
  openGraph: {
    title: "About — Outbound Autonomy",
    description: "We build AI systems that answer calls, automate workflows, and design websites — so you can focus on growing your business.",
    type: "website",
    url: "https://outboundautonomy.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Outbound Autonomy",
    description: "We build AI systems that answer calls, automate workflows, and design websites — so you can focus on growing your business.",
  },
}