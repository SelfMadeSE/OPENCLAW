# Mission System — v1

Missions are the unit of autonomous work. Every real execution = 1 mission.

## Mission lifecycle
1. **Seeded** — Orchestrator or operator (Telegram) creates from a template
2. **Planned** — Orchestrator decomposes, assigns lead + sub-agents
3. **Executing** — Sub-agents produce artifacts
4. **Auditing** — Auditor validates
5. **Scored** — Scoring + social memory events written
6. **Closed** — Postmortem + memory consolidation

## Mission file layout
Every mission lives at `workspaces/orchestrator/artifacts/mission-<id>/`:
```
mission.json        — metadata + state machine
brief.md            — owner goal + success criteria
plan.md             — orchestrator's decomposition
artifacts/          — produced outputs
audit.md            — Auditor findings + pass/fail
scorecard.json      — score deltas for this mission
postmortem.md       — lessons, written last
```

## `mission.json` schema
```json
{
  "id": "mission-XXX",
  "template": "document-the-machine|revenue-sprint|outreach-batch|...",
  "goal": "...",
  "lead": "orchestrator",
  "sub_agents": ["engineering", "marketing"],
  "risk_envelope": "green|yellow|orange|red",
  "expected_artifacts": [{"path":"...","min_bytes":300}],
  "scoring_schema": "default-v1",
  "memory_read": ["orchestrator", "shared"],
  "memory_write": ["auditor"],
  "completion": {"all_artifacts_present": true, "audit_pass": true},
  "state": "seeded|planned|executing|auditing|scored|closed",
  "created_at": "...",
  "closed_at": null
}
```

## v1 templates (in this dir)
- `document-the-machine.json` — project self-documentation
- `revenue-sprint.json` — one outreach batch end-to-end
- `outreach-package.json` — build cold-outreach asset bundle
- `audit-prospect-site.json` — audit a target site before outreach
- `creative-release.json` — package one creative drop
- `free-time-research.json` — bounded exploration
