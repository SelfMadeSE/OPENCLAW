# Full Ledger Sweep Results

**Date:** 2026-04-29 07:13 MDT
**Mission:** NEXUS full-ledger-sweep-20260429-0713
**Slice:** 1/1

---

## Send Results

| # | Lead ID | Name | Score | Email | SMTP ID | Provider Message ID |
|---|---------|------|-------|-------|---------|-------------------|
| 1 | fdc4a754e86d | Mountain View Mechanical | 83 | mvmheatingandcooling@gmail.com | 86 | `<177746851939...>` |
| 2 | 6792b00dccf4 | DenTech Heating & Air | 69 | dentechvac@gmail.com | 87 | `<177746853016...>` |
| 3 | 18205fea-e6f | Front Range Locksmith | 8/10 | frontrangelocksmith@gmail.com | 88 | `<177746853857...>` |
| 4 | 85df6e45-3c7 | Colorado Green Landscaping | 7/10 | george@coloradogreenlandscaping.com | 89 | `<177746854771...>` |

## Skipped

| Lead | Reason |
|------|--------|
| Competition Auto Glass (09045987-6c5) | Audit 100/100 A — near-perfect site. Low urgency. Keep in scored for Rylee. |
| Junk Genius, Good People Tree, Bronco Pro Kleen, COS Plumbing | Sent earlier with `lead_id=unknown` — already have `provider_accepted` records at the email level. |

## Email Details

| Lead | Subject | Body Hook |
|------|---------|-----------|
| Mountain View Mechanical | "Quick website audit for Mountain View Mechanical" | Site returning 404 — blank canvas, build from scratch |
| DenTech HVAC | "Quick website audit for DenTech Heating & Air" | 96/100 — no lead form costing bookings |
| Front Range Locksmith | "Quick website audit for Front Range Locksmith" | 90/100 — no lead form, weak CTA |
| Colorado Green Landscaping | "Quick website audit for Colorado Green Landscaping" | 92/100 — missing meta description, no service-area pages |

## Pipeline State (Post-Sweep)

| Stage | Count |
|-------|-------|
| outreach_sent | **55** |
| archived | 14 |
| scored | 3 (Affordable Pest, Window Replacement Denver, Competition Auto Glass) |
| lost | 2 |
| prospect | 1 (Test) |

## Email Ledger (All Time)

| Status | Count | Change |
|--------|-------|--------|
| ✅ provider_accepted | **75** | +4 |
| 🔄 reconciled_superseded | 7 | — |
| ❌ failed | 7 | +1 (incremental, no impact) |
| **Total** | **89** | |

## Remaining Unsent Leads

**Zero unsent leads with verified emails.** All email-capable leads across all stages have `provider_accepted` rows. The only remaining leads in non-sent stages lack email contact:

| Lead | Score | Block |
|------|-------|-------|
| Affordable Pest | 7/10 | No email. Audit: 97/A near-perfect site. |
| Window Replacement Denver | 7/10 | No email. Audit: 98/A near-perfect site. |
| Competition Auto Glass | 5/10 | Has email (info@competitionautoglass.com) but 100/A perfect site. Needs Rylee decision. |
| Test | 0 | Junk prospect. |
