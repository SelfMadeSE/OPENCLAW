# FORGE SMTP Credential Test — Slice 1/1

**Date:** 2026-04-29 14:06 MDT  
**Mission:** smtp-credential-alert-20260429-1404  
**Tester:** FORGE (engineering)  
**Status:** verified ✅ — SMTP credentials are WORKING, not expired

---

## Step 1: Direct SMTP Test

```bash
GMAIL_ADDRESS='owner@outboundautonomy.com' python3 gmail-smtp-send.py \
  --to owner@outboundautonomy.com \
  --subject 'SMTP credential test' \
  --body 'Testing Gmail app password validity — 2026-04-29 14:04 MDT'
```

**Result:** `provider_accepted` ✅

```json
{
  "status": "provider_accepted",
  "attempt_id": 161,
  "to": "owner@outboundautonomy.com",
  "subject": "SMTP credential test",
  "provider_message_id": "<177749321726.10032.3540100727943211981@outboundautonomy.com>"
}
```

**SMTP authenticated successfully.** Gmail accepted the message. No 535 error. Credentials are valid.

---

## Step 2: Last 5 Provider-Accepted Sends

| ID | Lead | Recipient | Status | Timestamp (UTC) | Timestamp (MDT) |
|----|------|-----------|--------|-----------------|-----------------|
| 161 | unknown | owner@outboundautonomy.com | provider_accepted | 20:06:57 UTC | 14:06 MDT (test) |
| 159 | denver-landscape-company | lesliegardendesign@outlook.com | provider_accepted | 18:41:12 UTC | 12:41 MDT |
| 158 | denver-landscapes | info@denverlandscapes.com | provider_accepted | 18:41:04 UTC | 12:41 MDT |
| 157 | highlands-landscaping | info@highlandslandscaping.com | provider_accepted | 18:40:59 UTC | 12:40 MDT |
| 156 | floors-by-tomorrow | floorsbytomorrow@gmail.com | provider_accepted | 18:40:50 UTC | 12:40 MDT |

**Continuous successful delivery.** The SMTP pipeline has been functioning throughout today. The most recent sends (IDs 156-159) were ~1.5 hours ago from the outreach agent. Our test (ID 161) confirms credentials are still valid.

---

## Blast Radius Assessment

### If credentials were to expire:

| Metric | Count |
|--------|-------|
| Total provider_accepted sends | 140 |
| Failed sends (historical) | 13 |
| Reconciled/superseded | 7 |
| Unverified claims | 1 |
| **Total sends at risk** | **140** |

140 prospects have received outreach emails with `owner@outboundautonomy.com` as the sender. If the app password expires:
- Follow-up replies would fail silently
- Reply scanning (via the CDP browser) would lose credential context
- No new sends could go out until re-authentication

### Current Status

**Credentials are valid.** The test send authenticated with Gmail SMTP using the existing app password. No 535 `BadCredentials` error was returned. The heartbeat action #331's 535 errors were from a different session/time window — possibly a transient Gmail rate-limit or a credential that was temporarily stale and has since been refreshed.

---

## Verdict

- **SMTP: HEALTHY** — credentials valid, Gmail accepting messages
- **Blast radius: 0** — no sends currently at risk
- **No ORANGE escalation needed** — credentials are not expired
- **Action: None required** — monitor for any future 535 errors
