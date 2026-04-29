# Outreach Pipeline (canonical)

Version: 2026-04-29
Owner: outreach (BRIDGE)
Auditor: auditor (SENTINEL)
Source of truth: `data/crm.sqlite` table `email_attempts` + jsonl mirrors in `_shared/revenue/`.

## Required states (lifecycle)

```
   draft ─► parked
        └─► approved ─► queued ─► sent ─► provider_accepted ─┬─► bounced
                                                              ├─► replied ─► booked ─► converted
                                                              └─► (no event = "delivered_silent")
   draft ─► rejected
   draft ─► duplicate
   draft ─► invalid_contact
   any   ─► do_not_contact
```

State transitions are **monotonic** — once `provider_accepted`, you cannot drop back to `draft`. Only `bounced/replied/booked/converted/do_not_contact` may be appended after `provider_accepted`.

## Required fields per attempt

| field | required | source |
|---|---|---|
| `prospect_id` | yes | CRM lead row |
| `company` | yes | CRM |
| `recipient` (canonical lower) | yes | CRM |
| `email` | yes | CRM |
| `source_file` | yes | `artifacts/outreach-drafts/<batch>/<file>.md` |
| `campaign_id` | yes | mission/cron context |
| `draft_hash` | yes | `sha256(normalize_body(body))` |
| `dedupe_key` | yes | `sha256(canonical_recipient + draft_hash)` |
| `idempotency_key` | yes | same as `dedupe_key` per ledger schema |
| `approval_id` | yes for ORANGE+ | from operator `APPROVAL <id>` or `OPENCLAW_FREEZE_OVERRIDE` |
| `send_time` | yes | UTC ISO |
| `provider_message_id` | yes if `sent` or beyond | SMTP server response |
| `status` | yes | enum above |
| `owner_agent` | yes | `bridge` (or other) |
| `risk_class` | yes | per APPROVAL_POLICY |
| `evidence_path` | yes | `artifacts/outreach-drafts/<batch>/evidence/<id>.json` |

The ledger DB (`data/crm.sqlite` → `email_attempts`) already enforces this via `idempotency_key` UNIQUE.

## Pre-send pipeline (BRIDGE must run all 10 in order)

1. **validate_email** — RFC + MX-check. Failure → status=`invalid_contact`.
2. **check_do_not_contact** — read `_shared/revenue/do-not-contact.jsonl`. Hit → `do_not_contact`.
3. **check_duplicate_recipient** — query `email_attempts` for this recipient in last 30 days. Hit → `duplicate`.
4. **check_duplicate_company** — query for same `company` last 14 days. Hit → `duplicate` (configurable per campaign).
5. **check_previous_sent_ledger** — by `idempotency_key`. Hit → `duplicate` (raises `DuplicateEmailAttemptError`).
6. **check_approval** — must have `approval_id` referenced in `_shared/policy/decisions.jsonl` and not expired.
7. **check_daily_cap** — per-recipient-domain cap and global daily cap (default 25/day, 5 per domain).
8. **check_sender_identity** — `From`, `Reply-To`, signature must match approved sender.
9. **check_signature** — required signature block present.
10. **check_runtime_freeze** — calls `runtime_freeze_check("smtp_send")`. Raises `RuntimeFrozenError` unless override set.

Only if **all 10 pass**: insert `email_attempts` row with `status=queued`, then attempt SMTP.

## Post-send pipeline

1. **log_provider_response** — write `provider_message_id`, status `provider_accepted` or `failed`.
2. **update_crm** — `crm.py` updates lead row `last_outreach_at`, `outreach_count`, `last_status`.
3. **update_attempts_ledger** — `_shared/revenue/email-attempts.jsonl` append.
4. **update_agent_score** — `_shared/scoring/history.jsonl` append `+execution_reliability`, `+revenue_contribution` weighted.
5. **update_revenue_dashboard** — `_shared/revenue/dashboard.json` rollup.
6. **record_evidence** — full request/response JSON to `artifacts/outreach-drafts/<batch>/evidence/<id>.json`.

## Reconciliation rules (SENTINEL nightly + on demand)

- **CRM cannot say 0 sent if ledger has provider_accepted.** Reconciliation re-syncs CRM from ledger.
- **Ledger cannot say `sent` without `provider_message_id`.** Such rows are reclassified `unverified_claim`.
- **Draft queues cannot be treated as send queues unless promoted.** A draft is promoted only with a logged `APPROVAL <id>`.
- Mismatch produces a row in `_shared/revenue/reconciliation-report.md` with severity, agent at fault, and proposed fix.

## Current state (2026-04-29 12:30 EEST, post-freeze)

| status | count | note |
|---|---|---|
| `provider_accepted` | 2 | retain as evidence |
| `unverified_claim` | 7 | imported from legacy browser/CDP claims; require evidence or reclassification |
| `failed` | 1 | known SMTP credential issue |
| `drafted` | 32+ | 32 batches in `artifacts/outreach-drafts/`; none promoted while freeze active |

**Send permission:** FROZEN. No new send may proceed until:
1. SENTINEL signs off on the proof mission (artifact 12).
2. The operator issues a scoped `APPROVAL <id>` AND a freeze-lift block.

## Daily cap defaults (until per-campaign override)

```jsonc
{ "globalPerDay": 25, "perRecipientDomainPerDay": 5, "perCompanyPerWeek": 1 }
```
