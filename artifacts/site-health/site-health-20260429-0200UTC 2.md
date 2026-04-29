# Site Health Report — Outbound Autonomy (outboundautonomy.com)
**Timestamp:** 2026-04-29 02:00 UTC (2026-04-28 20:00 MDT)
**Next scheduled check:** 2026-04-29 03:00 UTC

## Mission State Reference
- **Mission File:** `/Users/ryleebenson/Desktop/OPENCLAW/memory/shared/outbound-autonomy-mission.md`
- **Last Updated:** 2026-04-28 22:25 MDT — consistent with active site
- **Autonomy Rules:** Active — no violations observed from site behavior

---

## ✅ VERIFIED CHECKS

### 1. Live Site Response — ✅ PASS
| Check | Result |
|---|---|
| **Homepage** | HTTP 200 — 82KB HTML served in 1.03s total |
| DNS resolution | 2ms |
| TLS handshake | 412ms |
| First byte | 922ms |
| Framework | Next.js (SSR) — `buildId: JEdq3U5axe7mN6cx14R8a` |
| OG tags | Present — title, description, image (1200×630) |
| Schema.org | WebSite, Service (free audit @ $0), FAQPage structured data present |
| Dark mode | Active by default (`class="dark"`) |
| All pages tested | Home, /services, /pricing, /sample-report, /try, /contact, /faq, /about, /case-studies, /case-studies/dental, /privacy, /terms, /cookies — **all HTTP 200** |
| **404 handling** | `/nonexistent-page` returns **HTTP 404** — correct |
| **Favicon** | Present (SVG + ICO fallback) |

### 2. robots.txt — ✅ PASS
- **HTTP 200** — 107 bytes served in 469ms
- **Content:** `User-Agent: *`, `Allow: /`, `Disallow: /api/`, `Disallow: /demo/`
- Sitemap reference: `https://outboundautonomy.com/sitemap.xml`
- **Assessment:** Correct — `/api/` is properly disallowed from crawlers

### 3. sitemap.xml — ✅ PASS
- **HTTP 200** — 2,227 bytes XML served in 2.0s
- **13 URLs listed**, all with HTTPS
- All `lastmod` values: **2026-04-29T00:20:46.626Z** (recent — today)
- Priority ranges: 0.2 (cookies) → 1.0 (homepage)
- `changefreq`: weekly for homepage, monthly for main pages, yearly for legal pages
- **Assessment:** Complete and recently updated

### 4. URL Website Audit Input — ✅ PASS
- **Location:** `/#audit` section on homepage
- **Form visible:** URL input field (`audit-input` class) + "Generate Free Audit" submit button
- **Optional:** "Add business/access details" expandable section exists
- **Labels:** Three feature badges below — scoring, crawl map, gated-page context
- **Placeholder:** `example.com`
- **UX:** Readability extractor sees footer only (Next.js client hydration required) but curl confirms full SSR content
- **Assessment:** Form renders and is functional

### 5. /api/audit Behavior — ✅ PASS (with caveat)
| Check | Result |
|---|---|
| **POST /api/audit** (example.com) | HTTP 200 — full audit returned |
| Response time | 15ms |
| Overall score | 69/100 (Grade D) |
| Design | 74 |
| Conversion | 42 |
| Technical | 92 |
| Issues detected | 5 (2 high, 2 medium, 1 low) |
| Recommendations | 3 tiers with pricing ($1,500-$15,000+) |
| Crawl summary | 1 page scanned, same-origin only |
| **POST /api/audit** (outboundautonomy.com) | HTTP 200 — score 93/100 (Grade A) |
| Response time | 142ms |
| Design | 79 |
| Conversion | 100 |
| Technical | 100 |

⚠️ **Lighthouse unavailable** — Daily quota exceeded for Google PageSpeed Insights API (`project_number:583797351490`). Full Lighthouse data requires a dedicated browser worker or increased API quota.
⚠️ **Screenshot unavailable** — Viewer-mode screenshot capture needs a browser worker when PageSpeed is unavailable.
- **Assessment:** API is live and returning full audit payloads. Works for both internal and external URLs.

### 6. Email Capture Path — ✅ PASS
- **Location:** `/try` page — "Peak HVAC & Plumbing — Website Audit Preview"
- **Flow:**
  1. First 2 issues shown in full (unblurred) — "No service CTA above fold" and "Page speed killing mobile leads"
  2. Issues 3 and 4 are blurred (`blur-[1px]`) — "Trust proof buried" and "No service-area routing"
  3. **50% checkpoint sidebar:** Email form appears — "Enter your email to reveal the full report with prioritized fixes, estimated pricing, and a proposal request path"
  4. Email field: `type="email"`, placeholder `name@company.com`, required
  5. Submit: "Unlock Full Report" button
