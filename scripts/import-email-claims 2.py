#!/usr/bin/env python3
"""Import legacy browser/CDP send claims into email_attempts as unverified claims."""

from __future__ import annotations

import argparse
import re
import sqlite3
from pathlib import Path

from email_ledger import DuplicateEmailAttemptError, begin_attempt, get_db, update_attempt


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CLAIMS = ROOT / "workspaces" / "outreach" / "artifacts" / "email-send-results-2026-04-28.md"


def find_lead_id(db: sqlite3.Connection, lead_name: str, recipient: str) -> str:
    email_like = f"%{recipient}%"
    row = db.execute(
        "SELECT id FROM leads WHERE lower(contact_info) LIKE lower(?) ORDER BY updated_at DESC LIMIT 1",
        (email_like,),
    ).fetchone()
    if row:
        return row["id"]
    row = db.execute(
        "SELECT id FROM leads WHERE lower(name)=lower(?) ORDER BY updated_at DESC LIMIT 1",
        (lead_name.strip(),),
    ).fetchone()
    if row:
        return row["id"]
    return f"legacy-claim:{lead_name.strip().lower().replace(' ', '-')}"


def parse_markdown_claims(path: Path) -> list[dict[str, str]]:
    claims: list[dict[str, str]] = []
    row_re = re.compile(r"^\|\s*\d+\s*\|\s*(?P<lead>[^|]+?)\s*\|\s*(?P<score>[^|]+?)\s*\|\s*(?P<email>[^|]+?)\s*\|\s*(?P<status>[^|]+?)\s*\|")
    for line in path.read_text(encoding="utf-8").splitlines():
        match = row_re.match(line)
        if not match:
            continue
        claims.append(
            {
                "lead": match.group("lead").strip(),
                "score": match.group("score").strip(),
                "recipient": match.group("email").strip(),
                "status": match.group("status").strip(),
            }
        )
    return claims


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", nargs="?", default=str(DEFAULT_CLAIMS), help="Markdown claim artifact")
    args = parser.parse_args()

    path = Path(args.path)
    db = get_db()
    imported = []
    skipped = []
    for claim in parse_markdown_claims(path):
        lead_id = find_lead_id(db, claim["lead"], claim["recipient"])
        subject = f"Legacy browser send claim for {claim['lead']} on 2026-04-28"
        body = f"Imported from {path}: {claim['status']} via Gmail browser/CDP UI claim. No provider evidence."
        try:
            row = begin_attempt(
                db,
                lead_id=lead_id,
                recipient=claim["recipient"],
                subject=subject,
                body=body,
                provider="gmail_browser_cdp",
                sender="owner@outboundautonomy.com",
                initial_status="unverified_claim",
            )
            row = update_attempt(
                db,
                row["id"],
                status="unverified_claim",
                error=f"legacy browser/CDP claim imported from {path}",
            )
            imported.append(dict(row))
        except DuplicateEmailAttemptError as e:
            skipped.append(e.existing)

    print(f"imported={len(imported)} skipped_duplicates={len(skipped)} source={path}")
    for row in imported:
        print(f"{row['id']} {row['lead_id']} {row['recipient']} {row['status']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
