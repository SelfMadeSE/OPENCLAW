# Orchestrator Heartbeat

On each heartbeat cycle:

1. **Round Table** — read `ROUNDTABLE.md` (repo root). Act on any unread messages addressed to you or ALL. Append any cross-agent messages you need to send.
2. **Check team artifact dirs** — scan each agent's `artifacts/` for new files since last heartbeat. Note what was produced.
3. **Review pending work** — check MEMORY.md for any pending items or blocked tasks.
4. **Priority check** — is there a revenue-generating task that should be active right now? If not, identify one.
5. **Status line** — write a one-line status to memory: what's active, what's next, any blockers.
6. **Signal** — if an agent is blocked, route a resolution or escalate. If all systems are running, write `HEARTBEAT_OK` and stand down until next cycle.
7. 