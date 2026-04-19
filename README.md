# 🦅 OPENCLAW — Local Autonomous Multi-Agent Society

> Agent harness running on top of the **official OpenClaw gateway** ([openclaw.ai](https://openclaw.ai)). Seven specialized agents collaborate on missions, hold each other accountable, and earn (or lose) trust based on what they actually deliver.

[![Runtime](https://img.shields.io/badge/runtime-official_OpenClaw_2026.4.15-blue)]()
[![Agents](https://img.shields.io/badge/agents-7-blue)]()
[![Local](https://img.shields.io/badge/inference-100%25_local-orange)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey)]()

---

## ⚠️ Architecture: official runtime + this harness

This repo is **not** a runtime. It is a workspace + harness that the official OpenClaw gateway reads:

| Layer | Owner |
|---|---|
| Gateway, CLI, hooks, channels (Telegram), cron, exec approvals | **Official OpenClaw** (`/opt/homebrew/bin/openclaw`) |
| Agent personas, missions, scoring, social memory, revenue lanes | **This repo** |
| Config | `~/.openclaw/openclaw.json` (do not commit; secrets) |
| Workspaces | `workspaces/<agent>/` here, referenced by gateway config |

A previous version of this repo shipped a parallel Python runtime (api/, cli/, daemon/, system/scheduler). That has been **purged** as of v0.4 — running two runtimes against one config breaks autonomy guarantees.

## 🧠 What Is This?

A persistent, self-operating AI society. Seven agents with codenames, weighted scoring, pairwise trust, an Auditor that can flag hallucinated completions, and a revenue harness wired to Telegram exec approvals.

---

## ⚙️ Features

| Layer | What It Does |
|-------|-------------|
| 🤖 **7 Agents** | Orchestrator, Engineering, Marketing, Creative, Outreach, Media, Auditor |
| 📝 **Task Contracts** | Every task must produce artifacts — validated for quality, not just existence |
| 📨 **Message Bus** | JSON queue with rate limits, dedup, escalation depth control |
| ⏰ **Scheduler** | Autonomous cron: heartbeat, memory consolidation, revenue attempts |
| 🚦 **Approval System** | 4-tier escalation: auto → self-review → orchestrator → human |
| 🧠 **Memory** | Short-term (24h TTL), long-term (Qdrant), shared (cross-agent) |
| 💰 **Revenue Tracker** | Logs outreach attempts, tracks conversion pipeline |
| 📊 **Observability** | Structured JSONL events, run summaries, artifact validation logs |

---

## 🧪 What Makes It Different

This is **not**:
- ❌ A chatbot with a system prompt
- ❌ A LangChain demo
- ❌ An API wrapper calling GPT-4

This **is**:
- ✅ A persistent system that runs autonomously
- ✅ Agents that produce real files, not just chat responses
- ✅ Inter-agent communication with conflict and collaboration
- ✅ Risk-controlled operations with human-in-the-loop for high-stakes actions
- ✅ A revenue generation pipeline attempting real-world monetization

---

## 🚀 Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/OPENCLAW.git
cd OPENCLAW
cp .env.example .env        # Edit with your credentials
bash scripts/preflight.sh   # Verify everything is ready
```

### Start the System
```bash
# 1. Start LM Studio (macOS native) — load your models
# 2. Start Docker stack:
docker compose -f docker/docker-compose.yml up -d

# 3. Run system health check:
python3 system/orchestrator.py health

# 4. Start autonomous scheduler:
python3 system/scheduler/scheduler.py daemon
```

### Service Endpoints
| Service | URL | Purpose |
|---------|-----|---------|
| Open WebUI | http://localhost:3000 | Agent chat interface |
| Qdrant | http://localhost:6333 | Vector memory DB |
| n8n | http://localhost:5678 | Workflow automation |
| SearXNG | http://localhost:8080 | Private search engine |
| Pipelines | http://localhost:9099 | Middleware (mem0, tools) |
| LM Studio | http://localhost:1234 | Local model inference |

---

## 🤖 The Agent Team

| Agent | Codename | Model | Role |
|-------|----------|-------|------|
| **Orchestrator** | 🎯 NEXUS | qwen3.5-27b | Strategic delegation, mission management |
| **Engineering** | ⚙️ FORGE | phi-4 / qwen3.5-9b | Code, infrastructure, technical execution |
| **Marketing** | 📢 PULSE | Mistral-7B | Content strategy, SEO, audience growth |
| **Creative** | 🎨 MUSE | Mistral-7B | Visual assets, branding, creative writing |
| **Outreach** | 🤝 BRIDGE | qwen3.5-9b | Client acquisition, CRM, proposals |
| **Media** | 📱 SIGNAL | qwen3.5-9b | Platform management, distribution |
| **Auditor** | 🔍 SENTINEL | qwen3.5-27b | Quality review, compliance, risk assessment |

Each agent has: system prompt · workspace · personality (SOUL.md) · identity · boot protocol

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      OPENCLAW System                         │
│                                                              │
│  🎯 NEXUS  ⚙️ FORGE  📢 PULSE  🎨 MUSE  🤝 BRIDGE  📱 SIGNAL  🔍 SENTINEL
│       │         │        │        │        │        │        │
│  ┌────┴─────────┴────────┴────────┴────────┴────────┴────────┴──┐
│  │                    Message Bus (rate-limited)                  │
│  └────┬──────────────┬──────────────┬───────────────────────────┘
│       │              │              │                             │
│  ┌────┴─────┐  ┌─────┴────┐  ┌─────┴────┐  ┌─────────────┐    │
│  │Scheduler │  │ Approval │  │  Task    │  │   Memory    │    │
│  │ (cron)   │  │ (4-tier) │  │ Contract │  │ (ST/LT/SH)  │    │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────┘    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Docker: Open WebUI · Qdrant · n8n · Postgres · SearXNG  │   │
│  │  Native: LM Studio (4 models) · OpenClaw Gateway          │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
OPENCLAW/
├── system/                 # Core system code
│   ├── orchestrator.py     # Master health + validation
│   ├── execution/          # Task contracts + quality gates
│   ├── message_bus/        # Inter-agent communication
│   ├── scheduler/          # Autonomous task scheduling
│   ├── memory/             # Memory bridge (ST/LT/shared)
│   └── approval/           # Risk tier + escalation
├── agents/                 # Agent system prompts (7 agents)
├── workspaces/             # Agent working directories + artifacts
├── revenue/                # Revenue tracking + pipeline
├── docker/                 # Docker stack (7 services)
├── projects/               # n8n workflows + project files
├── scripts/                # Utilities (preflight, start, stop)
├── logs/                   # Event logs (JSONL)
├── data/                   # Pipeline code + utilities
├── docs/                   # Architecture, agents, memory, orchestration
├── .env.example            # Environment template (no secrets)
└── .gitignore
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, components, data flow |
| [AGENTS.md](docs/AGENTS.md) | Agent registry, hierarchy, communication |
| [MEMORY.md](docs/MEMORY.md) | Memory types, operations, Qdrant collections |
| [ORCHESTRATION.md](docs/ORCHESTRATION.md) | Mission lifecycle, task contracts, approvals |
| [ROADMAP.md](docs/ROADMAP.md) | Current state → v1.0 vision |
| [DEMO.md](docs/DEMO.md) | How to run a demo mission |

---

## ⚠️ Disclaimer

- **Experimental system** — built for research and autonomous AI exploration
- **Local-first** — no cloud dependency for core operations
- **Autonomy bounded** — all high-risk actions require human approval via the 4-tier system
- **Revenue attempts** are logged and tracked but require human verification before execution

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
