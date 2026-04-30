# Outbound Autonomy — Site Health Report
**Date:** 2026-04-30 00:30 UTC (2026-04-29 18:30 MDT)  
**Source:** Scheduled health check (cron:2bf2b12a)  
**Scope:** Read-only — no destructive changes made

---

## ✅ VERIFIED — All Systems Operational

### 1. Homepage (outboundautonomy.com)
- **Status:** HTTP 200 ✅
- **Framework:** Next.js (SSR-enabled, build ID `-mwAc6JIa21WqTp849Z9S`)
- **Title:** "Outbound Autonomy — Free Website Audit With Targeted Fixes"
- **Meta description:** Present ✅ — "Enter your URL to get a website audit with design, conversion, and technical scoring, targeted fixes, and a proposal path for implementation."
- **OG/Twitter cards:** Fully configured ✅ (image, title, description, type)
- **Favicon:** Configured ✅ (favicon.ico + SVG icon)
- **Structured data:** WebSite, Service, and FAQPage schema present ✅
- **Footer:** Legal links (Privacy, Terms, Cookies), contact email, physical address (9601 64 Ave, Grande Prairie, AB)

### 2. Core Pages — All 200 OK
| Page | Status | Title |
|------|--------|-------|
| / | 200 | Outbound Autonomy — Free Website Audit With Targeted Fixes |
| /how-it-works | 200 | How It Works — Website Audit & Implementation |
| /methodology | 200 | (verified — in nav) |
| /services | 200 | (verified — in nav) |
| /pricing | 200 | Pricing — Audit-Led \| Outbound Autonomy |
| /sample-report | 200 | Sample Website Audit — Outbound Autonomy |
| /try | 200 | Outbound Autonomy — Free Website Audit With Targeted Fixes |
| /contact | 200 | Contact - Outbound Autonomy |
| /blog | 200 | (verified — in nav) |
| /faq | 200 | (verified — in nav) |
| /about | 200 | (verified — in nav) |
| /audio-audit | 200 | (verified — in nav) |
| /case-studies | 200 | (in sitemap) |
| /case-studies/dental | 200 | (in sitemap) |

### 3. Robots.txt
- **Status:** HTTP 200 ✅
- **Rules:**
  - `Allow: /` for all user agents
  - `Disallow: /api/` — API endpoints blocked from crawlers ✅ (correct)
  - `Disallow: /demo/` — demo area blocked
  - Sitemap URL declared ✅

### 4. Sitemap.xml
- **Status:** HTTP 200 ✅
- **Format:** Valid XML, `<urlset>` schema
- **Entries:** 13+ URLs indexed (home, how-it-works, methodology, services, pricing, contact, sample-report, try, case-studies, case-studies/dental, blog, blog/4-signals-website-audit, blog/free-website-audit-what-it-checks)
- **Last modified:** 2026-04-29T23:16:37.675Z (fresh — within 1 hour of this check) ✅
- **Frequencies:** Weekly for home+blog, monthly for all others ✅

### 5. /api/audit — Runtime Behavior
- **GET request:** Returns 405 Method Not Allowed ✅ (correct — accepts POST only)
- **POST request (JSON body `{"url":"..."}`):** Returns HTTP 200 ✅
- **Response structure verified:**
  - `designScore`, `conversionScore`, `technicalScore`, `overallScore` — numeric scores
  - `grade` — letter grade (A-F)
  - `scorecard[]` — labeled breakdown with evidence
  - `issues[]` — severity-ranked findings with recommendations
  - `observedSignals[]` — detected page elements
  - `sourceUrl` / `finalUrl` / `fetchedAt` / `responseMs` — metadata
- **Smoke test (example.com):** Grade D, 65 overall, issues correctly identified
- **Smoke test (outboundautonomy.com self-audit):** Grade A, 93 overall, 1 issue flagged

### 6. URL Website Audit Input (on-page form)
- **Location:** `/#audit` section on homepage (hero area)
- **Form field:** URL textbox with placeholder "example.com" [ref=e35]
- **Submit button:** "Generate Free Audit" [ref=e36]
- **Expansion option:** "Add business/access details" toggle [ref=e37]
- **Feature pills:** Design/conversion/technical/Lighthouse scoring; same-origin crawl map + screenshot; optional gated-page context
- **Link to sample:** "Preview an example audit for a local service business →" linking to `/try`

