import type { BlogPostMeta } from "@/lib/blog-posts"

interface ArticleJsonLdProps {
  post: BlogPostMeta
}

/**
 * Injects JSON-LD Article structured data for SEO.
 * Renders a <script type="application/ld+json"> tag.
 */
export default function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `https://outboundautonomy.com/og/blog/${post.slug}.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Outbound Autonomy",
      url: "https://outboundautonomy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Ecosystem Global Solutions",
      url: "https://outboundautonomy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://outboundautonomy.com/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://outboundautonomy.com/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
