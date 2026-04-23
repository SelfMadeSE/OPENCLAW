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
  title: "Outbound Autonomy — Custom AI Systems for Service Businesses",
  description: "Closed pilot for custom AI workflow deployments. We scope first, build in your environment, and keep humans in control for edge cases.",
  openGraph: {
    title: "Outbound Autonomy — Custom AI Systems for Service Businesses",
    description: "Closed pilot for custom AI workflow deployments. We scope first, build in your environment, and keep humans in control for edge cases.",
    type: "website",
    url: "https://outboundautonomy.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outbound Autonomy — Custom AI Systems for Service Businesses",
    description: "Closed pilot for custom AI workflow deployments. We scope first, build in your environment, and keep humans in control for edge cases.",
  },
}
