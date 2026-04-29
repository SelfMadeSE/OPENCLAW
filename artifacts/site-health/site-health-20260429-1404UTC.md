# Outbound Autonomy — Site Health Report
**Timestamp:** 2026-04-29 08:04 MDT / 14:04 UTC
**Checker:** cron (2bf2b12a)
**Status:** ✅ OPERATIONAL

---

## 1. Live Site Response

| Check | Result |
|---|---|
| **Homepage** (/) | ✅ HTTP 200 — Next.js SSR, full HTML with schema.org structured data, OG tags, nav, hero, audit form, FAQ, footer |
| **SSL Certificate** | ✅ Valid — notBefore=Apr 22 2026, notAfter=Jul 21 2026 |
| **HSTS** | ✅ `strict-transport-security: max-age=63072000` |
| **Response Time** | ✅ ~1.0s total (DNS: 3ms, Connect: 135ms, SSL: 370ms, TTFB: 809ms) |
| **Server** | Vercel, HTTP/2 |

**Verified.** Live, HTTPS, and serving full SSR content.

---

## 2. robots.txt

| Check | Result |
|---|---|
| **/robots.txt** | ✅ HTTP 200 — 107B |

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /demo/
Sitemap: https://outboundautonomy.com/sitemap.xml
```

**Verified.** API and demo paths correctly blocked from crawlers. Sitemap referenced.

---

## 3. Sitemap.xml

| Check | Result |
|---|---|
| **/sitemap.xml** | ✅ HTTP 200 — 4,229B XML |
| **URLs listed** | 24 |
| **Lastmod** | 2026-04-29T12:51:17.872Z (today, recent) |

**Indexed pages:** `/`, `/services`, `/pricing`, `/contact`, `/sample-report`, `/try`, `/case-studies`, `/case-studies/dental`, `/blog` + 11 blog posts, `/faq`, `/about`, `/privacy`, `/terms`, `/cookies`

**Verified.** Complete, well-formed, recently updated.

---

## 4. Key Internal Pages

| Path | Status | Notes |
|---|---|---|
| `/` | ✅ 200 | Hero, audit form, features, FAQ, CTA blocks |
| `/services` | ✅ 200 | Services overview |
| `/pricing` | ✅ 200 | Pricing page |
| `/contact` | ✅ 200 | Contact form (name, email, phone, company, service interest, budget, message) |
| `/sample-report` | ✅ 200 | Read-only sample audit report |
| `/try` | ✅ 200 | Try/preview audit page |
| `/blog` | ✅ 200 | Blog index |
| `/case-studies` | ✅ 200 | Case studies hub |
| `/case-studies/dental` | ✅ 200 | Dental case study |
| `/faq` | ✅ 200 | FAQ page |
| `/about` | ✅ 200 | About page |
| `/privacy` | ✅ 200 | Privacy policy |
| `/terms` | ✅ 200 | Terms of service |
| `/cookies` | ✅ 200 | Cookie policy |

**All 14 pages verified.** No 404s, no redirect chains.

---

## 5. /api/audit Behavior

| Method | Input | Result |
|---|---|---|
| GET | — | ✅ 405 (Method Not Allowed — correct) |
| POST | `{}` (no URL) | ✅ 400 — `{"error":"Missing required field: \"url\". Please include the website URL to audit."}` |
| POST | `{"url":"https://example.com"}` | ✅ 200 — Full audit report returned with scores, issues, recommendations, Lighthouse note |
| POST | With Origin header | ✅ 200 — Same result, no CORS restrictions blocking OA origin |

**Verified.** API correctly validates input and returns comprehensive audit data. Lighthouse reports quota-exceeded for PageSpeed (Google API daily limit) — noted but not a blocker (falls back gracefully without it).

---

## 6. URL Website Audit Input (Homepage Form)

| Check | Result |
|---|---|
| **Form present** | ✅ `<form>` with `audit-input` className on `/#audit` section |
| **Placeholder** | ✅ `placeholder="example.com"` |
| **Submit button** | ✅ "Generate Free Audit" |
| **CTA link** | ✅ "Add business/access details" expandable |
| **Preview-first UX** | ✅ FAQ explicitly states: "The preview is visible before email capture" |

**Verified.** Audit input flow is fully functional with preview-first design.

---

## 7. Email Capture Path

