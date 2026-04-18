# OPENCLAW Inaugural Mission

## Mission: "Document the Machine" — Video Package Generation

### Objective
Use the full 7-agent system to produce a complete video concept package
about the OPENCLAW experiment itself. This is a self-referential first task:
the AI society's first real output is about its own creation.

### Constraints
- 🟢 GREEN actions only (read, draft, research, generate)
- 🟡 YELLOW allowed (file writes to workspaces/artifacts)
- 🟠 ORANGE: not expected — escalate if triggered
- 🔴 RED: absolutely not — no publishing, sending, or spending

---

## Operator Prompt (paste into Orchestrator)

```
MISSION: Document the Machine — Video Package v1

Create a complete video concept package about the OPENCLAW project.
The subject is: "Building an AI society from scratch on a single Mac."

Deliverables (save all to workspaces/orchestrator/artifacts/mission-001/):

1. VIDEO BRIEF (creative)
   - Working title options (3)
   - Tone/style guide (documentary? vlog? essay?)
   - Target audience definition
   - 3-act structure outline

2. TECHNICAL NOTES (engineering)
   - System architecture summary (what runs, how it connects)
   - Key technical decisions and why they were made
   - What makes this different from typical AI setups

3. MARKETING HOOK (marketing)
   - 5 headline/hook options for the video
   - Platform positioning (YouTube, Twitter, LinkedIn)
   - SEO keyword suggestions

4. AUDIENCE STRATEGY (outreach)
   - Target viewer personas (3)
   - Distribution channels ranked by fit
   - Community engagement strategy draft

5. VISUAL CONCEPTS (media)
   - Thumbnail concept descriptions (3 options)
   - B-roll shot list for the documentary footage
   - Image generation prompts for key visuals

6. QUALITY REVIEW (auditor)
   - Review all 5 deliverables above
   - Score each on: completeness, coherence, accuracy, usefulness
   - Flag any issues or inconsistencies
   - Provide final APPROVED/REVISION_NEEDED verdict

RULES:
- Delegate each numbered section to the appropriate agent
- Use the 27B model for your planning and the auditor's review
- Workers use the 9B model
- Save all outputs as markdown files
- Write a decision record to memory when planning is complete
- Write an event record to memory when the mission finishes
- Generate a run summary at the end
- Do NOT access external websites, send emails, or post anything
- If any action feels like it needs human approval, STOP and escalate
```

---

## Pass/Fail Checklist

Run these checks after the mission completes.

### Process Quality (did the system behave correctly?)

| # | Check | How to verify | Pass criteria |
|---|-------|--------------|---------------|
| 1 | Orchestrator delegated | Review session transcript | At least 3 sub-agents were invoked |
| 2 | Model routing correct | Check agent session logs | Orchestrator used 27B, workers used 9B |
| 3 | Agents stayed in-role | Review each agent's output | No agent did another agent's job |
| 4 | Auditor actually reviewed | Check auditor output | Contains specific critique, not just paraphrase |
| 5 | No scope violations | `python3 scripts/escalation-check.py` | No unexpected red escalations |
| 6 | Approvals respected | Check gateway logs | No exec commands outside allowlist |

### Output Quality (did the mission produce usable artifacts?)

| # | Check | How to verify | Pass criteria |
|---|-------|--------------|---------------|
| 7 | All 6 deliverables exist | `ls workspaces/orchestrator/artifacts/mission-001/` | 6+ markdown files present |
| 8 | Files have real content | `wc -l workspaces/orchestrator/artifacts/mission-001/*` | Each file > 20 lines |
| 9 | Content is coherent | Manual review | Makes sense, on-topic, no hallucinated nonsense |
| 10 | Auditor verdict present | Check auditor output file | Contains APPROVED or REVISION_NEEDED |

### System Quality (did infrastructure behave correctly?)

| # | Check | How to verify | Pass criteria |
|---|-------|--------------|---------------|
| 11 | Event logs created | `python3 scripts/event-logger.py tail --lines 10` | Events from this mission visible |
| 12 | Memory written | `python3 scripts/memory-broker.py search --query "video package OPENCLAW"` | At least 1 decision/event record |
| 13 | Run summary generated | `python3 scripts/run-summary.py list` | New summary file exists |
| 14 | No crashes | `docker ps` + `openclaw gateway status --json` | All services still running |
| 15 | Gateway memory populated | `openclaw memory status --deep --json 2>/dev/null` | orchestrator has chunks > 0 |

### Failure Triage (if something broke)

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Orchestrator didn't delegate | System prompt not loaded, or model too weak | Check BOOT.md injection, try 27B |
| Sub-agent timeout | LM Studio overloaded with concurrent requests | Reduce maxConcurrent to 1 |
| Outputs in wrong directory | Agent didn't follow path instruction | Tighten SOUL.md workspace rules |
| No memory written | Memory broker not called by agent | Add explicit memory step to prompt |
| Auditor just agreed | Auditor prompt too passive | Strengthen BOOT.md review criteria |
| Red escalation fired | Agent tried something outside GREEN/YELLOW | Review what triggered it, adjust allowlist |

---

## Post-Mission Commands

```bash
# 1. Preflight (run BEFORE the mission)
bash scripts/preflight.sh

# 2. After mission — check outputs
ls -la workspaces/orchestrator/artifacts/mission-001/

# 3. Check event trail
python3 scripts/event-logger.py tail --lines 20

# 4. Check escalations
python3 scripts/escalation-check.py

# 5. Generate run summary
python3 scripts/run-summary.py generate

# 6. Check memory
python3 scripts/memory-broker.py search --query "Document the Machine video" --limit 5

# 7. Full system health
bash scripts/preflight.sh
```

---

## After Success: What's Next

Once this mission passes cleanly:

1. **Run it again** — reproducibility matters more than novelty
2. **Try a real outreach draft** — add one YELLOW-tier external research step
3. **Enable a scheduled run** — use Gateway cron for a daily artifact task
4. **Introduce competition** — have two agents draft the same deliverable, auditor picks winner
5. **First revenue experiment** — with full RED-tier approval gates active
