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
{"ts":"...","lane":"cold-outreach","agent":"outreach","mission_id":"mission-X","lead_id":"lead-123","channel":"email|telegram|form","action":"sent","message_ref":"artifacts/outreach-draft.md","risk":"orange","approved_by":"owner:8331613806","result":"queued|delivered|replied|won|lost"}
```

## Approval mapping (Risk × Action)
| Risk | Actions | Who approves |
|---|---|---|
| Green | research, drafts, internal summaries | self |
| Yellow | polished drafts, scheduling (not sending) | Auditor |
| Orange | sending cold messages, posting drafts | Telegram owner (via exec approval) |
| Red | payments, publishing live, account changes | Telegram owner explicit confirm |

## Standing rules
- No attempt without prospect dossier + audit in same mission
- No two attempts to the same `lead_id` within 72h
- All Orange/Red actions log `approval_ref` before execution
