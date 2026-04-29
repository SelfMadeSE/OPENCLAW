# Site Health Report — outboundautonomy.com

**Timestamp:** 2026-04-28 12:00 UTC (Tuesday, April 28, 6:00 AM MT)
**Checked by:** Cron site health (cron:2bf2b12a-0a8b-4243-b59e-bbf941b3a75d)

---

## 1. Live Site Response ✅

| Check | Result |
|-------|--------|
| HTTPS status | **200 OK** |
| Response time | ~320–940ms across all pages |
| TLS | TLSv1.3 |
| Server | Vercel |

## 2. robots.txt ✅

**HTTP 200** — Present and correct.
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /demo/
Sitemap: https://outboundautonomy.com/sitemap.xml
```
- `/api/` and `/demo/` correctly disallowed from crawlers
- Sitemap reference present and pointing to valid location

## 3. sitemap.xml ✅

**HTTP 200** — Present, valid XML. 8 URLs listed:
- `/` (priority 1.0, weekly)
- `/services` (0.9, monthly)
- `/pricing` (0.8, monthly)
- `/about` (0.6, monthly)
- `/contact` (0.8, monthly)
- `/privacy` (0.3, yearly)
- `/terms` (0.3, yearly)
- `/cookies` (0.2, yearly)

**Note:** No `/try`, `/sample-report`, or `/demo/hero` in sitemap — these exist and return 200 but aren't indexed.

## 4. All Published Routes ✅

| Route | Status | Notes |
|-------|--------|-------|
| `/` | **200** | Homepage — audit-led funnel |
| `/services` | **200** | Three implementation lanes |
| `/pricing` | **200** | Lane-specific CTAs |
| `/about` | **200** | Closed pilot, honest positioning |
| `/contact` | **200** | Form with name, email, phone, company, service interest, budget, message |
| `/privacy` | **200** | Legal page |
| `/terms` | **200** | Legal page |
| `/cookies` | **200** | Cookie policy |
| `/try` | **200** | Example audit (Peak HVAC) |
| `/sample-report` | **200** | ✅ **FIXED** — was 404 in prior reports. Static sample audit for HVAC service business now live |
| `/demo/hero` | **200** | Sandbox demo — no telephony |
| `/demo` | **307** | ✅ **FIXED** — was 404; now redirects to `/demo/hero` |

## 5. URL Audit Input Field ✅

- Present in `#audit` section on homepage
- Text input field + "Generate Free Audit" submit button
- Client-rendered (Next.js client component)
- Links to `/try` for preview example and `/sample-report` for static sample

## 6. /api/audit Behavior ✅

| Method | Result |
|--------|--------|
| GET | **405** "Method Not Allowed" — correct |
| POST (valid URL) | **200** — full structured audit JSON returned |
| POST (empty body) | **400** — error handling verified |

**Audit response (example.com test):**
- Scores: Design 74 / Conversion 42 / Technical 92 / Overall 69 (grade D)
- Issues: 4 detected (2 high, 2 medium)
- Recommendations: 3 prioritized tiers ($1,500–$3,500 / $2,500–$6,500 / $7,500–$15,000+)
- 3 reference patterns included
- Implementation estimate range included
- Lighthouse unavailable due to Google PageSpeed API quota exhaustion

**Blocker noted:** Lighthouse data is blocked because the Google PageSpeed Insights API daily quota for project `583797351490` was exceeded. This affects mobile performance scoring and screenshot capture.

## 7. Email Capture Path ⚠️ (unchanged)

**Marketing copy:** "Read-only preview before email capture" / "unlock sequencing, budget range, and a proposal path with your email"

**Verified behavior:** The `/api/audit` endpoint returns the full audit (all scores, recommendations, pricing, implementation estimate, reference examples) with **no email parameter required**. Sending `{"email":"...","save":true}` produces identical output.

**Status:** Email gating is not enforced server-side. Marketing promises a gate that doesn't exist yet.

## 8. Read-Only Report Output ✅

- Full audit JSON accessible via POST to `/api/audit`
- No login, email, account, or write action required
- All fields exposed: sourceUrl, scorecard, issues (severity/title/evidence/recommendation), recommendations (pricing/priority), referenceExamples, crawlSummary, implementationEstimate

## 9. Proposal CTA ✅