| Check | Result |
|---|---|
| **Email-gated content** | ❌ No required email capture on audit view (preview is free) |
| **Contact form** | ✅ Captures name, email, phone, company, service interest, budget, message |
| **Consent text** | ✅ "By submitting, you consent to Outbound Autonomy contacting you..." |
| **/api/subscribe** | ✅ 404 (no standalone subscribe endpoint — email is captured through contact form only) |
| **Opt-out instruction** | ✅ "To stop non-transactional messages, email owner@outboundautonomy.com with 'STOP'" |
| **Post-audit unlock** | ✅ "If you want the saved version and implementation sequence, you can unlock that with your email after the report is generated" |

**Verified.** Email capture is available post-audit (unlock saved version) and through the contact form. No pre-audit email gate.

---

## 8. Read-Only Report Output

| Check | Result |
|---|---|
| **Preview available without email** | ✅ FAQ confirms no email required for preview |
| **Scoring** | ✅ Design, conversion, technical, overall score with grade |
| **Issues list** | ✅ Severity-labeled (high/medium/low), with evidence and recommendations |
| **Pricing estimates** | ✅ Implementation pricing range per recommendation |
| **Reference examples** | ✅ Fast quote flow, proof-led local page, automated follow-up funnel |
| **Crawl summary** | ✅ Pages scanned, statuses, meta signals |
| **Lighthouse fallback** | ⚠️ PageSpeed quota exceeded (Google API limit) — report still renders without it |
| **Competitive gap** | ✅ OA vs. tools vs. agencies positioning |
| **Implementation estimate** | ✅ $7,500–$15,000+ range presented |

**Verified.** Read-only report output is complete and fully functional.

---

## 9. Proposal CTA

| Check | Result |
|---|---|
| **Post-audit CTAs** | ✅ "Request proposal →" links to `/contact?intent=audit` |
| **Discovery call CTA** | ✅ "Book a discovery call →" links to `/contact?intent=discovery` |
| **Automation CTA** | ✅ "Plan implementation →" links to `/contact?intent=automation` |
| **Hero CTA** | ✅ "Generate free audit" → `/#audit` and "See implementation options" → `/services` |
| **"Get Started" nav button** | ✅ Links to `/contact` |
| **Footer navigation** | ✅ All major pages linked |

**Verified.** CTAs are consistent, intent-tracked via URL params, and funnel toward `/contact`.

---

## 10. Recent Site Artifact State

| Check | Result |
|---|---|
| **Artifacts directory** | ✅ `/artifacts/site-health/` exists with 30 previous reports |
| **Most recent (this run)** | ✅ `site-health-20260429-1404UTC.md` being written now |
| **Prior report trend** | All recent reports (last 24h) show ✅ OPERATIONAL with no regressions |

**Verified.** Continuous health monitoring artifacts are being maintained.

---

## 11. Additional Observations

| Check | Result |
|---|---|
| **Security headers** | ⚠️ Only HSTS detected. No X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, or CSP headers observed |
| **Schema.org markup** | ✅ Present: WebSite, Service, FAQPage schemas |
| **Open Graph** | ✅ Title, description, image (1200×630), type all set |
| **Favicon** | ✅ `/favicon.ico` and `/icon.svg` both present |
| **Demo redirect** | ✅ `/demo/` → 308 redirect (blocked from crawlers via robots.txt) |
| **Accessibility** | ✅ `min-h-screen`, proper heading hierarchy, aria-hidden on decorative icons |
| **Next.js build** | ✅ Build ID: `_femmi4EXCrldxirdRYa1` |

---

## 12. Unavailable Checks

| Check | Reason |
|---|---|
| **Google Search Console** | No API dashboards or credentials available to the agent |
| **Provider dashboards** | Vercel analytics, domain registry, and DNS provider dashboards not accessible |
| **PageSpeed/Lighthouse** | Google PageSpeed Insights API daily quota exceeded (consumer project `583797351490`) — audit falls back gracefully |

---

## Summary

- **✅ 14/14 pages responding HTTP 200**
- **✅ API audit endpoint functional** (validates input, returns comprehensive reports)
- **✅ robots.txt + sitemap.xml correct and up-to-date**
- **✅ Read-only audit preview before email capture** (preview-first funnel intact)
- **✅ Email capture available post-audit** and via contact form with consent
- **✅ Proposal CTAs consistent, intent-tracked**
- **✅ SSL valid, HSTS enforced**
- **⚠️ Security headers minimal** (HSTS only; missing XFO, XCTO, CSP, Referrer-Policy)
- **⚠️ Lighthouse quoted out** (Google API daily limit) — non-blocking, report renders fine
- **❌ Google Search Console / Vercel dashboards** — not available to agent

**Overall: OPERATIONAL — no blockers.**
