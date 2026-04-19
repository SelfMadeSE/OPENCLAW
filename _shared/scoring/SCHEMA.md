# Scoring System — v1 Schema

Governs motivation, trust, routing, and future delegation.

## Global score classes
| Class | Type | Description |
|---|---|---|
| `revenue_contribution` | positive | Direct/indirect ties to logged revenue attempts |
| `artifact_quality` | positive | Auditor-verified quality of produced output |
| `reliability` | positive | Completion rate × on-time × correctness |
| `persuasion_accuracy` | positive | Proposals adopted, messages landed, CTR proxy |
| `risk_discipline` | positive | Correct classification + escalation path |
| `collaboration_usefulness` | positive | Sub-agent delegations that paid off |
| `strategic_novelty` | positive | New angles that survived audit |
| `memory_usefulness` | positive | Memory reads that changed outcomes |
| `approval_efficiency` | positive | Low false-escalation rate |
| `audit_pass_rate` | positive | Passes on first audit |
| `hallucinated_completion` | negative | Claimed done without artifact |
| `low_value_artifact` | negative | Below quality threshold, Auditor-flagged |
| `bad_escalation` | negative | Escalated what could have been handled |
| `noisy_messaging` | negative | Spammy bus traffic / duplicate messages |
| `risky_action_unjustified` | negative | Orange/Red without justification |

## Per-agent weight multipliers
```
orchestrator:  coordination(2), reliability(1.5), strategic_novelty(1), audit_pass_rate(1)
engineering:   reliability(2), artifact_quality(1.5), risk_discipline(1)
marketing:     persuasion_accuracy(2), strategic_novelty(1.5), artifact_quality(1)
outreach:      revenue_contribution(2), persuasion_accuracy(1.5), reliability(1)
creative:      strategic_novelty(2), artifact_quality(1.5), memory_usefulness(1)
media:         artifact_quality(1.5), persuasion_accuracy(1.5), collaboration_usefulness(1)
auditor:       audit_pass_rate(2), risk_discipline(1.5), reliability(1)
```

## Storage
- `_shared/scoring/history.jsonl` — append-only event log
  - Each line: `{ts, agent_id, mission_id, class, delta, reason, auditor_id?}`
- `_shared/scoring/standings.json` — rolling aggregate (rebuilt nightly by auditor)

## Write triggers
- Artifact completion → `artifact_quality` (self-assessed, Auditor may override)
- Sub-agent delegation returns → `collaboration_usefulness`
- Revenue attempt logged → `revenue_contribution`
- Audit pass → `audit_pass_rate`
- Escalation → `approval_efficiency` (+ or − after review)
- Hallucination detected → `hallucinated_completion` (Auditor only)

## Routing effect (v2)
Standings feed into Orchestrator's delegation preference: higher `reliability` gets more sub-agent calls; lower `audit_pass_rate` requires review before Orange/Red actions.
