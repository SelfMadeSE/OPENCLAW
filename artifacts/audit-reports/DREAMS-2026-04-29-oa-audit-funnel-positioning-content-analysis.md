# DREAMS — Outbound Autonomy Audit-Funnel Positioning & Content Analysis
**Date:** 2026-04-29 02:43 MDT (Nightly OA Marketing Review)
**Scope:** URL input homepage hook, one-sentence offer, CTA stack, social content, account setup, outreach angles
**Source docs:** `outbound-autonomy-mission.md`, `messaging-framework-v2-audit-led-2026-04-26.md`, live `outboundautonomy.com` site, homepage copy, outreach templates/drafts, social copy deck, content plan, account checklist, audit-funnel offer brief, GTM docs
**Excludes:** OpenClaw, SPECTOR, beats/music, internal agent workflows

---

## PART 1: URL Input Homepage Hook — Current State & Gaps

### What's Live (Verified on production 2026-04-29)

**Hero H1:** "Your website is losing you leads right now. We'll show you exactly where."

This is **not** the canonical messaging-framework-v2 hook ("Enter your URL. Get a website audit with targeted fixes."). The canonical hook is buried further down the page as an H2 above the URL input tool. The hero component was rewritten during engineering without updating the marketing copy to match.

**Live subhead:** "Enter your URL. In 90 seconds, you'll see the specific conversion gaps, technical errors, and missed opportunities costing you service calls. Then we'll tell you what it takes to fix them — and what it costs."

**Badge text:** "See your audit in 30 seconds — no email required"

