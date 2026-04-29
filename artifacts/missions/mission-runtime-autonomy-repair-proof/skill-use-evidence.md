# Skill / Tool Use Evidence — proof mission

Sub-agents and NEXUS demonstrated use of the following bundled OpenClaw tools/skills during the proof mission. Verified via session jsonl tool call records.

| Run | Agent | Tool / skill | Result |
|---|---|---|---|
| nexus-run | orchestrator (NEXUS) | `read`, `exec`, `write`, `sessions_spawn` (×2), `sessions_yield` | 9 calls, 0 failures |
| forge proof slice | engineering (FORGE) | `read`, `exec` (curl CDP probe), `write` (forge-output.md), `write` (repair-tickets.jsonl), `read`/`edit` (HEARTBEAT.md) | success |
| bridge proof slice | outreach (BRIDGE) | `read`, `exec` (sqlite3 ×4), `exec` (date stamp), `write` (bridge-output.md), `write` (jsonl mirror) | success (1 transient `database is locked` retried successfully) |
| sentinel audit | auditor (SENTINEL) | `read` (forge + bridge outputs), `exec` (date), `process` (delegated subprocess), `write` (sentinel-audit.md), `exec` (jsonl appends) | 15 calls, 0 failures |

The bundled `exec` and file `read/write` skills covered all primary work. The `sessions_spawn` and `sessions_yield` agent-to-agent skills were exercised by NEXUS. SENTINEL additionally exercised the `process` skill to launch a child shell. No third-party MCP skill was needed for this proof.
