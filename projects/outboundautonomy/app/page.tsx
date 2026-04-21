import { Hero, TrustBar, ServicesOverview, HowItWorks, SocialProof, PricingPreview, FinalCTA } from '@/components/home'
import { Container } from '@/components/ui/Container'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <Container>
        <HowItWorks />
      </Container>
      <SocialProof />
      <Container>
        <PricingPreview />
      </Container>
      <FinalCTA />
    </>
  )
}

export const metadata = {
  title: "Outbound Autonomy — AI Receptionist, Web Design & Automation",
  description: "AI-powered reception, web design, and automation for businesses that can't afford to miss a call. Plans from $299/mo. 14-day free trial.",
  openGraph: {
    title: "Outbound Autonomy — AI Receptionist, Web Design & Automation",
    description: "AI-powered reception, web design, and automation for businesses that can't afford to miss a call. Plans from $299/mo. 14-day free trial.",
    type: "website",
    url: "https://outboundautonomy.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outbound Autonomy — AI Receptionist, Web Design & Automation",
    description: "AI-powered reception, web design, and automation for businesses that can't afford to miss a call. Plans from $299/mo. 14-day free trial.",
  },
}
