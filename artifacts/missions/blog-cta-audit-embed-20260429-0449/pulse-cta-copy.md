# Blog Post Audit CTA Embed Analysis
**Mission:** blog-cta-audit-embed-20260429-0449 | Slice: 2/3
**Date:** 2026-04-29
**Status:** Verified — all 12 blog posts reviewed

---

## Summary

- **12 blog posts** deployed at `outboundautonomy.com/blog/[slug]`
- **Bottom CTA:** Present on all 12 via `<SiteAuditTool>` in the `[slug]/page.tsx` template ✅
- **Inline CTAs (inside article prose):** 6 present, 6 missing
- **Missing:** 4-signals-website-audit | free-website-audit-what-it-checks | how-to-read-website-audit-score | website-leaking-leads-pillar | cta-deep-dive | service-business-website-leads

Bottom CTA is consistent and good. The gap is inline CTAs in the article body. Below are the exact insertions needed.

---

## 1. 4-signals-website-audit

**Current CTA status:** Missing inline

**Recommended insertion point:** After the "The Pitfall of Free Tools" section, before the closing italic disclaimer.

**Proposed CTA text:**
> Not sure where your site falls? Our audit scores all four signals — design, conversion, technical, and lead capture — on your actual URL. Enter yours at [outboundautonomy.com/try](https://outboundautonomy.com/try) and see your score in under 60 seconds.

**Implementation:** Add as a new paragraph (`<p>`) after line containing `<p><em>Scores are estimated based on automated analysis...`

---

## 2. free-website-audit-what-it-checks

**Current CTA status:** Missing inline

**Recommended insertion point:** After the "The Bottom Line" section, as the closing paragraph.

**Proposed CTA text:**
> Want to see what your site's full picture looks like? Run the free audit at [outboundautonomy.com/try](https://outboundautonomy.com/try). You'll get design, conversion, technical, and lead capture scores — connected to specific fixes and an implementation range.

**Implementation:** Add as a new paragraph after line containing `<p>That's what a full audit is for.</p>`

---

## 3. how-to-read-website-audit-score

**Current CTA status:** Missing inline

**Recommended insertion point:** After the ordered list in "What to Do With Your Score", as the closing paragraph.

**Proposed CTA text:**
> Ready to see where your site stands? Enter your URL at [outboundautonomy.com/try](https://outboundautonomy.com/try). The audit takes about 60 seconds and gives you all three scores — design, conversion, technical — with a breakdown of what each number means for your business.

**Implementation:** Add as a new paragraph after the closing `</ol>` block.

---

## 4. website-leaking-leads-pillar

**Current CTA status:** Missing inline

**Recommended insertion point:** After the "Week 3: Measure" bullet in "The Fix Order Matters" section, as the closing paragraph.

**Proposed CTA text:**
> Not sure which killer is hitting your site? The free audit at [outboundautonomy.com/try](https://outboundautonomy.com/try) checks all three — CTA visibility, form placement, and local signals — in one scan. You'll see your conversion score and know exactly where to start.

**Implementation:** Add as a new `<p>` after the Week 3 bullet paragraph.

---

## 5. cta-deep-dive

**Current CTA status:** Missing inline

**Recommended insertion point:** After "A Five-Minute Fix That Compounds" section, replacing the last sentence with a stronger CTA (or adding alongside it).

**Proposed CTA text:**
> See exactly where your CTAs score — or don't — by running your URL through the free audit at [outboundautonomy.com/try](https://outboundautonomy.com/try). If your CTA is missing, weak, or buried, we'll flag it in the first 10 seconds.

**Implementation:** Replace the final sentence `<p>That's the highest-ROI five minutes...</p>` with the above paragraph, or add after it.

---

## 6. service-business-website-leads

**Current CTA status:** Missing inline

**Recommended insertion point:** After the "The 3-Minute Fix List" ordered list, replacing the closing paragraph.

**Proposed CTA text:**
> Or skip the manual check entirely — run your URL at [outboundautonomy.com/try](https://outboundautonomy.com/try) and get all four scores in under 60 seconds. No email required to see the results.

**Implementation:** Add as a new paragraph after the closing `</ol>` and before `<p>If any of these fail...</p>`

---

## Inline CTA Already Present (Correct — No Changes Needed)

| Slug | Inline CTA | Verified |
|------|-----------|----------|
| form-deep-dive | ✅ "Enter your URL. We'll show you your form..." | OK |
| grande-prairie-local-seo-google-maps | ✅ "Enter your URL. In about 90 seconds..." | OK |
| local-seo-starter-kit | ✅ "Enter your URL for a free audit →" | OK |
| schema-markup-local-seo | ✅ "Our audit checks for schema..." | OK |
| service-business-website-cost-2026 | ✅ "Enter your URL → free audit runs (90 seconds)" | OK |
| automation-for-service-businesses | ✅ "Enter your URL. We'll scan your forms..." | OK |

---

## Implementation Notes

- All insertions go into the React TSX components at `/Users/ryleebenson/Desktop/OPENCLAW/projects/outboundautonomy/components/blog/`
- Each insertion is a plain `<p>` tag with a `<a href="https://outboundautonomy.com/try">` link
- The bottom CTA (via `SiteAuditTool` in `[slug]/page.tsx`) handles the actual audit form input — these inline CTAs are awareness/priming CTAs that lead to the `/try` page which then has the full audit tool
- No link should use `target="_blank"` — keep users on-site

STATE: PROCEED — 6 inline CTAs identified and drafted for insertion into blog post TSX components. 6 posts already have inline CTAs and need no changes. All 12 have bottom CTAs via the page template.
