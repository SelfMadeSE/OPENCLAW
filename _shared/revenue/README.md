# Revenue Harness — v1

Canonical location for all revenue activity. Every outbound attempt leaves a trace here.

## Structure
```
_shared/revenue/
  lanes/                       — one dir per lane
    fiverr/
    cold-outreach/
    upwork/
    social-funnel/
    web-design-leads/
    creative-packaging/
  attempts.jsonl               — append-only log of every attempt (any lane)
  ../../data/crm.sqlite        — canonical CRM; email_attempts table handles send evidence + idempotency
  leads/
    leads.jsonl                — lead state (new → contacted → engaged → won/lost)
  approvals.jsonl              — Orange/Red approval events
  dashboards/
    daily.json                 — rolled up metrics, rebuilt by auditor
```

## Lane assets per lane
- `README.md` — what this lane is, target persona, offer
- `assets/` — reusable copy, images, briefs
- `templates/` — outreach templates
- `targets.jsonl` — vetted prospect pool

## Attempt log schema
```json
{"ts":"...","lane":"cold-outreach","agent":"outreach","mission_id":"mission-X","lead_id":"lead-123","channel":"email|telegram|form","action":"provider_accepted","message_ref":"artifacts/outreach-draft.md","delivery_evidence":"email_attempts:123","risk":"green","result":"queued|provider_accepted|replied|won|lost"}
```

## Approval mapping (Risk × Action)
| Risk | Actions | Who approves |
|---|---|---|
| Green | research, drafts, internal summaries, cold first-touch audit-led email through `email_attempts` | self |
| Yellow | polished drafts, scheduling (not sending) | Auditor |
| Orange | reserved for unusual side-effecting external actions not covered by GREEN/RED | Telegram owner (via exec approval) |
| Red | payments, replying to leads, social publishing/scheduling, account creation, credential changes | Telegram owner explicit confirm |

## Standing rules
- No attempt without prospect dossier + audit in same mission
- Duplicate lead/recipient/subject/body email sends are blocked by `email_attempts.idempotency_key`
- All Orange/Red actions log `approval_ref` before execution
