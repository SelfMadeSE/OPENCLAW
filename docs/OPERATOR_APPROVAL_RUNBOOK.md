# Operator Approval Runbook

Companion to `_shared/policy/APPROVAL_POLICY.md`.

## You (operator) say one of three things

### 1. "Approve <action>"
Use this format and the agent will treat it as a scoped approval:

```
APPROVAL <short-id>
scope: <one action OR named batch with cap>
expires: <ISO ts or duration like 30m>
conditions: <free-text constraints>
```

Examples:

```
APPROVAL ob-batch-2026-04-29-pm
scope: send up to 5 outreach emails from artifacts/outreach-drafts/2026-04-29-pm/
expires: 2026-04-29T22:00:00+03:00
conditions: only recipients ending in @stripe.com or @anthropic.com; halt on first bounce
```

```
APPROVAL twitter-acct-create
scope: complete X account creation for handle @outboundautonomy
expires: 2026-04-29T18:00:00+03:00
conditions: I will complete phone/captcha verification; agent finishes profile after I confirm login
```

### 2. "Deny <action>"
Agent records denial in `_shared/policy/decisions.jsonl` and parks the work.

### 3. "Lift freeze for <scope>"
Same format as APPROVAL but with the explicit override key:
```
APPROVAL freeze-lift-<id>
scope: smtp_send for batch <name>
expires: <ts>
override_token: OPENCLAW_FREEZE_OVERRIDE=<id>
```
Agent will export `OPENCLAW_FREEZE_OVERRIDE=<id>` for that single batch invocation.

## You should NOT say

- "go" / "do it" / "send" / "you decide" — too broad. Agent will respond with a structured request for an `APPROVAL` block.
- "no RED besides spending money" — invalid as standing policy. Agent will reject and default to ORANGE-per-action.
- "fully autonomous" — the framework does not support unbounded standing autonomy. Mission-bounded autonomy only.

## What the agent will give you

Every external side effect produces an `APPROVAL_REQUEST` block in the channel:

```
APPROVAL_REQUEST <auto-id>
agent: BRIDGE
class: ORANGE
action: smtp_send
recipient: foo@bar.com
preview: <first 240 chars of body>
dedupe_key: <hash>
risk_notes: <e.g., "no prior contact; verified domain MX">
fallback_if_denied: park to artifacts/outreach-drafts/parked/
expires_request_in: 30m
```

You reply with `APPROVAL <id>` (using the auto-id or your own), or `DENY <id>`.

## Per-class quick reference

| Operator says | Agent reaction |
|---|---|
| nothing | continues GREEN/YELLOW work, logs heartbeat, parks ORANGE/RED |
| `APPROVAL <id> scope:…` | executes within scope until expiry, then re-asks |
| `DENY <id>` | parks, records denial, never silently retries |
| `LIFT FREEZE <scope>` | sets override env for one invocation, then re-engages freeze |
| `FREEZE` | sets `_shared/policy/RUNTIME_FREEZE.json` `active: true` |
| `STATUS` | every agent emits its current heartbeat |

## Audit trail

- `_shared/policy/decisions.jsonl` — every approval/denial logged
- `_shared/policy/RUNTIME_FREEZE.json` — current freeze state + override audit
- `_shared/scoring/history.jsonl` — score impact of each decision
- `artifacts/missions/<mission>/operator-summary.md` — final mission report
