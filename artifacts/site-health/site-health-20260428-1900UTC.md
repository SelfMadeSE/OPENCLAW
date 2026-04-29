# Outbound Autonomy — Site Health Check
**Timestamp:** 2026-04-28 19:00 UTC (1:00 PM MDT)
**Source:** Verified checks against live production endpoints (read-only, no destructive actions)

---

## Verified Checks

### 1. Live Site Response

| Page | Status | Notes |
|------|--------|-------|
| `/` (homepage) | ✅ 200 | 0.61s load, 56KB. Vercel edge HIT (age: 37s). HSTS: 2yr |
| `/services` | ✅ 200 | Title: "Website Audit for Service Businesses" |
| `/pricing` | ✅ 200 | Title: "Pricing — Outbound Autonomy" |
| `/contact` | ✅ 200 | Title: "Contact — Outbound Autonomy" |
| `/faq` | ✅ 200 | Title: "FAQ — Outbound Autonomy" |
| `/about` | ✅ 200 | Title: "About — Outbound Autonomy" |
| `/privacy` | ✅ 200 | |
| `/terms` | ✅ 200 | |
| `/cookies` | ✅ 200 | |
| `/case-studies` | ✅ 200 | ⬆️ **Updated** — Now shows specific case study: "How Front-End Fixes Tripled a Roofing Company's Mobile Leads" |
| `/case-studies/dental` | ✅ 200 | Title: "Dental Practice Lead Capture Fix Lifts New Patient Bookings 3.4×" |
| `/sample-report` | ✅ 200 | Static demo audit for "Peak HVAC & Plumbing" |
| `/try` | ✅ 200 | Interactive audit preview (client-rendered) |
| `/demo` | ✅ 307 | Redirect — intentionally blocked by robots.txt |
| `/404-test` | ✅ 404 | Custom 404 page with CTAs |

**All 14 tested paths return expected status codes. No SSL errors, no unexpected redirects, no broken pages.**

### 2. robots.txt
- **Status:** ✅ 200
- **Disallow:** `/api/`, `/demo/` — correct
- **Allow:** `/` — correct
- **Sitemap:** `https://outboundautonomy.com/sitemap.xml` ✓

### 3. sitemap.xml
- **Status:** ✅ 200, well-formed XML
- **URLs:** 13 entries (same 13 pages as prior scan)
- **Lastmod:** `2026-04-28T18:13:22.276Z` — **new deploy detected since last report (was 16:59Z)**
- **Coverage:** All pages present with correct priorities and change frequencies

### 4. SSL / TLS Certificate
- **Issuer:** Let's Encrypt R12 (via Vercel)
- **Subject:** `CN=*.outboundautonomy.com`
- **Valid:** 2026-04-22 → 2026-07-21 (84 days remaining)
- **HSTS:** `max-age=63072000` (2 years) — verified present in response headers

### 5. URL Audit Input (/#audit section)
- **Input field:** ✅ Present with placeholder `example.com`
- **"Generate Free Audit" button:** ✅ Present, type=submit
- **"Add business/access details" toggle:** ✅ Present for optional gated-page context
- **Form action:** POST to `/api/audit` (client-side)
- **FAQ confirms preview-first:** "The preview is visible before email capture" ✓

### 6. /api/audit Behavior

| Method | Status | Notes |
|--------|--------|-------|
| POST (valid URL: example.com) | ✅ 200 | 1.0s response, 5.4KB JSON |
| POST (empty) | ✅ 405 | Correctly rejects (tested previous run) |
| GET | ✅ 405 | Method not allowed — correctly blocked |

**Test audit on example.com — full result:**
- **Design Score:** 74/100
- **Conversion Score:** 42/100
- **Technical Score:** 92/100
- **Overall Score:** 69/100 | **Grade:** D
- **Response time:** 62ms for target page
- **5 issues detected:** 2 high (weak CTA, no lead form), 2 medium (missing trust proof, no meta description), 1 low (Lighthouse quota)
- **3 recommendations:** Conversion pass ($1,500-$3,500), Lead capture ($2,500-$6,500), Full plan ($7,500-$15,000+)
- **Crawl:** 1 page scanned, response 62ms, no forms, 1 link, 0 images
- **Screenshot:** Not available in preview tier
- **Lighthouse:** ⚠️ Unavailable — PageSpeed API daily quota exceeded (see note below)
- **Competitive gap analysis:** Present — maps OA's coverage vs tools vs agencies
- **Implementation estimate:** $7,500-$15,000+

**⚠️ Note:** Lighthouse/PageSpeed data unavailable due to daily quota on `pagespeedonline.googleapis.com` (project `583797351490`). This is a recurring daily limitation; the implementation review bypasses it with a dedicated browser worker.

### 7. Email Capture Path (funnel check)
- **Preview-first:** ✅ Audit scores and findings visible before email — confirmed in page copy and FAQ
- **Email gate position:** After read-only findings (at ~50% scroll depth on `/try`)
- **Gate copy:** Match with funnel design — user sees value first, then emails to unlock full report
- **FAQ question #2 confirms:** "The preview is visible before email capture."
- **Email handler backend:** ❌ Not verifiable via read-only checks (internal API call, not exposed)
- **Opt-out path:** `owner@outboundautonomy.com` with "STOP" subject — present in footer

