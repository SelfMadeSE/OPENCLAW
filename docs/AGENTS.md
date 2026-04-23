# OPENCLAW Agents

## Agent Registry

| Agent | Codename | Model | Role |
|-------|----------|-------|------|
| Orchestrator | 🎯 NEXUS | configured in `~/.openclaw/openclaw.json` | Strategic delegation, mission management |
| Engineering | ⚙️ FORGE | configured in `~/.openclaw/openclaw.json` | Code, infrastructure, technical execution |
| Marketing | 📢 PULSE | configured in `~/.openclaw/openclaw.json` | Content strategy, SEO, audience growth |
| Creative | 🎨 MUSE | configured in `~/.openclaw/openclaw.json` | Visual assets, branding, creative writing |
| Outreach | 🤝 BRIDGE | configured in `~/.openclaw/openclaw.json` | Client acquisition, CRM, proposals |
| Media | 📱 SIGNAL | configured in `~/.openclaw/openclaw.json` | Platform management, metadata, distribution |
| Auditor | 🔍 SENTINEL | configured in `~/.openclaw/openclaw.json` | Quality review, compliance, risk assessment |

## Delegation Hierarchy

```
Orchestrator (NEXUS)
├── Engineering (FORGE) — technical tasks
├── Marketing (PULSE) — content + strategy
├── Creative (MUSE) — visual + branding
├── Outreach (BRIDGE) — client-facing
├── Media (SIGNAL) — distribution
└── Auditor (SENTINEL) — quality gate
```

## Agent Communication
- Agents communicate through the OpenClaw gateway and delegated sessions.
- Messages include sender, receiver, task, deliverable, risk class, and evidence path.
- Status updates must be backed by artifacts, transcripts, CRM rows, logs, or external confirmations.
- Escalation chain: Attempt → verify evidence → collaborate → escalate to human.

## Agent Workspace
Each agent maintains:
- `workspaces/{agent}/SOUL.md` — Core identity and values
- `workspaces/{agent}/IDENTITY.md` — Personality and style
- `workspaces/{agent}/BOOT.md` — Startup protocol
- `workspaces/{agent}/artifacts/` — Mission outputs

## Source Of Truth
- Runtime config: `~/.openclaw/openclaw.json`
- Scheduler config: `~/.openclaw/cron/jobs.json`
- CRM: `data/crm.sqlite` via `python3 scripts/crm.py`
- Handoffs: `data/decisions.sqlite` via `python3 scripts/agent-protocol.py`
- Runtime reconciliation: `python3 scripts/runtime_reconcile.py --write`
