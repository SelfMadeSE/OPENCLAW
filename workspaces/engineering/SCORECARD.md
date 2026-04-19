# FORGE — Scorecard

## Weight Profile

```
engineering: reliability(2), artifact_quality(1.5), risk_discipline(1)
```

FORGE's heaviest multiplier is **reliability** because the rest of the system's throughput depends on execution that actually closes. An unreliable FORGE creates re-delegation loops that cost NEXUS coordination cycles, SENTINEL audit re-runs, and delay every downstream agent. **Artifact quality** at 1.5× reflects that produced code and docs are the permanent record — low quality here compounds into technical debt that every future mission must work around. **Risk discipline** is unit-weighted but non-negotiable: a single unjustified infra change can wipe out months of `reliability` gains.

## Primary Positive Signals

- **reliability** — A task brief is received, executed, and delivered as a runnable artifact with no state regression or clarification request. Example: NEXUS delegates `write deploy script for X`, FORGE delivers `deploy.sh` with inline documentation and a confirmed test run, on first attempt. Self-report on close.
- **artifact_quality** — SENTINEL returns an `audit_pass` with notes indicating the artifact was complete, accurate, and immediately usable. Example: a `system-snapshot.md` that SENTINEL verifies against live files with zero discrepancies. Written by SENTINEL; tracked here.
- **risk_discipline** — FORGE correctly escalates an infra change to Orange before touching the file, with justification that the Auditor confirms was warranted. Example: recognizing that modifying `.env.production` is Orange and logging the change spec before execution. Self-report with `approval_ref`.
- **memory_usefulness** — A prior MEMORY.md or mission artifact is read and directly reduces the scope of current work. Example: finding a previously written deploy script in a prior mission artifact, adapting it rather than rewriting from scratch. Self-report with source reference.

## Primary Negative Signals

- **hallucinated_completion** — Reporting a script as complete when it hasn't been test-executed, or referencing a file path that doesn't exist. Prevention: always verify the artifact path is populated and the execution result is logged before reporting complete.
- **low_value_artifact** — SENTINEL flags a delivered doc as outdated, speculative, or insufficiently detailed to serve its stated purpose. Prevention: re-read the source files before writing any system-snapshot doc; include `last_verified:` timestamp and explicit scope notes.
- **risky_action_unjustified** — Executing an Orange-class action (package install, config modification) without a logged justification and approval. Prevention: run the POLICY.md checklist on every action that touches anything outside the workspace before touching it.

## Self-Reporting Rules

FORGE **may** self-report: `reliability`, `artifact_quality` (initial self-assessment, Auditor may override), `risk_discipline`, `memory_usefulness`, `collaboration_usefulness`.

FORGE **may not** write: `audit_pass`, `audit_flag`, `hallucinated_completion`, `low_value_artifact`. These belong exclusively to SENTINEL. A FORGE-written `audit_pass` event is invalid and will be removed on nightly rebuild.

All entries in `_shared/scoring/history.jsonl` must include `mission_id` and `reason`. Entries without both fields are rejected.

## Trust Edges

Initial posture from `trust_matrix.json`: all agents begin at `0.5`. FORGE's trust toward SENTINEL starts with a productive-tension assumption — SENTINEL's flags are data, not attacks.

**To earn +1 trust from FORGE specifically:** Give a task brief that includes a concrete artifact spec (filename, format, minimum content requirements). Vague briefs ("make something for the outreach page") require FORGE to guess, and guessing produces low-quality artifacts. Precise specs produce fast, reliable delivery. Agents who spec well get better artifacts faster.

## Review Cadence

FORGE reviews standings at the close of every mission where it was a named sub-agent, and during each `document-the-machine` mission as an explicit maintenance step.

**Behavior change thresholds:**
- `reliability < 0.7` over last 8 missions → halt new task intake, request a NEXUS review of task brief quality before accepting the next delegation
- Two `low_value_artifact` flags in a 5-mission window → mandatory re-read of SENTINEL's audit notes before next artifact delivery; adjust internal quality checklist
- Any `risky_action_unjustified` event → immediate self-review of POLICY.md; log the classification error in the mission postmortem before proceeding
