import { notFound } from "next/navigation"
import { getBlogPost, getBlogSlugs } from "@/lib/blog-posts"
import { Container, Section } from "@/components/ui"
import SiteAuditTool from "@/components/site-audit/SiteAuditTool"
import Link from "next/link"
import FourSignalsPost from "@/components/blog/FourSignalsPost"
import FreeAuditChecksPost from "@/components/blog/FreeAuditChecksPost"
import AuditScorePost from "@/components/blog/AuditScorePost"
import ServiceBusinessLeadsPost from "@/components/blog/ServiceBusinessLeadsPost"
import LeakingLeadsPillarPost from "@/components/blog/LeakingLeadsPillarPost"
import CTADeepDivePost from "@/components/blog/CTADeepDivePost"
import GrandePrairieSEOPost from "@/components/blog/GrandePrairieSEOPost"
import FormDeepDivePost from "@/components/blog/FormDeepDivePost"
import SchemaMarkupPost from "@/components/blog/SchemaMarkupPost"

// Map slug to component — each post gets its own rich component
const postComponents: Record<string, React.ComponentType> = {
  "4-signals-website-audit": FourSignalsPost,
  "free-website-audit-what-it-checks": FreeAuditChecksPost,
  "how-to-read-website-audit-score": AuditScorePost,
  "service-business-website-leads": ServiceBusinessLeadsPost,
  "website-leaking-leads-pillar": LeakingLeadsPillarPost,
  "cta-deep-dive": CTADeepDivePost,
  "grande-prairie-local-seo-google-maps": GrandePrairieSEOPost,
  "form-deep-dive": FormDeepDivePost,
  "schema-markup-local-seo": SchemaMarkupPost,
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) return { title: "Not Found" }
  return {
    title: `${post.title} | Outbound Autonomy Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Outbound Autonomy Blog`,
      description: post.description,
      type: "article",
      url: `https://outboundautonomy.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Outbound Autonomy Blog`,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const PostContent = postComponents[post.slug]

  const ctaMessages = {
    A: "Your audit shows exactly where your CTAs are missing. Enter your URL.",
    B: "Our audit checks all of these signals. Enter your URL and see your score.",
    C: "Not sure if your site has these issues? Enter your URL for a free scan.",
  }

  return (
    <main>
      <div className="bg-gradient-to-b from-void to-depth">
        <Container>
          <Section className="pt-24 pb-8">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <Link
                  href="/blog"
                  className="text-sm text-signal hover:underline"
                >
                  ← Back to Blog
                </Link>
              </nav>

              {/* Article header */}
              <span className="text-xs text-signal font-mono tracking-wider uppercase">
                {post.cluster}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-static mt-3 mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-muted mb-6">{post.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted border-b border-steel/30 pb-8">
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>·</span>
                <span>{post.wordCount.toLocaleString()} words</span>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* Article content */}
      <div className="bg-void">
        <Container>
          <Section className="py-12">
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-invert prose-lg max-w-none">
                {PostContent ? <PostContent /> : <p>Content coming soon.</p>}
              </article>
            </div>
          </Section>
        </Container>
      </div>

      {/* Bottom CTA */}
      <div className="bg-depth">
        <Container>
          <Section className="py-20">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-static mb-4">
                Ready to see your score?
              </h2>
              <p className="text-lg text-muted mb-8">
                {ctaMessages[post.ctaVariant] || ctaMessages.B}
              </p>
              <SiteAuditTool />
              <p className="text-sm text-muted mt-6">
                No spam. No sales calls unless you ask. Full report in under 60
                seconds.
              </p>
            </div>
          </Section>
        </Container>
      </div>
    </main>
  )
}
