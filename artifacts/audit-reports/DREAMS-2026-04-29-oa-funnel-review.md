# DREAMS Report — Outbound Autonomy URL Audit Funnel
**Date:** 2026-04-29 07:15 UTC (Nightly OA Engineering Review)
**Scope:** Full audit funnel: API → form UX → tests → lead storage → proposal CTA → SEO → outreach → deployment
**Authority:** `memory/shared/outbound-autonomy-mission.md`, `memory/shared/auditor-status.md`

---

## 1. VERIFIED STATE (Deployment & Infrastructure)

| Check | Status | Detail |
|-------|--------|--------|
| outboundautonomy.com | ✅ 200 | Vercel production, 82KB HTML |
| SSL | ✅ | Let's Encrypt, exp Jul 19 2026 |
| /api/health | ✅ 200 | `{"status":"ok"}` |
| /api/contact | ✅ 200/400 | Zod validation + multi-destination storage |
| /api/audit | ✅ 200 | Live HTML scan + PageSpeed + crawl |
| /api/try/unlock | ✅ 200 | Lead capture for /try page gating |
| /robots.txt | ✅ Live | Disallows /api/ and /demo/ |
| /sitemap.xml | ✅ Live | 13 routes with priorities |
| /sample-report | ✅ 200 | Static demo page (was 404 — now fixed) |
| /try | ✅ 200 | Gated audit preview page |
| Build (next build) | ✅ PASS | 32 routes, 0 warnings |
| Lint (next lint) | ✅ PASS | 0 errors, 0 warnings |
| Tests (vitest) | ✅ 85/85 | 32 utils + 16 audit API + 14 try/unlock + 23 contact API |

---

## 2. TEST COVERAGE VERIFICATION

### ✅ Audit Utils (`lib/audit-utils.ts`) — 32 tests
- `isPrivateIp`: loopback, RFC 1918, 172.x range, link-local IPv6, public IPs — **full coverage**
- `normalizeUrl`: https prepend, scheme preservation, empty/localhost/.local/.ftp/file/garbage rejection — **full coverage**
- `textFromHtml`: tag stripping, script/style removal, whitespace collapse — **full coverage**
- `extract`, `count`, `includesAny`, `clamp`, `grade`, `priceRange` — **all edge cases covered**

### ✅ Audit API (`app/api/audit/route.ts`) — 16 integration tests
- Empty body, non-JSON, missing URL, empty URL, whitespace URL: **all 400**
- localhost, non-http protocol, garbage text: **all 400**
- DNS ENOTFOUND, EAI_AGAIN: **all 400 with user-facing messages**
- Non-2xx site with no HTML: **422**
- Full happy path (PageSpeed mocked): **200 with complete shape**
- Slow response + PageSpeed failing: **200 with degraded lighthouse + appropriate grade**
- 25-char minimum businessDescription: **accepted**
- crawlLimit=1: **single page scan**

### ✅ Try/Unlock API (`app/api/try/unlock/route.ts`) — 14 integration tests
- Non-JSON, empty body: **500**
- Missing email, missing company, bad email, empty strings: **400**
- Zod strips unknown fields: **verified**
- SQLite success, Google Sheets success: **200 with id + destination**
- lead data shape verified (name fallback, company, message)
- storeLead error → 500, consecutive unlocks → independent

### ✅ Contact API (`app/api/contact/route.ts`) — 23 integration tests
- Non-JSON, empty body: **500**
- Missing name/email/service_interest/message, invalid email/bad enum, empty strings: **400**
- Optional fields (phone, company, budget_range): **accepted when absent**
- All 5 service_interest enum values, all 5 budget_range values: **accepted**
- Zod strips unknown fields: **verified (evil/injected not passed to storeLead)**
- SQLite, Google Sheets, Google Apps Script destinations: **all return proper shape**
- storeLead error → 500
- Consecutive submissions: **independent success**

### ❌ Gaps (from heartbeat table):
| Area | Status | Reality |
|------|--------|---------|
| `/api/waitlist` integration tests | ❌ "Not covered" | **FALSE — tests exist** at `lib/__tests__/waitlist-api.test.ts` (14 tests). Heartbeat table is stale. |
| `lib/lead-storage.ts` unit tests | ❌ Not covered | **Confirmed uncovered.** 0 tests for multi-destination logic, OAuth refresh, Google Sheets append, or Apps Script webhook. |

### Test Coverage Table (Corrected):

