import { Hero, TrustBar, ServicesOverview, HowItWorks, SocialProof, PricingPreview, FAQ, FinalCTA, homepageFaqs } from '@/components/home'
import { Container } from '@/components/ui/Container'
import SiteAuditTool from '@/components/site-audit/SiteAuditTool'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Outbound Autonomy',
  url: 'https://outboundautonomy.com',
  description:
    'Free website audit with design, conversion, technical, and lead-capture insights plus targeted fixes.',
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Website audit and implementation planning',
  name: 'Free Website Audit With Targeted Fixes',
  provider: {
    '@type': 'Organization',
    name: 'Outbound Autonomy',
    url: 'https://outboundautonomy.com',
  },
  areaServed: 'Worldwide',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    description: 'Read-only website audit preview before email capture.',
  },
  description:
    'Enter a URL to get a website audit with design, conversion, technical, and lead-capture insights, then map the first fixes to an implementation plan.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homepageFaqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <Container>
        <HowItWorks />
      </Container>
      <SocialProof />
      <SiteAuditTool />
      <Container>
        <PricingPreview />
      </Container>
      <FAQ />
      <FinalCTA />
    </>
  )
}

export const metadata = {
  title: "Outbound Autonomy — Free Website Audit With Targeted Fixes",
  description: "Enter your URL to get a website audit with design, conversion, and technical scoring, targeted fixes, and a proposal path for implementation.",
  openGraph: {
    title: "Outbound Autonomy — Free Website Audit With Targeted Fixes",
    description: "Enter your URL to get design, conversion, and technical scoring with targeted implementation recommendations.",
    type: "website",
    url: "https://outboundautonomy.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outbound Autonomy — Free Website Audit With Targeted Fixes",
    description: "Enter your URL to get a website audit with targeted fixes and an implementation plan.",
  },
}
