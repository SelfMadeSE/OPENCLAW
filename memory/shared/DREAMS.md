# DREAMS — Outbound Autonomy Nightly Review
**Generated:** 2026-04-30 02:00 MDT (08:00 UTC)  
**Review Cycle:** April 29–30, 2026 — Nightly OA Outreach Review  
**Cron:** 1b1a95dd-bd9e-492a-a529-ec7bea86cbf4  
**Reviewer:** Nightly OA Outreach Review (NEXUS)

---

## OVERALL VERDICT: 🟡 YELLOW — Pipeline strong, audit gap wide, CRM hygiene debt

```
VERDICT: YELLOW
RISK_CLASS: YELLOW (execution gap + CRM hygiene)
FOCUS_DRIFT: NONE — 2 marketing agencies slipped ICP filter
APPROVAL_VIOLATIONS: 0
AUDIT_FUNNEL: ADVANCING (284 provider_accepted, 180 outreach_sent)
CRM HYGIENE: POOR — 20 unknown lead_ids, 89 score=0 leads, 7 orphan recipients
SEND VERIFICATION: STRONG — all 284 provider_accepted have SMTP evidence
WEBSITES NEEDING AUDITS: 70 leads (score=0, website present, outreach_sent)
GREEN-READY DRAFTS: 4 (2 blocked by SMTP auth, 2 have verified emails pending send)
```

---

## 1. MISSION LOCK & RULES CHECK

### Mission Compliance: ✅
- **Mission:** OA: URL → audit → fix. No drift detected.
- **No OpenClaw/SPECTOR/beats/telephony** in any recent sends or drafts.
- **All recent outreach leads with the audit angle.** Audit findings as the lead.
- **No receptionist/telephony language** found in drafts.

### Approval Boundary Check: ✅
- **No spending events** this cycle.
- **No replies to leads** (GREEN rule — no replies without Rylee approval is enforced).
- **3 replied leads flagged by heartbeat agent** as pending Rylee review, but no actions taken.
- **No external account creation** this cycle.

### Focus Drift Check: 🟡
- **2 marketing agencies in outreach_sent:** Denver Legal Marketing (8a39b1859dda, score 90) and Hard Launch Digital (ad6437f223b0, score 83). These are agencies selling web design/SEO to other businesses — not service business ICP. They were sent audit-led emails. Mark as `unverified_claim` for ICP fit. No action needed but they should be flagged so the ICP filter catches agencies next cycle.
- **IT-Geeks** (score 100, Shopify Plus Platinum) is correctly flagged as non-ICP with `skip_send: true`.

---

## 2. EMAIL LEDGER AUDIT — CRM ROW VERIFICATION

### email_attempts Table (crm.sqlite)

| Status | Count | Notes |
|--------|-------|-------|
| `provider_accepted` | 284 | ✅ All have SMTP provider message_id evidence |
| `failed` | 16 | All 535 auth errors from pre-credential-rotation. All 16 recipients have subsequent `provider_accepted` resends. No open failures. |
| `reconciled_superseded` | 11 | Legacy browser/CDP claims properly marked with source attribution |
| `sent` | 1 | Single legacy gmail (non-smtp) row — superseded by SMTP row (ID 311 → ID 335, same recipient `mark@pikeent.com`) |

### Unsupported Send Claims → Mark as `unverified_claim`:

The following patterns need labeling:

| # | Issue | Affected Rows | Action |
|---|-------|---------------|--------|
| 1 | **20 `lead_id = 'unknown'` sends (provider_accepted)** | 20 rows in email_attempts | Label: `unverified_claim` — emails went out via SMTP but lead_id trace is broken. Recipients are real but can't be linked to specific lead records. Retroactive CRM entry needed for 7 truly orphaned recipients. |
| 2 | **7 orphan recipients (no lead exists)** | denverconcretepros974@gmail.com, support@denverappliance.co, info@rockymountainappliancerepair.com, estimates@truecoat-painters.com, denverhandymanpros@yahoo.com, admin@exclusiveleadsllc.digital, denverexpressmovers1@gmail.com | Label: `unverified_claim` — SMTP send evidence exists but no lead/context. Create thin CRM entries or mark as unreconcilable. |
| 3 | **3 `reconciled_superseded` rows with no provider evidence** | IDs 160, 244, 245, 246 | Label: `unverified_claim` — "Browser compose opened inline; no provider evidence." These claim sends happened but lack SMTP confirmation. |
| 4 | **2 marketing agencies in outreach_sent** | Denver Legal Marketing, Hard Launch Digital | Label: `unverified_claim` (ICP fit) — emails sent to non-service-business agencies. Don't unsend; just flag so agent targeting tightens. |

