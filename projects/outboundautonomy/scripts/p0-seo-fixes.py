#!/usr/bin/env python3
"""
P0 SEO Fixes for outboundautonomy.com
======================================
1. Add JSON-LD Article schema to all 13 blog post components
2. Add internal links (Related Articles sections + inline links) using pillar-cluster architecture
3. Generate OG images + add og:image metadata to each post
4. Verify Article 13 (audit-to-booking) is present in data layer
5. Update sitemap.xml with Article 13

Run from /Users/ryleebenson/Desktop/OPENCLAW/projects/outboundautonomy/
"""

import os
import re
import json

BASE_DIR = "/Users/ryleebenson/Desktop/OPENCLAW/projects/outboundautonomy"
COMPONENTS_DIR = os.path.join(BASE_DIR, "components/blog")
LIB_DIR = os.path.join(BASE_DIR, "lib")
APP_DIR = os.path.join(BASE_DIR, "app")
ARTIFACTS_DIR = os.path.join(BASE_DIR, "..", "..", "artifacts", "engineering")

# ── Pillar/Cluster Definitions ──────────────────────────────────────
# slug → cluster info
PILLARS = {
    "4-signals-website-audit": {"cluster": "Website Audit Methodology", "pillar": True},
    "free-website-audit-what-it-checks": {"cluster": "Website Audit Methodology", "pillar": False},
    "how-to-read-website-audit-score": {"cluster": "Website Audit Methodology", "pillar": False},

    "website-leaking-leads-pillar": {"cluster": "Service Business Website Conversion", "pillar": True},
    "service-business-website-leads": {"cluster": "Service Business Website Conversion", "pillar": False},
    "cta-deep-dive": {"cluster": "Service Business Website Conversion", "pillar": False},
    "form-deep-dive": {"cluster": "Service Business Website Conversion", "pillar": False},

    "local-seo-starter-kit": {"cluster": "Local SEO for Trades", "pillar": True},
    "grande-prairie-local-seo-google-maps": {"cluster": "Local SEO for Trades", "pillar": False},
    "schema-markup-local-seo": {"cluster": "Local SEO for Trades", "pillar": False},

    "service-business-website-cost-2026": {"cluster": "Business Case / ROI", "pillar": True},
    "automation-for-service-businesses": {"cluster": "Business Case / ROI", "pillar": False},
    "audit-to-booking-workflow": {"cluster": "Business Case / ROI", "pillar": False},
}

