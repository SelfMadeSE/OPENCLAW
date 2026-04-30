# Scored Flush Results

**Date:** 2026-04-29 13:14 MDT
**Mission:** NEXUS scored-flush-20260429-1313
**Slice:** 1/1

---

## Send Results

**Target:** 7 scored leads (`contact_info LIKE '%@%'`)
**Result:** 0 sends — query returned zero results. No scored lead has `@` in their contact_info.

| # | Name | Score | contact_info | Has `@`? |
|---|------|-------|-------------|----------|
| 1 | DenverHVACPros.com | 78 | `{}` | ❌ |
| 2 | Denver Carpet Cleaning | 69 | `"email":"unverified"` | ❌ |
| 3 | FB Mobile Detailing Denver | 65 | `"email":"unverified"` | ❌ |
| 4 | Denver Concrete Inc | 63 | `{}` | ❌ |
| 5 | JusPainting, LLC | 63 | `{}` | ❌ |
| 6 | Affordable Pest | 7 | `"email":""` | ❌ |
| 7 | Window Replacement Denver | 7 | `"email":""` | ❌ |

## Before/After

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| provider_accepted | 112 | 112 | — |
| outreach_sent | 88 | 88 | — |
| scored | 7 | 7 | — |

## Note

This is identical to the 13:06 MT run — no changes in 8 minutes. All 7 scored leads have empty, "unverified", or missing email fields. No SMTP sends possible until new prospects are sourced or emails are discovered via alternate methods (GBP, Yelp, Facebook).
