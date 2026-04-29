# Case Study: Rocky Mountain Roofing & Exteriors

**Status**: Draft — not yet published. Requires Rylee review before use as prospect-facing content.

**Date**: 2026-04-28
**Type**: Anonymized composite based on common local service website patterns observed in audit work. Not a real client engagement — illustrative of audit-to-fix value.

---

## The Business

- **Industry**: Roofing & exterior restoration
- **Location**: Denver metro area
- **Annual revenue**: ~$2.4M
- **Team**: 18 (3 office, 15 field)
- **Lead sources**: Google Local Services Ads, word of mouth, Nextdoor

## The Problem

Rocky Mountain Roofing's website had three critical conversion gaps:

1. **No above-the-fold CTA on mobile** — A hero slideshow buried the "Free Inspection" button below the scroll line. 63% of traffic was mobile. Most visitors saw rotating photos of finished roofs with no action path.

2. **Form routed everything to a single inbox** — Emergency calls (storm damage, active leaks) and general inquiries (reroof estimates) went to the same unmonitored inbox. Average response time was 8-14 hours. Emergency leads were cold by the time anyone called back.

3. **Trust proof was invisible** — 147 Google reviews (4.8 stars), 22 years in business, Owens Corning Preferred Contractor badge, and A+ BBB rating were all buried on an "About Us" page linked from the footer. No social proof appeared on the homepage or service pages.

## What the Audit Found

| Category | Before | Issue |
|----------|--------|-------|
| Mobile CTA visibility | Hero button below 800px scroll | 63% bounce before seeing action |
| Lead response time | 8-14 hour average | Emergency leads lost to faster competitors |
| Trust signals | Hidden on /about | No proof visible during decision moment |
| Form intelligence | Name + message only | No service type, urgency, or address capture |
| Page speed (mobile LCP) | 5.1s | 53% of visitors abandoned before load |

**Overall audit score**: 41/100 — "Needs Work" with 7 high-severity issues found.

## What We Implemented

### Week 1: Hero + CTA + Trust Stack
- Replaced the slideshow with a static hero: company name, "Denver Roofing & Exteriors Since 2004," a phone number, and a persistent "Get Free Inspection" button.
- Added a trust bar directly below the hero: star rating, review count, "A+ BBB," and "Owens Corning Preferred" badge.
- Result: mobile conversion rate went from ~1.2% to ~4.7% (estimate based on industry benchmarks).

### Week 2: Smart Form + Emergency Routing
- Replaced the single-field form with: service type dropdown (Inspection / Repair / Emergency), urgency toggle (Standard / Urgent / Emergency), ZIP code, and phone.
- Emergency submissions trigger SMS alert to the on-call project manager.
- ZIP field auto-checks service area and flags out-of-area leads.
- Result: average response time dropped to under 15 minutes for emergency leads.

### Week 3: Speed Optimization
- Compressed hero images (4.2MB → 380KB).
- Deferred third-party scripts (Google Maps, review widget).
- Lazy-loaded below-fold content.
- Result: mobile LCP dropped from 5.1s to 2.3s.

## Results (Projected from Industry Benchmarks)

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Mobile conversion rate | ~1.2% | ~4.7% | +292% |
| Lead response time (emergency) | 8-14 hrs | <15 min | ~98% faster |
| Mobile LCP | 5.1s | 2.3s | -55% |
| Form completion rate | ~18% | ~42% | +133% |
| Emergency lead-to-job rate | ~15% | ~45% | +200% |

## Implementation Cost

- **One-time setup**: $4,200 (hero redesign, trust bar, form rebuild, speed optimization, SMS routing)
- **Ongoing**: $0 (all changes are static site improvements; no monthly SaaS)

## Key Takeaway for Similar Businesses

The roofing company didn't need a new website. They needed the website they already had to actually convert visitors. The three changes that made the biggest difference:

1. Put the action where people look first (above the fold, persistent CTA)
2. Route high-intent leads differently than general inquiries (urgency + SMS)
3. Show proof before asking for trust (reviews, badges, years in business in the hero area)

None of these changes required expensive platforms, monthly subscriptions, or complex integrations. They were front-end fixes with immediate ROI.

---

## Usage Notes

- This is a **composite case study** — not a real client. Names and specific numbers are illustrative.
- Before publishing: replace with a real client engagement (with permission) or clearly label as "Example Project."
- Can be adapted for roofing, HVAC, plumbing, landscaping, and other home services by changing the industry name and specific service types.
- Recommended placement: `/case-studies` page or as a downloadable PDF lead magnet gated behind the audit unlock.
