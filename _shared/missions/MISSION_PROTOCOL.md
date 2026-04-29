# MISSION_PROTOCOL.md (v1)

Canonical mission lifecycle and contract for OpenClaw. Supersedes the prose-only README in this directory; the README remains as orientation.

> **Source of truth ranking:** this file → `mission.json` schema → individual mission template files (`*.json` in this dir).

---

## 1. What is a mission

A **mission** is the unit of bounded autonomous work. Every real execution of OpenClaw outside of casual chat = one mission. No artifact, score event, memory write, or revenue attempt is valid outside a mission.

## 2. Mission lifecycle (state machine)

```
seeded → planned → executing → auditing → scored → closed
                  ↑                           │
                  └──── revise ◄────reject────┘   (auditor verdict)
```

| State | Owner | Required artifacts to leave the state |
|---|---|---|
| **seeded** | NEXUS or operator | `mission.json` (id, template, goal, lead, expected_artifacts, risk_envelope), `brief.md` |
| **planned** | NEXUS | `plan.md` (decomposition, sub-agent assignments, success criteria) |
| **executing** | sub-agents | every entry in `expected_artifacts` present and `min_bytes` satisfied |
| **auditing** | SENTINEL | `audit.md` with verdict ∈ {pass, revise, reject} |
| **scored** | SENTINEL + each agent | `scorecard.json` for the mission, `_shared/scoring/history.jsonl` events appended |
| **closed** | NEXUS | `postmortem.md`, `mission.json.state="closed"`, `closed_at` set, memory consolidated |

`revise` and `reject` return the mission to **planned** and **seeded** respectively.

## 3. File layout (per mission)

```
workspaces/orchestrator/artifacts/mission-<id>/
  mission.json
  brief.md
  plan.md
  artifacts/
    <produced files>
  audit.md
  scorecard.json
  postmortem.md
  approval-request.md      # only if risk_envelope ≥ orange
```

## 4. `mission.json` contract (authoritative)

```json
{
  "id": "mission-<slug>",
  "template": "<one of templates in this dir>",
  "goal": "single-sentence operator-facing goal",
  "lead": "orchestrator",
  "sub_agents": ["engineering","marketing"],
  "risk_envelope": "green|yellow|orange|red",
  "expected_artifacts": [
    {"path": "artifacts/foo.md", "min_bytes": 300, "required": true}
  ],
  "scoring_schema": "default-v1",
  "memory_read":  ["orchestrator","shared"],
  "memory_write": ["auditor"],
  "completion": {
    "all_artifacts_present": true,
    "audit_pass": true
  },
  "approval": {
    "required": false,
    "request_ref": null,
    "approved_by": null,
    "approved_at": null
  },
  "state": "seeded",
  "created_at": "2026-04-26T...Z",
  "closed_at": null
}
```

Validation: `expected_artifacts[].path` is relative to `mission-<id>/`. `risk_envelope >= orange` ⇒ `approval.required = true` and the mission cannot move past `executing` without `approval.approved_at != null`.

## 5. Risk envelope and gates

| Envelope | Lifecycle gate | Approver |
|---|---|---|
| green | none | self / NEXUS |
| yellow | SENTINEL audit before close | SENTINEL |
| orange | SENTINEL audit + Telegram operator approval before any external action | Operator (`8331613806`) |
| red | NEXUS halts at `seeded`; explicit operator confirmation required to proceed | Operator only |

Approval requests use the schema in `_shared/revenue/REVENUE_PROTOCOL.md` §5 and are appended to `_shared/revenue/approvals.jsonl`.

## 6. Disagreement protocol

For any mission with `risk_envelope >= yellow`, every produced artifact must have:
- a **proposer** (the producing agent),
- an explicit **critic** (a different agent or SENTINEL) recorded in `audit.md`,
- a SENTINEL **auditor verdict** with confidence ∈ [0,1],
- a recorded **failure mode** and **rollback plan** if `risk_envelope >= orange`.

NEXUS may not override SENTINEL `reject`. NEXUS may request a re-audit by writing `audit-rebuttal.md` and routing back to SENTINEL.

## 7. Scoring writes

On state transition to `scored`:
- SENTINEL writes `audit_pass_rate` (+/−) and any negative classes (`hallucinated_completion`, `low_value_artifact`, `bad_escalation`, `risky_action_unjustified`).
- Each producing agent may self-write only the classes in `_shared/scoring/schema.json#self_report_allowed_by_agent[<agent>]`. All other classes are auditor-only.
- Every event must have non-empty `reason`. Reason-free events are dropped on nightly rebuild.

## 8. Memory writes

On `closed`:
- NEXUS writes `kind=decision, scope=shared` summarizing what changed in strategy / routing.
- SENTINEL writes `kind=audit, scope=shared` with the verdict and evidence.
- Each agent may write `kind=lesson, scope=agent:<id>` if a reusable lesson was earned.
- `MEMORY.md` per agent is updated only when the lesson generalizes beyond this mission.

## 9. Mission templates (live in this directory)

Existing:
- `document-the-machine.json`
- `revenue-sprint.json`

Added in this realignment (PRD §11.2 set):
- `MISSION_SITE_AUDIT.json`
- `MISSION_PROSPECT_RESEARCH.json`
- `MISSION_OUTREACH_DRAFT.json`
- `MISSION_BUYER_ASSET.json`
- `MISSION_FOLLOW_UP.json`
- `MISSION_DEMO_BUILD.json`
- `MISSION_CASE_STUDY.json`
- `MISSION_PILOT_OFFER.json`

(Existing `audit-prospect-site.json`, `creative-release.json`, `outreach-package.json`, `free-time-research.json` remain as harness templates and are functionally aliased by the PRD-named templates above where they overlap.)

## 10. Hard rules

1. No artifact, no score. Score events without an artifact path in `evidence[]` are invalid.
2. No audit, no close (yellow+). NEXUS may not skip SENTINEL.
3. No external action above green without `approval.approved_at`.
4. No "sent" status without delivery evidence (matches `REVENUE_PROTOCOL.md` truth states).
5. No fake completion. `state="closed"` without `expected_artifacts` satisfied is a `hallucinated_completion` event against the lead.
