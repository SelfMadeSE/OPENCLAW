# Outbound Autonomy — Site Health Check
**Timestamp:** 2026-04-28 16:40 UTC (Tue Apr 28 10:40 MDT)
**Checked by:** engineering agent (cron:2bf2b12a-0a8b-4243-b59e-bbf941b3a75d)
**Method:** Live HTTP probes (no destructive writes)

---

## ✅ Verified Checks

### 1. Live Site Response
- **https://outboundautonomy.com/** → **HTTP 200** (SSL valid, content-type: text/html)
- Server: Vercel (edge network, fra1::iad1)
- Build ID: `3qA32NQfP54bzjrjxuj8X`
- Framework: Next.js (RSC payload detected)
- No redirect chains, no TLS errors, no downtime observed.

### 2. robots.txt
- **https://outboundautonomy.com/robots.txt** → **HTTP 200**
- Content:
  ```
  User-Agent: *
  Allow: /
  Disallow: /api/
  Disallow: /demo/
  Sitemap: https://outboundautonomy.com/sitemap.xml
  ```
- `Disallow: /api/` is correct (audit API should not be crawled).

### 3. sitemap.xml
- **https://outboundautonomy.com/sitemap.xml** → **HTTP 200**
- 12 URLs registered:
  `/`, `/services`, `/pricing`, `/contact`, `/sample-report`, `/try`,
  `/case-studies`, `/faq`, `/about`, `/privacy`, `/terms`, `/cookies`
- Last modified: `2026-04-28T14:06:58.579Z` (today — fresh)
- Sitemap correctly includes `/case-studies` (was recently added).

