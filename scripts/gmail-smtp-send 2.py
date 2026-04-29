#!/usr/bin/env python3
"""
OPENCLAW Gmail SMTP Sender
Sends emails via Gmail SMTP using App Password.
No browser required.

Usage:
  python3 gmail-smtp-send.py --to someone@example.com --subject "Hi" --body "Hello"
  python3 gmail-smtp-send.py --to someone@example.com --subject "Hi" --body-file email.txt
"""

import argparse
import json
import os
import smtplib
import sys
from email.utils import make_msgid
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email_ledger import DuplicateEmailAttemptError, begin_attempt, get_db, update_attempt

# Gmail SMTP config
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_PORT_TLS = 587
GMAIL_ADDRESS = os.environ.get("GMAIL_ADDRESS", "owner@outboundautonomy.com")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD", "").strip()


def send_email(to, subject, body, html=False, lead_id="unknown", force_resend=False, reason=""):
    """Send email via Gmail SMTP with App Password."""
    db = get_db()
    try:
        attempt = begin_attempt(
            db,
            lead_id=lead_id,
            recipient=to,
            subject=subject,
            body=body,
            provider="gmail_smtp",
            sender=GMAIL_ADDRESS,
            initial_status="queued",
            force_resend=force_resend,
            reason=reason,
        )
    except DuplicateEmailAttemptError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return False

    msg = MIMEMultipart()
    msg["From"] = GMAIL_ADDRESS
    msg["To"] = to
    msg["Subject"] = subject
    msg["Message-ID"] = make_msgid(domain=GMAIL_ADDRESS.split("@")[-1])
    
    subtype = "html" if html else "plain"
    msg.attach(MIMEText(body, subtype))
    update_attempt(db, attempt["id"], status="attempted", provider_message_id=msg["Message-ID"])
    
    # Try SSL first (port 465), fall back to STARTTLS (port 587)
    last_error = None
    for port, use_ssl in [(SMTP_PORT, True), (SMTP_PORT_TLS, False)]:
        try:
            if use_ssl:
                server = smtplib.SMTP_SSL(SMTP_HOST, port, timeout=30)
            else:
                server = smtplib.SMTP(SMTP_HOST, port, timeout=30)
                server.ehlo()
                server.starttls()
                server.ehlo()
            server.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
            server.send_message(msg)
            server.quit()
            row = update_attempt(
                db,
                attempt["id"],
                status="provider_accepted",
                provider_message_id=msg["Message-ID"],
                error=None,
            )
            print(json.dumps({
                "status": row["status"],
                "attempt_id": row["id"],
                "to": to,
                "subject": subject,
                "provider_message_id": row["provider_message_id"],
            }))
            return True
        except Exception as e:
            last_error = e
            continue
    
    update_attempt(db, attempt["id"], status="failed", provider_message_id=msg["Message-ID"], error=str(last_error))
    print(f"✗ Error sending to {to}: {last_error}", file=sys.stderr)
    return False


def main():
    parser = argparse.ArgumentParser(description="Send email via Gmail SMTP (App Password)")
    parser.add_argument("--to", required=True, help="Recipient email")
    parser.add_argument("--subject", required=True, help="Email subject")
    parser.add_argument("--body", help="Email body text")
    parser.add_argument("--body-file", help="File with email body")
    parser.add_argument("--html", action="store_true", help="Body is HTML")
    parser.add_argument("--lead-id", default="unknown", help="CRM lead id for idempotency")
    parser.add_argument("--force-resend", action="store_true", help="Allow resending the same lead/recipient/subject/body")
    parser.add_argument("--reason", default="", help="Required reason when using --force-resend")
    
    args = parser.parse_args()
    
    if not GMAIL_APP_PASSWORD:
        print("ERROR: GMAIL_APP_PASSWORD not set in environment", file=sys.stderr)
        sys.exit(1)
    
    if args.body_file:
        with open(args.body_file) as f:
            body = f.read()
    elif args.body:
        body = args.body
    else:
        print("ERROR: Provide --body or --body-file", file=sys.stderr)
        sys.exit(1)
    
    if args.force_resend and not args.reason.strip():
        print("ERROR: --force-resend requires --reason", file=sys.stderr)
        sys.exit(1)
    
    success = send_email(
        args.to,
        args.subject,
        body,
        html=args.html,
        lead_id=args.lead_id,
        force_resend=args.force_resend,
        reason=args.reason,
    )
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