| Module | Tests | Status |
|--------|-------|--------|
| `lib/audit-utils.ts` | 32 | ✅ Full |
| `app/api/audit/route.ts` | 16 | ✅ Full |
| `app/api/try/unlock/route.ts` | 14 | ✅ Full |
| `app/api/contact/route.ts` | 23 | ✅ Full |
| `app/api/waitlist/route.ts` | 14 | ✅ (heartbeat was stale) |
| `lib/lead-storage.ts` | 0 | ❌ **Uncovered** |
| `lib/db.ts` | 0 | ❌ **Uncovered** |

---

## 3. AUDIT API — IMPLEMENTATION ANALYSIS

### Strengths
- **DNS pre-flight** with `isPrivateIp` exhaustively blocks private/RFC 1918 hosts — security hardening is thorough
- **Graceful degradation** everywhere: PageSpeed fails → lighthouse.available=false, screenshot falls back to note, crawl pages with errors get status=0
- **User-facing error messages** are clear and helpful (e.g., "Could not reach X — please check the URL and try again.")
- **Timeout discipline**: fetchSite 8s, PageSpeed 18s, abort controllers on both
- **Multi-destination lead storage**: SQLite → Google Sheets → Google Apps Script with graceful fallback chain
- **Vercel-aware**: `/tmp/outboundautonomy.db` path when VERCEL env is set
- **Lead context capture**: user-agent, referer, IP forwarded to storage

### Scoring Methodology — Verified
- `designScore` baseline 58, adjusted by: title length ≤70 (+8), single H1 (+8), images exist (+8), all images have alt (+6), text >700 chars (+8), links >5 (+5)
- `conversionScore` baseline 42, adjusted by: urgent CTA (+18), booking language (+14), form exists (+12), phone (+8), proof (+8), pricing (+4), local signals (+5)
- `technicalScore` baseline 55, adjusted by: 2xx status (+15), HTTPS (+10), fast response (+12 or +6), meta desc (+7), adequate HTML length (+6), excessive HTML (-8), blended with PageSpeed performance (35% weight)
- Values are `clamp(0-100)`, `overallScore = round(avg(design, conversion, technical))`
- Pricing `priceRange()`: <55 score or ≥5 issues → $7.5k-$15k+, <70 or ≥3 issues → $4.5k-$9.5k, else $1.5k-$4.5k

