# Media Heartbeat

On each heartbeat cycle:

1. **Round Table** — read `ROUNDTABLE.md` (repo root). Act on any unread messages addressed to SIGNAL or ALL. Append replies or updates.
2. **Publishing queue** — check `artifacts/distribution-plans/` for upcoming scheduled content.
3. **Schedule check** — is anything due to publish in the next 24 hours?
4. **Platform status** — note any pending cross-platform adaptations from MEMORY.md.
5. **Status line** — write a one-line status to memory: content in queue, next publish date, platforms covered.
6. **Signal** — if a publish is at risk or a platform is missing coverage, escalate to NEXUS. If all clear, write `HEARTBEAT_OK` and stand down.