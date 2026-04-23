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
  description: "Premium websites with lead capture, automated booking, and AI-powered intake for service businesses. Get a free site audit today.",
  openGraph: {
    title: "Outbound Autonomy — Custom AI Systems for Service Businesses",
    description: "Premium websites with lead capture, automated booking, and AI-powered intake for service businesses.",
    type: "website",
    url: "https://outboundautonomy.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outbound Autonomy — Custom AI Systems for Service Businesses",
    description: "Premium websites with lead capture, automated booking, and AI-powered intake for service businesses.",
  },
}
