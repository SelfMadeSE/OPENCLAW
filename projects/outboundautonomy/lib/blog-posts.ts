// Blog post metadata registry
// Each post maps to a slug and includes SEO metadata, publish date, cluster, and CTA variant.

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  cluster: string
  keywords: string[]
  ctaVariant: "A" | "B" | "C"
  wordCount: number
}

const posts: BlogPostMeta[] = [
  {
    slug: "4-signals-website-audit",
    title: "The 4 Signals That Matter in a Service Business Website Audit",
    description:
      "Most website audits are fluff. Here's what actually determines whether your site drives calls — or drives visitors away.",
    date: "2026-04-28",
    cluster: "Website Audit Methodology (Pillar)",
    keywords: ["website audit", "website analysis for small business", "website review service business", "how to audit a website"],
    ctaVariant: "B",
    wordCount: 1750,
  },
  {
    slug: "free-website-audit-what-it-checks",
    title: "What a Free Website Audit Actually Checks (And What Most Tools Miss)",
    description:
      "PageSpeed Insights won't tell you if your CTA is in the wrong place. Our audit covers all four signals — design, conversion, technical, and competitive gap.",
    date: "2026-04-28",
    cluster: "Website Audit Methodology",
    keywords: ["free website audit", "website checker", "website analysis tool", "conversion audit"],
    ctaVariant: "B",
    wordCount: 950,
  },
  {
    slug: "how-to-read-website-audit-score",
    title: "How to Read Your Website Audit Score (Design, Conversion, Technical Explained)",
    description:
      "You got your audit results. Now what? A plain-English guide to what each score means and which one matters most for your business.",
    date: "2026-04-29",
    cluster: "Website Audit Methodology",
    keywords: ["website audit report", "website score", "how to audit a website", "website health score"],
    ctaVariant: "C",
    wordCount: 1150,
  },
  {
    slug: "service-business-website-leads",
    title: "Is Your Service Business Website Costing You Leads?",
    description:
      "Most service business websites have the same 2-3 problems: no clear CTA, no lead form, and no local trust signals. A free audit finds these in under 2 minutes.",
    date: "2026-04-28",
    cluster: "Service Business Website Conversion",
    keywords: ["website audit for service businesses", "website not getting leads", "service business website issues", "local SEO for contractors"],
    ctaVariant: "A",
    wordCount: 1400,
  },
  {
    slug: "website-leaking-leads-pillar",
    title: "Why Your Service Business Website Is Leaking Leads (And How to Plug It)",
    description:
      "Three-quarters of service business websites share the same three conversion killers. A 90-second audit surfaces what's broken and what to fix first.",
    date: "2026-04-29",
    cluster: "Service Business Website Conversion (Pillar)",
    keywords: ["service business website", "leads from website", "HVAC website design", "plumber website", "website conversion rate"],
    ctaVariant: "B",
    wordCount: 1750,
  },
  {
    slug: "cta-deep-dive",
    title: "One Button. Every Page. The CTA Fix That Changes Everything for Service Businesses.",
    description:
      "Your website has seconds to capture a lead. One well-placed button on every page is the difference between a phone call and a bounce.",
    date: "2026-04-29",
    cluster: "Service Business Website Conversion",
    keywords: ["HVAC website design", "call to action service business", "book now button", "mobile CTA placement"],
    ctaVariant: "A",
    wordCount: 1200,
  },
  {
    slug: "grande-prairie-local-seo-google-maps",
    title: "Why Your Grande Prairie Business Isn't Showing Up on Google Maps (And How to Fix It)",
    description:
      "Google looks for specific signals that most local sites don't have. Here's what's probably missing — and exactly how to fix it.",
    date: "2026-04-28",
    cluster: "Local SEO for Trades",
    keywords: ["Grande Prairie web design", "Grande Prairie SEO", "Grande Prairie marketing", "local SEO for contractors"],
    ctaVariant: "B",
    wordCount: 1200,
  },
  {
    slug: "form-deep-dive",
    title: "The One Form Every Service Business Website Needs Above the Fold",
    description:
      "Four out of four service businesses we audited were missing a lead form on the homepage. Here's the 10-minute fix that captures 15–20% more leads.",
    date: "2026-04-29",
    cluster: "Service Business Website Conversion",
    keywords: ["website form", "lead capture website", "contact form service business", "form conversion rate"],
    ctaVariant: "A",
    wordCount: 1600,
  },
  {
    slug: "schema-markup-local-seo",
    title: "Using Schema Markup to Steal Local Search Traffic From Competitors",
    description:
      "Most service business websites don't have schema markup. Here's how adding LocalBusiness, Service, and Review structured data helps you outrank competitors in local search.",
    date: "2026-04-29",
    cluster: "Local SEO for Trades",
    keywords: ["schema markup", "LocalBusiness schema", "structured data local business", "local SEO for contractors"],
    ctaVariant: "B",
    wordCount: 2200,
  },
  {
    slug: "local-seo-starter-kit",
    title: "Local SEO Starter Kit for HVAC, Plumbing & Electrical Contractors",
    description:
      "Most service businesses lose local leads because Google can't figure out who they are, where they serve, or what they do. A complete starter kit covering GBP, schema, NAP, citations, and review strategy.",
    date: "2026-04-29",
    cluster: "Local SEO for Trades (Pillar)",
    keywords: ["local SEO for contractors", "local SEO for HVAC", "local SEO for plumbers", "local SEO for electricians", "Google Business Profile for trades"],
    ctaVariant: "A",
    wordCount: 1800,
  },
  {
    slug: "service-business-website-cost-2026",
    title: "How Much Should a Service Business Website Cost in 2026?",
    description:
      "Service business websites cost $0 to $15,000+. Here's how to know what you actually need before you spend anything — using a free audit. Audit-first scoping, flat pricing, priority sequencing.",
    date: "2026-04-29",
    cluster: "Business Case / ROI (Pillar)",
    keywords: ["service business website cost", "website redesign cost", "affordable website for contractors", "small business website pricing"],
    ctaVariant: "B",
    wordCount: 1700,
  },
  {
    slug: "automation-for-service-businesses",
    title: "Automation for Service Businesses — Forms, Follow-Up, and CRM",
    description:
      "Your website audit found a leak. The fix isn't a prettier page — it's automation that closes the gap between a lead filling out a form and a tech showing up. Three layers every service business needs.",
    date: "2026-04-29",
    cluster: "Business Case / ROI",
    keywords: ["service business automation", "automated follow-up contractors", "CRM for trades", "website form automation", "lead response time", "HVAC booking automation"],
    ctaVariant: "A",
    wordCount: 1200,
  },
  {
    slug: "from-audit-to-booking",
    title: "From Audit to Booking: The Full Service Business Workflow",
    description:
      "A website doesn't generate customers by itself. It's the first link in a chain — audit, fix, automate, track, book. Here's how that chain works from start to finish.",
    date: "2026-04-29",
    cluster: "Business Case / ROI (Capstone)",
    keywords: ["service business website workflow", "website audit to booking", "online booking for contractors", "service business lead generation system", "website to customer pipeline"],
    ctaVariant: "A",
    wordCount: 1600,
  },
  {
    slug: "denver-landscaping-website-audit-case-study",
    title: "What Our Website Audit Found at a Denver Landscaping Company",
    description:
      "The contact page returned a 404. No phone number was on the site. No form. The owner thought everything was fine. Here's what our four-signal audit actually revealed.",
    date: "2026-04-29",
    cluster: "Website Audit Methodology (Case Study)",
    keywords: ["website audit case study", "Denver landscaping website", "conversion audit", "service business website problems", "website audit real example"],
    ctaVariant: "C",
    wordCount: 1350,
  },
  {
    slug: "design-trust-signals-website-audit",
    title: "Design & Trust Signals: What Your Website Says Before Anyone Reads a Word",
    description:
      "Your website has three seconds to earn trust. Most service business sites fail the visual test before visitors see a single service. Here's what our audits check — and how to fix it.",
    date: "2026-04-29",
    cluster: "Website Audit Methodology",
    keywords: ["website design for service businesses", "website trust signals", "service business website credibility", "mobile design for trades"],
    ctaVariant: "B",
    wordCount: 1600,
  },
  {
    slug: "competitive-gap-website-audit",
    title: "Competitor Website Analysis for Service Businesses — The 4th Audit Signal",
    description:
      "Most service business owners never compare their website to competitors'. A competitive gap analysis reveals what's costing you leads — and what your competitors are doing better.",
    date: "2026-04-29",
    cluster: "Website Audit Methodology",
    keywords: ["competitor website analysis", "competitive gap analysis", "service business website comparison", "local SEO competitive audit"],
    ctaVariant: "C",
    wordCount: 1750,
  },
  {
    slug: "audio-website-audit-service-businesses",
    title: "Your Website Audit, Now in Audio: Listen to Your Lead Leaks",
    description: "We built the audio audit so you can hear exactly where your site is losing calls and new customers — without reading a single page. Free, narrated, 30 seconds.",
    date: "2026-04-29",
    cluster: "Website Audit Methodology (Pillar)",
    keywords: ["audio website audit", "website audit audio", "listen to website audit", "narrated website review"],
    ctaVariant: "B",
    wordCount: 1600,
  },
  {
    slug: "your-website-making-people-leave",
    title: "Your Website Is Making People Leave — Here's Proof",
    description:
      "Your website looks fine to you. But data shows the average service business site has 6–9 fixable issues costing leads every day. Here's the evidence — and the fix.",
    date: "2026-04-29",
    cluster: "Website Audit Methodology (Pillar)",
    keywords: ["website audit", "service business website issues", "website not getting leads", "website conversion problems", "website proof"],
    ctaVariant: "A",
    wordCount: 1750,
  },
  {
    slug: "3-plumbing-websites-1-scorecard",
    title: "3 Plumbing Websites, 1 Scorecard: What Our Audit Found",
    description: "Three plumbing companies. Different markets, different budgets, different builders. They all had the same three problems — and none of them knew.",
    date: "2026-04-29",
    cluster: "Website Audit Methodology",
    keywords: ["plumbing website audit", "plumber website review", "plumbing website design", "service business website problems"],
    ctaVariant: "C",
    wordCount: 1950,
  },
  {
    slug: "5-highest-impact-fixes-service-website",
    title: "The 5 Highest-Impact Fixes for Any Service Website (Ranked)",
    description: "From a 10-minute form addition to a 1-hour hero rewrite — ranked by effort and return. Most of these are free to implement.",
    date: "2026-04-29",
    cluster: "Website Audit Methodology",
    keywords: ["service website optimization", "website fixes for service businesses", "website conversion improvements", "service business website tips"],
    ctaVariant: "B",
    wordCount: 1950,
  },
]

export function getBlogPosts(): BlogPostMeta[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getBlogSlugs(): string[] {
  return posts.map((p) => p.slug)
}
