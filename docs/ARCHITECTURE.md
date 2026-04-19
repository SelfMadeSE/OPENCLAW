# OPENCLAW Architecture

## System Overview

OPENCLAW is a fully local multi-agent autonomous system. All inference, storage, and orchestration runs on a single machine with no cloud dependencies for core operations.

```
┌─────────────────────────────────────────────────────────────┐
│                     OPENCLAW System                          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Orchestr.│  │Engineer. │  │Marketing │  │ Creative │   │
│  │  (27B)   │  │  (14B)   │  │  (7B)    │  │  (7B)    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │              │          │
│  ┌────┴──────────────┴──────────────┴──────────────┴────┐   │
│  │                   Message Bus                         │   │
│  │            (JSON queue + rate limits)                  │   │
│  └────┬──────────────┬──────────────┬───────────────────┘   │
│       │              │              │                        │
│  ┌────┴─────┐  ┌─────┴────┐  ┌─────┴────┐                 │
│  │Scheduler │  │ Approval │  │ Task     │                 │
│  │ (cron)   │  │ System   │  │ Contract │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Infrastructure Layer                      │   │
│  │  Docker: Open WebUI │ Qdrant │ n8n │ Postgres │ SearXNG │
│  │  Native: LM Studio (4 models) │ OpenClaw Gateway      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Components

### Inference Layer
- **LM Studio** (native macOS, port 1234): Hosts 4 models — qwen3.5-27b, qwen3.5-9b, phi-4, Mistral-7B
- **Open WebUI** (Docker, port 3000): Chat interface + agent management
- **Pipelines** (Docker, port 9099): mem0 memory filter, function calling

### Agent System
- 7 specialized agents with distinct roles, models, and personalities
- Each agent has: system prompt, workspace, SOUL.md, IDENTITY.md, BOOT.md
- Communication via message bus, not direct coupling

### Execution Layer
- **Task Contract**: Every task must produce artifacts on disk
- **Artifact Validator**: Quality gates — minimum length, content checks
- **Workspace Structure**: `/workspaces/{agent}/artifacts/{mission-id}/`

### Communication Layer
- **Message Bus**: JSON queue with rate limits, dedup, escalation depth
- **Approval System**: 4-tier (GREEN/YELLOW/ORANGE/RED) escalation

### Memory Layer
- **Short-term**: Filesystem, 24h TTL, task-scoped
- **Long-term**: Qdrant vector DB, persistent, agent-scoped
- **Shared**: Qdrant, cross-agent knowledge base

### Automation Layer
- **Scheduler**: 6 recurring tasks — heartbeat, memory consolidation, revenue, bus check, observability, free time
- **n8n**: Workflow automation — beat promotion, outreach, heartbeat, memory consolidation

### Observability
- **Event Logger**: Structured JSONL events per agent + shared
- **Run Summaries**: Machine-readable mission reports
- **Artifact Validation Logs**: Quality gate results
- **Revenue Tracker**: Real-world attempt logging

## Data Flow

1. **Mission Start**: Orchestrator receives task → classifies risk tier → delegates to agents
2. **Execution**: Agent receives task via bus → reads memory → creates artifacts → validates quality
3. **Collaboration**: Agents communicate via bus → collaborate before escalating
4. **Completion**: Artifacts validated → memory written → logs generated → summary created
5. **Autonomy**: Scheduler runs periodic tasks → heartbeat → memory consolidation → revenue attempts

## Directory Structure
```
OPENCLAW/
├── system/           # Core system code
│   ├── orchestrator.py
│   ├── execution/    # Task contracts + validation
│   ├── message_bus/  # Inter-agent communication
│   ├── scheduler/    # Autonomous task scheduling
│   ├── memory/       # Memory bridge (ST/LT/shared)
│   └── approval/     # Risk tier + escalation
├── agents/           # Agent system prompts
├── workspaces/       # Agent working directories
├── revenue/          # Revenue tracking
├── docker/           # Docker stack definition
├── projects/         # n8n workflows + project files
├── scripts/          # Utility scripts
├── logs/             # Event logs (JSONL)
├── data/             # Pipelines + utilities
└── docs/             # Documentation
```
