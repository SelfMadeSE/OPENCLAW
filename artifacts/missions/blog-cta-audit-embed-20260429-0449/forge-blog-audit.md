# FORGE Blog CTA Audit — Slice 1/3

**Date:** 2026-04-29 04:49 MDT  
**Mission:** blog-cta-audit-embed-20260429-0449  
**Tester:** FORGE (engineering)  
**Status:** verified ✅ — all 12 posts live, all have audit-funnel CTAs

---

## Blog CTA Audit Results

| # | Blog Post | HTTP | CTA Present | `/try` Link | `/sample-report` Link | `SiteAuditTool` | Notes |
|---|-----------|------|-------------|-------------|----------------------|-----------------|-------|
| 1 | `/blog/4-signals-website-audit` | 200 ✅ | YES | ✅ | ✅ | ✅ | Pillar, CTA variant B |
| 2 | `/blog/free-website-audit-what-it-checks` | 200 ✅ | YES | ✅ | ✅ | ✅ | |
| 3 | `/blog/how-to-read-website-audit-score` | 200 ✅ | YES | ✅ | ✅ | ✅ | |
| 4 | `/blog/service-business-website-leads` | 200 ✅ | YES | ✅ | ✅ | ✅ | |
| 5 | `/blog/website-leaking-leads-pillar` | 200 ✅ | YES | ✅ | ✅ | ✅ | Pillar |
| 6 | `/blog/cta-deep-dive` | 200 ✅ | YES | ✅ | ✅ | ✅ | |
| 7 | `/blog/grande-prairie-local-seo-google-maps` | 200 ✅ | YES | ✅ | ✅ | ✅ | |
| 8 | `/blog/form-deep-dive` | 200 ✅ | YES | ✅ | ✅ | ✅ | |
| 9 | `/blog/schema-markup-local-seo` | 200 ✅ | YES | ✅ | ✅ | ✅ | |
| 10 | `/blog/local-seo-starter-kit` | 200 ✅ | YES | ✅ | ✅ | ✅ | Pillar, CTA variant A |
| 11 | `/blog/service-business-website-cost-2026` | 200 ✅ | YES | ✅ | ✅ | ✅ | Pillar, CTA variant B |
| 12 | `/blog/automation-for-service-businesses` | 200 ✅ | YES | ✅ | ✅ | ✅ | |

---

## CTA Architecture

Every blog post uses the same CTA structure in `app/blog/[slug]/page.tsx`:

1. **Bottom CTA section** — Rendered on every post page:
   - Headline: "Ready to see your score?"
   - Variant-specific subtext (A/B/C variants defined in `ctaMessages`)
   - `<SiteAuditTool />` — the embedded URL input + audit form
   - Link to `/sample-report`

2. **Inline CTAs** — Vary by post content:
   - All posts reference `/try` and `/sample-report` in their article body
   - Each post has at least 2 inline CTA references + the bottom section
   - Every post includes the `[slug]/page.tsx` breadcrumb "← Back to Blog" linking to `/blog`

3. **Variant distribution:**
   - Variant A (emphasis on CTA/lead capture issues): posts about conversion/form topics
   - Variant B (emphasis on full audit signal check): pillar/reference posts
   - Variant C (general): score interpretation posts

---

## `automation-for-service-businesses` Status

- **HTTP:** 200 ✅
- **Component:** `AutomationServiceBusinessesPost.tsx` — already created and registered
- **Registry:** Present in `lib/blog-posts.ts`
- **Route map:** Present in `app/blog/[slug]/page.tsx`
- **Sitemap:** Present — 12th entry in blog section
- **Audit CTAs:** Present — matches all other posts' CTA structure
- **No deployment needed** — was already deployed in a prior cycle

---

## Summary

| Metric | Count |
|--------|-------|
| Total blog posts | 12 |
| HTTP 200 | 12/12 ✅ |
| Audit CTA present | 12/12 ✅ |
| `/try` link present | 12/12 ✅ |
| `/sample-report` link present | 12/12 ✅ |
| `SiteAuditTool` embedded | 12/12 ✅ |
| Posts missing audit CTA | 0 |
| Repair tickets needed | 0 |

**All blog posts have embedded audit-funnel CTAs.** Every post routes traffic to the `/try` audit input or `/sample-report` demo. No gaps found. The `automation-for-service-businesses` 12th post is already live and fully wired.
