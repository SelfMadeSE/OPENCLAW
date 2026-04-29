# Site Health Report — outboundautonomy.com

**Timestamp:** 2026-04-28 13:00 UTC (Tuesday, April 28, 7:00 AM MT)
**Cron ID:** 2bf2b12a-0a8b-4243-b59e-bbf941b3a75d
**Previous report:** site-health-20260428-1230Z.md (30 min prior)

---

## 1. Live Site Response ✅

| Check | Result |
|-------|--------|
| Homepage | **200 OK** in 238ms |
| SSL/TLS | Valid (verify=0), expires **2026-07-21** (84 days) |
| Server | Vercel (Next.js) |
| HSTS | Present |
| DNS | ~42ms resolution |

## 2. robots.txt ✅

**200 OK** — Content correct and stable:
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /demo/
Sitemap: https://outboundautonomy.com/sitemap.xml
```
- `/api/` and `/demo/` correctly blocked from crawlers.
- Sitemap link valid.

## 3. sitemap.xml ✅

**200 OK** — Valid XML, 8 URLs, same as previous report:

| URL | Priority | Change Freq |
|-----|----------|-------------|
| `/` | 1.0 | weekly |
| `/services` | 0.9 | monthly |
| `/pricing` | 0.8 | monthly |
| `/contact` | 0.8 | monthly |
| `/about` | 0.6 | monthly |
| `/privacy` | 0.3 | yearly |
| `/terms` | 0.3 | yearly |
| `/cookies` | 0.2 | yearly |

**Lastmod:** `2026-04-28T12:04:55.295Z` — build deployed today.
**Missing from sitemap (unchanged):** `/try`, `/sample-report`, `/demo/hero` all return 200 but are not in sitemap.

## 4. All Published Routes ✅

| Route | Status | Notes |
|-------|--------|-------|
| `/` | **200** | Audit-led homepage with hero, services, FAQ, CTA |
| `/services` | **200** | Three implementation lanes |
| `/pricing` | **200** | Lane-specific CTAs + pilot FAQ |
| `/contact` | **200** | Contact form + email contact |
| `/about` | **200** | — |
| `/privacy` | **200** | — |
| `/terms` | **200** | — |
| `/cookies` | **200** | — |
| `/try` | **200** | Example audit (Peak HVAC) with email gate at 50% |
| `/sample-report` | **200** | Sample audit summary with scores + pricing tiers |
| `/demo/hero` | **200** | Demo page |
| `/demo/` | **307** | Redirect to `/demo/hero` (trailing slash -> canonical) |
| `/audit` | **404** | Not a route (no broken link to this on live pages) |
| `/favicon.ico` | **200** | Present |

All primary routes returning 200. No 404s in navigation links.

## 5. Audit API (`/api/audit`) ✅

| Scenario | Status | Result |
|----------|--------|--------|
| Valid URL `{"url":"https://example.com"}` | **200** | Full audit in 78ms |
| Missing URL `{}` | **400** | `"Missing required field: \"url\""` |
| Invalid URL | **400** | `"Invalid URL"` |
| GET request (no POST) | **405** | Method not allowed — correct |

**Live audit output for example.com:**
- **Scores:** Design 74, Conversion 42, Technical 92, Overall 69 (Grade D)
- **Issues:** 5 total (2 high, 2 medium, 1 low)
- **Recommendation tiers:** $1.5K–$3.5K, $2.5K–$6.5K, $7.5K–$15K+
- **Crawl:** 1 page (same-origin only)
- **Reference examples:** Fast quote flow, proof-led local page, automated follow-up funnel

**⚠️ Lighthouse still BLOCKED.** Google PageSpeed Insights daily quota remains exhausted:
> `"Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'."`

This means audits currently lack performance/accessibility/seo scores and screenshot capture. **Same blocker as previous 5 reports.**

## 6. Email Capture Path ✅

**Client-side email capture confirmed on two paths:**

1. **`/try` (example audit):** Findings 1-2 visible, findings 3-4 blurred. Email gate at ~50% scroll unlocks full report + pricing. Matches mission statement: "No. The preview is visible before email capture."

2. **`/contact`:** Full form fields rendered in DOM: name, email, phone, company, service interest, budget range, message. Action routes to `owner@outboundautonomy.com`.

**Server-side email endpoints check:**
- `/api/subscribe` → **404** (unchanged)
- `/api/audit/save` → **404** (unchanged)

Email capture works via client-side rendering. No server-side email submission endpoint found — likely handled client-side or not yet deployed.

## 7. Read-Only Report Output ✅

Two audit preview patterns tested and verified:

- **`/try`:** Full example audit for "Peak HVAC & Plumbing" with 4 findings. First 2 fully visible, findings 3-4 blurred with `blur-[1px]`. Email gate prompt: *"Enter your email to reveal the full report with prioritized fixes, estimated pricing, and a proposal request path."*

- **`/sample-report`:** Renders scores (58/100, Grade F), 4 issues with severity labels, and 3 recommendation tiers with pricing ($1.5K–$3.5K, $2.5K–$6.5K, Local SEO + full site structure at $7.5K–$15K+). Read-only, no email gate — used as a preview of the format.

**Both work as designed.** No email required to see the format and first findings.

## 8. Proposal CTA ✅

Multiple CTA paths verified, all flowing to `/contact` with intent parameters:

| CTA Location | Destination | Intent Params |
|-------------|-------------|---------------|
| Hero ("Generate free audit") | `/#audit` | None (scrolls to form) |
| Service card 1 ("Generate audit") | `/#audit` | None |
| Service card 2 ("Request proposal") | `/contact?intent=audit` | ✅ |
| Service card 3 ("Plan implementation") | `/contact?intent=automation` | ✅ |
| Pricing lanes (3 CTAs) | `/contact?intent=pilot-lane-1` | ✅ Intent-specific |
| Pricing lanes | `/contact?intent=workflow` | ✅ |
| Pricing lanes | `/contact?intent=architecture` | ✅ |
| Footer CTA ("Book a free 30-minute discovery call") | `/contact?intent=discovery` | ✅ |
| Bottom banner ("Book your free discovery call") | `/contact?intent=discovery` | ✅ |