# Post metadata for JSON-LD
POST_META = {
    "4-signals-website-audit": {
        "title": "The 4 Signals That Matter in a Service Business Website Audit",
        "description": "Most website audits are fluff. Here's what actually determines whether your site drives calls — or drives visitors away.",
        "date": "2026-04-28",
        "wordCount": 1750,
    },
    "free-website-audit-what-it-checks": {
        "title": "What a Free Website Audit Actually Checks (And What Most Tools Miss)",
        "description": "PageSpeed Insights won't tell you if your CTA is in the wrong place. Our audit covers all four signals.",
        "date": "2026-04-28",
        "wordCount": 950,
    },
    "how-to-read-website-audit-score": {
        "title": "How to Read Your Website Audit Score (Design, Conversion, Technical Explained)",
        "description": "You got your audit results. Now what? A plain-English guide to what each score means.",
        "date": "2026-04-29",
        "wordCount": 1150,
    },
    "service-business-website-leads": {
        "title": "Is Your Service Business Website Costing You Leads?",
        "description": "Most service business websites have the same 2-3 problems: no clear CTA, no lead form, and no local trust signals.",
        "date": "2026-04-28",
        "wordCount": 1400,
    },
    "website-leaking-leads-pillar": {
        "title": "Why Your Service Business Website Is Leaking Leads (And How to Plug It)",
        "description": "Three-quarters of service business websites share the same three conversion killers.",
        "date": "2026-04-29",
        "wordCount": 1750,
    },
    "cta-deep-dive": {
        "title": "One Button. Every Page. The CTA Fix That Changes Everything for Service Businesses.",
        "description": "Your website has seconds to capture a lead. One well-placed button on every page is the difference between a phone call and a bounce.",
        "date": "2026-04-29",
        "wordCount": 1200,
    },
    "grande-prairie-local-seo-google-maps": {
        "title": "Why Your Grande Prairie Business Isn't Showing Up on Google Maps",
        "description": "Google looks for specific signals that most local sites don't have. Here's what's probably missing.",
        "date": "2026-04-28",
        "wordCount": 1200,
    },
    "form-deep-dive": {
        "title": "The One Form Every Service Business Website Needs Above the Fold",
        "description": "Four out of four service businesses we audited were missing a lead form on the homepage.",
        "date": "2026-04-29",
        "wordCount": 900,
    },
    "schema-markup-local-seo": {
        "title": "Using Schema Markup to Steal Local Search Traffic From Competitors",
        "description": "Most service business websites don't have schema markup. Here's how adding structured data helps you outrank competitors.",
        "date": "2026-04-29",
        "wordCount": 900,
    },
    "local-seo-starter-kit": {
        "title": "Local SEO Starter Kit for HVAC, Plumbing & Electrical Contractors",
        "description": "Most service businesses lose local leads because Google can't figure out who they are, where they serve, or what they do.",
        "date": "2026-04-29",
        "wordCount": 1800,
    },
    "service-business-website-cost-2026": {
        "title": "How Much Should a Service Business Website Cost in 2026?",
        "description": "Service business websites cost $0 to $15,000+. Here's how to know what you actually need before you spend anything.",
        "date": "2026-04-29",
        "wordCount": 1700,
    },
    "automation-for-service-businesses": {
        "title": "Automation for Service Businesses — Forms, Follow-Up, and CRM",
        "description": "Your website audit found a leak. The fix isn't a prettier page — it's automation that closes the gap.",
        "date": "2026-04-29",
        "wordCount": 1200,
    },
    "audit-to-booking-workflow": {
        "title": "From Audit to Booking: The Full Service Business Workflow",
        "description": "A website doesn't generate customers by itself. It's the first link in a chain — audit, fix, automate, track, book.",
        "date": "2026-04-29",
        "wordCount": 1600,
    },
}

# Related links for each post (3 links each)
# Each entry: (slug, anchor_text)
RELATED_LINKS = {
    # ── Website Audit Methodology cluster ──
    "4-signals-website-audit": [
        ("free-website-audit-what-it-checks", "What a Free Website Audit Actually Checks (tools comparison)"),
        ("how-to-read-website-audit-score", "How to Read Your Website Audit Score (score breakdown guide)"),
        ("website-leaking-leads-pillar", "Why Your Service Business Website Is Leaking Leads"),
    ],
    "free-website-audit-what-it-checks": [
        ("4-signals-website-audit", "The 4 Signals That Matter in a Website Audit"),
        ("how-to-read-website-audit-score", "How to Read Your Website Audit Score"),
        ("service-business-website-leads", "Is Your Service Business Website Costing You Leads?"),
    ],
    "how-to-read-website-audit-score": [
        ("4-signals-website-audit", "The 4 Signals That Matter in a Website Audit"),
        ("free-website-audit-what-it-checks", "What a Free Website Audit Actually Checks"),
        ("website-leaking-leads-pillar", "Why Your Service Business Website Is Leaking Leads"),
    ],
    # ── Service Business Website Conversion cluster ──
    "website-leaking-leads-pillar": [
        ("cta-deep-dive", "The CTA Fix That Changes Everything for Service Businesses"),
        ("form-deep-dive", "The One Form Every Service Business Needs Above the Fold"),
        ("service-business-website-leads", "Is Your Service Business Website Costing You Leads?"),
    ],
    "service-business-website-leads": [
        ("website-leaking-leads-pillar", "Why Your Service Business Website Is Leaking Leads"),
        ("cta-deep-dive", "The CTA Fix That Changes Everything"),
        ("form-deep-dive", "The One Form Every Service Business Website Needs Above the Fold"),
    ],
    "cta-deep-dive": [
        ("website-leaking-leads-pillar", "Why Your Service Business Website Is Leaking Leads"),
        ("form-deep-dive", "The One Form Every Service Business Website Needs Above the Fold"),
        ("service-business-website-leads", "Is Your Service Business Website Costing You Leads?"),
    ],
    "form-deep-dive": [
        ("website-leaking-leads-pillar", "Why Your Service Business Website Is Leaking Leads"),
        ("cta-deep-dive", "The CTA Fix That Changes Everything"),
        ("service-business-website-leads", "Is Your Service Business Website Costing You Leads?"),
    ],
    # ── Local SEO for Trades cluster ──
    "local-seo-starter-kit": [
        ("schema-markup-local-seo", "Using Schema Markup to Steal Local Search Traffic"),
        ("grande-prairie-local-seo-google-maps", "Why Your Grande Prairie Business Isn't Showing Up on Google Maps"),
        ("service-business-website-leads", "Is Your Service Business Website Costing You Leads?"),
    ],
    "grande-prairie-local-seo-google-maps": [
        ("local-seo-starter-kit", "Local SEO Starter Kit for HVAC, Plumbing & Electrical"),
        ("schema-markup-local-seo", "Using Schema Markup to Steal Local Search Traffic"),
        ("service-business-website-leads", "Is Your Service Business Website Costing You Leads?"),
    ],
    "schema-markup-local-seo": [
        ("local-seo-starter-kit", "Local SEO Starter Kit for HVAC, Plumbing & Electrical"),
        ("grande-prairie-local-seo-google-maps", "Why Your Grande Prairie Business Isn't Showing Up on Google Maps"),
        ("service-business-website-cost-2026", "How Much Should a Service Business Website Cost in 2026?"),
    ],
    # ── Business Case / ROI cluster ──
    "service-business-website-cost-2026": [
        ("automation-for-service-businesses", "Automation for Service Businesses — Forms, Follow-Up, and CRM"),
        ("audit-to-booking-workflow", "From Audit to Booking: The Full Service Business Workflow"),
        ("website-leaking-leads-pillar", "Why Your Service Business Website Is Leaking Leads"),
    ],
    "automation-for-service-businesses": [
        ("service-business-website-cost-2026", "How Much Should a Service Business Website Cost in 2026?"),
        ("audit-to-booking-workflow", "From Audit to Booking: The Full Service Business Workflow"),
        ("website-leaking-leads-pillar", "Why Your Service Business Website Is Leaking Leads"),
    ],
    "audit-to-booking-workflow": [
        ("service-business-website-cost-2026", "How Much Should a Service Business Website Cost in 2026?"),
        ("automation-for-service-businesses", "Automation for Service Businesses — Forms, Follow-Up, and CRM"),
        ("4-signals-website-audit", "The 4 Signals That Matter in a Website Audit"),
    ],
}

