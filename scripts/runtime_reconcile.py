#!/usr/bin/env python3
"""
OpenClaw runtime reconciliation report.

This script is intentionally evidence-first: it reads local runtime state,
gateway logs, cron state, CRM rows, and recent artifacts, then writes a report
that separates verified facts from unresolved blockers.
"""

from __future__ import annotations

import argparse
import json
import os
import sqlite3
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path("/Users/ryleebenson/Desktop/OPENCLAW")
OPENCLAW = Path("/Users/ryleebenson/.openclaw")
CRM = ROOT / "data" / "crm.sqlite"
JOBS = OPENCLAW / "cron" / "jobs.json"
GATEWAY_ERR = OPENCLAW / "logs" / "gateway.err.log"
REPORT_DIR = ROOT / "artifacts" / "runtime-reports"


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def read_json(path: Path) -> dict:
    if not path.exists():
        return {}
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def tail_lines(path: Path, limit: int = 500) -> list[str]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8", errors="replace") as f:
        lines = f.readlines()
    return [line.rstrip("\n") for line in lines[-limit:]]


def cron_summary() -> dict:
    data = read_json(JOBS)
    jobs = data.get("jobs", [])
    by_status = Counter()
    active = []
    failed = []

    for job in jobs:
        state = job.get("state", {})
        status = state.get("lastRunStatus", "never")
        by_status[status] += 1
        item = {
            "id": job.get("id"),
            "name": job.get("name"),
            "agent": job.get("agentId") or job.get("sessionTarget"),
            "enabled": job.get("enabled", False),
            "schedule": job.get("schedule", {}),
            "last_status": status,
            "last_error": state.get("lastError", ""),
            "delivery": state.get("lastDeliveryStatus", ""),
        }
        if job.get("enabled", False):
            active.append(item)
        if status == "error" or state.get("lastError"):
            failed.append(item)

    return {
        "total": len(jobs),
        "enabled": sum(1 for job in jobs if job.get("enabled", False)),
        "by_status": dict(by_status),
        "active": active,
        "failed": failed,
    }


def crm_summary() -> dict:
    if not CRM.exists():
        return {"exists": False}

    db = sqlite3.connect(CRM)
    db.row_factory = sqlite3.Row
    try:
        stages = {
            row["stage"]: row["count"]
            for row in db.execute(
                "SELECT stage, COUNT(*) AS count FROM leads GROUP BY stage"
            )
        }
        recent_actions = [
            dict(row)
            for row in db.execute(
                "SELECT lead_id, agent, action_type, description, result, created_at "
                "FROM actions ORDER BY created_at DESC LIMIT 10"
            )
        ]
        recent_leads = [
            dict(row)
            for row in db.execute(
                "SELECT id, name, type, stage, score, updated_at "
                "FROM leads ORDER BY updated_at DESC LIMIT 10"
            )
        ]
        email_attempts_exists = db.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='email_attempts'"
        ).fetchone()
        if email_attempts_exists:
            email_by_status = {
                row["status"]: row["count"]
                for row in db.execute(
                    "SELECT status, COUNT(*) AS count FROM email_attempts GROUP BY status"
                )
            }
            recent_email_attempts = [
                dict(row)
                for row in db.execute(
                    """
                    SELECT id, lead_id, recipient, provider, sender, status,
                           provider_message_id, error, created_at, updated_at
                    FROM email_attempts
                    ORDER BY updated_at DESC, id DESC
                    LIMIT 12
                    """
                )
            ]
            ledger_sent_leads = {
                row["lead_id"]
                for row in db.execute(
                    """
                    SELECT DISTINCT lead_id FROM email_attempts
                    WHERE status IN ('provider_accepted', 'sent_verified')
                    """
                )
            }
        else:
            email_by_status = {}
            recent_email_attempts = []
            ledger_sent_leads = set()
        crm_sent_leads = {
            row["id"]
            for row in db.execute(
                "SELECT id FROM leads WHERE stage IN ('outreach_sent', 'responded', 'negotiating', 'won')"
            )
        }
        email_truth_blockers = [
            {
                "lead_id": lead_id,
                "issue": "CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists",
            }
            for lead_id in sorted(crm_sent_leads - ledger_sent_leads)
        ]
    finally:
        db.close()

    return {
        "exists": True,
        "stages": stages,
        "recent_leads": recent_leads,
        "recent_actions": recent_actions,
        "email_attempts": {
            "by_status": email_by_status,
            "recent": recent_email_attempts,
            "truth_blockers": email_truth_blockers,
        },
    }


def artifact_summary() -> dict:
    workspaces = ROOT / "workspaces"
    if not workspaces.exists():
        return {"recent": []}

    candidates: list[Path] = []
    for agent_dir in workspaces.iterdir():
        artifacts = agent_dir / "artifacts"
        if artifacts.exists():
            candidates.extend(path for path in artifacts.rglob("*") if path.is_file())

    recent = sorted(candidates, key=lambda p: p.stat().st_mtime, reverse=True)[:20]
    return {
        "recent": [
            {
                "path": str(path),
                "mtime": datetime.fromtimestamp(
                    path.stat().st_mtime, tz=timezone.utc
                ).isoformat(),
                "size": path.stat().st_size,
            }
            for path in recent
        ]
    }