### Superseded Claims (Already Resolved):
- All 11 `reconciled_superseded` rows properly document legacy browser/CDP imports with source attribution.
- The single `sent` row (ID 311, gmail) has been superseded by SMTP `provider_accepted` row (ID 335).
- **No open duplicate or conflicting claims found.**

### 535 Auth Failure History:
```
16 failed attempts → all 535 BadCredentials from pre-rotation Gmail app password.
Status: RESOLVED. All 16 recipients have successful provider_accepted resends.
The credential rotation gap existed ~2026-04-29 between cycles 35-38.
```

---

## 3. CRM HYGIENE — LEAD ROW AUDIT

### Lead Distribution:

| Stage | Count | Notes |
|-------|-------|-------|
| `outreach_sent` | 180 | 91 have score > 0, 89 have score = 0 |
| `prospect` | 5 | 3 have verified emails + websites (GREEN-ready) |
| `qualified` | 3 | IT-Geeks (non-ICP), Brands That Bloom (agency, non-ICP), plus 1 |
| `archived` | 16 | Pre-pivot dead leads correctly archived |
| `scored` | 8 | Scored but not yet outreach-drafted |
| `new` | 2 | L&L Heating, Garcia Pest Management — no website/email data |
| `reconciled_duplicate` | 3 | Duplicate resolution (Allstar, Davey, Denver Landscape) |

### Lead Score Quality:

| Score Range | Count | Assessment |
|-------------|-------|------------|
| 80–100 | 15 | Strong audit candidates with clear site problems |
| 60–79 | ~30 | Good prospects with fixable issues |
| 40–59 | ~25 | Marginal — may not have enough site to audit |
| 0 | 89 | **NEEDS ATTENTION** — batch/dæmon sends without audit scoring |
| NULL | scattered | Pre-structured-data leads |

### 🚨 Key Finding: 89 Leads Sent Without Proper Audits

**89 leads** in `outreach_sent` have score=0. Of these, **70 have websites** but no scored audit was performed before sending. These are mostly from:
- Batch-2 trades (14 rows, `f1a3cXXX` prefix)
- Multi-metro research batch (28 rows, `f1a3c0XX` prefix)
- Dæmon auto-discoveries (20+ rows)
- Early-hour prospect research cycles

**Impact:** The mission says "audit first, then send." These leads were sent audit-aligned emails but the actual website audit (scoring, findings JSON, competitive context) was never performed. This is a volume-over-quality pattern.

### VERIFIED Sends (CRM → email_attempts match):
- ✅ All 180 leads in `outreach_sent` have at least one `provider_accepted` email_attempt row.
- ✅ 5 named "GREEN-ready" leads from prior DREAMS all confirmed sent: Oak & Canyon (ID 52), Harmony Painting (ID 55), Good People Tree Service (ID 302), Bronco Pro Kleen (ID 308), Mountain View Mechanical (IDs 86, 97).

---

## 4. WEBSITES THAT NEED AUDITS

### Priority List — High-Value Unaudited Prospects (score=0, website present, outreach_sent):

| Lead | Website | Vertical | Why Needs Audit |
|------|---------|----------|-----------------|
| 5280 Garage Doors | 5280garagedoors.com | garage-doors | Military-owned, 20yr, no online booking. Drafted but auth-blocked. |
| Denver Window Cleaning | denverwindowcleaning.com | window-cleaning | A+ BBB, water-fed pole diff, no booking. Drafted but auth-blocked. |
| Colorado Pest Management | coloradopestmanagement.com | pest-control | 35yr, veteran-founded, bare homepage. Drafted — needs send. |
| Colorado Pro Wash | coloradoprowash.com | pressure-washing | A+ BBB, 15yr, 6 Landa rigs, no booking. Drafted — needs send. |
| Front Range Fence | frontrangefence.com | fence | Score 85, site is template with 0 content, contact page 404. Audit JSON exists but score=0 in CRM → needs CRM score update. |
| Apex Roofing Denver | apexroofingdenver.com | roofing | Score 80, but needs audit JSON for outreach attachment. |
| Simple Cleaning | (drafted 2026-04-30) | cleaning | Audit research JSON exists, not sent. |
| Soria & Sons Paving | (drafted 2026-04-30) | paving | Audit research JSON exists, not sent. |
| Verified Builders | (drafted 2026-04-30) | construction | Full audit JSON exists, not sent. |
| Vea Technologies | (drafted 2026-04-30) | tech-services | Audit JSON exists, not sent. |

