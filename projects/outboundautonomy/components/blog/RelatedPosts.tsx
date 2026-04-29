import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog-posts"
import { getBlogPosts } from "@/lib/blog-posts"

interface RelatedPostsProps {
  currentSlug: string
  cluster: string
}

/**
 * Renders internal links using pillar-cluster architecture.
 * Every post links to its pillar + 2-3 related cluster posts.
 */
export default function RelatedPosts({ currentSlug, cluster }: RelatedPostsProps) {
  const allPosts = getBlogPosts()

  // Find the pillar for this cluster
  const isPillar = cluster.includes("(Pillar)")
  const isCapstone = cluster.includes("(Capstone)")
  const clusterBase = cluster
    .replace(/\s*\(Pillar\)\s*/, "")
    .replace(/\s*\(Capstone\)\s*/, "")
    .trim()

  // Get the pillar post (the one marked Pillar in this cluster)
  const pillarPost = allPosts.find(
    (p) => p.cluster.includes(clusterBase) && p.cluster.includes("(Pillar)") && p.slug !== currentSlug
  )

  // Get cluster sibling posts (same cluster, not current, not pillar)
  const clusterPosts = allPosts
    .filter(
      (p) =>
        p.cluster.startsWith(clusterBase) &&
        p.slug !== currentSlug &&
        !p.cluster.includes("(Pillar)") &&
        !p.cluster.includes("(Capstone)") &&
        p.slug !== pillarPost?.slug
    )
    .slice(0, 3)

  // If this IS the pillar, don't link to itself — but link to cluster children
  // If this is a cluster child, link to pillar + siblings

  const links: { label: string; posts: BlogPostMeta[] }[] = []

  if (!isPillar && pillarPost) {
    links.push({ label: "Read the pillar guide", posts: [pillarPost] })
  }

  if (clusterPosts.length > 0) {
    links.push({
      label: isPillar || isCapstone ? `More in ${clusterBase}` : `Related articles in ${clusterBase}`,
      posts: clusterPosts,
    })
  }

  // Also add a cross-cluster CTA link to the main pillar
  if (clusterBase !== "Website Audit Methodology" && !isCapstone) {
    const auditPillar = allPosts.find((p) => p.slug === "4-signals-website-audit")
    if (auditPillar && !links.some((l) => l.posts.some((p) => p.slug === auditPillar.slug))) {
      links.push({
        label: "Start with the fundamentals",
        posts: [auditPillar],
      })
    }
  }

  if (links.length === 0) return null

  return (
    <nav
      className="mt-16 pt-8 border-t border-steel/30"
      aria-label="Related articles"
    >
      <h2 className="text-lg font-semibold text-static mb-6">
        Continue reading
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((group) =>
          group.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-steel bg-depth/50 p-4 hover:border-signal/30 transition-colors group"
            >
              <span className="text-xs text-signal font-mono tracking-wider">
                {group.label}
              </span>
              <h3 className="text-sm font-semibold text-static mt-1 group-hover:text-signal transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted mt-1 line-clamp-2">
                {post.description}
              </p>
            </Link>
          ))
        )}
      </div>
    </nav>
  )
}
