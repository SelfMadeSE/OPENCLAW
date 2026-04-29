# Outbound Autonomy — Site Health Check
**Timestamp:** 2026-04-28 17:00 UTC (Tue Apr 28 11:00 MDT)
**Checked by:** engineering agent (cron:2bf2b12a-0a8b-4243-b59e-bbf941b3a75d)
**Method:** Live HTTP probes (no destructive writes)

---

## ✅ Verified Checks

### 1. Live Site Response
- **https://outboundautonomy.com/** → **HTTP 200** (SSL valid, TLSv1.3 / CHACHA20-POLY1305)
- Content-Type: `text/html; charset=utf-8`
- Response time: 0.65s (Vercel edge network)
- No redirect chains, no TLS errors. Host is up and healthy.

### 2. robots.txt
- **https://outboundautonomy.com/robots.txt** → **HTTP 200**
- Verified content:
  ```
  User-Agent: *
  Allow: /
  Disallow: /api/
  Disallow: /demo/
  Sitemap: https://outboundautonomy.com/sitemap.xml
  ```
- `Disallow: /api/` and `/demo/` are correctly configured. No crawl leakage.

### 3. sitemap.xml
- **https://outboundautonomy.com/sitemap.xml** → **HTTP 200**
- 12 URLs registered:
  `/`, `/services`, `/pricing`, `/contact`, `/sample-report`, `/try`,
  `/case-studies`, `/case-studies/dental`, `/faq`, `/about`,
  `/privacy`, `/terms`, `/cookies`
- Last modified: `2026-04-28T16:59:27.178Z` (today — freshly regenerated)
- Sitemap index (`/sitemap_index.xml`) → **HTTP 404** (expected — single sitemap.xml file)
- Correctly includes `/case-studies/dental` (added in latest deploy).

### 4. URL Website Audit Input
- Homepage (`/#audit` section): URL input field present with `placeholder="example.com"`
- Primary CTAs available:
  - "Generate Free Audit" (homepage audit section form submit button)
  - "Generate free audit" (hero section link)
  - "Run your free audit" (sample-report page CTA)
  - "Preview sample audit report →" (hero sub-link)
- Funnel entry point is functional and visible.

### 5. /api/audit Behavior
- **GET** `https://outboundautonomy.com/api/audit` → **HTTP 405** (Method Not Allowed — correct)
- **POST** `https://outboundautonomy.com/api/audit` with body `{"url":"example.com"}` → **HTTP 200**
  - Response time: 78ms
  - Returns complete JSON audit including:
    - **Overall Score:** 69/100 (Grade D)
    - **Design/UI:** 74 | **Conversion:** 42 | **Technical:** 92
    - 5 issues (2 high, 2 medium, 1 low) with evidence + recommendations
    - 3 implementation recommendations with pricing ranges
    - Crawl summary (1 page scanned on same-origin)
    - Competitive gap analysis (OA vs typical tools vs agencies)
    - `referenceExamples` (actual implementation patterns)
    - Implementation estimate range: $7,500–$15,000+
- **POST** with empty body `{}` → **HTTP 400** with error message: `"Missing required field: \"url\""`
- **Known limitation:** Lighthouse data unavailable — Google PageSpeed Insights quota exceeded (project `583797351490` daily limit hit)
- **Known limitation:** Screenshot unavailable in preview mode (requires browser worker)
- API correctly returns `Content-Type: application/json`

### 6. Read-Only Report Preview (No Email Gate)
- **`/sample-report`** → **HTTP 200** — fully rendered static example audit
  - Score overview: 58/100 (Grade F), with sub-scores Design 61, Conversion 38, Technical 74
  - 4 prioritized issues with evidence + recommended fix
  - 3 implementation options with price ranges ($1,500–$7,500)
- **`/try`** → **HTTP 200** — interactive "Peak HVAC & Plumbing" sample audit
  - Shows real finding cards for 4 conversion issues
  - First 2 findings fully visible, findings 3+4 blurred
  - **Email gate appears at 50% checkpoint** with "Unlock Full Report" CTA requesting work email
  - This matches the funnel design: preview → email gate → full report
- **Verified:** Read-only preview is available without any email barrier.

### 7. Email Capture Path (Unlock Flow)
- FAQ on homepage: *"The preview is visible before email capture. If you want the saved version and implementation sequence, you can unlock that with your email."*
- `/try` page email gate: form with `type="email"`, placeholder `name@company.com`, labeled "Work email"
- Funnel is correctly positioned: **audit preview first → email gate for full unlock → proposal path**
- No bait-and-switch behavior observed.

### 8. Proposal CTAs
All CTAs verified with correct intent-tracking links:
| CTA Text | Destination | Status |
|----------|------------|--------|
| "Book a discovery call →" | `/contact?intent=discovery` | ✅ Present |
| "Request proposal →" | `/contact?intent=audit` | ✅ Present |
| "Plan implementation →" | `/contact?intent=automation` | ✅ Present |
| "Book your free discovery call" | `/contact?intent=discovery` | ✅ Present (bottom CTA) |
| "Get Started" (header button) | `/contact` | ✅ Present |
| "See implementation options" | `/services` | ✅ Present |
| "Generate free audit" | `/#audit` | ✅ Present |

