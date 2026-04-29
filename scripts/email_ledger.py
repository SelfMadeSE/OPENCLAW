#!/usr/bin/env python3
"""Canonical email attempt ledger for Outbound Autonomy sends."""

from __future__ import annotations

import hashlib
import json
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DB_PATH = ROOT / "data" / "crm.sqlite"

STATUSES = {
    "drafted",
    "queued",
    "attempted",
    "attempted_ui",
    "provider_accepted",
    "sent_verified",
    "failed",
    "bounced",
    "replied",
    "unverified_claim",
}


class DuplicateEmailAttemptError(RuntimeError):
    def __init__(self, existing: sqlite3.Row):
        self.existing = dict(existing)
        super().__init__(
            "duplicate email attempt blocked: "
            f"id={existing['id']} status={existing['status']} "
            f"recipient={existing['recipient']}"
        )


class RuntimeFrozenError(RuntimeError):
    pass


_FREEZE_PATH = ROOT / "_shared" / "policy" / "RUNTIME_FREEZE.json"


def runtime_freeze_check(action: str = "outbound_email") -> None:
    """Raise RuntimeFrozenError if the operator-level safety freeze is active.

    Override only with OPENCLAW_FREEZE_OVERRIDE=<approval-id>.
    """
    override = os.environ.get("OPENCLAW_FREEZE_OVERRIDE", "").strip()
    if not _FREEZE_PATH.exists():
        return
    try:
        data = json.loads(_FREEZE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return
    hard_wall = set(data.get("hard_wall_actions") or [])
    blocked = set(data.get("blocked_actions") or []) if data.get("active") else set()
    triggers = hard_wall | blocked
    if action not in triggers:
        return
    if override:
        # Audit override into the freeze file
        try:
            audit = data.setdefault("override_audit", [])
            audit.append({"ts": utc_now(), "action": action, "approval_id": override})
            _FREEZE_PATH.write_text(json.dumps(data, indent=2), encoding="utf-8")
        except Exception:
            pass
        return
    raise RuntimeFrozenError(
        f"runtime freeze active: action={action} blocked by {_FREEZE_PATH}. "
        "Set OPENCLAW_FREEZE_OVERRIDE=<approval-id> to bypass for a single approved batch."
    )


def db_path() -> Path:
    return Path(os.environ.get("OPENCLAW_CRM_DB", DEFAULT_DB_PATH))


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def sha256_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def canonical_recipient(recipient: str) -> str:
    return recipient.strip().lower()


def normalize_body(body: str) -> str:
    return "\n".join(line.rstrip() for line in body.strip().splitlines())


def body_hash(body: str) -> str:
    return sha256_text(normalize_body(body))


def subject_hash(subject: str) -> str:
    return sha256_text(subject.strip())


def recipient_hash(recipient: str) -> str:
    return sha256_text(canonical_recipient(recipient))


def idempotency_key(lead_id: str, recipient: str, subj_hash: str, draft_hash: str) -> str:
    return sha256_text("|".join([lead_id.strip(), canonical_recipient(recipient), subj_hash, draft_hash]))


def get_db(path: Path | None = None) -> sqlite3.Connection:
    resolved = path or db_path()
    resolved.parent.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(resolved)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=WAL")
    ensure_schema(db)
    return db


def ensure_schema(db: sqlite3.Connection) -> None:
    db.execute(
        """
        CREATE TABLE IF NOT EXISTS email_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idempotency_key TEXT NOT NULL UNIQUE,
            lead_id TEXT NOT NULL,
            recipient TEXT NOT NULL,
            recipient_hash TEXT NOT NULL,
            subject_hash TEXT NOT NULL,
            draft_hash TEXT NOT NULL,
            provider TEXT NOT NULL,
            sender TEXT NOT NULL,
            status TEXT NOT NULL,
            provider_message_id TEXT,
            error TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        """
    )
    db.execute("CREATE INDEX IF NOT EXISTS idx_email_attempts_lead_id ON email_attempts(lead_id)")
    db.execute("CREATE INDEX IF NOT EXISTS idx_email_attempts_recipient ON email_attempts(recipient)")
    db.execute("CREATE INDEX IF NOT EXISTS idx_email_attempts_status ON email_attempts(status)")
    db.commit()


def build_attempt_fields(
    *,
    lead_id: str,
    recipient: str,
    subject: str,
    body: str,
    provider: str,
    sender: str,
) -> dict[str, str]:
    subj_hash = subject_hash(subject)
    draft = body_hash(body)
    return {
        "idempotency_key": idempotency_key(lead_id, recipient, subj_hash, draft),
        "lead_id": lead_id.strip() or "unknown",
        "recipient": canonical_recipient(recipient),
        "recipient_hash": recipient_hash(recipient),
        "subject_hash": subj_hash,
        "draft_hash": draft,
        "provider": provider,
        "sender": sender,
    }


def get_attempt_by_key(db: sqlite3.Connection, key: str) -> sqlite3.Row | None:
    return db.execute("SELECT * FROM email_attempts WHERE idempotency_key=?", (key,)).fetchone()


def begin_attempt(
    db: sqlite3.Connection,
    *,
    lead_id: str,
    recipient: str,
    subject: str,
    body: str,
    provider: str,
    sender: str,
    initial_status: str = "queued",
    force_resend: bool = False,
    reason: str = "",
) -> sqlite3.Row:
    if initial_status not in STATUSES:
        raise ValueError(f"invalid email attempt status: {initial_status}")
    runtime_freeze_check("smtp_send")
    fields = build_attempt_fields(
        lead_id=lead_id,
        recipient=recipient,
        subject=subject,
        body=body,
        provider=provider,
        sender=sender,
    )
    existing = get_attempt_by_key(db, fields["idempotency_key"])
    ts = utc_now()
    if existing and not force_resend:
        raise DuplicateEmailAttemptError(existing)
    if existing:
        note = f"force-resend: {reason.strip()}" if reason.strip() else "force-resend"
        db.execute(
            """
            UPDATE email_attempts
            SET provider=?, sender=?, status=?, error=?, updated_at=?
            WHERE id=?
            """,
            (provider, sender, initial_status, note, ts, existing["id"]),
        )
        db.commit()
        return db.execute("SELECT * FROM email_attempts WHERE id=?", (existing["id"],)).fetchone()

    db.execute(
        """
        INSERT INTO email_attempts (
            idempotency_key, lead_id, recipient, recipient_hash, subject_hash,
            draft_hash, provider, sender, status, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            fields["idempotency_key"],
            fields["lead_id"],
            fields["recipient"],
            fields["recipient_hash"],
            fields["subject_hash"],
            fields["draft_hash"],
            fields["provider"],
            fields["sender"],
            initial_status,
            ts,
            ts,
        ),
    )
    db.commit()
    return get_attempt_by_key(db, fields["idempotency_key"])


def update_attempt(
    db: sqlite3.Connection,
    attempt_id: int,
    *,
    status: str,
    provider_message_id: str | None = None,
    error: str | None = None,
) -> sqlite3.Row:
    if status not in STATUSES:
        raise ValueError(f"invalid email attempt status: {status}")
    db.execute(
        """
        UPDATE email_attempts
        SET status=?, provider_message_id=COALESCE(?, provider_message_id),
            error=?, updated_at=?
        WHERE id=?
        """,
        (status, provider_message_id, error, utc_now(), attempt_id),
    )
    db.commit()
    return db.execute("SELECT * FROM email_attempts WHERE id=?", (attempt_id,)).fetchone()


def summary(db: sqlite3.Connection) -> dict:
    by_status = {
        row["status"]: row["count"]
        for row in db.execute(
            "SELECT status, COUNT(*) AS count FROM email_attempts GROUP BY status ORDER BY status"
        )
    }
    recent = [
        dict(row)
        for row in db.execute(
            """
            SELECT id, lead_id, recipient, provider, sender, status,
                   provider_message_id, error, created_at, updated_at
            FROM email_attempts
            ORDER BY updated_at DESC, id DESC
            LIMIT 20
            """
        )
    ]
    return {"by_status": by_status, "recent": recent}


def print_json(data: object) -> None:
    print(json.dumps(data, indent=2, sort_keys=True))
