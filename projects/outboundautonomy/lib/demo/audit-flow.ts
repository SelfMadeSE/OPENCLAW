export type AuditScores = {
  design: number
  conversion: number
  technical: number
}

export type AuditFinding = {
  category: 'design' | 'conversion' | 'technical'
  severity: 'critical' | 'high' | 'medium'
  title: string
  detail: string
}

export type AuditImplEstimate = {
  effort: 'low' | 'medium' | 'high'
  timeline: string
  estimatedRange: string
  proposalSummary: string
}

export type CompetitorAngle = {
  industry: string
  improvement: string
  result: string
}

export type AuditResult = {
  id: string
  url: string
  scores: AuditScores
  findings: AuditFinding[]
  competitorAngle: CompetitorAngle
  implementation: AuditImplEstimate
  createdAt: string
}

// Deterministic hash from URL so same URL always gets same mock result
function hashUrl(url: string): number {
  let hash = 5381
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) + hash + url.charCodeAt(i)) & 0xffffffff
  }
  return Math.abs(hash)
}

const findingPool: AuditFinding[] = [
  { category: 'design', severity: 'critical', title: 'Above-fold lacks clear value proposition', detail: 'Hero section uses generic stock imagery with no headline explaining what the business does within 3 seconds. Visitors bounce before scrolling.' },
  { category: 'design', severity: 'high', title: 'Broken navigation on mobile viewport', detail: 'Hamburger menu fails to expand on iOS Safari. Core pages (Services, Contact) are unreachable from mobile devices.' },
  { category: 'design', severity: 'medium', title: 'Inconsistent heading hierarchy', detail: 'Page uses h1 → h4 → h2 → h3 order across sections. Screen readers and SEO crawlers interpret a disjointed content structure.' },
  { category: 'design', severity: 'high', title: 'Color contrast ratios below WCAG AA', detail: 'Light gray text (#999) on white background scores 2.1:1 contrast. Body copy is illegible for low-vision users.' },
  { category: 'design', severity: 'medium', title: 'No visual trust signals above fold', detail: 'No logos, testimonials, certifications, or trust badges visible without scrolling. Social proof is buried in the footer.' },
  { category: 'conversion', severity: 'critical', title: 'No prominent primary CTA above the fold', detail: 'The hero section contains no button, link, or form to start an action. Visitors see the offer but have no way to engage.' },
  { category: 'conversion', severity: 'high', title: 'Contact form has no validation feedback', detail: 'Submitting an empty form shows no error state. Users type, click, see nothing happen, and assume the site is broken.' },
  { category: 'conversion', severity: 'high', title: 'No exit-intent or abandonment capture', detail: 'No popup, banner, or slide-in appears when cursor leaves the viewport. 70%+ of abandoning visitors leave without ever returning.' },
  { category: 'conversion', severity: 'critical', title: 'Multi-step form has no progress indicator', detail: 'The quote request form spans 4 steps with no steps bar. Users do not know how long the process takes and drop off at step 2.' },
  { category: 'conversion', severity: 'medium', title: 'Pricing page has no comparison table', detail: 'Three plan tiers are listed as text blocks. Visitors cannot compare features side-by-side, reducing purchase confidence.' },
  { category: 'conversion', severity: 'high', title: 'Testimonials lack attribution and photos', detail: '"Great service" with no name, company, or photo feels fabricated. Social proof without credibility signals devalues itself.' },
  { category: 'conversion', severity: 'medium', title: 'No urgency or scarcity signals anywhere', detail: 'No limited-time offers, availability indicators, or countdown timers. Nothing nudges visitors toward a decision.' },
  { category: 'technical', severity: 'critical', title: 'Largest Contentful Paint exceeds 4.2 seconds', detail: 'Hero image is unoptimized (4.8 MB WebP → actually serving PNG fallback). Above-the-fold paint is delayed past the attention threshold.' },
  { category: 'technical', severity: 'high', title: 'Missing meta description on key pages', detail: 'Services and About pages have no meta description. Search snippets show truncated URL fragments instead of compelling copy.' },
  { category: 'technical', severity: 'critical', title: 'JavaScript bundle includes unused polyfills', detail: 'Main.js ships full-core-js for IE11 support no traffic warrants. Bundle is 2.1 MB gzipped, adding 8+ seconds to interactive time.' },
  { category: 'technical', severity: 'high', title: 'No schema.org structured data', detail: 'No LocalBusiness, Product, or FAQ schema present. Rich search results (star ratings, FAQ dropdowns) are unavailable.' },
  { category: 'technical', severity: 'medium', title: 'Broken internal links on blog pages', detail: 'Three blog posts reference /resources/ URLs that return 404. Crawlers waste budget on dead paths.' },
  { category: 'technical', severity: 'high', title: 'No canonical tags on duplicate content pages', detail: 'WWW and non-WWW versions both serve identical content without a canonical. Search engines split ranking signals.' },
  { category: 'technical', severity: 'medium', title: 'Third-party scripts block main thread', detail: 'Google Analytics, Facebook Pixel, and Hotjar all load synchronously. Render-blocking scripts delay first paint by 1.8 seconds.' },
  { category: 'technical', severity: 'high', title: 'Missing alt text on 70% of images', detail: 'Of 23 images scanned, 16 have empty or missing alt attributes. Accessibility tools and image search are non-functional.' },
  { category: 'technical', severity: 'medium', title: 'No Open Graph or Twitter Card tags', detail: 'Links shared to social platforms show a bare URL with no preview image, title, or description. Share-through rate is near zero.' },
]

