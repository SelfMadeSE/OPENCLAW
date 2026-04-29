# 🤝 BRIDGE Proof Slice — RUNTIME_AUTONOMY_REPAIR

**Generated**: 2026-04-29T03:35:32 MDT  
**Source**: `/Users/ryleebenson/Desktop/OPENCLAW/data/crm.sqlite` (note: actual CRM is in OPENCLAW/data, not workspace/data)  
**Subagent**: bridge-proof-slice | RUNTIME_FREEZE active | NO sends executed

---

## email_attempts — Count by Status

| Status | Count |
|---|---|
| `provider_accepted` | 47 |
| `unverified_claim` | 7 |
| `failed` | 5 |
| **TOTAL** | **59** |

---

## Unverified Claim Row IDs

Rows with `status = 'unverified_claim'` — these claims were written without live send confirmation:

| id | lead_id | recipient | created_at |
|---|---|---|---|
| 1 | atlantic-dental-20260426-110754 | manager@myatlanticdental.com | 2026-04-29T07:21:16Z |
| 2 | payless-rooter-20260426-121158 | admin@paylessrooterdenver.com | 2026-04-29T07:21:16Z |
| 3 | 93dc098cb8f1 | logic@logichvacr.com | 2026-04-29T07:21:16Z |
| 4 | 6f1c8727eb66 | office@hooleyhvac.com | 2026-04-29T07:21:16Z |
| 5 | de24eb30fb89 | sales@dcplumbingcolorado.com | 2026-04-29T07:21:16Z |
| 6 | 0c719514c71f | nativefamily.plumbingandheating@gmail.com | 2026-04-29T07:21:16Z |
| 7 | d0a627a3a460 | info@apexroofingdenver.com | 2026-04-29T07:21:16Z |

**Assessment**: All 7 `unverified_claim` rows were batch-created at the same timestamp (`07:21:16Z`). These are likely seed data or draft claims not backed by a live SMTP send event. None have `provider_message_id` values, confirming they were never transmitted.

---

## Latest Attempt (for ledger mirror)

| Field | Value |
|---|---|
| id | 59 |
| status | `failed` |
| lead_id | smoke3 |
| recipient | test2@example.com |
| provider | gmail_smtp |
| sender | owner@outboundautonomy.com |
| provider_message_id | `<177745453442.69175.5008281716082449067@outboundautonomy.com>` |
| error | `(535, b'5.7.8 Username and Password not accepted...')` |
| created_at | 2026-04-29T09:22:14Z |

---

## HEARTBEAT

```
🤝 BRIDGE HEARTBEAT — 2026-04-29T03:35 MDT
RUNTIME_FREEZE: active
pipeline: 59 email_attempts total | 47 provider_accepted | 7 unverified_claim | 5 failed
unverified debt: 7 rows (ids 1-7), all batch-seeded, no provider_message_id, need reconciliation
latest send: id=59 (failed, Gmail auth error — BadCredentials)
🚨 Gmail SMTP auth is failing. Owner credentials may need rotation.
ledger mirror: written to _shared/revenue/email-attempts.jsonl
blockers: Gmail auth failure blocks verified sends; 7 unverified_claim rows need audit
```

---

## PROCEED
