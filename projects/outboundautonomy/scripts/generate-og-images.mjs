/**
 * Generates branded OG images (1200x630) for all blog posts.
 * Uses sharp for image composition with text overlay.
 * Output: public/og/blog/<slug>.png
 */
import sharp from "sharp"
import { writeFileSync, mkdirSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, "..")
const ogDir = join(projectRoot, "public", "og", "blog")

// Blog post data matching lib/blog-posts.ts
const posts = [
  {
    slug: "4-signals-website-audit",
    title: "The 4 Signals That Matter in a Service Business Website Audit",
    cluster: "Website Audit Methodology",
  },
  {
    slug: "free-website-audit-what-it-checks",
    title: "What a Free Website Audit Actually Checks (And What Most Tools Miss)",
    cluster: "Website Audit Methodology",
  },
  {
    slug: "how-to-read-website-audit-score",
    title: "How to Read Your Website Audit Score (Design, Conversion, Technical)",
    cluster: "Website Audit Methodology",
  },
  {
    slug: "service-business-website-leads",
    title: "Is Your Service Business Website Costing You Leads?",
    cluster: "Service Business Website Conversion",
  },
  {
    slug: "website-leaking-leads-pillar",
    title: "Why Your Service Business Website Is Leaking Leads (And How to Plug It)",
    cluster: "Service Business Website Conversion",
  },
  {
    slug: "cta-deep-dive",
    title: "One Button. Every Page. The CTA Fix That Changes Everything",
    cluster: "Service Business Website Conversion",
  },
  {
    slug: "grande-prairie-local-seo-google-maps",
    title: "Why Your Grande Prairie Business Isn't Showing Up on Google Maps",
    cluster: "Local SEO for Trades",
  },
  {
    slug: "form-deep-dive",
    title: "The One Form Every Service Business Website Needs Above the Fold",
    cluster: "Service Business Website Conversion",
  },
  {
    slug: "schema-markup-local-seo",
    title: "Using Schema Markup to Steal Local Search Traffic From Competitors",
    cluster: "Local SEO for Trades",
  },
  {
    slug: "local-seo-starter-kit",
    title: "Local SEO Starter Kit for HVAC, Plumbing & Electrical Contractors",
    cluster: "Local SEO for Trades",
  },
  {
    slug: "service-business-website-cost-2026",
    title: "How Much Should a Service Business Website Cost in 2026?",
    cluster: "Business Case / ROI",
  },
  {
    slug: "automation-for-service-businesses",
    title: "Automation for Service Businesses — Forms, Follow-Up, and CRM",
    cluster: "Business Case / ROI",
  },
  {
    slug: "audit-to-booking-workflow",
    title: "From Audit to Booking: The Full Service Business Workflow",
    cluster: "Business Case / ROI",
  },
]

const W = 1200
const H = 630
const BRAND_COLOR = "#00E5FF" // signal cyan
const BG_COLOR = "#0A0A0A" // void
const TEXT_COLOR = "#FFFFFF" // static
const MUTED_COLOR = "#94A3B8" // muted
const ACCENT_GLOW = "rgba(0, 229, 255, 0.15)"

function wrapText(text, maxCharsPerLine) {
  const words = text.split(" ")
  const lines = []
  let current = ""
  for (const word of words) {
    if ((current + " " + word).trim().length <= maxCharsPerLine) {
      current = (current + " " + word).trim()
    } else {
      if (current) lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

function xmlEscape(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

async function generateOGImage(post) {
  const safeCluster = xmlEscape(post.cluster)
  const titleLines = wrapText(xmlEscape(post.title), 40)

  // Create SVG with text and branding
  const svgText = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0A0A0A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#00E5FF;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00B8D4;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${W}" height="${H}" fill="url(#bg)" />

      <!-- Glow accent top-right -->
      <circle cx="${W - 100}" cy="150" r="250" fill="${ACCENT_GLOW}" opacity="0.6" />

      <!-- Top bar accent line -->
      <rect x="60" y="40" width="200" height="3" rx="2" fill="url(#accent)" />

      <!-- Logo text -->
      <text x="60" y="75" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="${BRAND_COLOR}" filter="url(#glow)">Outbound Autonomy</text>

      <!-- Cluster tag -->
      <text x="60" y="105" font-family="Arial, sans-serif" font-size="12" font-weight="600" fill="${BRAND_COLOR}" opacity="0.8" letter-spacing="2">${safeCluster.toUpperCase()}</text>

      <!-- Title text -->
      ${titleLines
        .map((line, i) => {
          const y = 170 + i * 58
          const fontSize = titleLines.length <= 2 ? 44 : titleLines.length === 3 ? 38 : 32
          return `<text x="60" y="${y}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="${TEXT_COLOR}" letter-spacing="-0.5">${line}</text>`
        })
        .join("\n")}

      <!-- Divider -->
      <rect x="60" y="${170 + titleLines.length * 58 + 20}" width="80" height="2" rx="1" fill="${BRAND_COLOR}" opacity="0.5" />

      <!-- CTA text -->
      <text x="60" y="${H - 50}" font-family="Arial, sans-serif" font-size="16" fill="${MUTED_COLOR}">outboundautonomy.com/blog</text>

      <!-- Bottom accent bar -->
      <rect x="60" y="${H - 35}" width="${W - 120}" height="1" fill="${BRAND_COLOR}" opacity="0.15" />
    </svg>
  `

  const pngBuffer = await sharp(Buffer.from(svgText)).png().toBuffer()
  const outPath = join(ogDir, `${post.slug}.png`)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, pngBuffer)
  console.log(`  ✅ ${post.slug}.png (${pngBuffer.length} bytes)`)
}

async function main() {
  console.log(`Generating ${posts.length} OG images → ${ogDir}\n`)
  for (const post of posts) {
    await generateOGImage(post)
  }
  console.log(`\n✅ All ${posts.length} OG images generated.`)
}

main().catch((err) => {
  console.error("❌ OG image generation failed:", err)
  process.exit(1)
})
