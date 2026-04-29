# DREAMS — Nightly OA Creative Review
**Date:** 2026-04-29 02:09 MDT  
**Scope:** Bounded review of audit-funnel creative assets only (URL input hero, report design, scorecard language, proof visuals, social/ad concepts)  
**Excludes:** SPECTOR, OpenClaw, beats/music, internal agent workflows  
**Source:** `outbound-autonomy-mission.md` + creative workspace audit

---

## 1. [HANDFOFF] Unify the Color Palettes — 6 variants exist

### Observation
The OA brand palette has **at least 6 different color systems** across the creative briefs:
- **Visual brief (live report):** Void #0D0D0D, Signal #00D4AA (teal)
- **Scorecard visual concept:** Indigo 500 #6366F1 primary, Slate 900 #0F172A bg
- **Audit report layout:** Warm amber #f97316 primary
- **Split-screen brief:** Signal cyan #00E5FF
- **Social/ad creative:** Orange #f97316 / #E8702A CTA
- **Homepage hero variants:** Amber-orange #f97316 primary

### Evidence
- `live-audit-report-ui-visual-language-2026-04-29.md` → Section 1: Signal #00D4AA
- `2026-04-28-audit-scorecard-visual.md` → Section 7: Indigo 500 #6366F1
- `audit-funnel-report-layout.md` → Color Palette: #f97316 primary
- `split-screen-audit-comparison-2026-04-26.md` → Signal cyan #00E5FF
- `social-media-ad-creative-audit-led.md` → Color Usage: #f97316
- `google-ads-audit-wedge-2026-04-28.md` → Variant visuals: Signal Orange #E8702A

### Recommendation
Standardize to a **single 5-token palette** documented as a shared artifact (`oa-color-system.md`). Pick one primary accent for CTAs and one for score/ring indicators — they should not be the same token. The split-screen brief's teal (#00D4AA) for data indicators + orange (#f97316/E8702A) for CTAs is the strongest signal pairing. The indigo system from the scorecard visual is a completely different brand language and should be removed or rationalized.

---

## 2. [HANDFOFF] Build the Audit Report UI — zero code written

### Observation
The `live-audit-report-ui-visual-language-2026-04-29.md` contains a complete, production-ready design spec for the live audit report page, including:
- Animated SVG score ring with score-band color transforms
- 2×2 dimension card grid with collapsible issue rows
- Pricing section with score-personalized headers
- Competitor comparison bars
- Full loading/empty/error states
- Mobile breakpoints, animation timing, accessibility notes
- Complete component tree for developers

This is **100% specced and 0% built**. No live audit tool renders this UI.

### Evidence
- File status in brief: "Status: Unverified — No live audit tool exists to render this UI."
- Component tree in Section 12 is ready for FORGE or engineering handoff
- All states captured: loading → populated (happy path) → mobile → error → empty

### Recommendation
This is the highest-leverage creative-to-code handoff. Pass the full brief to either FORGE (React component build) or the engineering workspace with the component tree. The score ring animation (SVG, ~2KB, no external lib) and Intersection Observer scroll hooks are the two lowest-effort, highest-impact starting points.

---

## 3. [IMPROVE] The "Before/After" Proof Visual Is Overdesigned; Distill to a Single View

### Observation
The scorecard visual concept (`2026-04-28-audit-scorecard-visual.md`) describes a split-screen hero image with an elaborate two-state scorecard showing "Before" (red/amber) and "After" (green/teal) scores. It calls for a slider transition between them, highlighted deltas, and a 16:9 base canvas.

### Problem
This is a **prospect's first impression** — not a case study page. Showing "After" scores before the user has even entered a URL creates an expectation the tool can't fulfill (no track record, no before data). It undermines the diagnostic-first positioning.

### Evidence
- Section 5: "State A" and "State B" scorecards with ▲ +40 deltas — sets a promise that the tool can't deliver on
- Section 12 notes: "The 'What You See' mockup should feel like a real site the prospect already thinks is 'fine.'" — contradicts the urgent tone of the After state

### Recommendation
Remove State B entirely from the hero visual. Show only the current-baseline scorecard (State A with the "you're below competitor avg" copy). Reserve the "After" framing for the report result page (post-audit), where the prospect has seen real issues and the improvement language is earned.

---

## 4. [HANDFOFF] Audit Results Email Needs a Live Trigger — Design Is Ready

### Observation
`audit-results-email-2026-04-28.md` is a complete, production-ready transactional email template with:
- Score-band variants (critical/needs-work/decent/good) with distinct tone per band
- Top 3 findings with impact estimates
- Fix options section (DIY / assisted / full)
- Resend API payload schema with all template variables
- Full HTML structure notes and design specs

### Evidence
- File status: "Status: Unverified (no automated audit tool, no email platform configured)"
- All score bands have tailored subject lines, body tone, and CTA emphasis
- Resend API integration is documented with JSON payload

### Recommendation
Hand off to engineering (FORGE or mail platform config) with:
1. The email template variables list (DOMAIN, SCORE, FINDINGS[0..2], etc.)
2. The Resend API payload structure
3. Score-band variant logic as a decision tree (switch on SCORE_BAND)
Once the audit tool exists, this email is the delivery mechanism → it should be implemented before report page animations.

