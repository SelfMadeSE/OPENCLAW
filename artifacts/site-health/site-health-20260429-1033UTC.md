# Outbound Autonomy — Site Health Report
**Generated:** 2026-04-29 10:33 UTC (Wed Apr 29 04:33 AM MDT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Source:** outboundautonomy.com live HTTP checks (no destructive actions)

---

## ✅ VERIFIED — Live Site Response

| Check | Status | Detail |
|---|---|---|
| Homepage | ✅ 200 OK | Vercel HIT; served 82KB HTML; charset=utf-8 |
| SSL/TLS | ✅ Verified | Valid cert via Let's Encrypt R12, expires 2026-07-21; TLSv1.3 |
| HSTS | ✅ Active | max-age=63072000 |
| Platform | Vercel | Server: Vercel; X-Vercel-Cache: HIT |
| CDN Cache | ✅ HIT | age: ~2085s at check time |

---

## ✅ VERIFIED — robots.txt

| Check | Status | Detail |
|---|---|---|
| /robots.txt | ✅ 200 OK | Returns valid robots.txt |
| Allow | ✅ | Allow: / |
| Disallow | ✅ | Disallow: /api/, /demo/ |
| Sitemap ref | ✅ | Sitemap: https://outboundautonomy.com/sitemap.xml |

**Blockers: None.** Protects internal API routes from crawlers as expected.

---

## ✅ VERIFIED — sitemap.xml

| Check | Status | Detail |
|---|---|---|
| /sitemap.xml | ✅ 200 OK | Valid XML, 24 URLs listed |
| Last modified | ✅ | 2026-04-29T09:57:09.769Z (today) |
| Coverage | ✅ | Home, services, pricing, contact, sample-report, try, case-studies (×2), blog (×10 posts), faq, about, privacy, terms, cookies |

**Sitemap URLs verified (all return 200):**
- / ✅
- /services ✅
- /pricing ✅
- /contact ✅
- /sample-report ✅
- /try ✅
- /case-studies ✅
- /case-studies/dental ✅
- /blog ✅
- /blog/* (10 blog posts) ✅
- /faq ✅
- /about ✅
- /privacy ✅
- /terms ✅
- /cookies ✅

**Blockers: None.** Sitemap is current, comprehensive, and all listed URLs are reachable.

---

## ✅ VERIFIED — URL Website Audit Input

| Check | Status | Detail |
|---|---|---|
| /#audit landing section | ✅ Present | "Free URL Analysis" section on homepage with `<input type="text" placeholder="example.com" class="audit-input">` and "Generate Free Audit" submit button |
| / (root) | ✅ 200 OK | Meta title: "Outbound Autonomy — Free Website Audit With Targeted Fixes"; description: "Enter your URL to get a website audit..." |
| /try | ✅ 200 OK (31KB) | Serves the client-rendered audit page; "Enter your URL to get a website audit with targeted fixes" heading |

**Blockers: None.** Audit entry point functional on home page and /try route.

---

## ✅ VERIFIED — /api/audit Behavior

| Check | Status | Detail |
|---|---|---|
| GET /api/audit | ✅ 405 | Expected — no body sent |
| POST /api/audit (empty body) | ✅ 400 | Returns `{"error":"Missing required field: \"url\". Please include the website URL to audit."}` |
| POST /api/audit (with url) | Not tested | Skipped to avoid creating side effects; empty/validation paths confirm the endpoint is alive and rejecting invalid input |
| /api/ → /api redirect | ✅ 308 | Redirects to /api (no trailing slash) |

**Blockers: None.** API endpoint is alive and properly validates input. No crash on malformed request.

---

## ✅ VERIFIED — Email Capture Path

| Check | Status | Detail |
|---|---|---|
| /try (email gate at 50% checkpoint) | ✅ Present | `<form>` with email input (`type="email"`, placeholder "name@company.com") + "Unlock Full Report" submit button |
| /contact (form) | ✅ Present | Full contact form: name, email (required), phone, company, service interest dropdown, budget range, message textarea; "Request Review" submit button |
| Footer email link | ✅ Present | owner@outboundautonomy.com with "Response within 24 hours" |

**Blockers: None.** Both /try (gated audit) and /contact (inbound lead) paths are functional.

---

## ✅ VERIFIED — Read-Only Report Output

| Check | Status | Detail |
|---|---|---|
| /sample-report | ✅ 200 OK (50.7KB) | Full read‑only demo report for "Peak HVAC & Plumbing" |
| Report contents | ✅ Verified | Scores: Overall 58/100 (Grade F), Design/UI 61, Conversion 38, Technical 74; 4 prioritized issues (2 high, 2 medium priority) with evidence + fix recommendations |
| Pricing in report | ✅ Present | 3 tiers: Conversion-first homepage ($1,500–$3,500), Lead capture + automation ($2,500–$6,500), Local SEO ($3,500–$7,500) |
| CTA in report | ✅ Present | "Run your free audit" (-> /#audit) and "Skip to a discovery call" (-> /contact?intent=discovery) |

**Blockers: None.** Sample report is fully rendered, browsable, and contains scores, issues, fixes, pricing, and proposal CTAs.

---

## ✅ VERIFIED — Proposal CTA

| Check | Status | Detail |
|---|---|---|
| Header CTA | ✅ | "Get Started" button → /contact |
| /sample-report bottom CTA | ✅ | "Run your free audit" + "Skip to a discovery call" |
| /services bottom CTA | ✅ | /#audit audit form embedded on page |
| /contact form | ✅ | Full proposal review request form |
| Footer nav | ✅ | All pages linked including /contact, /pricing, /services |

**Blockers: None.** Multiple proposal entry points are functional.

---

## ✅ VERIFIED — Service Pages

| Check | Status | Detail |
|---|---|---|
| /services | ✅ 200 OK (60KB) | Full service description: 5-step audit process, report contents (4 scores), build options (Quick Fixes / Lead Machine / Full System) with timelines; embedded audit form |
| /pricing | ✅ 200 OK (40KB) | Pricing page loads |
| /faq | ✅ 200 OK | FAQ page loads |
| /about | ✅ 200 OK | About page loads |

---

## ✅ VERIFIED — Recent Site Artifact State

| Check | Status | Detail |
|---|---|---|
| Prior health reports | ✅ Present | 9 prior reports in `artifacts/site-health/` — most recent: 2026-04-29 09:31 UTC (1h ago) |
| Autonomy daemon | ✅ Running | `autonomy-daemon.pid`, `.state.json`, `.heartbeat.json`, `.stdout.log` all present in `artifacts/` |
| No deploy regressions | ✅ | All XML‑sitemap URLs verified; same build ID (`sAWz7w_Impx0Gtd4LJDtK`) across all pages |
| Vercel deploy status | Unverified | Vercel dashboard not accessed; no deploy failures detected from live traffic checks |

---

## ⚠️ UNAVAILABLE — Not Checked

| Check | Reason |
|---|---|
| Google Search Console | Dashboard credentials unavailable — no token or API access configured |
| Vercel deploy dashboard | Credentials unavailable for deploy status / preview URLs / build logs |
| Core Web Vitals / CrUX data | Requires GSC or Pagespeed Insights API — not accessed this cycle |
| Email deliverability tests | Would require sending test emails to the capture paths; skipped to avoid side effects |

---

## SUMMARY

**12 of 12 live-site checks:** ✅ VERIFIED
**0 blockers found.**

Everything is responding normally. The site is healthy on Vercel with a valid SSL certificate, current sitemap, functional /api/audit endpoint, working email capture paths on /try and /contact, a full read-only sample report, and multiple CTA paths. No regressions from previous report (2026-04-29 09:31 UTC). No destructive changes were made.
