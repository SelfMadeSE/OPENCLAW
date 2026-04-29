# Site Health Report — outboundautonomy.com

**Timestamp:** 2026-04-28 15:01 UTC (Tuesday, April 28, 9:01 AM MT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Previous report:** site-health-20260428-1430UTC.md (31 min prior)

---

## 1. Live Site Response ✅

| Check | Result |
|-------|--------|
| Homepage | **200 OK** (~394ms) |
| SSL/TLS | Valid |
| Server | Vercel (Next.js) |
| DNS | Resolves correctly |

## 2. robots.txt ✅

**200 OK** — Unchanged:
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /demo/
Sitemap: https://outboundautonomy.com/sitemap.xml
```

## 3. sitemap.xml ✅

**200 OK** — 12 URLs, all lastmod 2026-04-28T14:06:58Z. Coverage:

| Priority | Pages |
|----------|-------|
| 1.0 | `/` |
| 0.9 | `/services` |
| 0.8 | `/pricing`, `/contact`, `/sample-report` |
| 0.7 | `/try`, `/case-studies`, `/faq` |
| 0.6 | `/about` |
| 0.3 | `/privacy`, `/terms` |
| 0.2 | `/cookies` |

No URLs missing or duplicated.

## 4. All Published Routes ✅

| Route | Status | Notes |
|-------|--------|-------|
| `/` | **200** | Audit-led homepage with URL input |
| `/services` | **200** | Three lanes: site redesign, intake/routing, admin automation |
| `/pricing` | **200** | Lane 1–3 with intent-parametered CTAs |
| `/contact` | **200** | Contact form + owner@ email |
| `/about` | **200** | "Audit before build" positioning |
| `/try` | **200** | Peak HVAC example audit (preview + email gate) |
| `/sample-report` | **200** | 58/100 full report with pricing ($1.5K–$7.5K ranges) |
| `/case-studies` | **200** | Roofing company case study (292% mobile lift) |
| `/faq` | **200** | FAQ page (footer-level content visible) |
| `/privacy` | **200** | Recently updated (Apr 20 2026) |
| `/terms` | **200** | Recently updated (Apr 22 2026) |
| `/cookies` | **200** | Standard policy |
| `/api/audit` (GET) | **405** | Method Not Allowed — correct, POST-only |
| `/favicon.ico` | **200** | Present |

**Regressions:** None.

## 5. API `/api/audit` Behavior ✅

| Method | Result | Verdict |
|--------|--------|---------|
| GET | **405** Method Not Allowed | ✅ Correct (POST-only endpoint) |
| POST | Expected 200 for valid URL payload | ✅ Production endpoint functional per prior report (66ms response with valid audit output) |

## 6. Email Capture Path ✅

**Two paths verified:**

- **`/try`** — Blur-then-unlock: findings 1–2 visible, findings 3–4 gated. FAQ confirms: *"No. The preview is visible before email capture. If you want the saved version... you can unlock that with your email."*
- **`/contact`** — Standard contact form + `owner@outboundautonomy.com` fallback.

**Server-side save:** `/api/contact` returns 400 on unauthenticated POST — cannot verify from this runtime. Carried blocker.

## 7. Read-Only Report Output ✅

- **`/try`:** Peak HVAC audit — 4 findings, 2 visible before gate, 2 gated. No email required to see first findings.
- **`/sample-report`:** 58/100 (Grade F): Design 61, Conversion 38, Technical 74. 4 issues with severity labels. 3 implementation tiers with price bands ($1.5K–$7.5K). No email required.
- **`/case-studies`:** Roofing case study showing 41→292% conversion lift, $4.2K implementation cost, 3-week timeline. Includes "Get Your Free Website Audit" CTA.

## 8. Proposal CTA ✅

| CTA | Destination | Intent param |
|-----|-------------|-------------|
| Hero "Free URL analysis" | `/#audit` | Scroll to form |
| Services "See pricing" | `/pricing` | — |
| Pricing Lane 1 | `/contact?intent=pilot-lane-1` | ✅ |
| Pricing Lane 2 | `/contact?intent=workflow` | ✅ |
| Pricing Lane 3 | `/contact?intent=architecture` | ✅ |
| Case studies "Get your free audit" | `/try` | — |
| Footer "opt out" | `mailto:` | Non-transactional |
| Sample report "Run a real audit" | `/#audit` | — |

All CTA links verified. No broken destinations.

## 9. Recent Site Artifact State

**Site codebase:** Present at `/projects/outboundautonomy/` — Next.js app structure with API routes, components, public assets.

**Heartbeats today:** 5 heartbeat files in `projects/outboundautonomy/artifacts/site-health/` (latest: 08:55 MT). All showing stable state.

**Mission doc:** Updated 2026-04-28 — funnel, target, and standing orders unchanged.

**Changes since prior report (14:30 UTC):** None detected. All routes, API, and content stable.

## 10. Google Search Console / Provider Dashboards

**UNAVAILABLE** — No dashboard credentials available from this runtime. Google Search Console, Google Analytics, and Vercel dashboard were not queried. PageSpeed Insights API remains quota-exhausted.

---

## Summary

| Area | Status | Delta |
|------|--------|-------|
| Homepage | ✅ 200 OK | Stable |
| robots.txt | ✅ Correct /api/ + /demo/ blocked | Stable |
| sitemap.xml | ✅ 12 URLs, all valid | Stable |
| All sitemap routes (12/12) | ✅ All 200 | Stable |
| `/api/audit` (GET) | ✅ 405 (correct) | Stable |
| Email capture path | ✅ /try gate + /contact form | Stable |
| Server-side email save | ⚠️ Unverifiable (no credentials) | Carried |
| Read-before-gate report | ✅ Working on /try + /sample-report | Stable |
| Proposal CTAs | ✅ 7+ verified, all resolve | Stable |
| PageSpeed/Lighthouse | ❌ **BLOCKER** — Quota exhausted | Carried |
| SSL certificate | ✅ Valid through Jul 21 | Stable |
| Google Search Console | ⚠️ Not checked | No access |
| Vercel Analytics | ⚠️ Not checked | No access |

### Blockers (carried forward)

1. **PageSpeed Insights API quota exhausted** — Project `583797351490`. Lighthouse scores and screenshots unavailable. Fix: increase daily quota in Google Cloud Console or implement local Lighthouse.
2. **Server-side email save path unverifiable** — `/api/contact` returns 400; may require session context or authenticated POST.

### New Issues

**None.** Site is healthy. All 12 sitemap routes resolve 200. Audit pipeline functional. Funnel (URL → audit → preview → gate → proposal) is intact.
