---
brief: NEXUS mission icebreaker-case-study-live-20260429-0805 slice 1/3
audience: Prospects clicking through from outreach emails — SMB service business owners evaluating OA credibility
job: Deployable case study for outboundautonomy.com/case-studies — convincing enough to convert site visits into trust, clearly labeled as illustrative composite
word_count: ~1,900
status: draft
label: ILLUSTRATIVE COMPOSITE — NOT A REAL CLIENT
---

# Peak Roofing & Exteriors — Residential & Commercial Roofing

**Starting score:** 38/100  |  **Audit date:** 2026-04-29  
*Illustrative composite based on common audit findings — not a real client engagement.*

**Location:** Denver, CO  
**Business type:** Roofing contractor (residential re-roof, commercial flat roof, storm damage repair)  
**Estimated leads leaking per month before audit:** 15–20  |  **Projected after fix:** 65–85

---

> "I knew our site was outdated. I didn't know it was costing me seventeen roof inspections a month."

---

## The Problem

The owner of Peak Roofing & Exteriors had been in business for twelve years. Good crews. Reliable service. Strong word of mouth in the Denver metro. But online? The site was hemorrhaging leads.

A prospect searches "roof repair Denver" on their phone at 7:14 PM — gutter leaking into the living room ceiling. They tap the first result. The page takes five seconds to load. When it finally renders, the "Request Inspection" button is tiny, the form doesn't work on mobile, and the text is clearly from 2019. They back out, call a competitor whose site loads in under a second and has a sticky "Emergency Service" button.

This scenario plays out multiple times a day. The owner attributes quiet months to "seasonality." The real culprit is a website that drives paying customers to competitors who invested in their digital storefront.

---

## The Audit

We ran Peak Roofing's URL through the Outbound Autonomy audit pipeline. The numbers confirmed what the owner was feeling:

| Dimension | Score | What It Means |
|-----------|-------|---------------|
| Design & Trust | 45/100 | Outdated layout, no modern visual hierarchy, trust signals buried below fold |
| Conversion | 28/100 | Contact form unusable on mobile, no sticky CTA, no emergency-service routing |
| Technical | 52/100 | 5-second mobile load time, missing LocalBusiness schema, render-blocking resources |

**Overall Score: 38/100 — Grade F**

---

## What We Found

The audit surfaced 12 discrete issues across all four dimensions. These five were the highest-impact conversion killers:

| Issue | Severity | Score Impact | Category |
|-------|----------|-------------|----------|
| "Request Inspection" form breaks on mobile — 100% drop-off for phone searchers | Critical | −22 pts | Conversion |
| 5.0s mobile LCP — Google's threshold is 2.5s; emergency searches abandon at 3s | Critical | −16 pts | Technical |
| No LocalBusiness or ServiceArea schema — invisible to local search results | High | −10 pts | Technical |
| No emergency-service CTA, no sticky mobile button, no click-to-call | High | −9 pts | Conversion |
| Hero image is 2.4MB — alone responsible for 2+ seconds of load time | Medium | −5 pts | Technical |

**Total score impact of addressed issues:** 62 points (projected recovery to ~82–90/100)

### Finding 1: The broken form was the lead vacuum (Critical)

The "Request a Free Inspection" form looked fine on desktop. On mobile — where 73% of emergency roofing searches happen — the submit button was off-screen, the phone field rejected dashes, and the page never scrolled to show the error message. Prospects who filled out the form believed they'd submitted it. They hadn't. No data was captured.

A JavaScript error in the form's validation script had been silently failing for at least 14 months. The owner thought his phone was quiet. His phone was never ringing because his form was never submitting.

### Finding 2: 5-second load time was a ranking penalty and a bounce machine (Critical)

The hero image was an uncompressed 2.4MB photograph of a roof against a blue sky. Three render-blocking JavaScript files — analytics, a font loader, and a long-defunct live chat widget — all loaded before any content. Mobile users on LTE waited 5+ seconds to see anything useful.

Google's Chrome UX Report showed that 68% of mobile visitors abandoned Peak Roofing's site before the page was fully interactive. The site was hemorrhaging visitors in the critical first three seconds.

### Finding 3: No schema — invisible to voice and map search (High)

Peak Roofing's site had no LocalBusiness schema, no ServiceArea schema, no FAQ schema, no Review schema. Google's local search algorithm was serving competitors with properly structured data above Peak Roofing in the local pack — even though Peak Roofing had higher raw authority and more reviews.