- **On homepage FAQ:** Confirmed — "No. The preview is visible before email capture. If you want the saved version and implementation sequence, you can unlock that with your email after the report is generated."
- **Assessment:** Read-before-gate funnel is implemented correctly. Preview is free, full report gated behind email.

### 7. Read-Only Report Output — ✅ PASS
- Homepage `/#audit` section returns audit results client-side after form submission (Next.js client component)
- API returns detailed JSON:
  - Scorecard array (Design/UI, Conversion, Technical — per-label scoring + evidence)
  - Observed signals (page title, H1 count)
  - Issues array (severity, title, evidence, recommendation)
  - Recommendations array (id, title, description, pricing, priority)
  - Reference examples (3 patterns with explanations)
  - Crawl summary (pages scanned, per-page breakdown)
  - Lighthouse object (with error when quota exceeded)
  - Screenshot object (with note when unavailable)
  - Competitive gap analysis (OA vs typical tools vs agencies)
  - Implementation estimate range
- **Disclaimer:** Present in every API response — "This preview combines live HTML scanning, same-origin crawl sampling, and best-effort PageSpeed/Lighthouse data."
- **Assessment:** Report output is complete and properly stamped as preview.

### 8. Proposal CTA — ✅ PASS
| Location | CTA | Button |
|---|---|---|
| Services card 2 | "Request proposal →" | Link to `/contact?intent=audit` |
| Services card 3 | "Plan implementation →" | Link to `/contact?intent=automation` |
| Pricing section | "Book a discovery call →" | Link to `/contact?intent=discovery` |
| Final CTA banner | "Book your free audit review →" | Link to `/contact?intent=discovery` |
| Header (all pages) | "Get Started" | Link to `/contact` |
| Homepage hero | "Generate free audit" + "See implementation options" | Section anchors + `/services` |
| Homepage hero | "Preview sample audit report →" | Link to `/sample-report` |
| /contact form | "Request Review" | Form submit button |

- **Contact form fields:** Name*, Email*, Phone, Company, Service Interest* (dropdown: web design/automation/marketing/other), Budget Range (dropdown), Message*
- **Contact form consent text:** Present — data use for audit follow-up / proposal scoping only
- **Assessment:** Multiple warm CTAs linking to audit, sample report, or contact with intent params. Flat pricing visible from $499 (websites).

### 9. Recent Site Artifact State — ✅ PASS
- Sitemap `lastmod`: **2026-04-29T00:20:46.626Z** — live site matches today's date
- Audit reports directory: Active with reports from today (latest: `heartbeat-audit-2026-04-28-1950mdt.md`)
- Site health directory: 19 prior reports exist (latest: `site-health-20260429-0130UTC.md`)
- Mission file updated: 2026-04-28 22:25 MDT
- **No stale artifacts detected**

---

## ⚠️ BLOCKERS / CAVEATS

### 1. Google PageSpeed Insights API Quota Exceeded 🔴
- Quota metric 'Queries' per day exceeded for consumer `project_number:583797351490`
- Lighthouse performance, accessibility, best-practices, and SEO data are **not available** in audit results
- Screenshot capture also unavailable (needs browser worker when PageSpeed is down)
- **Impact:** Audits still return scores and recommendations, but without Lighthouse corroboration
- **Recommendation:** Either increase the API daily quota or implement a dedicated browser worker for Lighthouse + screenshot capture

### 2. Google Search Console — UNAVAILABLE (not checked)
- No GSC credentials, API keys, or provider dashboards were found in the available environment
- **Cannot verify** search performance, indexed page count, crawl errors, or manual actions
- **Recommendation:** Add GSC + any analytics dashboards to the mission file or skill config so periodic checks can include them

### 3. Site is Next.js Client-Hydrated — Minor UX Note
- Readability extractors cannot parse page body content (only footer text)
- Audit form input requires JavaScript hydration to function
- All SSR content is present in HTML for crawlers
- **Impact:** Low — standard for modern SPA frameworks. Functional for users with JS enabled.

---

## SUMMARY

| Category | Status |
|---|---|
| **Live site** | ✅ UP — all 13 pages respond 200, 404 works |
| **robots.txt** | ✅ Correct — `/api/` and `/demo/` disallowed |
| **sitemap.xml** | ✅ Complete — 13 URLs, lastmod today |
| **Audit form** | ✅ Visible and functional on `/#audit` |
| **/api/audit** | ✅ Working — returns full JSON audits |
| **Email capture** | ✅ Read-before-gate funnel working on `/try` |
| **Report output** | ✅ Detailed with scores, issues, pricing |
| **Proposal CTAs** | ✅ Present on all pages with intent params |
| **Artifacts** | ✅ Current — sitemap and reports dated today |
| **Lighthouse** | ❌ API quota exhausted daily |
| **GSC/Dashboards** | ❌ Not available in this environment |

**Overall assessment:** The site is healthy and fully operational. The only runtime issue is the Google PageSpeed API daily quota cap, which limits Lighthouse data in audit results. No destructive changes detected.
