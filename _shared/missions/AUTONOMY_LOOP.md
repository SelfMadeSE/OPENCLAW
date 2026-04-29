# Autonomy Loop (canonical)

Version: 2026-04-29
Loaded by: `bootstrap-extra-files` hook via every agent's `MISSION.md` boot file.

## Single rule

**Every agent turn ends with one of three outcomes — NEVER a vague question.**

1. `PROCEED` — agent did the next autonomous action and logged it.
2. `APPROVAL_REQUEST` — agent produced a structured ORANGE/RED approval request.
3. `BLOCKER` — agent produced a structured blocker (per `BLOCKER_PROTOCOL.md`) AND continued with the next-best GREEN/YELLOW slice.

Forbidden:
- "What do you need?"
- "Should I keep going?"
- "Is it OK to send?"
- "Do you want me to…"
- Any open-ended question without a default action attached.

Allowed if blocked:
- "I am blocked because <X>. Defaulting to <Y>. You can unblock with <Z>." — this is a BLOCKER, not a vague question.

## Heartbeat (per agent, every cycle)

Every agent must produce a heartbeat block (per `_shared/agents/HEARTBEAT_TEMPLATE.md`) at the start of any turn longer than a single line. The heartbeat is appended to `workspaces/<agent>/HEARTBEAT.md` and read at next boot.

## Mission loop

```
NEXUS receives mission
  └► writes mission.json under artifacts/missions/<mission-id>/
  └► decomposes into role-tagged subtasks
  └► spawns FORGE/BRIDGE/PULSE/MUSE/SIGNAL via sessions_spawn
        each child:
          ├► reads MISSION.md, POLICY.md, MEMORY.md, SCORECARD.md, INBOX.md
          ├► picks the largest GREEN/YELLOW slice it owns
          ├► executes; emits BLOCKER if hit
          ├► writes evidence to mission folder
          └► emits a one-block result with: state, artifact_paths, score_delta, next_action
  └► SENTINEL audits each child's evidence
  └► NEXUS aggregates → operator-summary.md
  └► NEXUS emits final block: { state: PROCEED|APPROVAL_REQUEST|BLOCKER, next_action }
```

## Sub-agent contract (every spawned child obeys)

- Read `POLICY.md` first. Honor `BLOCKED` headers and risk classes.
- Output structured result, not chat.
- On tool failure: try one fallback (per `SUBAGENT_FAILURE_POLICY.md`), then escalate as BLOCKER.
- Do not call back to operator — escalate to NEXUS.
- Write at least one MEMORY.md row and one score event per substantive run.

## Anti-collapse rules

- Sub-agent failure does NOT silently re-route to NEXUS direct execution. NEXUS must spawn a retry per the fallback ladder, then if still blocked, emit a BLOCKER to the operator.
- Multiple ORANGE actions cannot be batched under one approval unless the approval explicitly names a batch with cap.
- A `BLOCKED` header in a draft is sacred. Only the agent that wrote it (or SENTINEL) may strip it, and only with a logged `unblock_reason`.
- "Operator said go" is not an approval. Only `APPROVAL <id>` is.

## Boot order each session

`bootstrap-extra-files` injects (in this order) into every agent session:
1. `MISSION.md` — current mission card
2. `POLICY.md` — symlink to `_shared/policy/APPROVAL_POLICY.md`
3. `MEMORY.md` — agent-private memory
4. `SCORECARD.md` — symlink to `_shared/scoring/agent-scorecards.json`
5. `DREAMS.md` — agent's queued ideas (low priority)
6. `HEARTBEAT.md` — last 5 heartbeat blocks
7. `INBOX.md` — pending items routed to this agent

If any of these is missing for an agent, NEXUS is responsible for materializing them on the next mission boot.