- Every audit response includes priority-labeled recommendations with pricing estimates
- Homepage: "Book a free 30-minute discovery call" → `/contact?intent=discovery`
- Pricing page: Lane-specific CTAs → `/contact?intent=pilot-lane-1` / `?intent=workflow` / `?intent=architecture`
- Bottom CTA: "Book your free discovery call" + "We'll tell you honestly if we can help..."
- Services: "Generate audit", "Request proposal", "Plan implementation" CTAs per lane

## 10. Homepage Hero — MISSION DRIFT FIXED ✅

**Current live hero (verified from raw HTML):**
- Badge: "Free website audit for service businesses" ✅
- H1: "Enter your URL. Get a website audit with targeted fixes." ✅
- Subtitle: "We review your site for design, conversion, technical, and lead-capture gaps" ✅
- CTAs: "Generate free audit" and "See implementation options" ✅
- Title tag: "Outbound Autonomy — Free Website Audit With Targeted Fixes" ✅
- Meta description: "Enter your URL to get a website audit with design, conversion, and technical scoring..." ✅

**Status:** ✅ **FIXED** — The previous report at 10:44 UTC noted SaaS competitive-intelligence hero copy. This has been deployed and now correctly matches the mission lock (service businesses, audit wedge).

## 11. Sample Report (/sample-report) FIXED ✅

- **Was:** 404 (broken link from homepage hero)
- **Now:** HTTP 200 — Static sample audit page live
- Content: Example HVAC service business audit with scores (58/100 grade F), 4 issues, 3 recommended fix tiers ($1,500–$7,500), plus call-to-audit at bottom
- Properly aligned with ICP (local service business)

## 12. No Telephony/Receptionist Claims ✅

- No AI receptionist, telephony, Twilio, voice, or SMS claims on any checked page
- Three implementation lanes: Premium Website + Automation, Custom Workflows, Private AI Operating Systems
- No stale receptionist artifacts on live site

## 13. Google Search Console & Provider Dashboards ❌

**Unavailable from this agent context.** No credentials for:
- Google Search Console (indexing, crawl stats, search queries)
- Vercel dashboard (deployment logs, edge function health, analytics)
- Google Analytics (traffic data)
- Email provider (form submissions, delivery)
- CRM (lead data, pipeline)

## 14. Site Health Artifact State

- Previous reports in `artifacts/site-health/`: 2026-04-26 (2x), 2026-04-28 10:44 UTC
- sitemap.xml lastmod: 2026-04-28T12:00:26.059Z (today)
- Mission lock: Last reset 2026-04-24

---

## Summary

| Area | Status | Change Since Last Report |
|------|--------|--------------------------|
| Live site (HTTPS/SSL) | ✅ | — |
| robots.txt | ✅ | — |
| sitemap.xml | ✅ | Updated today (2026-04-28) |
| All published routes | ✅ | — |
| URL audit input field | ✅ | — |
| /api/audit POST | ✅ | — |
| /api/audit GET rejection | ✅ (405) | — |
| Read-only report output | ✅ | — |
| Proposal CTA | ✅ | — |
| Homepage mission alignment | ✅ | **FIXED** — was targeting SaaS, now service businesses |
| /sample-report route | ✅ | **FIXED** — was 404, now live with HVAC sample |
| /demo redirect | ✅ (307) | **FIXED** — was 404, now redirects to /demo/hero |
| /try nav link | ✅ | Present in header navigation |
| Email capture gating | ⚠️ | Not enforced server-side |
| Google PageSpeed API quota | ⚠️ | Quota exceeded — Lighthouse unavailable |
| Provider dashboards (GSC/Vercel/GA) | ❌ | No credentials available |

## Remaining Blockers

1. **Email capture gating** — Marketing promises email-unlock path but server doesn't enforce it. Fix: either implement server-side gate on `/api/audit` or update the FAQ/CTA copy to match current behavior.
2. **Google PageSpeed API quota** — Lighthouse/preview unavailable. Needs quota increase or browser-worker fallback for screenshot + performance data.
3. **Provider dashboard access** — GSC, Vercel, and GA data not reachable from this agent. Request credentials for future reports.
4. **Sitemap missing routes** — `/try`, `/sample-report`, and `/demo/hero` not listed in sitemap.xml. These are live content pages and should be indexed.

## Next Actions

- Request provider dashboards (GSC, Vercel, GA) for future monitoring
- Implement email-gate on `/api/audit` or update marketing copy to match current no-email-required behavior
- Add `/try`, `/sample-report`, and `/demo/hero` to sitemap.xml
- Request Google PageSpeed API quota increase or implement fallback browser worker