const competitorAngles: CompetitorAngle[] = [
  { industry: 'Home Services', improvement: 'Added estimate calculator + same-day booking CTA', result: '31% lead-to-booking conversion, 2.4x previous rate' },
  { industry: 'Medical Aesthetics', improvement: 'Replaced stock hero with before/after carousel + consult CTA', result: '58% bounce rate reduction, 22 more consults/month' },
  { industry: 'SaaS / B2B', improvement: 'Simplified 4-step demo request to inline email capture + calendar picker', result: 'Demo requests up 3.1x, form abandonment down from 71% to 22%' },
  { industry: 'E-commerce', improvement: 'Added dynamic urgency bars + exit-intent discount modal', result: 'Cart abandonment recovered 18%, average order value up 12%' },
  { industry: 'Professional Services', improvement: 'Replaced "Contact Us" button with "Book a Free 15-Min Strategy Call"', result: 'Consultation bookings increased 44% in 6 weeks' },
]

export function simulateAudit(url: string): AuditResult {
  const h = hashUrl(url)
  const id = `oa-audit-${Date.now().toString(36)}`
  const createdAt = new Date().toISOString()

  // Deterministic mock scores
  const scores: AuditScores = {
    design: 20 + (h % 40),
    conversion: 15 + ((h * 7) % 45),
    technical: 25 + ((h * 13) % 35),
  }

  // Pick 4-6 findings deterministically from the URL hash
  const findingCount = 4 + (h % 3)
  const selected: AuditFinding[] = []
  for (let i = 0; i < findingCount; i++) {
    selected.push(findingPool[(h + i * 17) % findingPool.length])
  }

  const competitor = competitorAngles[h % competitorAngles.length]

  // Estimate
  const avgScore = (scores.design + scores.conversion + scores.technical) / 3
  const effort: 'low' | 'medium' | 'high' = avgScore < 35 ? 'high' : avgScore < 55 ? 'medium' : 'low'
  const timelines: Record<string, string> = {
    low: '2-3 weeks',
    medium: '4-6 weeks',
    high: '6-10 weeks',
  }
  const ranges: Record<string, string> = {
    low: '$3,500 - $7,500',
    medium: '$7,500 - $15,000',
    high: '$18,000 - $32,000',
  }
  const summaries: Record<string, string> = {
    low: 'Tactical fixes and quick wins. Priority items can ship in two sprints with measurable conversion lift within 30 days.',
    medium: 'Mid-scope redesign and optimization. Addresses the critical conversion and technical issues with a phased rollout over 4-6 weeks.',
    high: 'Full site overhaul recommended. The audit surfaces foundational issues that require a re-architecture to close the gap with industry leaders.',
  }

  return {
    id,
    url,
    scores,
    findings: selected,
    competitorAngle: competitor,
    implementation: {
      effort,
      timeline: timelines[effort],
      estimatedRange: ranges[effort],
      proposalSummary: summaries[effort],
    },
    createdAt,
  }
}
