#!/usr/bin/env python3
"""Check active OpenClaw control files for Outbound Autonomy focus drift."""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
CRON_PATH = Path.home() / ".openclaw" / "cron" / "jobs.json"
REPORT_DIR = ROOT / "artifacts" / "runtime-reports"

ACTIVE_CONTROL_FILES = [
    ROOT / "ROUNDTABLE.md",
    ROOT / "memory" / "shared" / "outbound-autonomy-mission.md",
    ROOT / "memory" / "shared" / "auditor-status.md",
]

WORKSPACES = [
    "orchestrator",
    "engineering",
    "marketing",
    "outreach",
    "creative",
    "media",
    "auditor",
]

REQUIRED_CONCEPTS = [
    ("Outbound Autonomy", ["Outbound Autonomy"]),
    ("website audit / audit funnel", ["website audit", "website-audit", "audit funnel", "audit-funnel", "URL analysis"]),
    ("URL / site input", ["URL", "url", "site"]),
]

BAD_EXACT_PHRASES = [
    "Generate one social media content piece for SPECTOR or OPENCLAW",
    "Think about your existence",
    "Are you happy working on this project",
    "is this what you really want to do",
    "Freelance: web design, 3D animation, branding",
    "Beats: licensing",
    "Scheduling and live posting are YELLOW",
    "Autonomous distribution",
]

DRIFT_TERMS = [
    "SPECTOR",
    "beats",
    "music",
    "generic freelance",
]

ALLOWED_DRIFT_CONTEXT = [
    "do not",
    "do not create",
    "do not include",
    "what we are not",
    "never",
    "not outbound autonomy",
    "deprecated",
    "ignore",
    "quarantine",
    "not the current",
    "focus_drift",
    "focus drift",
    "surface focus drift",
    "unless rylee explicitly",
    "unless Rylee explicitly",
    "stale",
    "legacy",
]


@dataclass
class Finding:
    severity: str
    path: str
    line: int
    message: str
    excerpt: str


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def iter_control_files() -> Iterable[Path]:
    for path in ACTIVE_CONTROL_FILES:
        yield path
    for workspace in WORKSPACES:
        base = ROOT / "workspaces" / workspace
        for name in ("AGENTS.md", "BOOT.md", "HEARTBEAT.md", "MEMORY.md"):
            yield base / name


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        return ""


def allowed_context(line: str) -> bool:
    lowered = line.lower()
    return any(marker.lower() in lowered for marker in ALLOWED_DRIFT_CONTEXT)


def is_negative_section_heading(line: str) -> bool:
    lowered = re.sub(r"^[^a-z]+", "", line.strip().lower().lstrip("#").strip())
    return lowered.startswith("what we are not") or lowered.startswith("never")


def is_new_section_heading(line: str) -> bool:
    return line.lstrip().startswith("#")


def is_exclusion_bullet(line: str) -> bool:
    stripped = line.strip().lower()
    if not (stripped.startswith(("-", "*")) or re.match(r"^\d+\.\s+", stripped)):
        return False
    return any(marker in stripped for marker in ("do not", "never", "not ", "no ", "deprecated", "ignore", "quarantine"))


def scan_text(path: Path, text: str) -> list[Finding]:
    findings: list[Finding] = []
    for label, alternatives in REQUIRED_CONCEPTS:
        if not any(alternative in text for alternative in alternatives):
            findings.append(
                Finding(
                    "warn",
                    rel(path),
                    0,
                    f"Missing required mission concept: {label}",
                    "",
                )
            )

    in_negative_section = False
    for idx, line in enumerate(text.splitlines(), start=1):
        if is_new_section_heading(line):
            in_negative_section = is_negative_section_heading(line)
        stripped = line.strip()
        negative_context = in_negative_section or is_exclusion_bullet(stripped) or allowed_context(stripped)
        for phrase in BAD_EXACT_PHRASES:
            if phrase in stripped and not negative_context:
                findings.append(
                    Finding("fail", rel(path), idx, f"Forbidden active phrase: {phrase}", stripped)
                )
        for term in DRIFT_TERMS:
            if term.lower() in stripped.lower() and not negative_context:
                findings.append(
                    Finding(
                        "warn",
                        rel(path),
                        idx,
                        f"Potential stale non-OA term outside explicit deprecation context: {term}",
                        stripped,
                    )
                )
    return findings


def scan_cron() -> list[Finding]:
    findings: list[Finding] = []
    if not CRON_PATH.exists():
        return [
            Finding("warn", rel(CRON_PATH), 0, "Cron jobs file not found", "")
        ]

    data = json.loads(CRON_PATH.read_text(encoding="utf-8"))
    for index, job in enumerate(data.get("jobs", [])):
        if not job.get("enabled"):
            continue
        name = job.get("name", f"job[{index}]")
        description = str(job.get("description") or "")
        message = ""
        payload = job.get("payload") or {}
        if isinstance(payload, dict):
            message = str(payload.get("message") or payload.get("text") or "")
        cron_text = (name + " " + description + " " + message).lower()
        if (
            "platform-maintenance" in cron_text
            or "managed-by=memory-core" in cron_text
            or "__openclaw_memory_core_short_term_promotion_dream__" in cron_text
        ):
            continue

        synthetic_path = f"{rel(CRON_PATH)}::{name}"
        findings.extend(scan_text(Path(synthetic_path), message))

        if "audit" not in (message + name).lower() and "outbound autonomy" not in (message + name).lower():
            findings.append(
                Finding(
                    "warn",
                    synthetic_path,
                    0,
                    "Enabled cron job is not explicitly tied to Outbound Autonomy or the audit funnel",
                    name,
                )
            )
    return findings


def build_report(findings: list[Finding]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    fail_count = sum(1 for finding in findings if finding.severity == "fail")
    warn_count = sum(1 for finding in findings if finding.severity == "warn")

    lines = [
        "# Outbound Autonomy Focus Guard",
        "",
        f"Generated: {now}",
        "",
        f"Status: {'FAIL' if fail_count else 'PASS_WITH_WARNINGS' if warn_count else 'PASS'}",
        f"Failures: {fail_count}",
        f"Warnings: {warn_count}",
        "",
        "## Findings",
        "",
    ]

    if not findings:
        lines.append("No active focus drift detected in scanned control files and enabled cron jobs.")
    else:
        for finding in findings:
            location = finding.path
            if finding.line:
                location = f"{location}:{finding.line}"
            lines.append(f"- `{finding.severity}` `{location}`: {finding.message}")
            if finding.excerpt:
                lines.append(f"  Excerpt: {finding.excerpt[:240]}")

    lines.extend(
        [
            "",
            "## Scope",
            "",
            "Scanned active AGENTS, BOOT, HEARTBEAT, MEMORY, shared mission files, ROUNDTABLE, and enabled cron job payloads.",
        ]
    )
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Write timestamped markdown report")
    args = parser.parse_args()

    findings: list[Finding] = []
    for path in iter_control_files():
        findings.extend(scan_text(path, read_text(path)))
    findings.extend(scan_cron())

    report = build_report(findings)
    print(report)

    if args.write:
        REPORT_DIR.mkdir(parents=True, exist_ok=True)
        stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
        output = REPORT_DIR / f"oa-focus-guard-{stamp}.md"
        output.write_text(report, encoding="utf-8")
        latest = REPORT_DIR / "oa-focus-guard-latest.md"
        latest.write_text(report, encoding="utf-8")
        print(f"Wrote {output}")
        print(f"Wrote {latest}")

    return 1 if any(finding.severity == "fail" for finding in findings) else 0


if __name__ == "__main__":
    raise SystemExit(main())
