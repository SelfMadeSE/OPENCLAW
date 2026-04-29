# OA Site Copy Verification Report

**Date:** 2026-04-28 08:18 MDT
**Method:** web_fetch (all 7 pages + homepage + sample-report)
**Status:** 2 issues found (YELLOW)

---

## Results Summary

| Page | Status | Key Check | Pass/Fail |
|------|--------|-----------|-----------|
| `/` (homepage) | ✅ PASS | Audit-led hero, CTA, URL form | PASS |
| `/about` | ✅ PASS | "We find what's leaking. Then we build what fixes it." | PASS |
| `/services` | ✅ PASS | "Turn audit findings into working systems" | PASS |
| `/faq` | ⚠️ MINOR | 28 Q&A items (expected 27), all audit-led | MINOR |
| `/case-studies` | ✅ PASS | Roofing composite case study accessible | PASS |
| `/pricing` | ❌ ISSUE | No score-band pricing structure; uses lane-based model | FAIL |
| `/try` | ✅ PASS | URL form on homepage §audit; /try shows preview | PASS |

---

## Detailed Results

### 1. `/` (Homepage) — ✅ PASS

- **Title:** "Outbound Autonomy — Free Website Audit With Targeted Fixes"
- **Hero headline:** "Enter your URL. Get a website audit with targeted fixes." — audit-led ✓
- **CTA buttons:** "Generate free audit" + "See implementation options" — audit-led ✓
- **Tagline bar:** "Websites that capture leads and book calls automatically" / "Built around your workflow — not a generic template" / "Free site audit before any commitment" ✓
- **URL input form:** Present in `<section id="audit">` with text input (`placeholder="example.com"`) and "Generate Free Audit" submit button ✓
- **No "custom AI systems" language in hero/CTA** ✓
- **Homepage FAQ section:** 4 buyer-oriented Q&A items (subset of full FAQ) — audit-led ✓
- Only minor mention: "AI-assisted workflow systems" in the "Automation Behind the Site" card — contextual, not a hero claim

### 2. `/about` — ✅ PASS

- **Headline:** "We find what's leaking. Then we build what fixes it." — exact match ✓
- **4-step process:** Scan → Surface gaps → Map the build → Implement in order of impact — audit-led ✓
- **Operating principles:** "Audit before build", "Lead path over tech stack", "Human oversight", "Honest scope" — all reinforcement ✓

### 3. `/services` — ✅ PASS

- **Headline:** "Turn audit findings into working systems" — exact match ✓
- **Score-band service mapping table** (0–35 Critical, 36–60 Needs Work, 61–85 Fair, 86–100 Strong) ✓
- **Content sections** organized by score ranges with "Signal" statements that reference audit findings ✓
- **Partner/white-label section** for agencies ✓

### 4. `/faq` — ⚠️ MINOR: Count off by 1 (28 vs expected 27)

- **Page loads and returns 200** ✓
- **Content exists** — rendered as accordion-style buttons (readability couldn't extract text, but confirmed from raw HTML)
- **All content is audit-led** — questions about audit process, pricing, who it's for, getting started ✓
- **Question count: 28** (not 27 as specified):
  - The Audit: 7 items
  - Results & Pricing: 5 items
  - Who This Is For: 4 items
  - About Outbound Autonomy: 4 items
  - Getting Started: 4 items
  - Support & Guarantees: 4 items
- **Suggestion:** Review if the 28th item is an addition or if 27 was the intended target. Items look well-organized.

### 5. `/case-studies` — ✅ PASS

- **Title:** "Case Study — Website Audit Fixes That Tripled Roofing Leads"
- **Accessible** ✓
- **Content:** Denver roofing company, 41/100 audit score, 3 weeks of changes, 292% mobile conversion lift ✓
- **Scoped implementation:** $4,200 one-time setup
- **Bottom CTA:** "Get Your Free Website Audit" → `/try` ✓

### 6. `/pricing` — ❌ ISSUE: No score-band pricing structure

- **Does NOT show score-band pricing** (0–35 / 36–60 / 61–85 / 86–100 bands)
- **Instead shows 3 "Lanes":**
  1. Lane 1 — Premium Website + Automation
  2. Lane 2 — Custom AI Workflow Builds
  3. Lane 3 — Private AI Operating Systems
- **Language drift:** Both "Custom AI Workflow Builds" and "Private AI Operating Systems" sound like the "custom AI systems" marketing the site is supposed to avoid
- **No pricing bands listed** — all CTAs go to `/contact?intent=...` forms
- **Contradiction with services page:** The services page maps services to audit score bands, but pricing doesn't reference that structure
- **Bottom section "Pricing & pilot FAQ"** is not expanded (accordion, no content extracted)
- **Rec:** Align pricing page with score-band structure from services page, or at minimum add the score-to-lane mapping prominently

### 7. `/try` — ✅ PASS (with caveat)

- Shows "Peak HVAC & Plumbing — Website Audit Preview" with 4 findings ✓
- URL input form is **not on /try** — it's on the homepage `#audit` section
- /try has "Run an audit on your own site →" link scrolling to `/#audit`
- Works as an example/sample preview page — serves its purpose
- **No issue** — but worth confirming /try is intended as a preview page rather than a direct input page

### Bonus Check: `/sample-report`

- **Title:** "Sample Website Audit — Outbound Autonomy"
- Shows a 58/100 score example with grade F, scorecard breakdown, 4 issues, and 3 implementation options with pricing ranges ✓
- Bottom CTA: "Run a real audit on your site" with URL input form ✓
- Well-structured and aligned with audit-led messaging ✓

---

## Issues (YELLOW)

### Issue #1: Pricing page lacks score-band structure
- **Risk:** YELLOW (medium)
- **Details:** `/pricing` uses a "Lane" model (Premium Website + Automation / Custom AI Workflow Builds / Private AI Operating Systems) instead of score-band pricing. This creates:
  - Mismatch with `/services` page which shows score-to-service mapping
  - "Custom AI / Private AI" language sounds like "custom AI systems" — contrary to positioning
  - No clear way for a user who knows their audit score to map it to cost
- **Recommendation:** Restructure pricing around score bands or add a clear "Your score → This lane" mapping. Replace "AI Operating Systems" with audit-led language like "Full-stack conversion + automation rebuild"

### Issue #2: FAQ count discrepancy (28 vs 27)
- **Risk:** GREEN (low)
- **Details:** FAQ has 28 Q&A items, validation expected 27. Content is otherwise correct and audit-led.
- **Recommendation:** Confirm whether 28 is the correct target count. If so, update spec. If the 28th was an accidental addition, review.

---

## Verdict

**Overall: GREEN/YELLOW** — Two minor issues found. Core funnel pages (homepage, about, services, case-studies) are clean and correctly audit-led. The pricing page is the most significant concern — it needs alignment with the audit-score-line approach used on the services page.