def log_summary() -> dict:
    lines = tail_lines(GATEWAY_ERR)
    patterns = {
        "n8n_404": "n8n-mcp" in "",
        "elephant_model": "elephant-alpha",
        "memory_no_vectors": "without vector embeddings",
        "bootstrap_truncated": "truncating in injected context",
        "incomplete_turn": "incomplete turn detected",
        "telegram_socket": "UND_ERR_SOCKET",
    }

    counts = {}
    examples = {}
    for key, needle in patterns.items():
        if key == "n8n_404":
            needle = "n8n-mcp"
        matches = [line for line in lines if needle in line]
        counts[key] = len(matches)
        if matches:
            examples[key] = matches[-1]

    return {"window_lines": len(lines), "counts": counts, "examples": examples}


def build_report() -> dict:
    return {
        "generated_at": utc_now().isoformat(),
        "sources": {
            "jobs": str(JOBS),
            "gateway_err": str(GATEWAY_ERR),
            "crm": str(CRM),
            "workspaces": str(ROOT / "workspaces"),
        },
        "cron": cron_summary(),
        "crm": crm_summary(),
        "artifacts": artifact_summary(),
        "logs": log_summary(),
    }


def to_markdown(report: dict) -> str:
    lines = [
        "# OpenClaw Runtime Reconciliation",
        "",
        f"Generated: {report['generated_at']}",
        "",
        "## Cron",
        "",
        f"- Jobs: {report['cron']['enabled']} enabled / {report['cron']['total']} total",
        f"- Last-run statuses: `{json.dumps(report['cron']['by_status'], sort_keys=True)}`",
    ]

    if report["cron"]["failed"]:
        lines.append("- Failed or blocked jobs:")
        for job in report["cron"]["failed"][:8]:
            lines.append(
                f"  - {job['name']} ({job['agent']}): {job['last_status']} {job['last_error']}".rstrip()
            )
    else:
        lines.append("- Failed or blocked jobs: none found in job state")

    lines.extend(["", "## CRM", ""])
    crm = report["crm"]
    if not crm.get("exists"):
        lines.append("- CRM database missing")
    else:
        lines.append(f"- Lead stages: `{json.dumps(crm['stages'], sort_keys=True)}`")
        lines.append(f"- Recent actions: {len(crm['recent_actions'])} loaded")
        for action in crm["recent_actions"][:5]:
            lines.append(
                f"  - {action['created_at']} {action['agent']} {action['action_type']} "
                f"lead={action['lead_id']}: {action['description']}"
            )
        email = crm.get("email_attempts", {})
        lines.append(f"- Email ledger statuses: `{json.dumps(email.get('by_status', {}), sort_keys=True)}`")
        if email.get("truth_blockers"):
            lines.append("- Email truth blockers:")
            for blocker in email["truth_blockers"][:8]:
                lines.append(f"  - lead={blocker['lead_id']}: {blocker['issue']}")
        else:
            lines.append("- Email truth blockers: none from CRM sent-stage vs ledger provider evidence check")
        if email.get("recent"):
            lines.append("- Recent email attempts:")
            for attempt in email["recent"][:5]:
                evidence = attempt.get("provider_message_id") or attempt.get("error") or "no provider evidence"
                lines.append(
                    f"  - {attempt['updated_at']} #{attempt['id']} {attempt['status']} "
                    f"lead={attempt['lead_id']} to={attempt['recipient']} via={attempt['provider']}: {evidence}"
                )

    lines.extend(["", "## Runtime Log Signals", ""])
    lines.append(f"- Recent gateway lines scanned: {report['logs']['window_lines']}")
    for key, count in report["logs"]["counts"].items():
        lines.append(f"- {key}: {count}")

    lines.extend(["", "## Recent Artifacts", ""])
    for item in report["artifacts"]["recent"][:10]:
        lines.append(f"- {item['mtime']} {item['path']} ({item['size']} bytes)")

    lines.extend(
        [
            "",
            "## Reporting Rule",
            "",
            "Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="Write JSON and Markdown reports")
    args = parser.parse_args()

    report = build_report()
    if args.write:
        REPORT_DIR.mkdir(parents=True, exist_ok=True)
        stamp = utc_now().strftime("%Y%m%dT%H%M%SZ")
        json_path = REPORT_DIR / f"runtime-reconcile-{stamp}.json"
        md_path = REPORT_DIR / f"runtime-reconcile-{stamp}.md"
        json_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
        md_path.write_text(to_markdown(report), encoding="utf-8")
        print(json.dumps({"json": str(json_path), "markdown": str(md_path)}, indent=2))
    else:
        print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