### 9. All Subpages — HTTP 200
| Path | Status | Notes |
|------|--------|-------|
| `/` | 200 | Next.js SSR, schema.org structured data present |
| `/services` | 200 | Three service cards: Audit, Conversion, Automation |
| `/pricing` | 200 | Pricing page |
| `/sample-report` | 200 | Full demo audit (fixed data) |
| `/contact` | 200 | Form with name, email, phone, company, service interest, budget, message |
| `/try` | 200 | Interactive sample audit with email gate |
| `/case-studies` | 200 | Case studies listing |
| `/case-studies/dental` | 200 | Dental practice case study |
| `/faq` | 200 | FAQ accordion |
| `/about` | 200 | About page |
| `/privacy` | 200 | Privacy policy |
| `/terms` | 200 | Terms of service |
| `/cookies` | 200 | Cookie policy |
| `/favicon.ico` | 200 | Favicon serving |

### 10. SEO & Structured Data
- **Schema.org JSON-LD** verified on homepage:
  - `WebSite` — name, URL, description
  - `Service` — free audit offer (price: 0, availability: InStock)
  - `FAQPage` — 4 Q&A entries matching FAQ section
- OG meta tags present for title, description, URL, type, card
- Twitter card tags present (summary_large_image)
- Custom 404 page with redirect to audit funnel
- All pages share consistent `<title>` and `<meta name="description">`

### 11. Site Artifact State
- Build ID: `0Bios6ZKtHi2F1laEjC1z` (current production build)
- Framework: Next.js (React Server Components with client bailout)
- Styles/UI: Tailwind CSS, dark theme (`bg-void text-static`)
- Analytics script detected (likely Vercel Analytics)
- Contact email: `owner@outboundautonomy.com` (consistent footer + contact page)
- Mailing address: 9601 64 Ave, Grande Prairie, AB
- Legal entity: © 2026 Ecosystem Global Solutions
- Opt-out mechanism present in footer

---

## ❗ Unverifiable / Blocked (Read-Only Limitations)

### Google Search Console
- **Unavailable** — no GSC API credentials or dashboard access available from this agent. Cannot verify indexed status, crawl errors, performance data, or manual actions.

### Analytics / Provider Dashboards
- **Unavailable** — analytics provider credentials not accessible. Cannot verify traffic, conversion rates, or bounce metrics.

### Email Capture Backend Handler
- The `/try` email gate and contact form require live form submission to verify backend processing. Without disposable email credentials or test submission capability permitted in this read-only check, the backend handler status is **unverified**.

### Audit Report Persistence
- `/api/audit` returns fresh JSON on each request. No report ID, token, or persistence indicator returned in the response. Whether reports are cached/captured server-side is **not verifiable** from HTTP-only probing.

### Lighthouse / PageSpeed Data
- Google PageSpeed Insights API quota exceeded (daily limit hit) as of this check. Quota resets per Google's daily cycle. This does not block audit delivery but means Lighthouse scores and screenshot are omitted from the preview until quota resets.

---

## ⚠️ Observations & Notes

1. **Conversion score (42) is the weakest signal** — the API correctly identifies this as the primary issue, which aligns with OA's value proposition.
2. **robots.txt correctly blocks /api/ and /demo/** — no crawl leakage of internal endpoints.
3. **Sitemap lastmod is fresh at 16:59 UTC** — content management automation is running correctly.
4. **Case studies page and dental case study** are both serving — was previously broken (404) in earlier checks, now resolved.
5. **"Here's what the work will show" section** still shows the placeholder text about being a new studio — this is intentional (reserved for real client results, no mock-ups/ composites).
6. **No 404s, no redirect loops, no SSL errors** across all checked paths.
7. **Contact form** has 6 fields (name, email, phone, company, service interest dropdown, message) + budget range dropdown — comprehensive enough for lead qualification.
8. **Pricing starts at $499** (footer/scoping section) with audit implementation range $1,500–$3,500 as the entry-level option.

---

## Summary

| Component | Status |
|-----------|--------|
| Homepage (/) | ✅ 200 |
| robots.txt | ✅ 200, correct rules |
| sitemap.xml | ✅ 200, 12 URLs, fresh today |
| URL audit input | ✅ Functional with placeholder |
| /api/audit (POST) | ✅ 200, returns JSON scores + issues + pricing |
| /api/audit (GET) | ✅ 405 (correctly blocked) |
| /api/audit empty body | ✅ 400 with error message |
| Read-only report preview | ✅ Visible without email |
| Sample report (static) | ✅ 200, full demo |
| Interactive audit (/try) | ✅ 200, findings + email gate |
| Email gate position | ✅ After preview (correct funnel design) |
| Proposal CTAs | ✅ 7+ CTAs linking to /contact with intent params |
| Subpages (14 paths) | ✅ All 200 |
| Case studies | ✅ Serving (dental case study live) |
| SEO structured data | ✅ Schema.org / OG / Twitter cards present |
| Google Search Console | ❌ Not accessible |
| Analytics dashboards | ❌ Not accessible |
| Email backend handler | ⚠️ Not verifiable (read-only) |
| Lighthouse data | ⚠️ PageSpeed quota exceeded today |
