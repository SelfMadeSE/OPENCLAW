# Archive Manifest — 2026-04-26 / Orphan Workspaces

Moved during the autonomy-realignment pass.

| Original path | New path | Reason | Restore command |
|---|---|---|---|
| `~/Desktop/OPENCLAW/workspaces/coder/` | `./coder/` | Orphan: not present in `agents.list[]` of `~/.openclaw/openclaw.json`. No active sessions or scoring history. Likely a pre-realignment naming. | `mv ./coder ~/Desktop/OPENCLAW/workspaces/` |
| `~/Desktop/OPENCLAW/workspaces/marketer/` | `./marketer/` | Orphan: superseded by canonical agent `marketing`. | `mv ./marketer ~/Desktop/OPENCLAW/workspaces/` |
| `~/Desktop/OPENCLAW/workspaces/test/` | `./test/` | Orphan: scratch/test workspace, not bound to any agent. | `mv ./test ~/Desktop/OPENCLAW/workspaces/` |

These directories were preserved in full (not deleted). To purge later, confirm no `agents.list[].workspace` references them, then `rm -rf` from this archive.
