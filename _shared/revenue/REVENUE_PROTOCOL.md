# REVENUE_PROTOCOL.md (v1)

Canonical revenue protocol for OpenClaw. Promotes and supersedes the prose-only `README.md` in this directory; the README remains as orientation.

> **Source of truth ranking:** this file → `attempts.jsonl` schema → `leads/leads.jsonl` schema → lane READMEs.

---

## 1. Lane focus (lane-1 first)

**Lane 1 — Outbound Autonomy: small-business website audits → done-for-you fixes.**
This is the only revenue lane that gets autonomous attempts in v1. Other lanes (`fiverr/`, `upwork/`, `social-funnel/`, `web-design-leads/`, `creative-packaging/`) remain as future-state directories with their own READMEs but no autonomous attempts until lane-1 traction is recorded.

**Lane-1 wedge:** URL-input → demo audit report → score + targeted recommendations → competitor examples → full proposal & implementation plan.

## 2. Mission templates that move revenue

| Mission template | Lane impact | Risk envelope |
|---|---|---|
| `MISSION_SITE_AUDIT` | builds the demo asset | green |
| `MISSION_PROSPECT_RESEARCH` | builds the dossier | green |
| `MISSION_BUYER_ASSET` | one-pager / deck for the offer | yellow |
| `MISSION_PILOT_OFFER` | scope/pricing for an engagement | yellow |
| `MISSION_OUTREACH_DRAFT` | drafted message; not sent | yellow |
| `MISSION_FOLLOW_UP` | replies / nudges after a lead responds | **red** (operator approval required) |
| `MISSION_CASE_STUDY` | post-engagement proof | yellow |
| `MISSION_DEMO_BUILD` | working demo / automation | yellow |

## 3. Outreach truth states (mandatory)

Every outreach attempt MUST be in exactly one of these states at any time:

```
draft → queued → attempted → provider_accepted → sent_verified → replied → booked → converted
                                                      ↘ bounced / failed / unverified_claim / rejected
```

Definitions:
- **draft** — produced by an agent; lives in mission `artifacts/outreach-draft.md`.
- **queued** — ready for first-touch cold email through the ledger.
- **attempted** — send was tried but provider acceptance is not yet known.
- **provider_accepted** — SMTP/API accepted the message and returned or accepted a message id.
- **sent_verified** — provider sent-folder/API confirmation exists.
- **unverified_claim** — browser/CDP or artifact-only claim without provider evidence.
- **replied** — recipient responded; reply captured into mission artifacts.
- **booked** — meeting booked / payment scheduled; calendar/payment evidence required.
- **converted** — paid engagement started; engagement_ref recorded.
- **rejected** — recipient declined or recorded as not interested.

> **Hard rule:** `sent_verified` without provider evidence is a `hallucinated_completion` event and is automatically reverted to `unverified_claim` by the auditor's nightly rebuild.

## 4. Files (authoritative)

```
_shared/revenue/
  REVENUE_PROTOCOL.md          ← this file
  README.md                    ← orientation
  attempts.jsonl               ← append-only log of every attempt across all lanes
  approvals.jsonl              ← append-only log of orange/red approval events
  ../../data/crm.sqlite        ← canonical CRM; email_attempts table is authoritative for sends/idempotency
  leads/
    leads.jsonl                ← append-only lead state log (state transitions)
  dashboards/
    daily.json                 ← rolled-up metrics, rebuilt nightly by auditor
  lanes/
    cold-outreach/  fiverr/  upwork/  social-funnel/  web-design-leads/  creative-packaging/
      README.md                ← lane definition, persona, offer
      assets/                  ← reusable copy / images
      templates/               ← outreach templates
      targets.jsonl            ← vetted prospect pool
```

## 5. `attempts.jsonl` event schema

