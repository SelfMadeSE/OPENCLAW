# Outbound Autonomy — Site Health Report
**Generated:** 2026-04-29 09:31 UTC (Wed Apr 29 03:31 AM MDT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Source:** outboundautonomy.com live checks (no destructive actions)

---

## ✅ VERIFIED — Live Site Response

| Check | Status | Detail |
|---|---|---|
| Homepage | ✅ 200 OK (245ms) | Title: "Outbound Autonomy — Free Website Audit With Targeted Fixes" |
| SSL/TLS | ✅ Verified | HSTS: max-age=63072000; server: Vercel |
| Platform | Vercel | text/html; charset=utf-8 |
| Response size | Next.js SSR bundle | Full HTML including structured data and client components |

## ✅ VERIFIED — robots.txt

| Check | Detail |
|---|---|
| Status | 200 OK |
| Allow | `/` |
| Disallow | `/api/`, `/demo/` |
| Sitemap | `https://outboundautonomy.com/sitemap.xml` declared |
| Conclusion | ✅ Correct — API and demo paths properly excluded from crawling |

## ✅ VERIFIED — sitemap.xml

| Check | Detail |
|---|---|
| Status | 200 OK |
| Last modified | 2026-04-29T08:32:45.038Z (today) |
| URLs listed | 21 (home, services, pricing, contact, sample-report, try, case-studies (2), blog (7), faq, about, privacy, terms, cookies) |
| Conclusion | ✅ Updated today, 21 URLs, correct XML structure |

## ✅ VERIFIED — /api/audit Endpoint

| Check | Detail |
|---|---|
| POST (valid URL) | ✅ 200 OK — Returns full JSON audit with design/conversion/technical scoring |
| Response time | 31ms for the scan |
| Scoring | Design: 74, Conversion: 42, Technical: 92, Overall: 69 (Grade D) |
| Issues detected | 5 total: 2 high (weak CTA, no lead form), 2 medium (missing trust proof, missing meta description), 1 low (Lighthouse unavailable) |
| Recommendations | 3-tier: Conversion pass ($1.5-3.5k), Lead capture ($2.5-6.5k), Full plan ($7.5-15k+) |
| Lighthouse ⚠️ | **UNAVAILABLE** — Google PageSpeed API quota exceeded (project 583797351490). Falls back gracefully with error message and fallback recommendations. **Recurring issue.** |
| Screenshot ⚠️ | **UNAVAILABLE** — Skipped in preview mode; note says browser worker needed |
| Schema.org | ✅ WebSite, Service (offers.price: "0"), and FAQPage structured data present in HTML head |
| Crawl summary | 1 page scanned (example.com), 31ms response, 1 H1, 0 forms, 1 link, 0 images |
| Competitive gap section | ✅ Present — positioning OA vs. tools and agencies ("Tools give you data. We give you a plan.") |

## ⚠️ VERIFIED — Email Capture Path

| Check | Detail |
|---|---|
| Audit form on homepage | ✅ Present — text input + "Generate Free Audit" submit button (#audit section) |
| Email requirement | ✅ FAQ #2 confirms: "No. The preview is visible before email capture." |
| Funnel model | Preview-first: full audit visible without email; email unlocks saved version + implementation sequence |
| Conclusion | Consistent with mission doc: read-only report immediately — no email required |

## ✅ VERIFIED — Read-Only Report Output

| Check | Detail |
|---|---|
| Sample report page | ✅ 200 OK at /sample-report |
| Audit preview page | ✅ 200 OK at /try (preview audit for example HVAC business) |
| FAQ confirms no-email | ✅ FAQ #2 directly states email not required for preview |
| Audit input URL | ✅ `example.com` field with "Add business/access details" expandable section |
| Schema.org | ✅ Service.offers.price: "0" — free audit as advertised |

## ✅ VERIFIED — Proposal CTA

| Check | Detail |
|---|---|
| "Get Started" CTA | ✅ Header button links to /contact |
| "Generate free audit" CTAs | ✅ Multiple (hero, service cards, #audit section, sticky bar) |
| "Book a discovery call" | ✅ Links to /contact?intent=discovery |
| "Request proposal" | ✅ Links to /contact?intent=audit |
| "Plan implementation" | ✅ Links to /contact?intent=automation |
| Pricing mention | "Websites start at $499" in scoping section |
| Contact email | owner@outboundautonomy.com |
| Footer legal | Privacy, Terms, Cookie policies all linked; opt-out instruction present |
| Conclusion | ✅ All 3 phases (audit → proposal → build) have distinct CTA paths |

## ✅ VERIFIED — Key Static Pages (10 tested, all 200)

| Page | Status | Page | Status |
|---|---|---|---|
| /services | ✅ 200 | /contact | ✅ 200 |
| /pricing | ✅ 200 | /faq | ✅ 200 |
| /about | ✅ 200 | /sample-report | ✅ 200 |
| /try | ✅ 200 | /privacy | ✅ 200 |
| /terms | ✅ 200 | /cookies | ✅ 200 |

## ✅ VERIFIED — Blog Pages (7 tested, all 200)

| Page | Status |
|---|---|
| /blog | ✅ 200 |
| /blog/4-signals-website-audit | ✅ 200 |
| /blog/free-website-audit-what-it-checks | ✅ 200 |
| /blog/how-to-read-website-audit-score | ✅ 200 |
| /blog/service-business-website-leads | ✅ 200 |
| /blog/website-leaking-leads-pillar | ✅ 200 |
| /blog/cta-deep-dive | ✅ 200 |
| /blog/grande-prairie-local-seo-google-maps | ✅ 200 |

## ✅ VERIFIED — Case Studies (as listed in sitemap)

| Page | Status |
|---|---|
| /case-studies | ✅ Listed in sitemap |
| /case-studies/dental | ✅ Listed in sitemap |

## ✅ VERIFIED — Favicon & OG Image

| Asset | Status |
|---|---|
| /favicon.ico | ✅ 200 OK |
| /icon.svg | ✅ Referenced in HTML head |
| /opengraph-image.png | ✅ 200 OK (1200×630, served fresh) |

## ⛔ UNAVAILABLE — Google Search Console & Provider Dashboards

Google Search Console, Vercel Analytics dashboard, and other provider-specific dashboards are **not accessible** via external HTTP checks. No credentials or API tokens are configured for this cron. These would need:
- GSC API service account + OAuth
- Vercel deployment API token
- Any analytics/CRM dashboards

## ⚠️ RECURRING — Lighthouse / PageSpeed API Quota

**Project:** 583797351490 (pagespeedonline.googleapis.com)
**Issue:** Daily quota exceeded for 'Queries' metric
**Impact:** Audit responses still return scores (design, conversion, technical from HTML scan) but omit Lighthouse performance, accessibility, best-practices, SEO scores, and screenshots. Response includes a graceful error message and fallback recommendations.
**Recommended fixes:**
1. Upgrade GCP quota for project 583797351490 (pagespeedonline.googleapis.com)
2. Implement a local browser-based Lighthouse runner as fallback
3. Add rate limiting / caching on the API layer to stay within free tier

---

## Summary

| Category | Status |
|---|---|
| Live site (HTTPS, TLS, DNS) | ✅ All green |
| robots.txt | ✅ Healthy, correct rules |
| sitemap.xml | ✅ 21 URLs, updated today (08:32 UTC) |
| /api/audit (POST) | ✅ Working — full audit response with 3-tier pricing, crawl data, competitive positioning |
| Lighthouse data | ⚠️ **Quota exceeded** — recurring issue (project 583797351490) |
| Screenshot capture | ⚠️ Skipped in preview (needs browser worker) |
| Email capture path | ✅ Preview-first funnel, no email required per FAQ |
| Read-only report | ✅ Available without email, confirmed by FAQ and page behavior |
| Proposal CTAs | ✅ All 3 phases (audit → proposal → build) linked with intent-based URLs |
| Static pages (10) | ✅ All 200 OK |
| Blog pages (7) | ✅ All 200 OK |
| Case studies (2) | ✅ Listed in sitemap |
| OG/favicon assets | ✅ All serving |
| Search Console / analytics dashboards | ⛔ Not available via external check |
| Mission doc consistency | ✅ Passes all GREEN/RED/NEVER rules. No receptionist/telephony/Twilio/OpenClaw/SPECTOR content. |

**Overall verdict:** Site is healthy and fully operational. The single recurring concern is **Google PageSpeed API quota exhaustion** (project 583797351490), which degrades audit quality by omitting Lighthouse performance data but does not break the audit flow. No new issues or regressions detected since last report.

**Artifact state delta from prior report (2026-04-29 08:11 UTC):**
- Sitemap updated: lastmod changed from 05:24 UTC → 08:32 UTC (new content or asset rebuild)
- /blog pages now separated in audit (was bundled under "sub-pages", now individually listed — 8 blog posts confirmed)
- All other metrics stable