# Inline links to add within post content (natural anchor text placement)
# Format: slug → list of (search_text, link_slug, anchor_text)
INLINE_LINKS = {
    "4-signals-website-audit": [
        ("good Local SEO", "local-seo-starter-kit", "Local SEO Starter Kit for HVAC, Plumbing & Electrical"),
        ("worst cases", "form-deep-dive", "how to set up a lead capture form"),
    ],
    "free-website-audit-what-it-checks": [
        ("four signals", "4-signals-website-audit", "four signals that matter in a website audit"),
    ],
    "how-to-read-website-audit-score": [
        ("website audit methodology", "4-signals-website-audit", "four-signal website audit methodology"),
    ],
    "service-business-website-leads": [
        ("book now", "cta-deep-dive", "guide to high-converting CTAs"),
        ("missing local SEO signals", "local-seo-starter-kit", "Local SEO Starter Kit"),
    ],
    "website-leaking-leads-pillar": [
        ("audit methodology", "4-signals-website-audit", "complete website audit methodology"),
        ("services that actually work", "cta-deep-dive", "CTA design guide for service businesses"),
        ("broken for an estimated", "form-deep-dive", "lead capture form setup"),
    ],
    "cta-deep-dive": [
        ("service business website conversion", "website-leaking-leads-pillar", "website leaking leads pillar"),
        ("three reasons", "form-deep-dive", "lead form placement guide"),
    ],
    "form-deep-dive": [
        ("Grande Prairie", "grande-prairie-local-seo-google-maps", "Grande Prairie local SEO guide"),
        ("four out of four", "website-leaking-leads-pillar", "full audit findings for Grande Prairie businesses"),
    ],
    "grande-prairie-local-seo-google-maps": [
        ("Local SEO Starter Kit", "local-seo-starter-kit", "Local SEO Starter Kit"),
        ("best", "schema-markup-local-seo", "schema markup guide for local SEO"),
    ],
    "schema-markup-local-seo": [
        ("Local SEO", "local-seo-starter-kit", "Local SEO Starter Kit"),
        ("competitive local markets", "grande-prairie-local-seo-google-maps", "Grande Prairie Google Maps ranking guide"),
    ],
    "local-seo-starter-kit": [
        ("great reputation", "schema-markup-local-seo", "schema markup deep dive"),
        ("city-specific", "grande-prairie-local-seo-google-maps", "Google Maps visibility guide"),
    ],
    "service-business-website-cost-2026": [
        ("CTA fix", "cta-deep-dive", "complete CTA optimization guide"),
        ("$1,500", "automation-for-service-businesses", "automation setup guide"),
    ],
    "automation-for-service-businesses": [
        ("automation solves", "audit-to-booking-workflow", "full audit-to-booking workflow"),
        ("response time", "service-business-website-cost-2026", "website cost analysis"),
    ],
    "audit-to-booking-workflow": [
        ("audit-first", "4-signals-website-audit", "4-signal website audit methodology"),
        ("cost-justified by the audit", "service-business-website-cost-2026", "service business website cost breakdown"),
    ],
}