### 8. Read-Only Report Output
- **Homepage (`/#audit`):** Scores visible immediately after URL submit ✅
- **Sample report (`/sample-report`):** Full static demo for "Peak HVAC & Plumbing" ✅
- **Interactive audit (`/try`):** Client-rendered preview with same preview-first flow ✅
- **JSON API response:** Returns scores, issues, recommendations, competitive gap analysis ✅
- **No email required to see audit results:** ✅ Confirmed via form behavior and FAQ

### 9. Proposal CTAs

| CTA | Location | Target |
|-----|----------|--------|
| "Get Started" | Header nav | `/contact` |
| "Generate free audit" | Hero section | `/#audit` (anchor scroll) |
| "See implementation options" | Hero section | `/services` |
| "Preview sample audit report →" | Hero section | `/sample-report` |
| "Generate audit →" | Services card (Audit) | `/#audit` |
| "Request proposal →" | Services card (Conversion) | `/contact?intent=audit` |
| "Plan implementation →" | Services card (Automation) | `/contact?intent=automation` |
| "Book a discovery call →" | Pricing section | `/contact?intent=discovery` |
| "Book your free discovery call" | Bottom CTA section | `/contact?intent=discovery` |
| "Run an audit on your own site →" | Sample report page | `/#audit` |
| "Run Free Website Audit →" | 404 page | `/` |

All CTAs route to working pages with intent query params for lead source tracking. ✅

### 10. SEO & Structured Data
- **Schema.org:** ✅ `WebSite`, `Service`, `FAQPage` JSON-LD present on homepage
- **OG tags:** ✅ Title, description, url, image (1200×630 PNG), type=website
- **Twitter card:** ✅ `summary_large_image` with same OG images
- **Meta descriptions:** ✅ Present on all pages, service-business focused
- **Favicon:** ✅ `/favicon.ico` and `/icon.svg` both present

### 11. Recent Site Artifact Changes

| Artifact | Date | Notes |
|----------|------|-------|
| `/case-studies` page | **New** | Formerly generic listing; now a specific case study: "How Front-End Fixes Tripled a Roofing Company's Mobile Leads" |
| `/case-studies/dental` | Unchanged | "Dental Practice Lead Capture Fix Lifts New Patient Bookings 3.4×" |
| sitemap lastmod | Updated | `T18:13:22.276Z` (was `T16:59:27.178Z`) — indicates a deploy today after 17:30 UTC |
| Mission file | 2026-04-28 | Reflects current audit→fix→build funnel, target personas, standing orders |

---

## Not Verified (Unavailable)

| Check | Reason |
|-------|--------|
| Google Search Console | ❌ No credentials/dashboard access in this session |
| Vercel analytics / dashboard | ❌ No dashboard credentials available |
| Google Analytics 4 | ❌ Not accessible |
| Email deliverability / backend capture pipeline | ❌ Read-only check — cannot submit test email or verify receipt |
| Lighthouse full audit | ⚠️ PageSpeed Insights API daily quota exceeded (recurring; implementation review bypasses this) |

---

## Blockers

**None detected.** All 14 public-facing endpoints are operational and returning correct responses.

**Known limitation (non-blocking):** PageSpeed API daily quota is exhausted. This only affects the preview audit's Lighthouse section; the full implementation review uses a dedicated browser worker and is unaffected.

---

## Summary

| Component | Status |
|-----------|--------|
| Homepage | ✅ Online (Vercel edge, HSTS, 0.61s load) |
| All 14 page paths | ✅ Expected status codes |
| robots.txt | ✅ Correct disallow (api, demo) |
| sitemap.xml | ✅ 13 URLs, fresh deploy today |
| SSL certificate | ✅ 84 days remaining (Let's Encrypt R12) |
| URL audit input | ✅ Functional, preview-first |
| /api/audit POST | ✅ Returns scores + issues + pricing |
| Read-only preview (no email gate) | ✅ Working as designed |
| Email gate (after preview) | ✅ Present at correct funnel position |
| Proposal CTAs | ✅ 10+ CTAs with intent tracking |
| Sample report | ✅ Static demo for HVAC |
| Interactive audit (/try) | ✅ Client-rendered |
| Case studies | ✅ **Updated** — Roofing case study now live |
| SEO structured data | ✅ Schema.org, OG, Twitter cards |
| Google Search Console | ❌ Not available |
| Analytics dashboards | ❌ Not available |
| Lighthouse data | ⚠️ Quota exceeded (known limit) |
| Email handler verification | ❌ Not verifiable read-only |

**Deploy detected:** Sitemap lastmod advanced from 16:59Z to 18:13Z — site was rebuilt/deployed between 11:30 AM MDT and 12:13 PM MDT today. The case-studies page now hosts a real roofing case study (was previously a generic listing).
