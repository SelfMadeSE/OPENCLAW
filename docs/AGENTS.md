# OPENCLAW Agents

## Agent Registry

| Agent | Codename | Model | Role |
|-------|----------|-------|------|
| Orchestrator | 🎯 NEXUS | qwen3.5-27b | Strategic delegation, mission management |
| Engineering | ⚙️ FORGE | phi-4 / qwen3.5-9b | Code, infrastructure, technical execution |
| Marketing | 📢 PULSE | Mistral-7B / qwen3.5-9b | Content strategy, SEO, audience growth |
| Creative | 🎨 MUSE | Mistral-7B / qwen3.5-27b | Visual assets, branding, creative writing |
| Outreach | 🤝 BRIDGE | qwen3.5-9b / Mistral-7B | Client acquisition, CRM, proposals |
| Media | 📱 SIGNAL | qwen3.5-9b | Platform management, metadata, distribution |
| Auditor | 🔍 SENTINEL | qwen3.5-27b | Quality review, compliance, risk assessment |

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
- Agents communicate via the message bus (`system/message_bus/`)
- Messages include: sender, receiver, task, priority
- Rate-limited: max 20 messages/agent/hour
- Escalation chain: Attempt → Collaborate → Escalate → Human

## Agent Workspace
Each agent maintains:
- `workspaces/{agent}/SOUL.md` — Core identity and values
- `workspaces/{agent}/IDENTITY.md` — Personality and style
- `workspaces/{agent}/BOOT.md` — Startup protocol
- `workspaces/{agent}/artifacts/` — Mission outputs
