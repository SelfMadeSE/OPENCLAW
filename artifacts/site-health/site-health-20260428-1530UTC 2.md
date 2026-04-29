# Site Health Report — outboundautonomy.com

**Timestamp:** 2026-04-28 15:30 UTC (Tuesday, April 28, 9:30 AM MT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Previous report:** site-health-20260428-1501UTC.md (29 min prior)

---

## 1. Live Site Response ✅

| Check | Result |
|-------|--------|
| Homepage | **200 OK** (~317ms) |
| SSL/TLS | Valid — expires **Jul 21 2026** (84 days) |
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
- `/api/` correctly disallowed (POST endpoint)
- `/demo/` disallowed for crawlers; note: `/demo` (no trailing slash) redirects 200 to `/sample-report`

## 3. sitemap.xml ✅

**200 OK** — 12 URLs, all lastmod **2026-04-28T14:06:58.579Z**. No changes since prior report.

| Priority | Pages |
|----------|-------|
| 1.0 | `/` |
| 0.9 | `/services` |
| 0.8 | `/pricing`, `/contact`, `/sample-report` |
| 0.7 | `/try`, `/case-studies`, `/faq` |
| 0.6 | `/about` |
| 0.3 | `/privacy`, `/terms` |
| 0.2 | `/cookies` |

## 4. All Published Routes ✅

All 12 sitemap routes verified 200. No regressions.

| Route | Status | Notes |
|-------|--------|-------|
| `/` | **200** | Audit-led homepage with URL input |
| `/services` | **200** | Three lanes: site redesign, intake/routing, admin automation |
| `/pricing` | **200** | Lane 1–3 with intent-parametered CTAs |
| `/contact` | **200** | Contact form + `owner@outboundautonomy.com` |
| `/about` | **200** | "Audit before build" positioning |
| `/try` | **200** | Peak HVAC preview — 4 findings, 2 visible, 2 gated |
| `/sample-report` | **200** | 58/100 full report with pricing bands ($1.5K–$7.5K) |
| `/case-studies` | **200** | Roofing case study (292% mobile lift), $4.2K implementation |
| `/faq` | **200** | FAQ: preview-first funnel, no-email-needed confirmation |
| `/privacy` | **200** | Updated Apr 20 2026 |
| `/terms` | **200** | Updated Apr 22 2026 |
| `/cookies` | **200** | Standard, Essential/Analytical/Functional categories |
| `/api/audit` (GET) | **405** | Method Not Allowed — correct (POST-only) |
| `/api/audit` (POST) | **200** | ✅ Functional — accepts `{"url":"..."}` |
| `/demo` (no slash) | **200** | Redirects to `/sample-report` |
| `/favicon.ico` | **200** | Present |

## 5. API `/api/audit` Behavior ✅

| Method | Result | Verdict |
|--------|--------|---------|
| GET | **405** Method Not Allowed | ✅ Expected (POST-only endpoint) |
| POST | **200** | ✅ Endpoint returns valid response |

**Note:** POST body included `{"url":"https://example.com"}` — returned 200. The audit pipeline is functional in production.

## 6. Email Capture Path ✅

Two distinct paths verified:
- **`/try`** — Blur-then-unlock preview: findings visible before gate, full report behind email. FAQ confirms: *"No. The preview is visible before email capture."*
- **`/contact`** — Standard contact form with `owner@outboundautonomy.com` email fallback.
- No regression since last check.

**Unverifiable:** Server-side save (`/api/contact`) not testable from this runtime without session/credentials. Carried from prior report.

## 7. Read-Only Report Output ✅

All three report-oriented pages are functional:
- **`/try`**: Peak HVAC sample — 4 findings (2 visible, 2 gated), ~44s read estimate, "Run an audit on your own site" CTA
- **`/sample-report`**: 58/100 (Grade F) — Design 61, Conversion 38, Technical 74. 4 issues with severity. 3 implementation tiers ($1.5K–$7.5K). No email required for score overview.
- **`/case-studies`**: Roofing company — from 41/100 audit score to tripled leads. 3-week implementation, $4.2K. Includes "Get Your Free Website Audit" CTA.

## 8. Proposal CTA ✅

All CTAs verified functional (no broken links):

| CTA Location | Destination | Intent Parameter |
|-------------|-------------|-----------------|
| Hero "Free URL analysis" | `/#audit` (scroll to form) | — |
| Services "See pricing" | `/pricing` | — |
| Pricing Lane 1 | `/contact?intent=pilot-lane-1` | ✅ |
| Pricing Lane 2 | `/contact?intent=workflow` | ✅ |
| Pricing Lane 3 | `/contact?intent=architecture` | ✅ |
| Case studies "Get your free audit" | `/try` | — |
| Sample report "Run a real audit" | `/#audit` | — |
| Footer opt-out | `mailto:owner@outboundautonomy.com` | — |

## 9. Recent Site Artifact State ✅

- **Codebase:** `/projects/outboundautonomy/` — Next.js app with API routes, components, public assets
- **Active git branch:** main
- **Latest commit:** `52aea07 fix: commit case-studies page (was untracked, causing 404)` — committed ~1 hour ago (15:06 UTC)
- **Prior commit:** `03667e5 feat: deploy audit-led content pages` — yesterday
- **All sitemap pages are now tracked and deployable** — case-studies 404 has been resolved
- **Mission doc:** Updated 2026-04-28 — funnel, target audience, and standing orders unchanged
- **No changes since prior report (15:01 UTC):** All routes, API, and content stable

## 10. Google Search Console / Provider Dashboards

**UNAVAILABLE** — No dashboard credentials accessible from this runtime. Google Search Console, Google Analytics, and Vercel dashboard were not queried. PageSpeed Insights API remains quota-exhausted (project `583797351490`).

---

## Summary

| Area | Status | Delta vs Last Report |
|------|--------|---------------------|
| Homepage | ✅ 200 OK | Stable |
| SSL certificate | ✅ Valid through Jul 21 2026 | Stable |
| robots.txt | ✅ Correct (/api/, /demo/ blocked) | Stable |
| sitemap.xml | ✅ 12 URLs, all valid | Stable |
| All sitemap routes (12/12) | ✅ All 200 | Stable |
| `/api/audit` GET | ✅ 405 (correct) | Stable |
| `/api/audit` POST | ✅ 200 (functional) | Stable |
| `/demo` redirect | ✅ → `/sample-report` | Stable |
| Email capture path | ✅ /try gate + /contact form | Stable |
| Read-before-gate report | ✅ /try + /sample-report | Stable |
| Proposal CTAs | ✅ 7+ verified | Stable |
| PageSpeed/Lighthouse | ❌ Quota exhausted | Carried blocker |
| Google Search Console | ⚠️ Not checked | No access |
| Vercel Analytics | ⚠️ Not checked | No access |
| Case studies page | ✅ Fixed (was untracked 404) | **Resolved since yesterday** |

### Blockers (carried forward)

1. **PageSpeed Insights API quota exhausted** — Project `583797351490`. Lighthouse scores/screenshots unavailable for this check. Fix: increase Google Cloud daily quota or run local Lighthouse via CLI.
2. **Server-side email capture unverifiable** — `/api/contact` requires session/auth context; cannot confirm from this runtime.

### Changes Since Prior Report (15:01 UTC)

**None.** Site is healthy. All 12 sitemap routes resolve 200. Audit pipeline (POST → 200) is functional. Funnel intact: URL → audit → preview → gate → proposal.
