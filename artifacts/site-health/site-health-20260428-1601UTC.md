# Site Health Report — outboundautonomy.com

**Timestamp:** 2026-04-28 16:01 UTC (Tuesday, April 28, 10:01 AM MT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Previous report:** site-health-20260428-1530UTC.md (31 min prior)

---

## 1. Live Site Response ✅

| Check | Result |
|-------|--------|
| Homepage | **200 OK** (~338ms) |
| SSL/TLS | **Valid** — expires Jul 21 2026 (84 days) |
| Platform | Vercel (Next.js) |
| DNS | Resolves correctly |
| Meta description | Present: "Enter your URL to get a website audit with design, conversion, and technical scoring, targeted fixes, and a proposal path for implementation." |
| Structured data | Schema.org WebSite + Service + FAQPage all present |

## 2. robots.txt ✅

**200 OK** — served correctly:
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /demo/
Sitemap: https://outboundautonomy.com/sitemap.xml
```
- `/api/` correctly disallowed for crawlers (POST endpoint)
- `/demo/` disallowed; note: `/demo` is not a real page path (maps to `/sample-report`)

## 3. sitemap.xml ✅

**200 OK** — 12 URLs, all lastmod 2026-04-28T14:06:58.579Z:

| # | URL | Priority | Change Freq |
|---|-----|----------|-------------|
| 1 | `/` | 1.0 | weekly |
| 2 | `/services` | 0.9 | monthly |
| 3 | `/pricing` | 0.8 | monthly |
| 4 | `/contact` | 0.8 | monthly |
| 5 | `/sample-report` | 0.8 | monthly |
| 6 | `/try` | 0.7 | monthly |
| 7 | `/case-studies` | 0.7 | monthly |
| 8 | `/faq` | 0.7 | monthly |
| 9 | `/about` | 0.6 | monthly |
| 10 | `/privacy` | 0.3 | yearly |
| 11 | `/terms` | 0.3 | yearly |
| 12 | `/cookies` | 0.2 | yearly |

**All 12 URLs verified** — each returns 200 OK.

## 4. URL Audit Input (Homepage Form) ✅

- Form exists at `/#audit` section with URL text input + "Generate Free Audit" button
- No email field on the form — true preview-first funnel
- Client-side React submit → POSTs to `/api/audit`
- Extra "Add business/access details" toggle available for gated-page context
- Works on all major page views

## 5. /api/audit (POST) ✅

| Check | Result |
|-------|--------|
| GET request | **405 Method Not Allowed** (expected — POST only) |
| POST (URL only) | **200 OK** — full JSON audit returned |
| POST (URL + email) | **200 OK** — identical full JSON returned |
| Response time | ~60–70ms |
| Response structure | `sourceUrl`, `finalUrl`, `fetchedAt`, `responseMs`, `designScore`, `conversionScore`, `technicalScore`, `overallScore`, `grade`, `scorecard`, `observedSignals`, `issues`, `recommendations`, `referenceExamples`, `crawlSummary`, `lighthouse`, `screenshot`, `accessReview`, `implementationEstimate`, `competitiveGap`, `disclaimer` |
| Sample audit score | example.com: 69/100 (Grade D) |
| Issues returned | 5 issues (2 high, 2 medium, 1 low) |
| Recommendations | 3 tiers with pricing ($1.5k–$15k+) |

### ⚠️ Email Capture Path — Blocked/Observation

The API accepts an `email` field in the POST body, but **returns identical data** with or without it. There is no visible email gate at the API level — the full audit including implementation pricing, crawl summary, and competitive gap analysis is returned regardless.

The homepage FAQ states email is only required for "the saved version and implementation sequence" which suggests:
1. The email is captured client-side after the audit renders (not server-gated)
2. Or the email-gating logic hasn't been implemented yet
3. Either way — currently no data is hidden behind email submission

**Label: verified — no API-level email gate exists yet**

## 6. Read-Only Report Output ✅

| Check | URL | Result |
|-------|-----|--------|
| Example audit preview | `/try` | **200 OK** — shows Peak HVAC & Plumbing mock audit with 4 findings |
| Sample report | `/sample-report` | **200 OK** — shows example-hvac-service.com audit (58/100, Grade F) |
| Both are preview-first | Both | No email needed to view full content |

## 7. All Sitemap Pages Verified ✅

| Page | HTTP | Notes |
|------|------|-------|
| `/` | 200 | Homepage with audit form |
| `/services` | 200 | Service descriptions mapped to audit scores |
| `/pricing` | 200 | Three lanes (see observation below) |
| `/contact` | 200 | Email: owner@outboundautonomy.com |
| `/sample-report` | 200 | Full sample audit report |
| `/try` | 200 | Interactive audit preview (Peak HVAC example) |
| `/case-studies` | 200 | Empty placeholder — "As deployments complete, this section will show what was built" |
| `/faq` | 200 | FAQ page |
| `/about` | 200 | Operating principles |
| `/privacy` | 200 | Privacy policy |
| `/terms` | 200 | Terms of service |
| `/cookies` | 200 | Cookie policy |

## 8. Proposal CTA Paths ✅

Multiple proposal CTAs work and lead to `/contact` with intent parameters:

| CTA Text | Link | Status |
|----------|------|--------|
| "Book a discovery call" | `/contact?intent=discovery` | ✅ Functional |
| "Generate free audit" | `/#audit` (form) | ✅ Functional |
| "Get Started" (nav) | `/contact` | ✅ Functional |
| "Request proposal →" | `/contact?intent=audit` | ✅ Functional |
| "Plan implementation →" | `/contact?intent=automation` | ✅ Functional |
| "Apply for a pilot slot" | `/contact?intent=pilot-lane-1` | ✅ Functional |
| "Tell us what you repeat" | `/contact?intent=workflow` | ✅ Functional |
| "Tell us your constraints" | `/contact?intent=architecture` | ✅ Functional |

## 9. Recent Site Artifact State

- **All files timestamped** 2026-04-28 (today)
- **Last modified** timestamps in sitemap: 2026-04-28T14:06:58.579Z
- **Build ID**: `3qA32NQfP54bzjrjxuj8X`
- **Site code changed** between 2026-04-27 and 2026-04-28 (build ID changes across reports)
- **Appears stable** — no broken pages, no 404s, no redirect changes

## 10. Blockers & Observations

### ⚠️ Google Lighthouse / PageSpeed Quota Exceeded

**Status: Blocked (temporary)**
```
"Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service
'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'."
```
- Lighthouse data is unavailable in audit responses
- Screenshots also unavailable (they depend on PageSpeed)
- Daily quota resets at midnight PT
- The API correctly surfaces this as `"lighthouse.available": false` and note: "Run the full implementation review with a dedicated browser worker"
- **Not a site defect** — this is a Google API rate limit issue on the OA project

### ⚠️ Pricing Page Content — Scope Drift Risk

**Status: Observation — not a technical defect**

The mission document (outbound-autonomy-mission.md) explicitly states:
> "❌ A 'custom AI systems' generalist"
> "❌ A SaaS competitive intelligence tool"
> "If it's not website audit → fix → build, it's not Outbound Autonomy."

However, `/pricing` offers:

**Lane 2 — Custom AI Workflow Builds:**
- "Workflow discovery session before build"
- "Custom automation deployed in your stack"
- "Examples: inbox triage, approval routing, reporting automation"
- "Escalation logic for human judgment points"

**Lane 3 — Private AI Operating Systems:**
- "Local-model deployment inside your environment"
- "Internal knowledge and compliance agents"
- "Reduced external API dependency for sensitive operations"
- "Designed for audit and oversight requirements"

These lanes describe services the mission document says OA is NOT. If the mission document is the source of truth, this content needs alignment. If the pricing page reflects updated strategy, the mission document needs updating.

**Note:** Lane 1 (Premium Website + Automation) does align with the audit → fix → build funnel.

### ✅ No Google Search Console or Provider Dashboard Access Available

Google Search Console, Vercel analytics, and other provider dashboards are not accessible from this environment. This report covers only public HTTP checks and observable site behavior.

## Summary

| Category | Status |
|----------|--------|
| Site reachable | ✅ |
| SSL valid | ✅ (Jul 21 2026) |
| robots.txt | ✅ |
| sitemap.xml | ✅ (12 URLs, all live) |
| Audit API (POST) | ✅ |
| Audit API (GET) | ✅ Correctly rejects (405) |
| Read-only reports | ✅ |
| Email gate (API level) | ⚠️ Not implemented |
| Lighthouse data | ⚠️ Quota exceeded |
| Proposal CTAs | ✅ (7 paths working) |
| Pricing/mission alignment | ⚠️ Lane 2 & 3 may conflict |
| Provider dashboards | ❌ Not available from this env |

**Overall: Site is healthy. One technical blocker (Lighthouse quota — temporary). One content observation (pricing scope).**