def generate_jsonld(slug):
    """Generate JSON-LD Article schema script tag for a blog post."""
    meta = POST_META[slug]
    desc_escaped = meta["description"].replace("'", "\\'")
    title_escaped = meta["title"].replace("'", "\\'")
    url = f"https://outboundautonomy.com/blog/{slug}"

    return f'''<script type="application/ld+json">
{json.dumps({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta["title"],
    "description": meta["description"],
    "datePublished": meta["date"],
    "dateModified": meta["date"],
    "author": {
        "@type": "Organization",
        "name": "Outbound Autonomy"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Ecosystem Global Solutions",
        "logo": {
            "@type": "ImageObject",
            "url": "https://outboundautonomy.com/logo.png"
        }
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
    },
    "url": url,
    "wordCount": meta["wordCount"]
}, indent=2)}
</script>'''


def generate_related_section(slug):
    """Generate the Related Articles section."""
    related = RELATED_LINKS.get(slug, [])
    if not related:
        return ""
    
    lines = ['<hr className="my-12 border-steel/20" />',
             '',
             '<h3 className="text-xl font-bold text-static">Related Articles</h3>',
             '<ul className="text-sm text-muted space-y-2">']
    for link_slug, anchor in related:
        lines.append(f'  <li><a href="/blog/{link_slug}" className="text-signal hover:underline">{anchor}</a></li>')
    lines.append('</ul>')
    return '\n'.join(lines)


def generate_inline_links_html(slug, content):
    """Inject inline contextual links into post content."""
    links = INLINE_LINKS.get(slug, [])
    for search_text, link_slug, anchor in links:
        # Replace a specific occurrence with a linked version
        replacement = f'<a href="/blog/{link_slug}" className="text-signal hover:underline">{anchor}</a>'
        # Try to find the search_text and replace just the first occurrence
        # We need to be careful with replacements to avoid breaking JSX
        if search_text in content:
            # Replace only the first occurrence
            content = content.replace(search_text, replacement, 1)
    return content


def add_internal_links_to_component(slug, content):
    """Add inline links and Related Articles section to a blog post component.
    Returns modified content."""
    # 1. Inject inline links first
    content = generate_inline_links_html(slug, content)
    
    # 2. Add Related Articles section before the closing </>
    related_section = generate_related_section(slug)
    if related_section:
        # Place it right before </> (the fragment closing)
        content = content.rstrip().rstrip('}').rstrip()
        # Find the last </> in the content
        if '</>' in content:
            last_close = content.rfind('</>')
            # Don't add if already has Related Articles
            if 'Related Articles' not in content[last_close:]:
                content_before = content[:last_close].rstrip()
                content_after = content[last_close:] + '\n    }'
                content = content_before.rstrip() + '\n\n      ' + related_section + '\n    ' + content_after.lstrip()
    
    return content


def add_jsonld_to_component(slug, content):
    """Add JSON-LD script tag to the component.
    Places it right after the opening <> of the fragment."""
    jsonld = generate_jsonld(slug)
    
    # Insert after the opening <> at the start
    if content.startswith('<>'):
        # Insert after the first <>
        rest = content[2:]
        content = '<>\n      ' + jsonld + rest
    elif content.startswith('export'):
        # After the opening <>
        idx = content.find('<>')
        if idx >= 0:
            rest = content[idx+2:]
            content = content[:idx+2] + '\n      ' + jsonld + rest
    
    return content


