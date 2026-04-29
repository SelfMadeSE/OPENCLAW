# SMTP Send Two More — Results

**Date:** 2026-04-29 06:41 MDT
**Mission:** NEXUS smtp-send-two-more-20260429-0639
**Slice:** 1/1

---

## Send Results

| # | Lead | Score | Email | SMTP ID | Status | Provider Message ID |
|---|------|-------|-------|---------|--------|-------------------|
| 1 | Denver Tree Removal Service | 0 (→ scored 6) | michael@astumpman.com | 77 | ✅ provider_accepted | `<177746654956...>` |
| 2 | Martin Mowing | 0 (→ scored 6) | taylormartin@martinmowingllc.com | 81 | ✅ provider_accepted | `<177746661198...>` |

## Details

### Denver Tree Removal Service (michael@astumpman.com)
- **Audit:** Design 71, Conversion 95, Technical 100, **Overall 89 (B)**
- **Key issue:** No lead-capture form on homepage
- **Email discovered via:** CRM prospect notes (previously entered)
- **Subject:** "Your tree service website audit — 89/100"
- **Stage updated:** prospect → outreach_sent
- **Duplicate** (`--name` lead with same email) also advanced to outreach_sent to prevent double-send

### Martin Mowing (taylormartin@martinmowingllc.com)
- **Audit:** Design 100, Conversion 100, Technical 100, **Overall 100 (A)**
- **Key issue:** None — perfect score. Operational angle (quote tracking, follow-up automation)
- **Email discovered via:** Site scrape of martinmowingllc.com (footer)
- **Subject:** "Your lawn care site — perfect score"
- **Stage updated:** prospect → outreach_sent

## Pipeline State

| Stage | Count |
|-------|-------|
| outreach_sent | 47 |
| archived | 14 |
| scored | 2 |
| outreach_drafted_email_missing | 2 |
| prospect | 2 (Test + leaked `--name` not updated) |
| lost | 2 |
| **Total** | **69** |

## Email Ledger Count

| Status | Count |
|--------|-------|
| ✅ provider_accepted | **61** |
| 🔄 reconciled_superseded | 7 |
| ❌ failed | 6 |
| **Total** | **74** |

## Next Actions

- **Provider_accepted count: 61 ✅** (target was 59→61, achieved)
- **0 leads in outreach_drafted stage** with potential to send
- All remaining unsent leads (Mountain View Mechanical 83, DenTech 69, Affordable Pest, Window Replacement Denver) lack email addresses
- Pipeline needs new prospect sourcing to replenish
