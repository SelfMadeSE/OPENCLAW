#!/usr/bin/env python3
"""Batch email sender. Reads draft data from stdin (JSON lines) and sends via SMTP."""
import argparse, json, os, smtplib, sys
from email.utils import make_msgid
from email.mime.text import MIMEText
from email_ledger import DuplicateEmailAttemptError, begin_attempt, get_db, summary, update_attempt

ADDR = "owner@outboundautonomy.com"
PWD = os.environ.get("GMAIL_APP_PASSWORD", "")
if not PWD:
    print("FATAL: GMAIL_APP_PASSWORD not set", file=sys.stderr)
    sys.exit(1)

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--force-resend", action="store_true", help="Allow duplicate idempotency keys")
parser.add_argument("--reason", default="", help="Required reason when using --force-resend")
args = parser.parse_args()

if args.force_resend and not args.reason.strip():
    print("FATAL: --force-resend requires --reason", file=sys.stderr)
    sys.exit(1)

db = get_db()
results = []
attempt_ids = []
for line in sys.stdin:
    line = line.strip()
    if not line: continue
    d = json.loads(line)
    to, subj, body = d["to"], d["subject"], d["body"]
    lead_id = d.get("lead_id", "unknown")
    try:
        attempt = begin_attempt(
            db,
            lead_id=lead_id,
            recipient=to,
            subject=subj,
            body=body,
            provider="gmail_smtp",
            sender=ADDR,
            initial_status="queued",
            force_resend=args.force_resend,
            reason=args.reason,
        )
    except DuplicateEmailAttemptError as e:
        print(f"DUPLICATE|{to}|{subj}|{e}", file=sys.stderr)
        results.append({"to": to, "status": "duplicate_blocked", "error": str(e)})
        continue
    attempt_ids.append(attempt["id"])
    
    msg = MIMEText(body, "plain", "utf-8")
    msg["From"] = ADDR
    msg["To"] = to
    msg["Subject"] = subj
    msg["Message-ID"] = make_msgid(domain=ADDR.split("@")[-1])
    update_attempt(db, attempt["id"], status="attempted", provider_message_id=msg["Message-ID"])
    
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as s:
            s.login(ADDR, PWD)
            s.send_message(msg)
        row = update_attempt(db, attempt["id"], status="provider_accepted", provider_message_id=msg["Message-ID"])
        print(f"ACCEPTED|{row['id']}|{to}|{subj}|{row['provider_message_id']}")
        results.append({"to": to, "status": row["status"], "attempt_id": row["id"]})
    except Exception as e:
        row = update_attempt(db, attempt["id"], status="failed", provider_message_id=msg["Message-ID"], error=str(e))
        print(f"FAIL|{row['id']}|{to}|{subj}|{e}")
        results.append({"to": to, "status": row["status"], "attempt_id": row["id"], "error": str(e)})

ledger_summary = summary(db)
selected = []
if attempt_ids:
    placeholders = ",".join("?" for _ in attempt_ids)
    selected = [
        dict(row)
        for row in db.execute(
            f"SELECT id, recipient, status, provider_message_id, error FROM email_attempts WHERE id IN ({placeholders}) ORDER BY id",
            attempt_ids,
        )
    ]

print(json.dumps({
    "batch_total": len(results),
    "accepted": sum(1 for r in results if r["status"] == "provider_accepted"),
    "failed": sum(1 for r in results if r["status"] == "failed"),
    "duplicate_blocked": sum(1 for r in results if r["status"] == "duplicate_blocked"),
    "attempts": selected,
    "ledger_by_status": ledger_summary["by_status"],
}, indent=2))
