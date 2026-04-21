import { Container, Section } from '@/components/ui'
import { AIReceptionist } from '@/components/services/AIReceptionist'
import { WebDesign } from '@/components/services/WebDesign'
import { AppDevelopment } from '@/components/services/AppDevelopment'
import { AutomationMarketing } from '@/components/services/AutomationMarketing'

export default function Services() {
  return (
    <>
      
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">
                  Everything your business needs to run itself.
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                  One company. Every tool. Built for the bootstrapped.
                </p>
              </div>
            </Section>
          </Container>

          <div className="space-y-24 pb-24">
            <AIReceptionist />
            <WebDesign />
            <AppDevelopment />
            <AutomationMarketing />
          </div>
        </div>
      </main>
      
    </>
  )
}

export const metadata = {
  title: "Services — Outbound Autonomy",
  description: "AI Receptionist, custom web design, app development, and marketing automation. Built for small businesses. Sliding scale pricing from $250.",
  openGraph: {
    title: "Services — Outbound Autonomy",
    description: "AI Receptionist, custom web design, app development, and marketing automation. Built for small businesses. Sliding scale pricing from $250.",
    type: "website",
    url: "https://outboundautonomy.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Outbound Autonomy",
    description: "AI Receptionist, custom web design, app development, and marketing automation. Built for small businesses. Sliding scale pricing from $250.",
  },
}