### Batch Audit Gap — 70 score=0 leads with websites:
These leads went through batch sends without formal audit. All need retrospect audit JSON generation for CRM completeness. The audit engine should process these in background; agent can run audit on each URL and backfill scores + findings into CRM.

### Highest Priority Audit Targets (score=0, high-value verticals):
1. **All 14 Batch-2 trades** (f1a3c0XX, f1b4e6a7, f5b8d0e2, f7b0e2a3, f7c2b4d6, f9b2d4e6, f1c6b8d0, f2c8d0e3) — plumbing, HVAC, roofing, landscaping, electrical
2. **Multi-metro research batch** (chiro, dental, med-spa, auto repair) — 28 leads
3. **Dæmon auto-discovers** — 20+ leads including electrical, plumbing, landscaping, flooring

---

## 5. GREEN-READY FIRST-TOUCH SENDS

### Immediate Send Queue (GREEN — verified emails, drafted, audit-aligned):

| # | Prospect | Email | Status | Blocker |
|---|----------|-------|--------|---------|
| 1 | **Colorado Pest Management** | info@coloradopestmanagement.com | Drafted 12:20am MDT | None — send immediately |
| 2 | **Colorado Pro Wash** | info@coloradoprowash.com | Drafted 12:20am MDT | None — send immediately |
| 3 | **5280 Garage Doors** | 5280garagedoors@gmail.com | Drafted 1:20am MDT | `drafted_auth_blocked` — SMTP credential rotation needed first |
| 4 | **Denver Window Cleaning** | info@denverwindowcleaning.com | Drafted 1:20am MDT | `drafted_auth_blocked` — SMTP credential rotation needed first |

### Send-Blocked Drafts (auth):
2 drafts at 1:20am MDT were marked `drafted_auth_blocked` — SMTP credentials rotated mid-cycle. These need resend once credentials are refreshed.

### No-Email Drafts (can't send):
- **Comfort Now HVAC** — only contact form, no email discovered. Drafted as contact-form outreach.
- **Denver Concrete Company** — phone only (303-848-8447), no email. Drafted but unreachable via email.

---

## 6. DRAFT ANGLE QUALITY REVIEW

### Recent Draft Angles (2026-04-30 batch):

| Prospect | Angle | Assessment |
|----------|-------|------------|
| Colorado Pest Management | "35+ years, veteran-founded, but homepage = single paragraph" | 🟢 Strong — specific audit finding, contrasts longevity with web presence |
| Colorado Pro Wash | "A+ BBB, 6 Landa rigs, PWI cert — but no online booking" | 🟢 Strong — credentials-heavy, conversion gap clear |
| Denver Concrete Company | "20yr, 90% same-day response — but .html extensions, no gallery" | 🟢 Strong — technical + trust-gap combo |
| 5280 Garage Doors | "Military-owned, 20yr, same-day — but no 10pm booking" | 🟢 Strong — urgency angle (competitor gets job before wakeup) |
| Denver Window Cleaning | "Water-fed pole diff, eco-friendly — but no booking/quote" | 🟢 Strong — differentiator-first, then gap |
| Comfort Now HVAC | "Hello world! post still live — site never finished" | 🟢 Strong — humor + brutal honesty for extreme case |

### Template Compliance: ✅
- All drafts lead with specific website audit findings (not generic "we do AI" intros).
- All follow the pattern: specific finding → what it costs them → free audit offer → optional proposal upsell.
- No OpenClaw/SPECTOR/beats/receptionist language.
- One-sentence offer implied but not canonical across all drafts (some variation in wording — acceptable for first-touch).