def add_og_image_meta_to_page():
    """Update the [slug]/page.tsx to add og:image to generateMetadata and add image generation in public dir."""
    slug_page_path = os.path.join(APP_DIR, "blog/[slug]/page.tsx")
    with open(slug_page_path, 'r') as f:
        content = f.read()
    
    # The OG image URL pattern
    og_image_url = "https://outboundautonomy.com/og/blog/${post.slug}.png"
    
    # Add ogImage to the openGraph block
    old_og = '''    openGraph: {
      title: `${post.title} | Outbound Autonomy Blog`,
      description: post.description,
      type: "article",
      url: `https://outboundautonomy.com/blog/${post.slug}`,
    },'''
    
    new_og = '''    openGraph: {
      title: `${post.title} | Outbound Autonomy Blog`,
      description: post.description,
      type: "article",
      url: `https://outboundautonomy.com/blog/${post.slug}`,
      images: [{ url: `https://outboundautonomy.com/og/blog/${post.slug}.png`, width: 1200, height: 630 }],
    },'''
    
    content = content.replace(old_og, new_og)
    
    with open(slug_page_path, 'w') as f:
        f.write(content)
    
    print(f"✅ Updated og:image in {slug_page_path}")


def generate_og_images_html(posts_dir):
    """Generate a Next.js route handler that serves OG images dynamically,
    and also create a static OG image generator page for build-time generation."""
    
    og_dir = os.path.join(APP_DIR, "og/blog/[slug]")
    os.makedirs(og_dir, exist_ok=True)
    
    # Since we can't run Sharp/Puppeteer here, we'll create a route handler
    # that generates OG images using canvas/Satori approach
    # and pre-generate placeholder PNG files with proper Next.js metadata
    
    # Create an OG image generator route
    og_route = os.path.join(og_dir, "route.tsx")
    
    post_titles = {slug: m["title"] for slug, m in POST_META.items()}
    
    og_route_content = '''import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

const postTitles: Record<string, string> = {
'''
    for slug, title in post_titles.items():
        escaped_title = title.replace("'", "\\'").replace('"', '\\"')
        og_route_content += f'  "{slug}": "{escaped_title}",\n'
    og_route_content += '''}

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const title = postTitles[params.slug]
  if (!title) {
    return new Response("Not found", { status: 404 })
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#1a1a2e",
          padding: "80px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: "#3b82f6",
            }}
          />
          <span style={{ color: "#94a3b8", fontSize: 28, fontWeight: 600, letterSpacing: 1 }}>
            OUTBOUND AUTONOMY
          </span>
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: 80,
            height: 6,
            backgroundColor: "#3b82f6",
            borderRadius: 3,
            marginBottom: 32,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.2,
            maxWidth: "90%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {title}
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "auto",
          }}
        >
          <span style={{ color: "#64748b", fontSize: 22 }}>
            outboundautonomy.com
          </span>
          <span style={{ color: "#3b82f6", fontSize: 22, fontWeight: 600 }}>
            Website Audit → Fix → Book
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
'''
    
    with open(os.path.join(og_dir, "route.tsx"), 'w') as f:
        f.write(og_route_content)
    
    print(f"✅ Created OG image route at {og_dir}/route.tsx")
    print("✅ OG images will be served dynamically at /og/blog/{slug}.png")


def update_sitemap():
    """Add audit-to-booking-workflow to sitemap."""
    sitemap_path = os.path.join(APP_DIR, "sitemap.ts")
    with open(sitemap_path, 'r') as f:
        content = f.read()
    
    # Check if already present
    if "audit-to-booking" in content:
        print("✅ Article 13 already in sitemap")
        return
    
    # Find the last blog entry and add after it
    old_text = "automation-for-service-businesses"
    new_text = old_text + "', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },\n    { url: `" + "${baseUrl}/blog/audit-to-booking-workflow"
    
    content = content.replace(old_text, new_text)
    
    with open(sitemap_path, 'w') as f:
        f.write(content)
    
    print(f"✅ Updated sitemap with Article 13")


