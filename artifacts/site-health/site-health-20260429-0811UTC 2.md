# Outbound Autonomy — Site Health Report
**Generated:** 2026-04-29 08:11 UTC (Wed Apr 29 02:11 AM MDT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Source:** outboundautonomy.com live checks (no destructive actions)

---

## ✅ VERIFIED — Live Site Response

| Check | Status | Detail |
|---|---|---|
| Homepage | ✅ 200 OK | Title: "Outbound Autonomy — Free Website Audit With Targeted Fixes" |
| www subdomain | ✅ 200 OK | Serves same content as apex (Next.js, Vercel HIT cache) |
| SSL/TLS | ✅ Verified | HSTS: max-age=63072000; cert valid Apr 22 – Jul 21 2026 |
| Platform | Vercel | Server header: Vercel, content-type: text/html; charset=utf-8 |
| DNS | ✅ Resolves | A records: 64.29.17.1, 64.29.17.65 |
| Response size | 82,105 bytes | Next.js SSR bundle |

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
| Last modified | 2026-04-29T05:24:21.501Z (today) |
| URLs listed | 16 (home, services, pricing, contact, sample-report, try, case-studies, faq, about, sub-pages) |
| Conclusion | ✅ Updated today, correct structure |

## ✅ VERIFIED — /api/audit Endpoint

| Check | Detail |
|---|---|
| GET | ✅ 405 (Method Not Allowed — correct, API expects POST) |
| POST (valid URL) | ✅ 200 OK — Returns full JSON audit in 51ms response time |
| Sample output | Design: 74, Conversion: 42, Technical: 92, Overall: 69 (Grade D) |
| Issue detection | ✅ Detected: no CTA, no lead form, no meta description, missing trust proof, Lighthouse quota |
| Recommendations | ✅ 3-tier: Conversion pass ($1.5-3.5k), Lead capture ($2.5-6.5k), Full plan ($7.5-15k+) |
| Lighthouse ⚠️ | ⚠️ **UNAVAILABLE** — Google PageSpeed API quota exceeded (project 583797351490). Falls back gracefully with error message and fallback recommendations. |
| Screenshot ⚠️ | ⚠️ **UNAVAILABLE** — Skipped in preview mode; note says browser worker needed |
| `@type` json-ld | ✅ Schema.org structured data present on homepage (WebSite, Service, FAQPage) |

**Note:** Lighthouse quota exhaustion is a recurring issue. Consider:
- Upgrading GCP quota for project 583797351490 (pagespeedonline.googleapis.com)
- Implementing a local browser-based Lighthouse runner as fallback
- Adding rate limiting / caching to stay within free tier

## ⚠️ VERIFIED — Email Capture Path

| Check | Detail |
|---|---|
| Audit form on homepage | ✅ Present — text input + "Generate Free Audit" submit button, client-side form (no explicit action attr) |
| `/api/email` POST | ✅ 404 (no dedicated email endpoint exposed) |
| Email collection model | Preview-first funnel: full audit visible without email; email unlocks saved version + implementation sequence (per FAQ) |
| Conclusion | Funnel logic is client-side; no server-side email API detected externally. Consistent with mission doc: "read-only report immediately — no email required." |

## ✅ VERIFIED — Read-Only Report Output

| Check | Detail |
|---|---|
| Sample report page | ✅ 200 OK at /sample-report |
| Audit preview page | ✅ 200 OK at /try (preview audit for example HVAC business) |
| FAQ confirms no-email | ✅ FAQ #2: "No. The preview is visible before email capture." |
| Audit input URL | ✅ `example.com` field with optional "Add business/access details" expandable section |
| Schema.org | ✅ Service.offers.price: "0" (matches free audit claim) |

## ✅ VERIFIED — Proposal CTA

| Check | Detail |
|---|---|
| "Get Started" CTA | ✅ Header button links to /contact |
| "Generate free audit" CTAs | ✅ Multiple (hero, service cards, #audit section) |
| "Book a discovery call" | ✅ Links to /contact?intent=discovery |
| "Request proposal" | ✅ Links to /contact?intent=audit |
| "Plan implementation" | ✅ Links to /contact?intent=automation |
| Pricing mention | "Websites start at $499" in scoping section |
| Contact email | owner@outboundautonomy.com |
| Conclusion | ✅ All 3 phases (audit → proposal → build) have distinct CTA paths |

## ✅ VERIFIED — Key Static Pages

| Page | Status |
|---|---|
| /services | ✅ 200 OK |
| /pricing | ✅ 200 OK |
| /contact | ✅ 200 OK |
| /faq | ✅ 200 OK |
| /about | ✅ 200 OK |
| /sample-report | ✅ 200 OK |
| /try | ✅ 200 OK |
| /privacy | ✅ 200 (present in footer nav) |
| /terms | ✅ 200 (present in footer nav) |
| /cookies | ✅ 200 (present in footer nav) |

## ✅ VERIFIED — Favicon & OG Image

| Asset | Status |
|---|---|
| /favicon.ico | ✅ 200 OK |
| /icon.svg | ✅ Referenced in HTML |
| /opengraph-image.png | ✅ 200 OK (1200×630, served fresh) |

## ⛔ UNAVAILABLE — Google Search Console & Provider Dashboards

Google Search Console, Vercel Analytics dashboard, and other provider-specific dashboards are **not accessible** via external HTTP checks. No credentials or API tokens are configured for this cron. These would need:
- GSC API service account + OAuth
- Vercel deployment API token
- Any analytics/CRM dashboards

---

## Summary

| Category | Status |
|---|---|
| Live site (HTTPS, TLS, DNS) | ✅ All green |
| robots.txt / sitemap.xml | ✅ Both healthy, sitemap updated today |
| /api/audit (POST) | ✅ Working — full audit response with 3-tier pricing |
| Lighthouse data | ⚠️ Quota exceeded on Google PageSpeed API — recurring |
| Screenshot capture | ⚠️ Skipped in preview (needs browser worker) |
| Email capture path | ✅ Consistent with preview-first funnel, no server API exposed |
| Read-only report | ✅ Available without email, confirmed by FAQ text |
| Proposal CTAs | ✅ All 3 phases linked with intent-based URLs |
| Static pages (9 tested) | ✅ All 200 OK |
| OG/favicon assets | ✅ All serving |
| Search Console / analytics | ⛔ Not available via external check |

**Overall verdict:** Site is healthy and operational. The main concern is the **Google PageSpeed API quota exhaustion** which prevents Lighthouse data from appearing in audit results. This is a known issue from prior reports — it degrades the audit product by omitting performance scores and screenshots.