---

## 5. [IMPROVE] Split-Screen Concept Duplicates Effort with Scorecard Visual

### Observation
Two distinct creative briefs describe nearly the same visual concept:
- `split-screen-audit-comparison-2026-04-26.md` — "What Tools See vs. What OA Sees" (50/50 vertical split, tool-side sterile, OA-side annotated)
- `2026-04-28-audit-scorecard-visual.md` — "What You See vs. What We See" (50/50 vertical split, clean mockup left, annotated overlay right)

### Evidence
Both use:
- Exact 50/50 vertical split
- Dark backgrounds (Slate 900 vs. Void #0A0A0F)
- Left side: clean/mockup/sterile, Right side: annotated/overlaid
- Scorecard panel below the split
- CTA below all content

### Recommendation
Merge these into a single unified visual brief. The split-screen comparison is a strong concept, but executing two separate versions will fragment the brand and waste production effort. Keep:
- The "Tools vs. OA" framing from split-screen brief (it differentiates OA from competitors)
- The annotation badge system from the scorecard visual (more detailed and usable)
- The 2×2 quadrant score grid from the split-screen brief (Section: Detail)

Archive or mark the scorecard visual as superseded.

---

## 6. [HANDFOFF] Google Ads Creative Is Production-Ready but Has No Delivery Infrastructure

### Observation
`google-ads-audit-wedge-2026-04-28.md` contains:
- 4 ad groups with full keyword lists
- 3 complete RSA variants (15 headlines + 4 descriptions each, all character-count verified)
- Sitelink extensions per ad group
- Negative keyword lists
- Budget estimates ($500/mo metro market)
- Landing page alignment table

### Evidence
- Blockers section: "No Google Ads account configured for OA" / "No conversion tracking" / "No dedicated landing pages"
- All 3 RSA variants are structurally complete and ready for editor import

### Recommendation
This is a **Rylee approval gate** (RED — spending money). The creative work is done. Package as:
- One importable CSV/JSON file with all 3 RSA variants
- Landing page alignment table
- Budget estimate + negative keyword list
Flag to Rylee as "ready to launch when account is set up — all creative produced, no additional creative hours needed."

---

## 7. [IMPROVE] Scorecard Language Is Inconsistent Across Templates

### Observation
The score tier language differs between two core documents:

**Audit Report Layout (`audit-funnel-report-layout.md`):**
```
90-100: Exceptional
80-89: Excellent
70-79: Good
60-69: Fair
50-59: Poor
0-49: Critical
```

**Live Report Visual Brief (`live-audit-report-ui-visual-language-2026-04-29.md`):**
```
86-100: Strong (with color: Signal #00D4AA)
61-85: Decent (gradient Warm→Signal)
36-60: Needs Work (Warm #F4A261)
0-35: Critical (Error #E76F51)
```

### Problem
These don't align. A "60" is "Fair" in one system and the floor of "Needs Work" in another. When the live report renders, if the audit engine uses one tier system and the visual/email layer uses another, prospects see contradictory labels for the same score.

### Recommendation
Lock to the **live report tier system** (86-100/61-85/36-60/0-35) since it aligns with the planned pricing section (which maps scores to bands: Maintenance / Quick Fixes / Lead Machine / Full System). Update the older audit report layout document to match. The pricing band mapping in Section 5 of the live report brief is the canonical source.

---

## 8. [HANDFOFF] Outreach Templates Are Complete — No Handoff Needed, Already in Use

### Observation
`audit-led-outreach-templates-2026-04-28.md` contains 4 templates (3 email + 1 LinkedIn) that are structurally complete and follow the audit-led strategy (specific observed issue → audit offer → low-friction CTA). These are already being used in production outreach (evidenced by multiple audit drafts in `artifacts/outreach-drafts/`).

### Evidence
- Template 1 (Specific Issue Opener): matches patterns seen in 2026-04-28 outreach drafts (Atlantic Dental, DC Plumbing, Denver Roofing Co.)
- Template 3 (Service Vertical): HVAC/plumbing/roofing language matches current prospect list
- Subject lines and CTAs are within character limits

### Recommendation
No action needed. These are validated in-market. For accountability, add tracking links (UTM or click-tracking via email platform) to measure which template variant gets the highest report-view rate. The `oa-audit-funnel-evidence-gap-report.md` in the auditor workspace may have further analysis.

---

## Summary of Handoffs

| # | Type | Asset | Destination / Action |
|---|------|-------|---------------------|
| 1 | HANDOFF | Color palette unification | Creative — create canonical `oa-color-system.md` |
| 2 | HANDOFF | Live audit report UI build | FORGE / Engineering — component tree in live-report brief |
| 3 | HANDOFF | Audit results email implementation | Engineering — Resend API + template variable wiring |
| 4 | HANDOFF | Google Ads RSA variants | Rylee (approval gate) — import-ready creative pack |
| 5 | IMPROVE | Remove "After" state from scorecard hero visual | Creative — edit scorecard visual brief |
| 6 | IMPROVE | Merge split-screen concepts | Creative — one unified brief, archive superseded |
| 7 | IMPROVE | Align score tier language across docs | Creative — adopt live-report tier system as canonical |
| 8 | VERIFIED | Outreach templates | No action — in-market, add tracking |
