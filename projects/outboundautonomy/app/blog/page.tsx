import { Container, Section, AnimatedSection } from "@/components/ui"
import { getBlogPosts } from "@/lib/blog-posts"
import SiteAuditTool from "@/components/site-audit/SiteAuditTool"
import Link from "next/link"

export const metadata = {
  title: "Blog — Website Audit Insights for Service Businesses | Outbound Autonomy",
  description:
    "Actionable articles on website audits, conversion optimization, local SEO, and lead generation for service businesses. No fluff. No filler.",
  openGraph: {
    title: "Blog — Website Audit Insights for Service Businesses | Outbound Autonomy",
    description:
      "Actionable articles on website audits, conversion optimization, local SEO, and lead generation for service businesses.",
    type: "website",
    url: "https://outboundautonomy.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Website Audit Insights for Service Businesses | Outbound Autonomy",
    description:
      "Actionable articles on website audits, conversion optimization, local SEO, and lead generation for service businesses.",
  },
}

export default function BlogIndex() {
  const posts = getBlogPosts()

  return (
    <main>
      {/* Hero */}
      <AnimatedSection>
        <div className="bg-gradient-to-b from-void to-depth">
          <Container>
            <Section className="py-24">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold text-static mb-6">
                  Website Audit Insights{' '}
                  <span className="text-signal">for Service Businesses</span>
                </h1>
                <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto">
                  Actionable guides on audits, conversion, local SEO, and lead
                  generation. Written for owners of HVAC, plumbing, roofing,
                  landscaping, and other service businesses.
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* Posts Grid */}
      <AnimatedSection>
        <div className="bg-depth">
          <Container>
            <Section className="py-16">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-void border border-steel rounded-xl p-6 hover:border-signal/30 transition-colors group"
                  >
                    <div className="flex flex-col h-full">
                      <span className="text-xs text-signal font-mono tracking-wider mb-3">
                        {post.cluster}
                      </span>
                      <h2 className="text-xl font-bold text-static mb-3 group-hover:text-signal transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                        <span>{post.wordCount.toLocaleString()} words</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>

      {/* CTA — URL Input */}
      <AnimatedSection>
        <div className="bg-void">
          <Container>
            <Section className="py-20">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-static mb-4">
                  See what your website is missing.{' '}
                  <span className="text-signal">Free.</span>
                </h2>
                <p className="text-lg text-muted mb-8">
                  Enter your URL. Get your audit. Every signal we write about — checked on your site.
                </p>
                <SiteAuditTool />
                <p className="text-sm text-muted mt-6">
                  No spam. No sales calls unless you ask. Full report in under 60 seconds.
                </p>
              </div>
            </Section>
          </Container>
        </div>
      </AnimatedSection>
    </main>
  )
}
