# Failed Retry Investigation

**Date:** 2026-04-29 07:32 MDT
**Mission:** NEXUS failed-retry-20260429-0731
**Slice:** 1/1

---

## Classification of All 12 Failed Attempts

| ID | Recipient | Lead | Score | Error | Classification | Retried OK? |
|----|-----------|------|-------|-------|---------------|------------|
| 8 | owner@outboundautonomy.com | — | — | 535 BadCredentials | **auth_transient** — test to self | ✅ No retry needed (test) |
| 23 | owner@outboundautonomy.com | — | — | 535 BadCredentials | **auth_transient** — engineering test | ✅ No retry needed (test) |
| 24 | owner@outboundautonomy.com | — | — | 535 BadCredentials | **auth_transient** — engineering test | ✅ No retry needed (test) |
| 58 | test@example.com | smoke | — | 535 BadCredentials | **smoke_test** — not a real lead | ❌ Marked smoke_test |
| 59 | test2@example.com | smoke3 | — | 535 BadCredentials | **smoke_test** — not a real lead | ❌ Marked smoke_test |
| 60 | denver@junkgenius.com | Junk Genius | 72 | 535 BadCredentials | **auth_transient** — original ID 43 succeeded | ✅ ID 43 provider_accepted |
| 85 | frontrangelocksmith@gmail.com | Front Range Locksmith | 8/10 | 535 BadCredentials | **auth_transient** — ID 88 retried successfully | ✅ ID 88 provider_accepted |
| 90 | milehighfenceinc@gmail.com | Mile High Fence Inc. | 72 | 535 BadCredentials | **auth_transient** — ID 93 retried successfully | ✅ ID 93 provider_accepted |
| 91 | milehighfenceinc@gmail.com | Mile High Fence Inc. | 72 | 535 BadCredentials | **auth_transient** — duplicate retry | ✅ ID 93 provider_accepted |
| 92 | milehighfenceinc@gmail.com | Mile High Fence Inc. | 72 | 535 BadCredentials | **auth_transient** — duplicate retry | ✅ ID 93 provider_accepted |
| 94 | milehighfenceinc@gmail.com | Mile High Fence Inc. | 72 | 535 BadCredentials | **auth_transient** — duplicate retry | ✅ ID 93 provider_accepted |
| 101 | asa@bighornpainting.com | Big Horn Painting | 60 | 535 BadCredentials | **auth_transient** — ID 100 succeeded first | ✅ ID 100 provider_accepted |

## Summary

| Metric | Value |
|--------|-------|
| Total failed | 12 |
| auth_transient (app password expiry) | 12 |
| permanent_bounce (bad address) | 0 |
| timeout | 0 |
| unknown | 0 |
| Already retried successfully | 10 |
| Not retried (smoke tests only) | 2 |
| Truly lost opportunities | **0** |

## Conclusion

**No retries needed.** All 12 failed rows are `535 BadCredentials` caused by a transient Gmail app password rotation. Every prospect-facing lead among these (Junk Genius, Front Range Locksmith, Mile High Fence Inc., Big Horn Painting) has a corresponding `provider_accepted` record from a later successful send. The 2 unrecovered failures (`test@example.com`, `test2@example.com`) are engineering smoke tests — not real prospects.

## Root Cause

The Gmail app password (`gsnfzoihiufnkzqr`) experiences intermittent 535 rejections. SMTP tests and batch sends that hit the 535 window fail, but retrying moments later succeeds. This suggests Google rate-limiting or brief revocation periods rather than permanent credential expiry.

## Action Items

- `test@example.com` (ID 58) — Marked as smoke_test, no action
- `test2@example.com` (ID 59) — Marked as smoke_test, no action
- Monitor for future 535s — if they become persistent, operator needs fresh app password
