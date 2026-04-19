# OPENCLAW Orchestration

## Mission Lifecycle

```
1. RECEIVE    → Orchestrator gets mission brief
2. CLASSIFY   → Risk tier assessment (GREEN/YELLOW/ORANGE/RED)
3. PLAN       → Break into subtasks, assign to agents
4. DELEGATE   → Send tasks via message bus
5. EXECUTE    → Agents produce artifacts via task contracts
6. REVIEW     → Auditor validates quality gates
7. REPORT     → Run summary + memory write + logs
```

## Task Contract
Every task must:
- Produce at least one artifact (file on disk)
- Pass quality validation (min length, non-generic content)
- Save artifact to: `/workspaces/{agent}/artifacts/{mission-id}/`
- Return artifact path on completion

## Approval Tiers

| Tier | Level | Examples | Approval |
|------|-------|----------|----------|
| 🟢 GREEN | Auto | Research, drafting, memory ops | Automatic |
| 🟡 YELLOW | Self | Content creation, proposals | Agent self-review |
| 🟠 ORANGE | Escalate | Email, publishing, purchases | Orchestrator approval |
| 🔴 RED | Human | Financial, external publish, deletion | Human required |

## Escalation Protocol
```
1. ATTEMPT    → Agent tries to complete independently
2. COLLABORATE → Ask peer agents for help via message bus
3. ESCALATE   → Request orchestrator intervention
4. HUMAN      → Flag for human review (RED tier only)
```
Never skip directly to HUMAN. Always attempt collaboration first.

## Scheduler Tasks
| Task | Interval | Purpose |
|------|----------|---------|
| Heartbeat | 60 min | Verify all services running |
| Memory Consolidation | 24 hr | Clean expired, promote valuable |
| Revenue Attempt | 24 hr | Track and advance revenue pipeline |
| Message Bus Check | 30 min | Process stuck messages, escalate |
| Observability Check | 6 hr | Verify logs, artifacts, summaries |
| Free Time | 12 hr | Agent exploration and learning |
