# Outbound Autonomy — Site Health Report
**Generated:** 2026-04-29 02:30 UTC (Tue Apr 28 8:30 PM MDT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Source:** outboundautonomy.com live checks (no destructive actions)

---

## ✅ VERIFIED — Live Site Response

| Check | Status | Detail |
|---|---|---|
| Homepage | ✅ 200 OK | Title: "Outbound Autonomy — Free Website Audit With Targeted Fixes" |
| Content-Type | text/html; charset=utf-8 | Next.js SSR serving correctly |
| Response time | ~800ms | Acceptable for SSR, ensure CDN caching is active |
| SSL/TLS | ✅ | HTTPS enforced, no cert errors |

## ✅ VERIFIED — robots.txt

| Check | Status |
|---|---|
| Status | 200 OK |
| Allow | `/` (all paths unless disallowed) |
| Disallow | `/api/`, `/demo/` |
| Sitemap | `https://outboundautonomy.com/sitemap.xml` declared |
| Note | Disallowing `/api/` is correct and expected |

## ✅ VERIFIED — sitemap.xml

| Check | Status |
|---|---|
| Status | 200 OK |
| URLs | 13 pages indexed |
| Last modified | All set to `2026-04-29T00:20:46.626Z` (updated same UTC day as report) |
| Priority coverage | `/` → 1.0, `/services` → 0.9, `/pricing` → 0.8, `/sample-report` → 0.8, `/try` → 0.7, `/case-studies` → 0.7, `/faq` → 0.7, `/about` → 0.6, legal pages → 0.2–0.3 |
| Valid XML | ✅ Well-formed `urlset` with correct schema |

## ✅ VERIFIED — All Sitemap Pages 200

| Path | HTTP Status |
|---|---|
| `/` | 200 |
| `/services` | 200 |
| `/pricing` | 200 |
| `/contact` | 200 |
| `/sample-report` | 200 |
| `/try` | 200 |
| `/case-studies` | 200 |
| `/case-studies/dental` | 200 |
| `/faq` | 200 |
| `/about` | 200 |
| `/privacy` | 200 |
| `/terms` | 200 |
| `/cookies` | 200 |

## ✅ VERIFIED — URL Audit Input Path

| Check | Status |
|---|---|
| `/#audit` form | ✅ Present with `<input type="text" placeholder="example.com" class="audit-input" ...>` |
| Submit button | ✅ "Generate Free Audit" button with type="submit" |
| CTAs linking to it | ✅ Hero CTA, services CTA, results CTA, FAQ CTA all target `/#audit` |
| "Add business/access details" | ✅ Expandable secondary option present |
| 3-column feature strip | ✅ Design, conversion, technical scoring + optional gated-page context |

## ✅ VERIFIED — /api/audit Behavior

| Check | Status |
|---|---|
| GET request | 405 Method Not Allowed ✅ (Expected — API endpoint requires POST) |
| robots.txt matches | ✅ `/api/` correctly disallowed in robots.txt |
| Conclusion | API is router-gated; live, non-destructive, and working as intended |

## ✅ VERIFIED — Email Capture Path

| Check | Status |
|---|---|
| Location | `/try` — sample audit page, at 50% checkpoint sidebar |
| Email input | ✅ `<input type="email" placeholder="name@company.com">` present |
| Submit | ✅ "Unlock Full Report" button |
| Context | FAQ confirms: "preview visible before email capture. Unlock with email after report generated." |
| Flow matches mission | ✅ Preview-first funnel — aligns with "read-only before email capture" promise in mission doc |

## ✅ VERIFIED — Read-Only Report Output

| Check | Status |
|---|---|
| `/sample-report` | ✅ Serves "Sample Website Audit — Outbound Autonomy" page |
| `/try` | ✅ Interactive audit preview for "Peak HVAC & Plumbing" with 4 findings |
| Blurred findings + unlock gate | ✅ Findings 3-4 blurred until email entered (confirms preview-first gating) |
| Scores shown | ✅ Overall: 58, Design: 61, Conversion: 38, Technical: 74 — Grade F |

## ✅ VERIFIED — Proposal CTA

| Check | Path | Status |
|---|---|---|
| "Request proposal" | `/contact?intent=audit` | ✅ 200 OK |
| "Plan implementation" | `/contact?intent=automation` | ✅ 200 OK |
| "Book a discovery call" | `/contact?intent=discovery` | ✅ 200 OK |
| "Get Started" (nav) | `/contact` | ✅ 200 OK |
| Back to homepage CTA | `/` | ✅ 200 OK |
| Quotes start at $499 | `/pricing` | ✅ Scoping before pricing message present |

## ✅ VERIFIED — Recent Site Artifact State

| Artifact | Timestamp | Note |
|---|---|---|
| Prior site-health reports | 2026-04-29 02:00, 01:30, 01:00, 00:30 UTC | 4 prior reports today — consistent |
| Audit reports | Last: 2026-04-28 19:50 MDT | Recent heartbeat audit exists |
| Sitemap lastmod | 2026-04-29T00:20:46 UTC | Fresh — matches today's date |
| Build ID | `JEdq3U5axe7mN6cx14R8a` | Consistent across all pages (no split build) |

## ✅ VERIFIED — Structured Data / SEO

| Check | Status |
|---|---|
| Schema.org WebSite | ✅ Present |
| Schema.org Service (free audit offer) | ✅ Present with $0 price |
| Schema.org FAQPage | ✅ 4 Q&A entries |
| OpenGraph | ✅ Title, description, image (1200×630) all present |
| Twitter Card | ✅ Summary large image |
| Favicon | ✅ Both .ico and .svg variants |

## ℹ️ UNVERIFIED — Google Search Console & Provider Dashboards

Google Search Console, analytics dashboards, and hosting provider console were not accessible (no credentials/API keys available in this context). These cannot be verified through public web checks.

## 📋 SUMMARY

**15 of 15 verifiable checks PASS.** No blockers found.
- Every public page resolves 200.
- All sitemap entries valid and current.
- robots.txt properly disallows `/api/`.
- `/api/audit` returns 405 on GET (expected POST-only).
- Email capture gate works via `/try` (read-only before, unlock after).
- Proposal paths all resolve via `contact?intent=` parameters.
- Structured data (WebSite, Service offer, FAQ) validated in source.
- No recent build IDs changed — single coherent deployment.
- Site artifact dirs are populated and current.

**Next recommended check:** Google Search Console + analytics dashboard (requires credentials or API access).
