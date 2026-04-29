# Blocker Protocol

When an agent cannot proceed on the primary thread, it must emit a BLOCKER block AND immediately attempt the largest GREEN/YELLOW fallback slice. Never stall, never ask vague questions.

## Block format

```
BLOCKER <auto-id>
agent: <codename>
mission: <id>
blocked_action: <specific action>
reason: <one of: missing_credential | missing_approval | infra_unavailable | upstream_failure | policy_class | data_inconsistency | rate_limited | unknown>
detail: <one or two lines of evidence (path or log line)>
attempted_fallback: <what you tried>
fallback_result: <pass | fail | n/a>
proceeding_with: <next GREEN/YELLOW work — one line>
operator_unblock_options:
  - <option A: e.g., "issue APPROVAL ob-batch-pm">
  - <option B: e.g., "lift freeze for smtp_send">
  - <option C: e.g., "skip this prospect">
default_if_silent: <one line — what the agent will do if operator says nothing for 30 min>
```

## Mandatory escalation rules

- After 3 consecutive BLOCKERS on the same mission slice, emit `ESCALATION` to NEXUS, who decides between: re-plan, kill the slice, or surface to operator.
- An `infra_unavailable` blocker (e.g., browser CDP at 18800) auto-tickets a repair item to FORGE under `artifacts/engineering/repair-tickets.jsonl`.
- A `missing_approval` blocker auto-emits an `APPROVAL_REQUEST` per `OPERATOR_APPROVAL_RUNBOOK.md`.

## What a BLOCKER is NOT

- Not a vague question.
- Not a generalized "send was rejected, halting" — must include specific reason and evidence.
- Not a license to stop the mission. The agent MUST list `proceeding_with`.