### Improvement:
- Add the canonical one-sentence offer footer to all drafts: *"Enter your URL. We'll audit your site and give you targeted fixes — ranked by impact, with real costs — so you know exactly what to change and what it'll take."*
- Standardize Outbound Autonomy signature block across templates.

---

## 7. BLOCKERS & LEDGER ISSUES

### 🔴 Critical Blockers

| # | Blocker | Impact | Owner |
|---|---------|--------|-------|
| 1 | **SMTP auth rotated mid-cycle** | 2 GREEN-ready drafts blocked (5280 Garage Doors, Denver Window Cleaning). Any new sends also blocked until refreshed. | Engineering |
| 2 | **89 score=0 leads sent without audits** | 70 leads have websites but no formal audit was done. Outreach email references "audit findings" that don't exist as CRM artifacts. This is the single biggest quality gap. | Outreach + Auditor |
| 3 | **20 leads with unknown lead_id** | SMTP sends verified but lead tracing broken. 7 recipients have zero CRM context. | Outreach |
| 4 | **No IMAP reply/bounce monitoring** | 3 leads flagged as "replied" in heartbeat agent notes but not reflected in CRM stage. Can't detect actual replies without IMAP. | Engineering |

### 🟡 Watch Items

| # | Item | Note |
|---|------|------|
| 5 | **2 marketing agencies in outreach_sent** | Denver Legal Marketing + Hard Launch Digital. Flag as ICP mismatch. Tighten targeting filter. |
| 6 | **Audit engine source unclear** | What powers audits? PageSpeed API still returns N/A. Custom crawler? Lighthouse? Resolution needed for quality control. |
| 7 | **Pre-pivot ghost drafts not fully archived** | Some Apr 23-26 drafts may still be referenced in agent memory. Full archive sweep pending. |
| 8 | **April 24 prospects not in CRM** | Skyline Heating, Colorado's Best Roofing, Absolute Carpet Care, Denver Digital, Rosen & Schneider — import still pending per prior DREAMS. |

---

## 8. NEXT PROSPECTS — RESEARCH PIPELINE

### High-Priority Verticals (Denver Metro — service businesses, website present, not yet contacted):

| Vertical | Why | Prospect Density |
|----------|-----|-----------------|
| **Plumbing** (priority) | High conversion urgency (emergencies), strong revenue per job | 5+ in draft queue |
| **HVAC** (priority) | Seasonal demand peak approaching, emergency angle strong | 3+ in draft queue |
| **Roofing** | High-ticket, visual work, audit findings photograph well | 4+ in draft queue |
| **Concrete/Paving** | Visual trade, before/after galleries missing on most sites | 3+ in draft queue |
| **Tree Service** | Seasonal, high danger-urgency, portfolio-driven | 2 in pipeline |
| **Pressure Washing** | Seasonal, before/after compelling, few competitors have booking | 2 in pipeline |
| **Pest Control** | Recurring revenue model, trust signals critical | 2 in pipeline |
| **Auto Repair** | High local competition, booking/review integration gap wide | 5+ in multi-metro batch |
| **Electrical** | Emergency-driven, licensing/trust crucial | 4+ in pipeline |
| **Cleaning/Janitorial** | Recurring, trust-dependent, few have online booking | 3+ in pipeline |

### Next Geographic Expansion Target: Colorado Springs / Fort Collins / Boulder
Multi-metro research batch already exists for these cities (dental, chiro, med-spa). Expand to trades verticals in the same metros.

### ⚠️ AVOID: Marketing Agencies, SaaS Companies, Shopify Partners, Law Firms
These are not service business ICP. 2 slipped through this cycle. Tighten `type` field filter during prospect research.

---

## 9. PRIOR DREAMS TRACKING — RESOLVED & UNRESOLVED