```json
{
  "ts": "2026-04-26T12:30:00Z",
  "lane": "cold-outreach",
  "agent": "outreach",
  "mission_id": "mission-outreach-draft-acme-001",
  "lead_id": "lead-acme-001",
  "channel": "email|telegram|form|x|linkedin",
  "action": "drafted|queued|attempted|provider_accepted|sent_verified|failed|bounced|unverified_claim|replied|booked|converted|rejected",
  "message_ref": "workspaces/orchestrator/artifacts/mission-<id>/artifacts/outreach-draft.md",
  "delivery_evidence": "email_attempts:123|smtp_id:abc123|telegram_msg_id:42|api_resp:...",
  "risk": "green|yellow|orange|red",
  "approval_ref": "approval_2026-04-26_001",
  "result": "queued|delivered|replied|won|lost"
}
```

Required fields: `ts, lane, agent, mission_id, lead_id, channel, action, risk`. `delivery_evidence` is required when `action ∈ {provider_accepted, sent_verified, booked, converted}`. `approval_ref` is required when `risk >= orange`.

## 6. Approval object (orange/red)

```json
{
  "id": "approval_<yyyy-mm-dd>_<n>",
  "risk": "orange|red",
  "requesting_agent": "outreach",
  "mission_id": "mission-...",
  "action": "reply_to_lead|publish_social|create_account|change_credentials|spend_money",
  "target": "prospect@example.com",
  "why": "...",
  "expected_upside": "...",
  "failure_mode": "...",
  "rollback": "...",
  "evidence": ["artifact paths..."],
  "auditor_verdict": "pass|revise|reject",
  "human_decision": "pending|approved|denied",
  "decided_at": null,
  "decided_by": null
}
```

Approvals are created by the requesting agent in the mission directory as `approval-request.md` AND appended as a JSON line to `_shared/revenue/approvals.jsonl`. Telegram exec-approval (`channels.telegram.execApprovals`) is the canonical operator surface.

## 7. Lead lifecycle

`leads/leads.jsonl` is append-only. Each line is a state transition:

```json
{"ts":"...","lead_id":"lead-acme-001","state":"new|researched|contacted|engaged|booked|won|lost","mission_id":"...","by":"outreach","note":"..."}
```

A lead is **valid for outreach** only when:
- there exists a `MISSION_PROSPECT_RESEARCH` close for the lead (dossier present), AND
- there exists a `MISSION_SITE_AUDIT` close for `lead.website` (audit asset present), AND
- no duplicate `email_attempts.idempotency_key` exists for the same `lead_id + recipient + subject_hash + draft_hash`.

## 8. Standing rules (hard)

1. No outreach attempt without a dossier + site-audit pair in the lane-1 funnel.
2. Cold first-touch audit-led email sending is GREEN and always approved when routed through `email_attempts`.
3. Duplicate same lead/recipient/subject/body sends are refused unless `--force-resend --reason` is used.
4. `risk >= orange` requires `approval_ref` recorded **before** the action executes.
5. Truth-state escalation only on evidence: `provider_accepted`/`sent_verified` require email provider evidence; `booked` requires calendar evidence; `converted` requires payment/engagement evidence.
6. Auditor reverts hallucinated states on nightly rebuild and writes `hallucinated_completion -0.3` against the offending agent.
7. Lane-2+ attempts are paused until lane-1 records >=3 `replied` events.

## 9. Dashboards

`dashboards/daily.json` is rebuilt nightly by `auditor` cron from `attempts.jsonl` + `leads.jsonl` + `approvals.jsonl`. Schema:

```json
{
  "as_of":"2026-04-26",
  "by_lane":{"cold-outreach":{"drafts":0,"queued":0,"attempted":0,"provider_accepted":0,"sent_verified":0,"unverified_claim":0,"replied":0,"booked":0,"converted":0}},
  "leads_total":0,
  "leads_active":0,
  "approvals_pending":0,
  "approvals_decided":0,
  "halls_reverted":0
}
```

## 10. Forbidden in v1 (autonomy boundary)

- Real-money trading, betting, prediction markets, crypto purchases, options/derivatives, gambling.
- Public posting or scheduling on owned social accounts.
- Any payment, deposit, withdrawal, or account-credential change.
- Replying to inbound leads.
- Sending email or DM to any address not represented by a researched `lead_id`.

These are Red and require explicit operator confirmation per attempt; no standing approvals.