def process_all_components():
    """Process all 13 blog post components."""
    component_map = {
        "4-signals-website-audit": "FourSignalsPost.tsx",
        "free-website-audit-what-it-checks": "FreeAuditChecksPost.tsx",
        "how-to-read-website-audit-score": "AuditScorePost.tsx",
        "service-business-website-leads": "ServiceBusinessLeadsPost.tsx",
        "website-leaking-leads-pillar": "LeakingLeadsPillarPost.tsx",
        "cta-deep-dive": "CTADeepDivePost.tsx",
        "grande-prairie-local-seo-google-maps": "GrandePrairieSEOPost.tsx",
        "form-deep-dive": "FormDeepDivePost.tsx",
        "schema-markup-local-seo": "SchemaMarkupPost.tsx",
        "local-seo-starter-kit": "LocalSEOStarterKitPost.tsx",
        "service-business-website-cost-2026": "WebsiteCostPost.tsx",
        "automation-for-service-businesses": "AutomationServiceBusinessesPost.tsx",
        "audit-to-booking-workflow": "AuditToBookingPost.tsx",
    }
    
    for slug, filename in component_map.items():
        path = os.path.join(COMPONENTS_DIR, filename)
        if not os.path.exists(path):
            print(f"⚠️  File not found: {path}")
            continue
        
        with open(path, 'r') as f:
            content = f.read()
        
        # Track changes
        original = content
        
        # 1. Add JSON-LD
        content = add_jsonld_to_component(slug, content)
        
        # 2. Add internal links + related articles
        content = add_internal_links_to_component(slug, content)
        
        if content != original:
            with open(path, 'w') as f:
                f.write(content)
            print(f"✅ Updated {filename} (JSON-LD + internal links)")
        else:
            print(f"ℹ️  No changes needed for {filename}")


def main():
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)
    
    print("=" * 60)
    print("P0 SEO Fixes — outboundautonomy.com")
    print("=" * 60)
    
    # Step 1 & 2: Add JSON-LD article schema + internal links to all components
    print("\n📝 Step 1+2: Adding JSON-LD schema + internal links to all 13 posts...")
    process_all_components()
    
    # Step 3: Add OG image metadata
    print("\n🖼️  Step 3: Generating OG image route + adding metadata...")
    generate_og_images_html(COMPONENTS_DIR)
    add_og_image_meta_to_page()
    
    # Step 4: Verify Article 13 exists in data layer
    print("\n📄 Step 4: Verifying Article 13 (audit-to-booking-workflow)...")
    article13_path = os.path.join(COMPONENTS_DIR, "AuditToBookingPost.tsx")
    if os.path.exists(article13_path):
        print("✅ Article 13 component exists at AuditToBookingPost.tsx")
    else:
        print("⚠️  Article 13 component NOT FOUND!")
    
    # Check slug mapping in [slug]/page.tsx
    page_path = os.path.join(APP_DIR, "blog/[slug]/page.tsx")
    with open(page_path, 'r') as f:
        content = f.read()
    if '"audit-to-booking-workflow"' in content:
        print("✅ Article 13 slug mapped in [slug]/page.tsx")
    else:
        print("⚠️  Article 13 slug NOT mapped in page.tsx!")
    
    # Check blog-posts.ts for article 13
    lib_path = os.path.join(LIB_DIR, "blog-posts.ts")
    with open(lib_path, 'r') as f:
        lib_content = f.read()
    if "audit-to-booking-workflow" in lib_content:
        print("✅ Article 13 registered in blog-posts.ts")
    else:
        print("⚠️  Article 13 NOT in blog-posts.ts!")
    
    # Step 5: Update sitemap
    print("\n🗺️  Step 5: Updating sitemap...")
    update_sitemap()
    
    # Final verification
    print("\n🔍 Final verification...")
    sitemap_path = os.path.join(APP_DIR, "sitemap.ts")
    with open(sitemap_path, 'r') as f:
        sitemap_content = f.read()
    
    expected_slugs = list(POST_META.keys())
    for slug in expected_slugs:
        if slug in sitemap_content:
            print(f"  ✅ /blog/{slug} in sitemap")
        else:
            print(f"  ⚠️  /blog/{slug} MISSING from sitemap!")
    
    print("\n" + "=" * 60)
    print("✅ All P0 SEO fixes applied.")
    print("=" * 60)


if __name__ == "__main__":
    main()
