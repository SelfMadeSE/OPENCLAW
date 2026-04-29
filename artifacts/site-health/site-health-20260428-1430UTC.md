# Site Health Report — outboundautonomy.com

**Timestamp:** 2026-04-28 14:30 UTC (Tuesday, April 28, 8:30 AM MT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Previous report:** site-health-20260428-1300UTC.md (90 min prior)

---

## 1. Live Site Response ✅

| Check | Result |
|-------|--------|
| Homepage | **200 OK** (~238–398ms) |
| SSL/TLS | Valid — notBefore Apr 22, notAfter Jul 21 2026 (84 days remaining) |
| Server | Vercel (Next.js) |
| DNS | Resolves correctly |

## 2. robots.txt ✅

**200 OK** — Stable:
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /demo/
Sitemap: https://outboundautonomy.com/sitemap.xml
```
- `/api/` and `/demo/` correctly blocked.
- Sitemap reference valid.

## 3. sitemap.xml ✅ (Updated since last report)

**200 OK** — Valid XML, **12 URLs** (up from 8 in prior report):

| URL | Priority | Lastmod |
|-----|----------|---------|
| `/` | 1.0 | 2026-04-28T14:06:58Z |
| `/services` | 0.9 | 2026-04-28T14:06:58Z |
| `/pricing` | 0.8 | 2026-04-28T14:06:58Z |
| `/contact` | 0.8 | 2026-04-28T14:06:58Z |
| `/sample-report` | 0.8 | 2026-04-28T14:06:58Z |
| `/try` | 0.7 | 2026-04-28T14:06:58Z |
| `/case-studies` | 0.7 | 2026-04-28T14:06:58Z |
| `/faq` | 0.7 | 2026-04-28T14:06:58Z |
| `/about` | 0.6 | 2026-04-28T14:06:58Z |
| `/privacy` | 0.3 | 2026-04-28T14:06:58Z |
| `/terms` | 0.3 | 2026-04-28T14:06:58Z |
| `/cookies` | 0.2 | 2026-04-28T14:06:58Z |

**Notable improvement:** `/try`, `/sample-report`, `/case-studies`, `/faq`, `/about` all now included in sitemap — these were missing in prior reports.

## 4. All Published Routes ✅

| Route | Status | Notes |
|-------|--------|-------|
| `/` | **200** | Audit-led homepage |
| `/services` | **200** | Three implementation lanes |
| `/pricing` | **200** | Lane-specific CTAs + pilot FAQ |
| `/contact` | **200** | Contact page with form + email |
| `/about` | **200** | Newly confirmed route |
| `/privacy` | **200** | Legal page |
| `/terms` | **200** | Legal page |
| `/cookies` | **200** | Legal page |
| `/try` | **200** | Example audit (Peak HVAC) with email gate |
| `/sample-report` | **200** | Full sample report with scores + pricing |
| `/case-studies` | **200** | ⬆️ **Previously 404, now resolving** — roofing case study live |
| `/faq` | **200** | Footer-only FAQ content |
| `/demo` | **307** | Redirects to `/demo/hero` |
| `/demo/hero` | **200** | Demo page |
| `/api/health` | **200** | Health endpoint |
| `/audit` | **404** | Not a route (no broken links to it) |
| `/favicon.ico` | **200** | Present |

**Regressions:** None. `/case-studies` has resolved since last report.

## 5. Audit API (`/api/audit`) ✅

| Test | Status | Result |
|------|--------|--------|
| POST `{"url":"https://example.com"}` | **200** | Full audit in 66ms |
| POST `{}` (missing URL) | **400** | `"Missing required field: \"url\""` |
| GET request | **405** | Method Not Allowed (correct) |

**Live audit output for example.com:**
- Overall Score: 69/100 (Grade D)
- Design: 74 | Conversion: 42 | Technical: 92
- 2 high-severity issues detected (weak CTA, no lead form)
- Crawl: same-origin single page
- Scores, issues, evidence, and recommendations all bounded, factual, non-hallucinated

## 6. Email Capture Path ✅

**Two paths verified:**

1. **`/try` (example audit):** Blur-then-unlock pattern — findings 1–2 visible, findings 3–4 blurred. Email gate prompt: *"Enter your email to reveal the full report with prioritized fixes, estimated pricing, and a proposal request path."* Matches spec: "No. The preview is visible before email capture. If you want the saved version... you can unlock that with your email."

2. **`/contact`:** Contact form with fields for name, email, phone, company, service interest. Email contact: `owner@outboundautonomy.com`.

**Server-side:** `/api/contact` returns **400** on test POSTs (likely requires session/auth — not publicly accessible). `/api/subscribe` returns 404. Email capture is client-side rendered; server-side save path not verifiable without authenticated session.

## 7. Read-Only Report Output ✅

**Verified on two pages:**

- **`/try`:** Peak HVAC example — 4 findings, first 2 visible, last 2 gated behind email blur. Readable without authentication.
- **`/sample-report`:** 58/100 overall score (Grade F), 4 issues with severity labels, 3 recommendation tiers with pricing ranges ($1.5K–$3.5K, $2.5K–$6.5K, $3.5K–$7.5K). No email required.

Both match the preview-first funnel spec.

## 8. Proposal CTA ✅

| CTA | Destination | Intent |
|-----|-------------|--------|
| Hero "Generate free audit" | `/#audit` | Scroll to form |
| Services card "Request proposal" | `/contact?intent=audit` | ✅ |
| Services card "Plan implementation" | `/contact?intent=automation` | ✅ |
| Pricing Lane 1 CTA | `/contact?intent=pilot-lane-1` | ✅ |
| Pricing Lane 2 CTA | `/contact?intent=workflow` | ✅ |
| Pricing Lane 3 CTA | `/contact?intent=architecture` | ✅ |
| Footer CTA | `/contact?intent=discovery` | ✅ |
| Bottom banner CTA | `/contact?intent=discovery` | ✅ |

All paths flow to `/contact` with intent parameters. No broken CTA links.

## 9. Recent Site Artifact State

| Artifact | Date | Notes |
|----------|------|-------|
| mission doc | 2026-04-28 | Updated today |
| Prior health reports | Various | 6 prior in `/artifacts/site-health/`, plus ~12 heartbeats in `/projects/outboundautonomy/artifacts/site-health/` |
| Prior blockers | Carried forward | PageSpeed quota exhausted (prev), `/case-studies` 404 (now resolved) |

**Changes since last report (13:00 UTC):**
- Sitemap grew from 8 to 12 URLs (added `/try`, `/sample-report`, `/case-studies`, `/faq`, `/about`)
- `/case-studies` now returns **200** (was 404 in prior heartbeat — deployment propagation complete)
- No other regressions detected

## 10. Google Search Console / Provider Dashboards

**UNAVAILABLE** — No dashboard access from this runtime. Google Search Console, Google Analytics, and Vercel dashboard were not queried. PageSpeed Insights API was tested programmatically and remains quota-exhausted.

---

## Summary

| Area | Status | Delta from Prior |
|------|--------|-----------------|
| Homepage response | ✅ 200 | Stable |
| robots.txt | ✅ Correct | Stable |
| sitemap.xml | ✅ 12 URLs (improved) | ⬆️ Added 4 missing pages |
| All routes | ✅ All 200 | ⬆️ `/case-studies` resolved |
| Audit API (valid) | ✅ 66ms response | Stable |
| Audit API (error handling) | ✅ 400/405 | Stable |
| Email capture path | ✅ /try gate + /contact | Stable |
| Server-side email save | ⚠️ Not verifiable from this runtime | No change |
| Read-before-gate | ✅ Fully working | Stable |
| Proposal CTAs | ✅ 8+ paths verified | Stable |
| Lighthouse/PageSpeed | ❌ **BLOCKER** — Quota exhausted | Carried over (unresolved) |
| Screenshot capture | ❌ Not available | Carried over |
| SSL cert | ✅ Valid through Jul 21 | Stable |
| Build deploy | ✅ Updated today (Apr 28) | Stable |
| Google Search Console | ⚠️ Not checked | No dashboard access |
| Vercel Analytics | ⚠️ Not checked | No dashboard access |

**BLOCKERS (carried forward):**
1. **PageSpeed Insights API quota exhausted** on project 583797351490 — Lighthouse performance/accessibility/seo scores and screenshots are unavailable. Fix: increase daily quota in Google Cloud Console, or implement browser-worker-based Lighthouse capture.
2. **No server-side email save path verifiable** from unauthenticated calls — `/api/contact` returns 400; may require session context.

**No new blockers identified.** Site is healthy. Audit pipeline functional. Sitemap coverage improved. `/case-studies` deploy propagation complete.