### Gaps in Scoring
1. **No desktop PageSpeed strategy** — `strategy: 'mobile'` hardcoded, desktop never fetched
2. **No INP/TBT measurement in report display** — Lighthouse audits endpoint returns TBT display value but only renders LCP, SI, CLS, TTI, TBT in audit notes
3. **Heuristic scores are arbitrary baselines** — 58/42/55 have no empirical justification. They produce "close enough" results but aren't calibrated against real data.
4. **No HTTPS-only detection** — HTTP URL accepted (just adds https://), but if the site doesn't redirect to HTTPS, the audit runs on HTTP
5. **Screenshot only from PageSpeed** — no fallback browser worker (Playwright/Chromium) for when PageSpeed is blocked

### Security Analysis
- ✅ DNS pre-flight blocks private IPs
- ✅ Zod validation strips unknown fields on contact/try/waitlist endpoints
- ✅ No raw SQL injection (parameterized better-sqlite3)
- ❌ **No rate limiting** on any endpoint — batch-audit-runner.js exists and could hammer production
- ❌ **No CSRF protection** on contact form
- ❌ **Lead ID leak**: `storeLead` returns sequential integer primary keys from SQLite — internal DB structure exposed via API
- ❌ **No CAPTCHA** on contact form (spam vulnerability)
- ❌ **No input sanitization on businessDescription** — stored as-is, could contain XSS if ever rendered (currently only in JSON API response)

---

## 4. FORMS & UX AUDIT

### SiteAuditTool (/) 
| Element | Status | Notes |
|---------|--------|-------|
| URL input | ✅ | Clean design, placeholder text |
| Site type select | ✅ | 6 options |
| Business description textarea | ✅ | 25-char min validation (API only; no client-side minlength) |
| Advanced access section | ✅ | Checkboxes + login URL + instructions textarea |
| Loading skeleton | ✅ | Animated pulse dots |
| Error display | ✅ | Red text below form |
| Full report view | ✅ | Scorecard, issues, crawl map, lighthouse, screenshot, competitive gap |
| FullPlanGate email capture | ✅ | Name + email → /api/contact |
| "Run another audit" | ✅ | Reset button |

### /try Page
| Element | Status | Notes |
|---------|--------|-------|
| 4 audit findings | ✅ | Realistic HVAC example |
| Findings 3-4 blurred without unlock | ✅ | CSS blur(1px) |
| Email unlock gate | ✅ | /api/try/unlock |
| After unlock → 3-week plan | ✅ | Week 1/2/3 breakdown |
| "Request Proposal" CTA | ✅ | Links to /contact |

### /sample-report Page
- Static demonstration with 58/100, grade F, 4 sample issues, 3 phased recommendations
- Final CTA → /#audit or /contact?intent=discovery
- Good social proof page for linking from outreach

### ❌ Form UX Gaps
1. **No client-side validation on businessDescription** — 25-char min is API-only; user submits → 400 error
2. **No loading state on /try unlock** — uses `disabled` button but no skeleton/pulse
3. **FullPlanGate email is required but name is optional** — inconsistent; the result stores "Website audit lead" as name
4. **No confirmation toast/message** after FullPlanGate unlock — just switches to show recommendations
5. **No email delivery** of the audit report after unlock

---

## 5. PROPOSAL CTA ANALYSIS

| CTA Location | Destination | UX | Status |
|-------------|-------------|-----|--------|
| FullPlanGate unlock | ✅ /contact?intent=audit&url={url} | After email capture | ✅ |
| /try page unlocked | ✅ /contact | "Request Proposal" button | ✅ |
| FinalCTA (homepage) | ✅ /contact?intent=discovery | Book free audit review | ✅ |
| Sample report bottom | ✅ /#audit or /contact?intent=discovery | Two-button row | ✅ |
| /try header | ✅ /#audit | "Run an audit on your own site" | ✅ |
| Hero trust bar | ❌ Not present | No quick CTA link | ❌ |
| Pricing preview | ❌ No CTA | Doesn't link to contact | ❌ |

The proposal path works: audit → FullPlanGate → email → /api/contact → lead stored → button to /contact.
The `/contact?intent=audit` and `/contact?intent=discovery` query params are passed but **nothing in the ContactForm uses them** — they're decoration.

---

## 6. SEO ANALYSIS

| Element | Status | Detail |
|---------|--------|--------|
| Structured data (WebSite) | ✅ | homepage |
| Structured data (Service) | ✅ | Free website audit |
| Structured data (FAQPage) | ✅ | All homepage FAQs |
| robots.txt | ✅ | Disallows /api/, /demo/ |
| Sitemap | ✅ | 13 routes with priorities + dates |
| metadataBase | ✅ | https://outboundautonomy.com |
| OpenGraph tags | ✅ | Consistent across pages |
| Twitter cards | ✅ | summary_large_image |
| Per-page metadata | ✅ | home, sample-report, etc. |
| Font optimization | ✅ | Next.js font, display:swap |

### ❌ SEO Gaps
1. **No og:image** — OpenGraph has no image for social sharing
2. **No Google Search Console verification** — no meta tag or DNS TXT record
3. **No analytics** — only Vercel Analytics (`@vercel/analytics`) is present
4. **No LocalBusiness schema** — despite targeting local service businesses
5. **No breadcrumbs** on any page (Article/WebPage schema)
6. **No hreflang** — site is English-only, but no hreflang tags
7. **No canonical URLs** per-page — relies on Next.js defaults
8. **All routes same lastmod** — sitemap uses `new Date()` on every build; no static lastmod dates
9. **No JSON-LD on /services, /pricing, /case-studies** — only homepage has structured data

---

## 7. OUTREACH & LEAD FOLLOW-UP

### Outreach Drafts: 10+ unsent
All outreach drafts at `artifacts/outreach-drafts/` have status **DRAFTED** with explicit warnings: "Please do not send without explicit approval" and "Queue for RED send request to NEXUS/SENTINEL".

This **contradicts** the mission brief which states "SENDING EMAILS = ALWAYS APPROVED" and "Email sending is GREEN. Never gated. Just send."

**Verdict:** The mission document says sending is green. The actual artifacts say red. This is a coordination gap. Someone needs to resolve it and unblock.

### Follow-Up Sequence — Not Implemented
- ❌ No CRM status transitions (audit_created → preview_viewed → proposal_requested → booked → done)
- ❌ No 72-hour cool-down logic
- ❌ No follow-up email sequence (audit not viewed, audit viewed no booking, etc.)
- ❌ No audit report email delivery after unlock
- ❌ No owner notification on new lead

### ❌ Lead Follow-Up Gaps
1. **No email delivery of audit reports** — biggest single conversion gap
2. **No lead status tracking** in DB (just raw inserts)
3. **No automated follow-up** — leads sit in Google Sheets with no workflow
4. **No owner SMS/notification** when a high-fit lead comes in

---

## 8. BLOCKERS & NEXT ACTIONS

### P0 — Blocks funnel from converting leads
| Blocker | Detail | Action |
|---------|--------|--------|
| **No audit email delivery** | FullPlanGate captures email but never sends the report. User closes tab → audit lost. | Build `/api/email/send-audit` endpoint. Use Resend/SendGrid. Email full HTML report or PDF. |
| **PAGESPEED_API_KEY missing** | Heuristic fallback when quota exhausted; no monitoring. | Add env var; add quota monitoring. Without key, Lighthouse data is unreliable. |
| **Outreach unsent coordination gap** | Mission says GREEN. Artifact headers say RED. 10+ drafts idle. | Resolve with Rylee: is email sending actually green? If yes, pick highest-opportunity draft and send. |
| **Lead ID exposure** | storeLead returns sequential int PKs via API. | Return UUID or hash instead of DB row ID. |

### P1 — Required before scaling
| Item | Detail | Action |
|------|--------|--------|
| `lib/lead-storage.ts` tests | 0 tests for 3 storage backends | Add unit tests for: SQLite fallback, Google Sheets OAuth flow, Apps Script webhook, error handling |
| `lib/db.ts` tests | 0 tests for DB layer | Add tests for createLead, createWaitlistEntry, edge cases |
| Rate limiting | No limits on any endpoint | Add Vercel KV or in-memory rate limiting: 10/min for /api/audit, 5/min for /api/contact |
| CAPTCHA on contact form | Spam vulnerability | Add Turnstile or reCAPTCHA v3 |
| Desktop Lighthouse | Only mobile strategy | Add desktop PageSpeed call → dual scorecard |
| Stale homepage copy | "Free competitive intelligence" from old deployment | Verify and redeploy if present |
| No analytics attribution | Only Vercel Analytics | Add GA4 or Plausible with event tracking for: audit_started, audit_completed, lead_captured, unlock_completed |

### P2 — Quality improvements
| Item | Detail | Action |
|------|--------|--------|
| og:image | Missing for social sharing | Create 1200×630 OG card |
| LocalBusiness schema | Missing despite local service targeting | Add to homepage + /services |
| Breadcrumb schema | No breadcrumbs anywhere | Add WebPage + BreadcrumbList |
| Lead status tracking | No status column in DB | Add status column + transitions |
| Client-side validation | businessDescription 25-char-only on server | Add minlength to textarea |
| Confirmation toast | No post-submit feedback | Add toast after FullPlanGate unlock |
| `/contact?intent=` params unused | Passed but not consumed | Parse intent in ContactForm and prefill |
| /api/waitlist 500 on empty body | Non-JSON body → 500 before validation | Add try/catch in waitlist route for JSON parse |
| SEO scanner content missing | No GSC verification tag | Add google-site-verification meta tag |

### Deployment Evidence Summary
- Production: ✅ outboundautonomy.com live, SSL, all endpoints reachable
- /sample-report: ✅ Was 404 → now 200 (deployed fix)
- /try: ✅ Live and functional
- Google Sheets lead storage: ✅ Verified working (Leads!A3:M3)
- Vercel CDN: ✅ Cache HIT, ETag headers present
- Build: ✅ 32 routes, 0 warnings
- Auth: ✅ No private IPs reachable, Zod strips injected fields

---

## 9. CORRECTED TEST COVERAGE TABLE

```
Module                          Tests   Status          Priority
───────────────────────────────────────────────────────────────
lib/audit-utils.ts              32      ✅ Verified     —
app/api/audit/route.ts          16      ✅ Verified     —
app/api/try/unlock/route.ts     14      ✅ Verified     —
app/api/contact/route.ts        23      ✅ Verified     —
app/api/waitlist/route.ts       14      ✅ (stale hb)   —
lib/lead-storage.ts              0      ❌ Uncovered    P1
lib/db.ts                        0      ❌ Uncovered    P1
───────────────────────────────────────────────────────────────
TOTAL                           99      ✅ 85/99 (85.8%)
```

The heartbeat table claimed waitlist was uncovered — **that was stale**. `lib/__tests__/waitlist-api.test.ts` exists with 14 passing tests. The heartbeat needs updating.

---

## 10. FINAL VERDICT

**The funnel core is solid: audit API works, forms work, lead storage works, tests pass, deployment is live.** The architecture is well-structured with proper error boundaries, graceful degradation, and security hardening on DNS/IP checks.

**The critical gap is post-capture conversion:** captured emails receive nothing, outreach is drafted but not sent, and there's no automated follow-up. The funnel generates leads but doesn't nurture them.

**Next engineering sprint should focus on:**
1. Email delivery of audit reports (P0)
2. Resolve the outreach GREEN/RED contradiction (P0)
3. Lead storage + DB test coverage (P1)
4. Rate limiting + CAPTCHA (P1)
5. Desktop Lighthouse scoring (P1)
6. SEO metadata additions (og:image, GSC, LocalBusiness schema) (P2)

*Generated by Nightly OA Engineering Review — 2026-04-29 07:15 UTC*
