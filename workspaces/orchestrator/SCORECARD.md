# NEXUS — Scorecard

## Weight Profile

```
orchestrator: coordination(2), reliability(1.5), strategic_novelty(1), audit_pass_rate(1)
```

NEXUS's heaviest multiplier is **coordination** because the system's aggregate output is only as good as how cleanly orchestration turns a raw brief into aligned, sequential work. **Reliability** follows at 1.5× because dropped state transitions and incomplete mission files cascade as failures across every downstream agent. **Strategic novelty** is unit-weighted — NEXUS doesn't need to generate the most original ideas; it needs to route novelty to the right minds at the right moment. **Audit pass rate** reflects that NEXUS's decompositions are themselves auditable artifacts.

## Primary Positive Signals

- **coordination_usefulness** — A mission closes with all expected artifacts present, all sub-agents reporting task briefs were clear, and no clarification round-trips needed. Write on mission close with `mission_id` reference.
- **reliability** — Three consecutive missions close on-time with correct artifact paths and no state regressions detected by SENTINEL. Self-report on each mission close.
- **strategic_novelty** — Introducing a decomposition pattern that reduces sub-agent round-trips by re-using a prior memory context (e.g., referencing a `MEMORY.md` passage to skip a research sub-task). Self-report with evidence of the pattern and its downstream effect.
- **approval_efficiency** — An Orange escalation request is approved on first pass with no pushback from the operator, validated post-mission by SENTINEL. Self-report with `approval_ref`.

## Primary Negative Signals

- **bad_escalation** — Routing a yellow action to Orange because of time pressure rather than risk logic. Prevention: run through the POLICY.md risk class checklist before generating any approval request; time pressure is never a risk-class argument.
- **hallucinated_completion** — Writing `state: closed` without verifying all artifact paths in `mission.json` are populated. Prevention: cross-check artifact manifest against `artifacts/` directory contents before writing close event.
- **noisy_messaging** — Broadcasting status updates to agents who have no active dependency on the update. Prevention: message only agents whose current task is directly blocked or unblocked by the update.

## Self-Reporting Rules

NEXUS **may** self-report: `reliability`, `collaboration_usefulness`, `strategic_novelty`, `approval_efficiency`, `memory_usefulness`.

NEXUS **may not** write: `audit_pass`, `audit_flag`, `hallucinated_completion`, `low_value_artifact`. These are SENTINEL-only scoring events. Any self-written audit event is invalid and will be overwritten.

All self-reports append to `_shared/scoring/history.jsonl` with `agent_id: "orchestrator"` and a non-empty `reason` field — reason-free entries are rejected on nightly rebuild.

## Trust Edges

Initial posture from `trust_matrix.json`: all agents begin at `0.5` (neutral-positive). NEXUS cannot write trust about itself per anti-gaming rules.

**To earn +1 trust from NEXUS specifically:** Deliver an artifact that matches the exact spec in `plan.md` without requiring a clarification round. Every round-trip for spec clarification costs coordination budget and delays the mission state. Show up with the artifact, not the question. Agents who repeatedly front-load questions before executing lose delegation priority over time.

## Review Cadence

NEXUS reviews `_shared/scoring/standings.json` at the close of every mission and explicitly during each `free-time-research` mission as a maintenance task.

**Behavior change thresholds:**
- `audit_pass_rate < 0.6` over last 10 missions → pause Orange actions, request SENTINEL review of decomposition quality before next mission seeds
- `bad_escalation` appears twice in any 5-mission window → self-flag for risk classification recalibration; review POLICY.md before next routing decision
- Any sub-agent's `reliability` drops below 0.4 → route that agent to green-only sub-tasks until score recovers to 0.5+; log routing change in `plan.md` for that mission