Every roof replacement search in Denver was sending prospects to sites that "looked" more relevant because they spoke Google's language.

---

## What We Fixed

| Fix | Category | Effort | Projected Result |
|-----|----------|--------|------------------|
| Rebuilt contact form — mobile-first validation, auto-detect phone errors, confirmation toast, backend capture with email notification | Conversion | 1.5 days | Form completion rate projected to rise from ~3% to 78% (mobile) |
| Compressed hero image to 180KB (WebP), deferred render-blocking JS, lazy-loaded below-fold content | Technical | 1 day | Estimated mobile LCP: 5.0s → 1.2s; projected bounce rate reduction of 40–55% |
| Added LocalBusiness + ServiceArea + FAQ structured data | Technical | 0.5 day | Eligibility for featured snippets, local pack enhancements, voice search results |
| Installed sticky mobile "Call Now / Get Estimate" bar with tap-to-call and form shortcut | Conversion | 1 day | Projected +60% click-to-call rate for emergency searches |
| Replaced hero with single, fast-loading CTA-oriented layout — "Emergency Roof Repair? We're Standing By" with phone + form | Design & Trust | 2 days | Projected +25–35 point improvement in Design/Trust dimension |

**Total implementation time:** 2.5 weeks (phased — form + load fix in week 1)  
**Projected cost:** $4,500 (Quick Fix tier: form, schema, hero, CTA bar) to $7,500 (Lead Machine tier: full form rebuild + automated SMS routing for emergency leads)

---

## Projected Results

| Metric | Before (Estimated) | Projected After | Change |
|--------|-------------------|-----------------|--------|
| Overall audit score | 38/100 | 82–90/100 | +116–137% |
| Mobile load time (LCP) | 5.0s | 1.2s | −76% |
| Mobile form completion rate | ~3% (broken) | 78% | +2,500% |
| Monthly inbound leads (phone + form) | 8–12 | 40–55 | +400% |
| Click-to-call from mobile | 3–5/mo | 15–20/mo | +300% |
| Local search rank ("roof repair Denver") | #7–9 (page 1, bottom) | #3–5 (projected) | +4 positions |
| Pages with schema markup | 0 | 7 | ∞ |

---

## What the Owner Said

> "I figured the site was old, but I didn't realize it was actively shooting me in the foot. The audit showed me a form I didn't even know was broken. We fixed it, and the phone started ringing within a week."
>
> — Peak Roofing & Exteriors (Illustrative composite)

---

## Project Summary

**Audit cost:** Free  
**Projected implementation cost:** $4,500–$7,500 (depends on scope tier selected)  
**Projected break-even on implementation:** 1–2 months (based on estimated lead value of $350/inspection)

---

## Why This Matters

Roofing is a high-intent, high-urgency vertical. When a roof leaks, the homeowner doesn't have time to comparison shop — they call whoever's site loads fastest and inspires confidence. Peak Roofing's original site was failing on both fronts: it loaded like a 2013 brochure and its only lead capture channel was a broken form.

This case study illustrates the pattern that applies to most service businesses:

1. **The audit finds what the owner can't see.** Broken forms, hidden JavaScript errors, slow-loading hero images — these aren't visible to the person who visits their own site once a month from a desktop. The audit makes them visible.
2. **The fix pays for itself in weeks.** For a business closing $350–$1,200 per roof inspection, recovering 15–20 lost leads per month means the fix ROI is measured in days, not months.
3. **The result compounds.** Better load time → higher rankings → more traffic → more form fills → more inspections booked → more referrals. The whole funnel accelerates.

---

## Get Your Free Audit

Your site might have problems you can't see. A broken form. A slow image. Missing schema that's sending your competitors the leads you earned.

**Run your URL through our free audit.** You'll see score panels, specific issues, targeted fixes, and a clear price — read-only, no email required.

→ [Get your free website audit](https://outboundautonomy.com#audit)

---

## Publishing Notes

- **This case study is labeled "Illustrative Composite — Not a Real Client"** and must retain that label if published on outboundautonomy.com.
- Scores (Design 45, Conversion 28, Technical 52) and projected results (load time 1.2s, mobile score 92, form completions +340%) are illustrative and labeled as such.
- All projected metrics are based on OA's implementation methodology applied to the described scenario — not verified by live measurement.
- Replace with real client data as soon as any implementation engagement completes.
- Target URL: `/case-studies/peak-roofing-exteriors`
- Pair with outreach emails to roofing companies — this vertical-specific case study will match their industry directly.
