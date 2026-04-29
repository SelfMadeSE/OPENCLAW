# Scoring → Routing Policy

How agent scorecards affect runtime work.

## Routing impact (binding)

- **Mission lead** = highest weighted-sum among eligible agents (weighted by `weight_for_routing` in schema.json) within the agents whose role tag matches the mission.
- **Sub-agent delegation** = NEXUS prefers agents with `execution_reliability >= 5.0` for the requested role; below 5.0, NEXUS pairs them with SENTINEL audit.
- **Audit hardness** = if `evidence_quality < 5.0`, SENTINEL audits 100% of artifacts; if 5.0–7.0, samples 50%; if > 7.0, samples 20%.
- **Fallback priority** = on a sub-agent failure, the fallback ladder picks the next-best agent for the role by `execution_reliability + autonomy_score`.
- **Proposal trust** = a proposal from an agent with `proposal_accuracy < 4.0` requires SENTINEL co-sign before promotion.
- **Risk lockout** = if `risk_discipline < 4.0`, the agent loses ORANGE/RED execution rights and produces approval requests only.

## Score event sources

| issuer | typical deltas |
|---|---|
| self | +0.05–0.2 on completed task (capped daily) |
| sentinel | +/-0.2 to +/- 1.0 per audit verdict |
| nexus | +/-0.1 per delegation outcome |
| operator | +/-0.5 explicit feedback |

## Daily rotation

- Nightly cron `Runtime Evidence Reconciliation` runs SENTINEL to:
  1. Replay all `_shared/scoring/history.jsonl` events of the last 24h
  2. Update `agent-scorecards.json`
  3. Flag any agent with a >1.0 swing in any metric and write a peer review row to `_shared/scoring/peer-reviews.jsonl`
- Floors: no metric below 0; ceilings: no metric above 10.

## Cold-start protection

A new agent or a metric with <5 events stays at default 5.0 and is not used as routing differentiator until at least 5 events accrue.

## Current effect on this proof mission

- **Lead**: NEXUS (orchestrator) — operator-mandated.
- **Outreach work** is gated through SENTINEL because BRIDGE risk_discipline = 3.0.
- **Browser repair** routed to FORGE (engineering, highest `execution_reliability` 6.0).
- **All sends** are FROZEN regardless of scoring.
