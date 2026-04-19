# Memory System Spec

OpenClaw memory is multi-tier. The official `memory-core` plugin handles persistence; this doc defines the **semantic tiers** agents must respect.

## Tiers

### 1. Short-term (session)
- **Scope**: one session / one agent
- **Storage**: in-process + `session-memory` hook
- **Lifetime**: cleared on session end
- **Use**: live task context, scratch reasoning

### 2. Long-term (per-agent)
- **Scope**: single agent across all sessions
- **Storage**: `workspaces/<agent>/MEMORY.md` + Qdrant collection per agent
- **Lifetime**: persistent
- **Use**: lessons, identity reinforcement, recurring patterns

### 3. Shared (global)
- **Scope**: all agents
- **Storage**: `memory/shared/` (markdown) + Qdrant collection `openclaw_shared`
- **Lifetime**: persistent
- **Use**: facts about the world, owner preferences, system-wide policies

### 4. Social (relational)
- **Scope**: pairwise between agents
- **Storage**: `_shared/social_memory/` (see schema)
- **Lifetime**: persistent, decays without reinforcement
- **Use**: trust calibration, who-to-delegate-to decisions

## Read/write rules

| Tier | Who reads | Who writes |
|---|---|---|
| Short-term | self | self |
| Long-term | self (always); other agents (with reason in mission) | self |
| Shared | all | any (with `auditor_review: pending` flag if controversial) |
| Social — own outbound trust | self + Orchestrator | self |
| Social — `audit_pass`/`audit_flag` events | all | **Auditor only** |

## Required behavior
- **Read before tasks**: every agent loads relevant long-term + shared memory at task start
- **Write after tasks**: every artifact-producing task ends with at least one memory entry (lesson learned, fact captured, or "no new lesson — pattern matches X")
- **Consolidation**: nightly `dreaming` cron (per-agent, 1:00–2:30 AM Denver) moves valuable short-term → long-term, prunes redundancy

## Anti-patterns
- Treating MEMORY.md as a journal: it's a working memory, not a diary
- Writing only positive memories (Auditor flags)
- Self-promotion in shared memory (Auditor strips)