**Live URL input heading (H2, #audit section):** "Enter your URL. Get a website audit with targeted fixes." ✅ This IS the canonical hook, but it's placed below the fold after the hero, ServicesOverview, TrustBar, HowItWorks, and SocialProof sections.

### Gap Analysis

| Issue | Detail | Severity |
|-------|--------|----------|
| **Hero H1 ≠ canonical hook** | Live hero says "losing leads right now" instead of "Enter your URL. Get a website audit with targeted fixes." Two competing hooks dilute the message. | **P1** — core positioning mismatch |
| **Canonical hook buried below fold** | The URL input section (which IS canonical) loads after 5 other sections. A visitor who doesn't scroll never sees input. | **P1** — kills the primary funnel action |
| **Hero doesn't include the URL input** | The hero component has two buttons ("Generate free audit" → /#audit and "See implementation options" → /services) but no inline URL input. The canonical "enter your URL" flow is one extra click away from the main hero CTA. | **P1** — friction in primary conversion path |
| **"Generate free audit" vs "Get Your Free Audit"** | Copy doc says "Get Your Free Audit" as primary CTA. Live says "Generate free audit." Minor inconsistency but builds distrust. | **P3** |
| **Everything else under the hero** | TrustBar (3 bullets), ServicesOverview, HowItWorks, SocialProof (4 before/after cards), SiteAuditTool, PricingPreview, FAQ, FinalCTA — these are NOT above the URL input. First fold is hero+description+buttons only. | **P2** — long scroll before action |

### Recommendation for Hero Hook
**Unify to:** "Enter your URL. Get a website audit with targeted fixes."

Move the URL input (SiteAuditTool) directly into the hero section, replacing the two-button-right-column layout with an inline URL input + "Generate Free Audit" submit. The canonical hook needs to be the H1, and the input needs to be above the fold on every viewport. The secondary CTAs ("See implementation options", "Preview sample audit") can be tertiary ghost links below the URL bar.

---

## PART 2: One-Sentence Offer — Clarity Audit

### Canonical one-sentence offer (from messaging-framework-v2):
> "Enter your URL. Get a website audit with targeted fixes."

### Assessment: **B+.** Clear, low-friction, credible. Problems:

1. **"Audit" may scare non-technical SMB owners.** They associate audits with taxes or compliance reviews. The canonical subhead does explain it, but the H1 itself lands on "audit" as the second clause.
2. **"Targeted fixes" is vague.** Should be "ranked fixes with cost estimates" (what the tool actually delivers).
3. **No urgency/time signal.** The badge says "30 seconds" but the offer sentence doesn't anchor time.

### Proposed revision:
> **"Enter your URL. Get a ranked list of what's broken and what it costs to fix — in 90 seconds."**

This sharpens the value prop: (a) they get a ranked list, (b) they get cost estimates, (c) it's fast. It replaces the abstract "targeted fixes" with the concrete deliverable the tool actually produces.

---

## PART 3: CTA Stack — Mapping Every CTA on the Funnel

### Complete CTA Inventory (from production snapshot + copy docs)

| Section | CTA Text | Destination | Intent Param | Hosted On |
|---------|----------|-------------|--------------|-----------|
| Hero primary | "Generate free audit" | /#audit (anchor) | — | Homepage |
| Hero secondary | "See implementation options" | /services | — | Homepage |
| Hero tertiary | "Preview sample audit report →" | /sample-report | — | Homepage |
| TrustBar | None (informational) | — | — | Homepage |
| ServicesOverview | Link to /services | /services | — | Homepage |
| SocialProof | "Run your free audit" + ArrowRight | /#audit | — | Homepage |
| Audit tool submit | "Generate Free Audit" | inline submit | — | Homepage |
| Audit tool details | "Add business/access details" | inline expand | — | Homepage |
| Audit result → FullPlanGate | "Enter email →" /api/contact | /contact?intent=audit&url={url} | audit | Homepage/audit result |
| /try page | "Request Proposal" | /contact | — | /try |
| /try header | "Run an audit on your own site" | /#audit | — | /try |
| /sample-report | Link to /#audit or /contact | /#audit or /contact?intent=discovery | discovery | /sample-report |
| FinalCTA | "Book your free audit review" → ArrowRight | /contact?intent=discovery | discovery | Homepage |
| Closing paragraph | "Enter your URL right now..." | /#audit | — | Homepage |
| Nav "Get Started" | "/contact" | /contact | — | All pages |
| Footer nav | All standard links | various | — | All pages |

### Gap: Intent Query Params Are Decorations
`/contact?intent=audit` and `/contact?intent=discovery` are passed from the anchor but **never consumed** by the ContactForm component. The form renders the same regardless of intent. Fix: parse `intent` in ContactForm and prefill service_interest or show different intro copy based on the param. This is trivially fixable and would make the funnel feel connected.

### Gap: No Hero CTA to Input Directly
The hero has no URL input field. Funnel path: user sees hero → clicks "Generate free audit" → page scrolls to #audit section → user sees URL input → enters URL → clicks "Generate Free Audit." That's 5 steps before the first action. Removing the scroll anchor and putting the input in the hero cuts it to 3 steps.

### Gap: No "Try It" or Self-Serve CTA in the Hero
The canonical messaging framework calls for "See Sample Report" as a secondary CTA. The live hero has this as a ghost link. But there's no "try a sample URL" pattern — the /try page is linked from the audit results section, not the hero. Add a "/try" link or a "See how it works in 30 seconds" demo mode.

### Gap: Pricing Preview → No CTA
The PricingPreview section on the homepage has no CTA linking to /contact or /pricing. Visitors see price ranges but no action path. Add "See what your audit reveals →" linking to /#audit directly from the pricing section.

---

## PART 4: Social Content — Readiness Audit

### What Exists
| Artifact | Status | Format |
|----------|--------|--------|
| 14-post copy deck (6 verticals) | ✅ Complete, approval-safe | Text + platform notes |
| Publishing calendar (7-day schedule) | ✅ Complete | Day-by-day X/LinkedIn/IG/TT |
| Social profile copy deck | ✅ Complete, ready to paste | 6 platforms' bio + pinned content |
| Content plan (full strategy doc) | ✅ Complete | Channel strategy + sample queue |
| Adaptation plan | ✅ Complete | Vertical versioning per platform |

### The Problem: Zero Accounts Exist

| Platform | Account Status | Content Readiness | Blocked By |
|----------|---------------|-------------------|------------|
| X (Twitter) | ❌ Not created | 4 posts + pinned thread + bio ready | RED approval |
| LinkedIn Company | ❌ Not created | About, tagline, specialties, featured post ready | RED approval |
| Instagram | ❌ Not created | Bio, carousel concepts ready | RED approval |
| TikTok | ❌ Not created | Bio, script concepts ready | RED approval |
| YouTube | ✅ Existing (creator) | Channel description ready | No block |
| Facebook Groups | ❌ Not created | Engagement strategy ready | RED approval |

### Assessment
The content team (SIGNAL / Media workspace) has overdelivered. Every piece of copy is approval-safe, audit-led, mission-compliant. The bottleneck is **Rylee approval to create accounts** — which is correctly flagged as RED in the mission doc. The content vault is 15+ pieces deep across 5 platforms with vertical targeting, scheduling, and platform adaptation already figured out.

### Recommendation
Package the entire social launch as a single approval request for Rylee with:
- Total cost: $0 (all free-tier accounts)
- Time to first post: <1 hour once accounts exist
- Risk: none (all copy reviewed for compliance)
- First week: X thread (audit-led welcome) + LinkedIn about post + IG carousel (roofing)

---

## PART 5: Account Setup — Blockers & Path

### Current Blocker: RED Gating
The mission doc correctly says account creation is RED. The checklist, copy deck, and content plan all acknowledge this and are queued. No workarounds — Rylee must approve.

### What Could Be Done Now While Waiting
1. **YouTube is available** — publish the first audit walkthrough video (no account creation needed)
2. **Blog content posting** — 9 blog posts already published on outboundautonomy.com/blog between Apr 28-29 (snapshot shows How To Read Score, Pillar Lead Leak, CTA Deep Dive, Form Deep Dive, Schema Post, 4 Signals, Free Audit What It Checks, Service Biz Leads, Grande Prairie SEO). This is **high velocity content** that can be shared once social accounts exist.
3. **Resend/email platform setup** for audit email delivery — does not require external account creation, just API key
4. **Google Search Console verification** — DNS TXT record, no new account needed

### Recommended Approval Package for Rylee
Send a concise READY signal:
> "Social content is complete. 15 posts, 6 platforms, all audit-led, all mission-compliant. Zero cost to create accounts. Accounts needed: X, LinkedIn Company, IG, TikTok. First post possible same day as approval. This is the single highest-leverage marketing action that costs $0."

---

## PART 6: Outreach Angles — Quality Assessment

### Current Template Suite
The email outreach templates (`email-outreach-templates.md`) are strong. Structure is correct: specific finding → business impact → full report offer → no strings. The three-follow-up cadence is disciplined. The vertical-specific finding seed lines show real research.

### Issues with Live Drafts

| Draft | Strengths | Weaknesses |
|-------|-----------|------------|
| Atlantic Dental | Specific findings (no booking, no phone, wall-of-text) are real, observable, and damning. | **No personal name.** Email addressed "Atlantic Dental team." Cannot send live without finding a contact. Also: 34/100 score is extremely low — may trigger defensiveness. |
| Denver Roofing Co. | Moderate opportunity assessment is honest. Good WordPress foundation acknowledged. Findings are specific and verifiable. | Same lack of named contact. Phone/email found on site but no individual identified. |
| DC Plumbing | Strong finding sequence. | No CRM status tracking on what happens after send. |
| Denver Concierge | Vertical-specific language works. | — |

### Structural Gap: No Compliance Gate Infrastructure
Every outreach draft says "Queue for RED send request to NEXUS/SENTINEL" and "Please do not send without explicit approval." The mission doc says SENDING EMAILS is always GREEN. **This contradiction has been noted in the previous DREAMS engineering review (P0 blocker).** The templates themselves say "Auditor compliance review required before any live send." There's no compliance gate process defined — no one reviews, no checklist is checked, drafts sit idle.

### Recommended Resolution
Either:
1. **Update the templates** to remove the "RED send request" language if email sending is truly GREEN, OR
2. **Define the compliance gate** as a single checklist: (i) personal name found? (ii) specific finding documented? (iii) score calculated? (iv) correct template used? (v) domain DNS verified? — then make a designated agent execute it, OR
3. **Get Rylee to approve sending of 3 highest-opportunity drafts** as a batch test. Measure reply rate. If >0 replies, accelerate.

### Outreach Angle Improvements
1. **Audit-only cold outreach ≠ conversation starter.** The templates lead with "here's what's wrong." An alternative angle: "I checked your site against 3 competitors. You're winning on [X] but losing on [Y]. Want the comparison?" This reframes from criticism to intelligence.
2. **No vertical-specific subject lines tested.** All follow the "[Business] — finding from your site audit" pattern. A/B test subject lines that name the specific problem: "Your [industry] site has no [feature]. Competitors do."
3. **No regional/near-me language.** Drafts targeting Denver prospects don't name specific Denver neighborhoods or landmarks the prospect would recognize. "We audited 5 roofing sites in Denver's 80216 area" would signal local knowledge.
4. **No warm events/triggers.** Timely angle: "I noticed your Google My Business listing shows [issue]" or "Your competitor [name] just redesigned their [service page] — your audit shows [gap]."

---

## PART 7: Consolidated Next Actions

### P0 — Unblock funnel conversion
| Action | Who | Why |
|--------|-----|-----|
| Unify hero H1 to canonical hook + move URL input above fold | Engineering/Marketing | Currently two hooks compete. URL input is 5 sections below hero. Critical for conversion lift. |
| Resolve outreach GREEN/RED contradiction | Rylee/Orchestrator | 10+ drafted emails sit silently. Templates say RED. Mission says GREEN. Pick one. |
| Approve social account creation (or deny) | Rylee | $0 cost, 15 posts ready. Single highest-leverage unpaid marketing action. |

### P1 — Improve content/positioning quality
| Action | Who | Why |
|--------|-----|-----|
| Absorb intent params in ContactForm | Engineering | /contact?intent=audit and ?intent=discovery are decorations — fix in <1 hour |
| Add URL input to hero component | Engineering | Removes scroll friction from CTA path |
| Update canonical one-sentence offer: "ranked fixes with cost estimates" | Marketing | More specific, more credible deliverable promise |
| Add compliance gate checklist and unblock top 3 outreach drafts | Outreach/Marketing | Turn drafted work into revenue experiments |

### P2 — Polish and scale
| Action | Who | Why |
|--------|-----|-----|
| Add vertical-specific subject lines to templates | Marketing | Increase open rates |
| Build warm/trigger-based outreach angles | Outreach | Replace cold-only angles with event-driven ones |
| Add "Try It" self-serve demo mode to hero | Engineering | Reduce friction for skeptical prospects |
| Add pricing section CTA | Engineering | PricingPreview currently has no action path |
| Package social launch as single Rylee approval request | Media/SIGNAL | Reduce approval cycles from 5 to 1 |

### P3 — Ongoing hygiene
| Action | Who | Why |
|--------|-----|-----|
| Align "Generate free audit" → "Get Your Free Audit" | Engineering | Copy consistency |
| State "90 seconds" in hero subhead (not just badge) | Marketing | Time signal belongs in the value prop |
| Blog content output is live (9 posts in 48h) — no action needed | Marketing | Confirm content cluster is linked from homepage |

---

## PART 8: Handoff Summary

| # | Asset | Destination | Action |
|---|-------|------------|--------|
| 1 | **Hero hook mismatch** | Engineering (FORGE/task) | Unify H1, move URL input above fold, align CTA copy |
| 2 | **Intent param absorption** | Engineering (FORGE/task) | PromiseContactForm to read intent=audit/discovery |
| 3 | **One-sentence offer update** | Marketing (PULSE) | Update messaging-framework-v2 with stronger deliverable promise |
| 4 | **Outreach RED/GREEN resolution** | Rylee / Orchestrator | Decide: is email sending green or not? Update mission doc or templates |
| 5 | **Social account creation approval** | Rylee | Package 15-post ready queue as single approval request |
| 6 | **Pricing section CTA gap** | Engineering | Add action link to PricingPreview component |
| 7 | **Outreach subject line variants** | Marketing (PULSE) / Outreach | Add vertical-specific, problem-specific subject lines |
| 8 | **Warm outreach angles** | Outreach | Add event/trigger-based templates alongside cold ones |
| 9 | **Live site copy syncs** | Marketing → Engineering | Ensure canonical copy doc matches deployed component text |

---

**Generated by DREAMS Nightly OA Marketing Review — 2026-04-29 02:43 MDT**
**Source authority:** `memory/shared/outbound-autonomy-mission.md`
**Covers:** URL hook, one-sentence offer, CTA stack, social content, account setup, outreach angles
**Excludes:** OpenClaw, SPECTOR, beats/music, internal agent workflows
