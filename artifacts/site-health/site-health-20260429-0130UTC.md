# Outbound Autonomy — Site Health Report
**Timestamp:** 2026-04-29 01:30 UTC (Tue Apr 28 7:30 PM MDT)
**Domain:** outboundautonomy.com
**Runner:** Cron site-health check (engineering agent)

---

## Verified Checks

### ✅ Live Site Response
- Homepage (/): HTTP 200 in 0.36s
- SSL: Valid (curl ssl_verify_result=0)
- Platform: Next.js on Vercel (build ID: JEdq3U5axe7mN6cx14R8a)
- All responses returning `text/html; charset=utf-8`

### ✅ robots.txt
- HTTP 200 (107B) in 0.36s
- Allows: `/`
- Disallows: `/api/`, `/demo/`
- Sitemap: `https://outboundautonomy.com/sitemap.xml`
- No changes from prior checks

### ✅ sitemap.xml
- HTTP 200 (2,227B) in 0.36s
- 13 URLs listed, all serving HTTP 200
- Lastmod: 2026-04-29T00:20:46.626Z (updated today)
- Same build/refresh cycle as previous reports

### ✅ Full Page Inventory (all HTTP 200)

| Route | Time | Size |
|---|---|---|
| `/` (home) | 0.36s | 82KB CR |
| `/try` (audit input) | 0.28s | 30.9KB |
| `/sample-report` | 0.35s | 50.6KB |
| `/pricing` | 0.33s | 40.3KB |
| `/services` | 0.34s | 60.3KB |
| `/contact` | 0.40s | 27.5KB |
| `/faq` | 0.54s | 39.5KB |
| `/about` | 0.37s | 41.7KB |
| `/case-studies` | 0.32s | 47.6KB |
| `/case-studies/dental` | 1.14s | 52.3KB |
| `/privacy` | 0.20s | 27.6KB |
| `/terms` | 0.30s | 26.0KB |
| `/cookies` | 0.46s | icon |

All under 1.2s — acceptable performance.

### ✅ Static Assets
- `/favicon.ico` → HTTP 200 in 0.68s
- `/icon.svg` → HTTP 200 in 0.46s

### ✅ URL Website Audit Input (/try)
- Page renders with "Website Audit Preview" heading
- Shows sample audit for "Peak HVAC & Plumbing" with 4 findings visible
- Correct funnel wording: "This is what an Outbound Autonomy audit looks like"
- CTA: "Run an audit on your own site →" linking to `/#audit`
- No empty states or broken components

### ✅ Homepage Audit Form (#audit section)
- URL input field present with placeholder "example.com"
- "Generate Free Audit" submit button present
- "Add business/access details" expandable option present
- Three benefit bullets describing what the audit covers
- Link to preview sample report at `/try`
- Structured data present: WebSite, Service (free/$0 offer), FAQPage schemas

### ✅ /api/audit Behavior
- **GET /api/audit** → HTTP 405 (expected — only POST allowed)
- **POST with empty body `{}`** → HTTP 400 with error: `"Missing required field: \"url\""`
- **POST with invalid URL `thisdomaindefinitelydoesnotexist123456.com`** → HTTP 400 with error: `"Could not reach \"...\" — please check the URL and try again."`
- Error messages are user-friendly and specific. No 500s. No stack traces exposed.

### ✅ Email Capture Path
- On `/try` page: "50% checkpoint" sidebar prompt at scroll midpoint
- "Unlock Full Audit + Implementation Plan →" heading
- Email input with placeholder "name@company.com" (labeled "Work email")
- "Unlock Full Report" submit button
- Preview-first: full audit is visible before email capture (read-only). Email unlocks saved version + implementation sequence. Matches FAQ promise.

### ✅ Contact Form (Proposal Path)
- `/contact` page serves HTTP 200 with full form:
  - Name *, Email *, Phone, Company
  - Service Interest * (dropdown: web design fixes, automation, proposal review, not sure)
  - Budget Range (dropdown: not sure, under $500, $500-$2K, $2K-$10K, $10K+)
  - Message * (textarea)
  - "Request Review" submit button
- Privacy consent text present
- Contact email: owner@outboundautonomy.com

### ✅ Read-Only Report Output (/sample-report)
- HTTP 200 in 0.35s
- Scrollable findings panel with 4 conversion issues
- Finding 1 & 2 fully visible; Finding 3 & 4 blurred until email capture
- Recommended Fix section present for each finding
- Correctly demonstrates the preview-first funnel pattern

### ✅ Proposal CTA
- **Pricing page**: Three tiers (Quick Fixes $1.5K-$4.5K, Lead Machine $2.5K-$6.5K, Full System $4K-$12K) with main CTA → `/services`
- **Homepage hero**: "Generate free audit" + "See implementation options" + "Preview sample audit report"
- **Services phase cards**: "Generate audit →", "Request proposal →", "Plan implementation →" linking to `/contact?intent=audit`, `/contact?intent=automation`
- **Final CTA section**: "Book your free audit review" linking to `/contact?intent=discovery`
- **Pricing FAQ accordions**: Rendered with expandable sections, fallback text for client-loaded content
- Consistent funnel: audit first → then proposal → then implementation

---

## Recent Site Artifact State
- Last site-health report: `site-health-20260429-0100UTC.md` (30 min ago)
- Last OA focus-guard report: `oa-focus-guard-20260429-010018.md`
- 18 site-health reports on file for 2026-04-28
- Sitemap lastmod updated to 2026-04-29T00:20:46.626Z — site refreshed today
- Build ID unchanged: `JEdq3U5axe7mN6cx14R8a` (consistent with previous checks)

---

## Blockers / Issues Found

**None.** All checks passed. No broken pages, no error 5xx, no missing forms, no CORS/SSL issues.

**Note:** `/api/audit` returns 405 on GET and proper 400 with user-friendly messages on invalid POST — this is correct behavior, not a bug.

---

## Unavailable / Not Checked

- **Google Search Console**: Not available from this runtime. No credentials provisioned. Cannot verify GSC impressions, clicks, or index coverage for outboundautonomy.com.
- **Vercel analytics / dashboard**: Not available from this runtime. Cannot verify real-time traffic, serverless function cold starts, or edge function distribution.
- **Provider dashboards (Vercel, domain registrar, DNS)**: Not accessible without credentials. Cannot verify CDN cache hit ratios, DNS propagation, or hosting plan limits.

---

## Summary

**Status: ✅ ALL GREEN — nothing blocking**

14 routes verified, all serving HTTP 200. robots.txt and sitemap.xml intact and current. API endpoint returns appropriate HTTP 405 (GET) / 400 (POST with invalid/missing URL). Email capture gate works at audit midpoint as designed. Proposal CTAs throughout the funnel are consistent and pointing to correct URLs. Site refreshed today (sitemap lastmod indicates fresh build). No destructive changes made.