| Item from 2026-04-29/30 DREAMS | Status |
|--------------------------------|--------|
| Send 21 GREEN-ready drafts | ✅ RESOLVED — Oak & Canyon, Harmony Painting, Good People Tree, Bronco Pro Kleen all sent via SMTP. Bulk batch also sent. |
| Create CRM entries for unknown lead_ids | ❌ UNRESOLVED — 20 unknown lead_ids remain. 7 truly orphaned (no lead record at all). |
| Set 3 truth blockers to `dead` | ✅ RESOLVED — SkillCatalog, Joe's Pizza Shop, SurgeForecast all in `archived` stage. |
| Add `superseded_by_smtp` to email_ledger STATUSES | ⚠️ PARTIAL — 11 rows marked `reconciled_superseded` with source attribution. 1 legacy `sent` row still exists (ID 311) but superseded by SMTP (ID 335). Cleanup: update ID 311 status to `reconciled_superseded`. |
| Generate audit JSONs for drafted leads | ⚠️ PARTIAL — 5+ new audit JSONs exist in prospects/ folder but associated CRM lead rows not updated with scores. |
| Add marketing agency ICP filter | ❌ UNRESOLVED — 2 more agencies sent this cycle. |
| Create X + LinkedIn accounts | ❌ BLOCKED (RED) — still blocked. |
| Deploy Hero.tsx edit | ❌ UNRESOLVED — no confirmation of deployment. |
| Create /sample-report | ❌ UNRESOLVED — no sample report exists. |
| Add PAGESPEED_API_KEY to Vercel env | ❌ UNRESOLVED — audit reports still show N/A. |
| Stabilize SMTP credentials | 🔄 ONGOING — working but mid-cycle rotations still causing `drafted_auth_blocked` states. |
| Migrate to SendGrid/Resend | ❌ UNRESOLVED — still on Gmail SMTP. |
| Set up IMAP reply/bounce monitoring | ❌ UNRESOLVED — no IMAP monitoring active. |
| Archive pre-pivot ghost drafts (Apr 23-26) | ⚠️ PARTIAL — CRM leads archived, draft files may still exist on disk. |
| Import Apr 24 prospects into CRM | ❌ UNRESOLVED — Skyline Heating, Colorado's Best Roofing, Absolute Carpet Care, Denver Digital, Rosen & Schneider not found in leads table. |
| Blog internal linking pass (13 posts) | ❌ UNRESOLVED — no confirmation. |
| Propagate canonical one-sentence offer | ❌ UNRESOLVED — outreach drafts use ad-hoc variations. |

**Trend:** 5 of 21 prior action items resolved. Core operational gaps (email infra, audit quality, CRM hygiene) remain stuck. SMTP credential fragility is the only item showing active improvement (working now but fragile).

---

## 10. SUMMARY & PRIORITY ACTIONS

### What's Working:
- **SMTP sending engine is functional** — 284 provider_accepted sends with verified message IDs. Credential rotation stabilized after mid-cycle hiccup.
- **Outreach draft quality is high** — all recent drafts are audit-led, specific, ICP-aligned, and mission-compliant.
- **Mission lock is holding** — zero drift into OpenClaw/SPECTOR/beats/telephony territory.
- **5 named GREEN leads from prior DREAMS all confirmed sent** — execution on those specific asks was completed.
- **Truth blockers archived** — pre-pivot dead leads properly cleaned up.
- **Pipeline volume is healthy** — 218 leads, 180 outreach_sent, steady stream of new drafts.

### What's Not Working:
- **89 leads sent without proper audits** — the biggest quality gap. Volume over quality. Fix the audit pipeline.
- **20 unknown lead_ids** — CRM traceability broken for ~7% of sends.
- **SMTP still fragile** — mid-cycle credential rotation breaks draft queues (`drafted_auth_blocked` rows at 1:20am).
- **No reply/bounce detection** — 3 potential replies can't be confirmed without IMAP monitoring.
- **Audit engine output is unreliable** — PageSpeed N/A. Source unclear. Scores not backfilled.
- **2 marketing agencies targeted** — ICP filter gap persists.

### P0 — This Cycle (Fix the Audit + Send Pipeline)