### 4. URL Website Audit Input
- **Homepage (/#audit):** URL input field detected with `placeholder="example.com"`
- **Primary CTAs:**
  - "Generate free audit" (homepage hero)
  - "Generate Free Audit" (audit section)
  - "Run your free audit" (sample-report page)
  - "Start with Your URL →" (services page CTA)
- The funnel entry point is functional and visible.

### 5. /api/audit Behavior
- **POST https://outboundautonomy.com/api/audit** → **HTTP 200**
- Body: `{"url":"https://example.com"}`
- Response (JSON, 48ms): live audit generated successfully
- Sample output for example.com:
  - **Overall Score:** 69/100 (Grade D)
  - **Design/UI:** 74 | **Conversion:** 42 | **Technical:** 92
  - **5 issues found** (2 high, 2 medium, 1 low — correct categorization)
  - Signals detected: title, H1, 200 response in 48ms over HTTPS
  - Issues included: weak CTA, no lead form, missing trust proof, no location schema
  - Each issue has: severity, title, evidence, and recommendation
- API responds with correct Content-Type: `application/json`
- Cache: MISS (fresh compute) — expected behavior

### 6. Read-Only Report Output (No Email Gate)
- **Sample report** → **https://outboundautonomy.com/sample-report** → **HTTP 200**
- Displays: score overview (58/100, Grade F), scorecard breakdown, 4 prioritized issues with evidence/fix, 3 implementation options with price ranges ($1,500–$7,500)
- **Verified:** Read-only preview is visible without email — matches funnel spec.
- CTA below sample: "Run your free audit" + "Skip to a discovery call"

### 7. Email Capture Path (Plan/Save Funnel)
- FAQ on homepage confirms: *"No. The preview is visible before email capture. If you want the saved version and implementation sequence, you can unlock that with your email after the report is generated."*
- The "Plan" step in How It Works: "Save the audit to unlock sequencing, budget range, and a proposal path."
- Email gate is **positioned correctly** — after preview, before unlock. Not blocking the initial audit view.

### 8. Proposal CTA
- **Main CTAs confirmed:**
  - "Book a discovery call →" (links to `/contact?intent=discovery`)
  - "Request proposal →" (links to `/contact?intent=audit`)
  - "Plan implementation →" (links to `/contact?intent=automation`)
  - "Apply for a pilot slot" (pricing page → `/contact?intent=pilot-lane-1`)
  - "Book your free discovery call" (homepage CTA section)
- **Contact page** → **HTTP 200** with `intent` query params passed through.

### 9. All Subpages — HTTP 200
| Path | Status |
|------|--------|
| `/` | 200 |
| `/services` | 200 |
| `/pricing` | 200 (cache HIT) |
| `/sample-report` | 200 |
| `/contact` | 200 |
| `/try` | 200 |
| `/case-studies` | 200 |
| `/faq` | 200 |
| `/about` | 200 |
| `/privacy` | 200 |
| `/terms` | 200 |
| `/cookies` | 200 |
| `/demo` | 200 (disallowed in robots.txt) |

### 10. Recent Site Artifact State
- **Git log** (local repo at `projects/outboundautonomy`):
  ```
  fcdd0e2 feat: add dental practice case study + sitemap entry
  52aea07 fix: commit case-studies page (was untracked, causing 404)
  03667e5 feat: deploy audit-led content pages
  3a7b0e3 feat: add competitiveGap field to audit API
  ea53760 fix: add /sample-report and /case-studies to sitemap
  ```
- **Recent production changes:**
  - Dental practice case study added and deployed
  - Case studies page deployed (was previously causing 404)
  - Audit-led content pages (About, Services, FAQ rewritten)
  - `competitiveGap` field added to API response
  - Sitemap updated with /sample-report and /case-studies
- **Artifacts directory:** Engineering notes, site-audit-readiness doc, Google Workspace lead storage setup, and site-health subdirectory with 10+ recent reports.
- SEO structured data deployed: WebSite, Service, and FAQPage schema.org JSON-LD (verified on homepage).

### 11. SEO & Structured Data
- Schema.org JSON-LD found on homepage:
  - `WebSite` — name, description, URL
  - `Service` — free audit offer (price: 0, availability: InStock)
  - `FAQPage` — 4 Q&A entries matching homepage FAQ section
- OG/Twitter meta tags present on all pages checked.
- Custom 404 page with call-to-action (redirects to audit funnel).

---

## ❗ Unverifiable / Unavailable

### Google Search Console
- **Unavailable** — no GSC API credentials or dashboard access available from this agent. Auth tokens not provided.

### Analytics / Provider Dashboards
- **Unavailable** — analytics provider (likely Vercel Analytics or similar) not accessible from this agent. No dashboard credentials provided.

### Email Capture Backend
- The email capture/gate flow ("save the audit to unlock") requires an actual submission. Without test credentials or a disposable email to submit, we **verified the copy states it works** but **cannot verify the backend handler processes submissions successfully** without a live end-to-end test.

### Audit Webhook / Downstream Processing
- The `/api/audit` returns JSON synchronously. Whether the report is persisted/cached server-side or regenerated on each request is not verifiable from HTTP behavior alone. No data persistence was observed in the response (no report ID or token returned).

---

## ⚠️ Observations & Notes

1. **Conversion score is the weakest signal** — the API scored example.com at 42 for conversion, which aligns with the product's value prop (fixing conversion leaks).
2. **robots.txt blocks /api/ and /demo/ correctly** — no crawl leakage of internal endpoints.
3. **Sitemap lastmod is fresh** (today, 14:06 UTC) — content management automation is running.
4. **Case studies page** was recently broken (404) and fixed in the last deploy — healthy now.
5. **"Here's what the work will show" section** on homepage still displays the placeholder text about being a new studio. This is intentionally reserved for real client results (no mock-ups).
6. **No 404s, no redirect loops, no SSL errors** across all 12 sitemap paths plus /demo.

---

## Summary

| Component | Status |
|-----------|--------|
| Homepage (/) | ✅ 200 |
| robots.txt | ✅ 200, correct rules |
| sitemap.xml | ✅ 200, 12 URLs, fresh |
| URL audit input | ✅ Functional |
| /api/audit endpoint | ✅ 200, returns JSON scores + issues |
| Read-only report preview | ✅ Visible without email |
| Email gate position | ✅ After preview (per funnel design) |
| Proposal CTAs | ✅ 5+ CTAs linking to /contact with intent params |
| Subpages (12 paths) | ✅ All 200 |
| Case studies | ✅ Fixed, now serving |
| SEO structured data | ✅ Schema.org / OG / Twitter cards present |
| Google Search Console | ❌ Not accessible |
| Analytics dashboards | ❌ Not accessible |
| Email backend handler | ⚠️ Not verifiable via read-only checks |
