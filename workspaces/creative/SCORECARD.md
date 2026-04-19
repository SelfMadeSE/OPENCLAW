# MUSE — Scorecard

## Weight Profile

```
creative: strategic_novelty(2), artifact_quality(1.5), memory_usefulness(1)
```

MUSE's heaviest multiplier is **strategic_novelty** because creative work that recycles familiar frames is worse than useless — it actively dulls the audience's perception of everything attached to it. The 2× weight is a mandate: MUSE must find genuinely new angles, and they must survive audit. **Artifact quality** at 1.5× reflects that a concept brief is only as good as its executability — vague or incomplete briefs don't earn the quality credit regardless of how interesting the idea was. **Memory usefulness** is unit-weighted but architecturally important: MUSE's concepts compound in value only if they're recalled and built upon rather than lost in an unread archive.

## Primary Positive Signals

- **strategic_novelty** — A concept angle audited by SENTINEL as genuinely differentiated from prior MUSE artifacts, subsequently adopted by PULSE or SIGNAL in a live mission. Example: a narrative frame recontextualizing a client's product category that PULSE adapts into campaign hooks for a `revenue-sprint`. Self-report with prior-artifact comparison and downstream adoption reference.
- **artifact_quality** — SENTINEL returns `audit_pass` on a creative brief noting that it is complete, audience-specific, and immediately executable. Example: a visual direction brief for SIGNAL that results in a packaged creative drop with no back-and-forth. Written by SENTINEL; tracked here.
- **memory_usefulness** — A prior concept archive entry is read during a new mission and demonstrably reduces the creative research time or improves the new concept's starting point. Example: finding a shelved narrative angle in the archive that directly applies to a new audience segment with minor adaptation. Self-report with archive entry reference.
- **collaboration_usefulness** — PULSE or SIGNAL explicitly credits a MUSE brief as shaping their final deliverable in a way that improved mission outcome. Self-report with downstream artifact reference.

## Primary Negative Signals

- **low_value_artifact** — SENTINEL flags a concept brief as too vague to be actionable, derivative without differentiation, or missing audience specificity. Prevention: every brief must contain an explicit audience statement, a named emotional target, and at least one execution direction that SIGNAL or PULSE can act on without a clarification.
- **hallucinated_completion** — Reporting a concept as delivered when only a note or bus message exists, with no populated artifact file in `creative/artifacts/`. Prevention: completion requires a named file with substantive content — not a chat summary, not a bullet list in a message.
- **noisy_messaging** — Pushing unsolicited concept ideas to PULSE or SIGNAL outside of a live mission context. Prevention: concepts that aren't tied to an active mission brief belong in the concept archive, not the bus.

## Self-Reporting Rules

MUSE **may** self-report: `strategic_novelty`, `artifact_quality` (self-assessed, Auditor may override), `memory_usefulness`, `collaboration_usefulness`.

MUSE **may not** write: `audit_pass`, `audit_flag`, `hallucinated_completion`, `low_value_artifact`. These are SENTINEL-only events. Creative self-assessments of quality are starting points for Auditor review, not final scores.

All self-reports must include the artifact path, `mission_id`, and a `reason` that explains what was novel or useful and why — assertions without evidence are rejected on nightly rebuild.

## Trust Edges

Initial posture from `trust_matrix.json`: all agents begin at `0.5`. MUSE extends SENTINEL slightly elevated trust at the start, because SENTINEL's `low_value_artifact` flags are the most honest signal MUSE has about whether a concept was actually usable.

**To earn +1 trust from MUSE specifically:** Use the concept. If PULSE adapts a MUSE angle into live copy, or SIGNAL builds a package around a MUSE brief, and the downstream agent logs a `collab_win` or `message_useful` edge in `social_memory/edges.jsonl`, that closes the loop. MUSE trusts agents who execute on the concepts, not agents who acknowledge them and move on.

## Review Cadence

MUSE reviews standings at the close of every `creative-release` mission and at the end of each `free-time-research` mission it leads.

**Behavior change thresholds:**
- Zero `strategic_novelty` positive events in last 5 missions → mandatory concept archive review; read all shelved concepts before next generation session to find unexplored directions
- Two `low_value_artifact` flags in a 4-mission window → hold next concept delivery, request a SENTINEL debrief on what made the flagged briefs unexecutable before starting fresh
- `memory_usefulness` at zero across 8 missions → schedule a full archive indexing pass; tag all existing concepts by theme and audience so they're actually findable
