# Outbound Autonomy — Site Health Report
**Date:** 2026-04-30 04:30 UTC (2026-04-29 22:30 MDT)
**Source:** Scheduled health check (cron:2bf2b12a-0a8b-4243-b59e-bbf941b3a75d)
**Scope:** Read-only — no destructive changes made

---

## ✅ VERIFIED — All Critical Checks Pass

### 1. Live Site Response

| Check | Status | Detail |
|-------|--------|--------|
| Homepage (/) | ✅ 200 | Full Next.js SPA, hosted on Vercel, HTTP→HTTPS enforced |
| Content rendering | ✅ | Full HTML delivered with JS bundles — server-rendered (SSR active) |
| Build ID | ✅ | P25pjNX11Av8zTSMCkx5q |
| Server | ✅ | Vercel (fra1 region) |
| Cache | ✅ | Vercel HIT on /try (age: 9621s), MISS on /contact |

### 2. robots.txt
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /demo/
Sitemap: https://outboundautonomy.com/sitemap.xml
```
✅ Valid. /api/ and /demo/ properly disallowed. Sitemap reference correct.

### 3. sitemap.xml
✅ Valid XML (200, content-type: application/xml). 13+ URLs including: /, /how-it-works, /methodology, /services, /pricing, /contact, /sample-report, /try, /case-studies, /case-studies/dental, /blog, /blog/4-signals-website-audit, /blog/free-website-audit-what-it-checks. All lastmod: 2026-04-30T01:50:48.570Z (fresh, within 3h). Changelog frequencies set: weekly (homepage, blog), monthly (all others). Priority ranges 0.7-1.0.

### 4. URL Website Audit Input
✅ Present on homepage at /#audit. Full form verified in raw HTML:
- Text input: `<input type="text" placeholder="example.com" class="audit-input" required>`
- Submit button: `<button type="submit">Generate Free Audit</button>`
- Toggle: "Add business/access details" expandable button
- Context boxes: "Design, conversion, technical, and Lighthouse scoring" / "Same-origin crawl map plus screenshot when available" / "Optional gated-page context"
- Preview link: `/try` — "Preview an example audit for a local service business →"

### 5. /api/audit Behavior
| Method | Status | Behavior |
|--------|--------|----------|
| GET | 405 Method Not Allowed | ✅ Correct |
| POST | ✅ 200 | Returns full structured JSON audit payload |

**POST results verified live** (tested with `{"url":"example.com"}`):
- Returns: scores (design:74, conversion:42, technical:92, overall:69, grade:"D")
- 5 issues (2 high, 2 medium, 1 low) with severity, title, evidence, recommendation
- 3 recommendations with tiered pricing ($1,500-$15,000+)
- referenceExamples, crawlSummary, competitiveGap, implementationEstimate, disclaimer
- Lighthouse: unavailable in preview mode (expected)
- Screenshot: unavailable in preview mode (expected)
- Crawl: 1 page scanned (capped for preview, correctly)

### 6. Email Capture Path
Three paths verified:

| Path | Location | Behavior |
|------|----------|----------|
| Homepage audit | /#audit | **No email required** for preview. "Preview-first funnel, not bait-and-switch" per FAQ |
| /try page | 50% checkpoint | 4 findings shown (2 full, 2 blurred), then email gate: "Unlock Full Audit + Implementation Plan →" with work email input + "Unlock Full Report" button |
| /contact page | /contact | Full form: Name*, Email*, Phone, Company, Service Interest* (dropdown: web_design/automation/marketing/other), Budget Range (dropdown: not_sure—$10,000+), Message* with URL placeholder, "Request Review" submit button. Footer: owner@outboundautonomy.com, "Response within 24 hours" |

### 7. Read-Only Report Output
- ✅ /sample-report returns 200 (title: "Sample Website Audit — Outbound Autonomy")
- ✅ /try returns 200 — renders Peak HVAC & Plumbing sample audit with 4 findings, "~44s read" badge, email checkpoint UX
- ✅ Homepage includes embedded AuditReportPreview component with sample scores (58/F), 3 issues displayed
- ✅ FAQPage structured data (JSON-LD) present on homepage: 4 questions about audit, email, gated pages, post-audit process
- ✅ WebSite + Service schema (JSON-LD) on homepage

### 8. Proposal CTA — All Paths Verified
From raw HTML analysis of homepage:
| CTA | Target | Context |
|-----|--------|---------|
| "Generate free audit" | /#audit | Hero section — primary action |
| "Request proposal →" | /contact?intent=audit | Services section — Build phase |
| "Plan implementation →" | /contact?intent=automation | Services section — Automation phase |
| "Book a discovery call →" | /contact?intent=discovery | "Scoping before pricing" section |
| "Book your free audit review" | /contact?intent=discovery | Final CTA section |
| "Get Started" | /contact | Header — persistent |
| "See implementation options" | /services | Hero — secondary |
| "Preview sample audit report →" | /sample-report | Hero |

Pricing language: "Websites start at $499" — Scoping before pricing section.

### 9. Recent Site Artifact State
- **artifacts/site-health/**: 71 files (including this report). Most recent: site-health-20260430-0407UTC.md (2026-04-29 22:07 MDT). Reports generated at ~30-60 minute intervals.
- **artifacts/autonomy-daemon.heartbeat.json**: Active — cycle 166, phase "propose", pid 72024, last heartbeat 2026-04-30T04:26:41Z
- **artifacts/autonomy-daemon.state.json**: Last mission completed — "flush-queue-28-20260429-1620" (2026-04-29T22:23:38Z)
- **artifacts/audit-reports/**: Active directory (52 files)
- **artifacts/outreach-drafts/**: Active (75 files)
- No gaps or errors in artifact pipeline.

---

## ⚠️ UNAVAILABLE — Not Checked

### Google Search Console
Not configured for automated access. No API credentials or verified property access available. GSC metrics (clicks, impressions, CTR, indexing status) — **unverified**.

### Provider Dashboards
No hosting provider (Vercel), DNS provider, or analytics dashboard credentials available in agent toolset. Server metrics, traffic analytics — **unverified**.

---

## 🔴 BLOCKERS
**None.** All reachable checks pass clean.

---

## Notes
- All pages on Vercel CDN serving correctly with proper cache headers
- robots.txt disallows /api/ and /demo/ (correct — prevents audit endpoint crawling)
- Homepage HTML includes full schema.org structured data: WebSite, Service (with Offer), FAQPage
- /try and /contact pages are server-rendered (no blank-SPA issues) — full content delivered in initial HTML
- Build ID P25pjNX11Av8zTSMCkx5q consistent across all pages
- x-vercel-cache: HIT on /try (9,621s stale) — CDN working
- Previous report (site-health-20260430-0407UTC.md) checks all match this run — no regression

---

## Summary

| Category | Status |
|----------|--------|
| Site uptime | ✅ All pages 200 |
| robots.txt | ✅ Valid |
| sitemap.xml | ✅ Valid, fresh (<3h) |
| Audit input (/#audit) | ✅ Present, verified in raw HTML |
| /api/audit (POST) | ✅ Returns full JSON with 5 issues, 3 recs, pricing tiers |
| Email capture (/try 50% gate, /contact form) | ✅ Both paths verified |
| Report output (/sample-report, /try, homepage preview) | ✅ All rendering |
| Proposal CTAs | ✅ 8 distinct intent paths verified |
| Artifact pipeline | ✅ Active (heartbeat cycle 166, daemon running) |
| Google Search Console | ⚠️ Unavailable |
| Provider dashboards | ⚠️ Unavailable |
| **Blockers** | **None** |

*Report saved to artifacts/site-health/site-health-20260430-0430UTC.md*
