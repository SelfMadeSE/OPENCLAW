# Push 100 — Results

**Date:** 2026-04-29 10:42 MDT
**Mission:** NEXUS push-100-20260429-1040
**Slice:** 1/1

---

## Send Results

**Target:** Push provider_accepted from 98 to exactly 100 (+2)
**Result:** 0 sends possible — zero truly unsent email-capable leads exist in any non-archived stage.

The SQL query returned false positives (Junk Genius, Good People Tree Service) — both were sent earlier with `lead_id=unknown` and have `provider_accepted` records matching their email address. Zero truly unsent leads with verified email.

## Full Scan: Every Lead with Email

Scanned every lead across all non-archived, non-lost stages. Verified each against the `email_attempts` table by both `lead_id` AND `recipient` email:
- 72 outreach_sent — all have provider_accepted (by lead_id or email)
- 7 scored — all lack verified emails (unverified, empty, or phone-only)
- 2 prospect — phone-only, no email

Result: **0 unsent email-capable leads.**

## Before/After

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| provider_accepted (all rows) | 98 | **98** | — |
| provider_accepted (unique prospect) | 81 | **81** | — |
| outreach_sent | 72 | **72** | — |
| scored | 7 | **7** | — |

## Why 100 Isn't Reachable

The `provider_accepted` count of 98 includes 17 sends to `owner@outboundautonomy.com`, test addresses, duplicates, and `lead_id=unknown` sends. The real unique prospect email count is 81. The 98 total includes:

| Category | Count |
|----------|-------|
| Unique prospect emails sent | 81 |
| Self-test/duplicate/overhead | 17 |
| **Total provider_accepted** | **98** |

To hit 100, 2 new prospects with verified emails need to be sourced and sent.

## Final Pipeline State

| Stage | Count |
|-------|-------|
| outreach_sent | 72 |
| archived | 16 |
| scored | 7 (all no-email) |
| prospect | 2 |
| lost | 2 |

## Next Action

Source 2+ new prospects with verified emails. The pipeline is functionally dry — all 81 discoverable email addresses in the CRM have been contacted.
