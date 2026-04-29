import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

const postTitles: Record<string, string> = {
  "4-signals-website-audit": "The 4 Signals That Matter in a Service Business Website Audit",
  "free-website-audit-what-it-checks": "What a Free Website Audit Actually Checks (And What Most Tools Miss)",
  "how-to-read-website-audit-score": "How to Read Your Website Audit Score (Design, Conversion, Technical Explained)",
  "service-business-website-leads": "Is Your Service Business Website Costing You Leads?",
  "website-leaking-leads-pillar": "Why Your Service Business Website Is Leaking Leads (And How to Plug It)",
  "cta-deep-dive": "One Button. Every Page. The CTA Fix That Changes Everything for Service Businesses.",
  "grande-prairie-local-seo-google-maps": "Why Your Grande Prairie Business Isn\'t Showing Up on Google Maps",
  "form-deep-dive": "The One Form Every Service Business Website Needs Above the Fold",
  "schema-markup-local-seo": "Using Schema Markup to Steal Local Search Traffic From Competitors",
  "local-seo-starter-kit": "Local SEO Starter Kit for HVAC, Plumbing & Electrical Contractors",
  "service-business-website-cost-2026": "How Much Should a Service Business Website Cost in 2026?",
  "automation-for-service-businesses": "Automation for Service Businesses — Forms, Follow-Up, and CRM",
  "from-audit-to-booking": "From Audit to Booking: The Full Service Business Workflow",
}

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