All CTAs functional. `/contact?intent=discovery` is the primary proposal path CTA.

## 9. Build State & Artifacts

| Check | Value |
|-------|-------|
| Build ID | `zEkqAGgxqqA25dDlsfpl6` — **unchanged** from prior report |
| Deploy date | 2026-04-28T12:04:55Z (confirmed via sitemap lastmod) |
| Framework | Next.js (App Router) |
| Analytics | Vercel Analytics component present in layout |
| Schema | JSON-LD for WebSite, Service, and FAQPage |

**Existing site health artifacts:**
- `site-health-20260426-1804Z.md`
- `site-health-20260426-1901Z.md`
- `site-health-20260428-1044Z.md`
- `site-health-20260428-1200UTC.md`
- `site-health-20260428-1230Z.md`
- `site-health-20260428-1300UTC.md` (this report)

**Mission alignment:** Clean. Audit-led funnel. No telephony/receptionist/Twilio language. ICP targeting local service businesses. All checks pass.

## 10. Google Search Console / Provider Dashboards

**UNAVAILABLE** — No dashboard access from this runtime. Vercel Analytics is loaded client-side (`<Analytics />` component). Google Search Console, Google Analytics property data, and Vercel dashboard metrics were not queried. PageSpeed Insights API was checked programmatically and remains **quota-exhausted**.

---

## Summary

| Area | Status | Notes |
|------|--------|-------|
| Homepage response | ✅ 200 in 238ms | Faster than 30min ago (389ms) |
| robots.txt | ✅ Correct | Unchanged |
| sitemap.xml | ✅ Valid, 8 URLs | 3 pages missing from sitemap |
| All routes | ✅ All 200 | No broken navigation links |
| Audit API (valid) | ✅ Full audit in 78ms | — |
| Audit API (errors) | ✅ 400/405 handled | — |
| Email capture (client) | ✅ Present on /try, /contact | Blur-then-unlock pattern works |
| Email endpoints (server) | ⚠️ 404 — not deployed | May be client-side only |
| Read-before-gate | ✅ Fully working | Matches spec |
| Proposal CTAs | ✅ 7+ CTA paths with intent | Discovery call is primary |
| Lighthouse/PageSpeed | ❌ **BLOCKER** — Quota exhausted | Same blocker as all prior reports |
| Screenshot capture | ❌ Not available | Depends on PageSpeed or browser worker |
| Build ID | 🔄 Unchanged | Same build as last 5 reports |
| SSL cert | ✅ Valid through 2026-07-21 | 84 days remaining |
| Google Search Console | ⚠️ Not checked | No dashboard access |
| Vercel Analytics | ⚠️ Not checked | No dashboard access |

**Action items:**

1. **🔴 BLOCKER — PageSpeed API quota exhausted.** Fix: Increase Pagespeed Insights API daily quota in Google Cloud Console (project 583797351490) from the free tier, or implement a browser-worker-based Lighthouse capture that bypasses the Google API.
2. **🟡 Add `/try` and `/sample-report` to sitemap.xml** for SEO benefit on audit preview pages.
3. **🟡 Monitor build ID** — current deploy `zEkqAGgxqqA25dDlsfpl6` has been live since prior reports. Check if the /services page Lane 3 (Private AI Operating Systems) is intended content for an audit-led business.

**No critical changes detected since prior report 30 minutes ago.** Site is healthy, audit pipeline is functional, but Lighthouse scoring remains disabled by API quota exhaustion.
