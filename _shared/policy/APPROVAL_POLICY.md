# OPENCLAW Approval Policy (canonical)

Version: 2026-04-29
Owner: operator (Rylee Benson)
Loaded by: `bootstrap-extra-files` hook → every agent session sees this via `POLICY.md` symlink in each workspace.

## Why this exists

The phrase "no RED besides spending money" was previously used as standing permission. It caused agents to:

- generalize a one-off social-account-creation approval into mass outbound sends
- ignore drafts marked `BLOCKED` in their own headers
- send from unreconciled draft queues
- fight anti-bot walls for 30 minutes instead of escalating

Standing-permission language is hereby retired. **Every external side effect now requires explicit, scoped, time-bounded approval.**

## Risk Classes (canonical)

### GREEN — autonomous, no approval
- internal research, drafts, summaries
- local artifact writes inside `/Users/ryleebenson/Desktop/OPENCLAW/`
- memory reads/writes (MEMORY.md, INBOX.md, scoring jsonl)
- score event writes
- safe code analysis, lint, test runs
- read-only API/web fetches
- harmless self-tests against owner-controlled endpoints

### YELLOW — autonomous with logged evidence
- browser navigation to public pages (read-only; bridge required)
- browser form fill **without submit**
- prospect enrichment (whois, public profile lookups)
- generated reports
- test-to-owner SMTP loops (recipient must be `owner@outboundautonomy.com` or operator)
- internal CRM draft state updates
- non-destructive shell exec inside workspace

### ORANGE — explicit mission-level approval (pre-approved per mission, time-bounded)
- sending a real outreach email to a third party
- submitting a public contact form
- logging into any account
- staging deploy / preview deploy
- creating a social account
- test-mode payments
- publishing to staging
- any browser action with external side effects
- enabling a previously-frozen cron job

ORANGE approval format (operator → agent):
```
APPROVAL <id>
scope: <single specific action OR named batch with cap>
expires: <ISO ts>
conditions: <e.g., "owner-only recipient", "max 5 sends">
```

### RED — explicit per-action human approval, never standing
- spending money (any amount)
- live payments (Stripe live, Square live, etc.)
- ads spend / boosting
- trading, betting, gambling, withdrawals/deposits
- public posting (X, LinkedIn, IG, FB, YouTube)
- live production changes (`vercel --prod`, DNS, billing)
- deleting data outside the workspace
- security/account/credential changes
- mass outbound campaigns above the approved batch size
- any cron re-enable that touches an outbound or RED action

## Non-Generalization Clause (binding)

> If the operator approves "create social accounts," that does NOT approve additional email batches.
> If the operator approves "send this batch," that does NOT approve future batches.
> If the operator approves "no RED besides spending money," that is **invalid** as standing policy. The agent MUST request a clarification and **default to ORANGE per-action approval** until a scoped approval is granted.

Standing approvals are forbidden. Every approval expires.

## Default Behaviour Under Ambiguity

When uncertain, the agent must:
1. Treat the action as one class higher than its best guess.
2. Produce a structured BLOCKER (per `_shared/agents/BLOCKER_PROTOCOL.md`).
3. Continue with the largest GREEN/YELLOW slice of the mission.
4. Never strip its own `BLOCKED` header.
5. Never reclassify a draft to "approved" without an `APPROVAL <id>` from the operator.

## Hard runtime gate

`_shared/policy/RUNTIME_FREEZE.json` is the kill switch. While `active: true`, every sender script raises `RuntimeFrozenError` and refuses to send. The freeze can be bypassed for a single batch only by setting `OPENCLAW_FREEZE_OVERRIDE=<approval-id>`; the override is audited into the freeze file's `override_audit` array.

The freeze is currently **ACTIVE** as of 2026-04-29 12:17 EEST.

## SENTINEL veto

SENTINEL (auditor) holds verdict authority. Any GREEN/YELLOW artifact that SENTINEL marks `verdict: blocked` cannot be promoted to ORANGE/RED, even with operator approval, until SENTINEL re-issues `verdict: approved`. Operator can override SENTINEL only with explicit override token.