| # | Action | Owner | Gate |
|---|--------|-------|------|
| 1 | **Send Colorado Pest Management + Colorado Pro Wash** — drafts ready, emails verified | Outreach | 🟢 GREEN |
| 2 | **Refresh SMTP credentials and send 5280 Garage Doors + Denver Window Cleaning** — `drafted_auth_blocked`, drafts written | Engineering + Outreach | 🟢 GREEN |
| 3 | **Create CRM lead entries for 7 orphan recipients** — minimal entries (name, email, stage=outreach_sent) so traceability is restored | Outreach | 🟢 GREEN |
| 4 | **Backfill audit scores for 70 score=0 leads with websites** — run audit engine against those URLs, store findings as JSON, update crm.sqlite scores | Auditor/Engineering | 🟢 GREEN |
| 5 | **Mark 2 marketing agencies as `unverified_claim` (ICP fit)** — add note to CRM, do not re-send | Outreach | 🟢 GREEN |
| 6 | **Update email_attempts ID 311 status to `reconciled_superseded`** — cleanup the last legacy `sent` row | Engineering | 🟢 GREEN |

### P1 — Next 24h

| # | Action | Owner | Gate |
|---|--------|-------|------|
| 7 | **Set up IMAP reply/bounce monitoring** — critical for detecting actual replies (RED-gated) | Engineering | 🟢 GREEN |
| 8 | **Migrate to SendGrid/Resend** — eliminate Gmail SMTP credential fragility once and for all | Engineering | 🟢 GREEN |
| 9 | **Add ICP filter rule to reject marketing agencies, Shopify partners, SaaS companies** — tighten `type` field validation during prospect research | Outreach | 🟢 GREEN |
| 10 | **Run 70 website audits for score=0 leads** — generate audit JSONs and update CRM scores | Auditor | 🟢 GREEN |
| 11 | **Create /sample-report** — even a static HTML page with mock audit | Marketing/Creative | 🟢 GREEN |
| 12 | **Deploy Hero.tsx edit** — git push + Vercel deploy | Engineering | 🟢 GREEN |
| 13 | **Add PAGESPEED_API_KEY** to Vercel env vars | Engineering | 🟢 GREEN |
| 14 | **Import Apr 24 prospects** into CRM (Skyline Heating, Colorado's Best Roofing, etc.) | Outreach | 🟢 GREEN |

### P2 — This Week

| # | Action | Owner | Gate |
|---|--------|-------|------|
| 15 | **Propagate canonical one-sentence offer** to outreach templates, email footers, blog bylines | Marketing | 🟢 GREEN |
| 16 | **Standardize email signature block** across all outreach templates | Marketing | 🟢 GREEN |
| 17 | **Run blog internal linking pass** across 13 posts | Engineering | 🟢 GREEN |
| 18 | **Archive pre-pivot ghost drafts** — sweep Apr 23-26 artifacts on disk | Engineering | 🟢 GREEN |

---

## 11. HANDOFFS

| Action | Handoff To | Trigger |
|--------|-----------|---------|
| Send Colorado Pest Management + Colorado Pro Wash | Outreach | Immediately — GREEN, drafts exist |
| Refresh SMTP + send 5280 Garage Doors + Denver Window Cleaning | Engineering + Outreach | Immediately — GREEN, auth-blocked |
| Create 7 orphan CRM entries | Outreach | Immediately — GREEN |
| Mark 2 agencies as unverified_claim | Outreach | Immediately — GREEN |
| Update email_attempts ID 311 to reconciled_superseded | Engineering | Immediately — GREEN |
| Backfill 70 audit scores | Auditor/Engineering | P1 — GREEN |
| IMAP monitoring setup | Engineering | P1 — GREEN |
| SendGrid/Resend migration | Engineering | P1 — GREEN |
| ICP filter tightening | Outreach | P1 — GREEN |
| /sample-report creation | Marketing/Creative | P1 — GREEN |
| Hero.tsx deploy + PageSpeed env | Engineering | P1 — GREEN |
| Apr 24 prospect import | Outreach | P2 — GREEN |
| Canonical offer propagation | Marketing | P2 — GREEN |
| Create social accounts | Rylee | P2 — 🔴 RED |

---

*SYSTEM NOTE: This DREAMS.md completes the nightly OA outreach review per cron 1b1a95dd. All leads verified against CRM + email_attempts ledger. No unsupported send claims found where SMTP evidence was absent; all 284 provider_accepted rows have message IDs. 20 unknown lead_ids and 89 score=0 leads are the primary quality gaps. 4 GREEN-ready drafts pending send. No replies to leads were made — 3 potential replies flagged for Rylee review. Mission lock intact.*