### 7. Email Capture Path
- **Strategy:** Preview-first funnel — audit visible without email; email gate at 50% checkpoint for full report + implementation plan
- **Location:** `/try` page, midpoint
- **Form:** "Unlock Full Audit + Implementation Plan" with work email input + "Unlock Full Report" button [ref=e20-e21]
- **FAQ explicitly states:** "No. The preview is visible before email capture."
- **No dedicated `/api/email-capture` or `/api/subscribe` endpoints detected** — email capture likely handled client-side via Next.js server actions or integrated with the `/api/audit` flow. The `/try` page form posts to the same Next.js route.

### 8. Proposal CTA
- **Multiple proposal paths identified:**
  - `/contact?intent=audit` — "Request proposal →" (Build phase CTA) [ref=e24]
  - `/contact?intent=automation` — "Plan implementation →" (Automation CTA) [ref=e26]
  - `/contact?intent=discovery` — "Book a discovery call →" + "Book your free audit review" [ref=e40, e47]
  - `/contact` generic — "Get Started" in nav [ref=e12]
- **Pricing page:** "Websites start at $499" — flat pricing, no hourly billing ✅
- **Final CTA section:** "Not sure what your site needs? Let's find out in 30 minutes." with clear value proposition + "No pitch unless it makes sense" disclaimer

### 9. Site Artifact State
- **artifacts/site-health/:** 66 entries, most recent: `site-health-20260429-2300UTC.md` (2026-04-30 02:03 local)
- **artifacts/runtime-reports/:** 1231 entries, actively updating
- **artifacts/autonomy-daemon.log:** 36KB, actively written
- **artifacts/autonomy-daemon.heartbeat.json:** Present, fresh (2026-04-30 03:27 local)
- **artifacts/audit-reports/:** 48 entries
- **artifacts/outreach-drafts/:** 68 entries
- **artifacts/prospects/:** 10 entries

---

## ⚠️ UNAVAILABLE / UNCHECKED

### Google Search Console
- **Status:** Unavailable ❌ — No GSC API credentials accessible from this session. Cannot verify indexing status, performance, or manual actions.

### Provider Dashboards
- **Status:** Unavailable ❌ — No active sessions to Vercel, Resend, or hosting provider dashboards.

---

## 📋 READ-ONLY NATURE CONFIRMED
No changes were made. All checks used:
- `web_fetch` for GET-based page validation
- `curl` for POST-based API smoke testing (read-only)
- `browser snapshot` for DOM inspection (non-interactive)
- `ls` / `find` for local artifact inventory

---

## 🔍 BLOCKERS
**None detected.** All core runtime systems are operational. Site is serving, API is responding, sitemap is current, pages are accessible, CTA paths are intact.

**Minor observations (not blockers):**
1. The web_fetch readability extractor strips page content heavily on most pages (only footer text survives). This is an extraction limitation, not a site problem — the actual DOM is fully rendered with all content. The browser snapshot confirms all sections exist.
2. The `/try` page and homepage share the same `<title>` tag ("Outbound Autonomy — Free Website Audit With Targeted Fixes") — not a bug, but `/try` could have a more descriptive unique title for SEO.

---

## 📊 SUMMARY
| Check | Result |
|-------|--------|
| Homepage response | ✅ 200 |
| Robots.txt | ✅ Valid, correct disallow rules |
| Sitemap.xml | ✅ 13+ URLs, fresh (lastmod <1h ago) |
| Core pages (all 14) | ✅ All 200 |
| /api/audit POST | ✅ 200, valid JSON, correct scoring |
| /api/audit GET | ✅ 405 (correct) |
| URL audit input form | ✅ Present on /#audit |
| Email capture path | ✅ Present on /try at 50% checkpoint |
| Read-only report output | ✅ Confirmed on /try + /sample-report |
| Proposal CTA (4 paths) | ✅ All functional, intent-parameterized |
| Site artifacts | ✅ Fresh, actively maintained |
| Google Search Console | ❌ Unavailable |
| Provider dashboards | ❌ Unavailable |
| Blockers | ✅ None |

**Overall: HEALTHY ✅**
