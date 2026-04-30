#!/usr/bin/env python3
"""
Unified outreach send script with proper idempotency ledger.
Uses CRM email_attempts table — no separate ledger file needed.

Usage:
  python3 send_outreach_email.py --draft-file <path> 
  python3 send_outreach_email.py --lead-id <id> --recipient <email> --subject <s> --body <b>
  
The --draft-file mode reads the Hourly Outreach Draft Queue markdown and
extracts drafts for sending. Each draft needs:
  - lead_id / prospect_id
  - recipient email (verified)
  - subject line
  - body (from draft)
  
Idempotency: uses (lead_id, recipient_hash, subject_hash, draft_hash) as key.
Sends only if no prior attempt with same content hash exists.
"""
import smtplib
import ssl
import os
import sys
import sqlite3
import json
import hashlib
import re
import argparse
import certifi
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import make_msgid
from datetime import datetime, timezone
from typing import Optional, Dict, List, Tuple

SENDER = os.environ.get('GMAIL_ADDRESS', 'owner@outboundautonomy.com')
PASSWORD = os.environ.get('GMAIL_PASSWORD', '')
SMTP_HOST = 'smtp.gmail.com'
SMTP_PORT = 587
DB_PATH = '/Users/ryleebenson/Desktop/OPENCLAW/data/crm.sqlite'


def make_hash(*parts: str) -> str:
    """SHA-256 hex digest of concatenated parts."""
    return hashlib.sha256("|".join(parts).encode()).hexdigest()


def check_idempotency(conn: sqlite3.Connection, lead_id: str, subject: str, body: str, recipient: str) -> Optional[str]:
    """
    Check if an identical email was already attempted.
    Returns existing status if found, None if safe to send.
    """
    rhash = make_hash(recipient)
    shash = make_hash(subject)
    dhash = make_hash(body)
    
    existing = conn.execute(
        """SELECT status, id, error FROM email_attempts 
           WHERE lead_id = ? AND recipient_hash = ? AND subject_hash = ? AND draft_hash = ?
           ORDER BY id DESC LIMIT 1""",
        (lead_id, rhash, shash, dhash)
    ).fetchone()
    
    if existing:
        return existing[0]
    return None


def record_attempt(conn: sqlite3.Connection, lead_id: str, recipient: str, 
                   subject: str, body: str, status: str, 
                   message_id: Optional[str] = None, error: Optional[str] = None):
    """Record an email attempt in the idempotency ledger."""
    now = datetime.now(timezone.utc).isoformat()
    idem_key = make_hash(lead_id, recipient, subject, body, now)
    
    # Validate: provider_accepted MUST have a message_id for audit trails
    if status == 'provider_accepted' and not message_id:
        print(f"WARNING: provider_accepted without message_id for {lead_id} → {recipient}")
    
    conn.execute(
        """INSERT INTO email_attempts 
           (idempotency_key, lead_id, recipient, recipient_hash, subject_hash, draft_hash, 
            provider, sender, status, provider_message_id, error, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, 'gmail_smtp', ?, ?, ?, ?, ?, ?)""",
        (idem_key, lead_id, recipient, make_hash(recipient), make_hash(subject), make_hash(body),
         SENDER, status, message_id, error, now, now)
    )
    conn.commit()


def send_email(recipient: str, subject: str, body: str) -> Tuple[bool, Optional[str], Optional[str]]:
    """
    Send via Gmail SMTP. Returns (success, message_id, error_string).
    """
    if not PASSWORD:
        return False, None, "GMAIL_PASSWORD env var not set"
    
    ssl_ctx = ssl.create_default_context(cafile=certifi.where())
    
    msg = MIMEMultipart()
    msg['From'] = SENDER
    msg['To'] = recipient
    msg['Subject'] = subject
    msg['Message-ID'] = make_msgid(domain=SENDER.split('@')[-1])
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=30) as server:
            server.ehlo()
            server.starttls(context=ssl_ctx)
            server.ehlo()
            server.login(SENDER, PASSWORD)
            server.send_message(msg)
        # Capture Message-ID after send (in case SMTP server rewrites it)
        message_id = str(msg['Message-ID'])
        if not message_id:
            # Fallback: regenerate from domain
            message_id = make_msgid(domain=SENDER.split('@')[-1])
        return True, message_id, None
    except Exception as e:
        return False, None, str(e)


def send_single(lead_id: str, recipient: str, subject: str, body: str, 
                name: str = "", conn: Optional[sqlite3.Connection] = None) -> str:
    """
    Send a single outreach email with full idempotency protection.
    Returns status string.
    """
    close_conn = conn is None
    if conn is None:
        conn = sqlite3.connect(DB_PATH)
    
    try:
        # Check idempotency
        prior = check_idempotency(conn, lead_id, subject, body, recipient)
        if prior:
            return f"SKIPPED (prior attempt: {prior}): {name} → {recipient}"
        
        # Send
        success, msg_id, err = send_email(recipient, subject, body)
        
        # Record
        status = "provider_accepted" if success else "failed"
        record_attempt(conn, lead_id, recipient, subject, body, status, msg_id, err)
        
        # Update lead stage if sent
        if success:
            now = datetime.now(timezone.utc).isoformat()
            conn.execute(
                "UPDATE leads SET stage='outreach_sent', updated_at=? WHERE id=?",
                (now, lead_id)
            )
            conn.commit()
            return f"OK: {name} → {recipient}"
        else:
            return f"FAILED: {name} → {recipient} ({err})"
    finally:
        if close_conn:
            conn.close()


def parse_drafts_from_markdown(filepath: str) -> List[Dict]:
    """
    Parse Hourly Outreach Draft Queue markdown files to extract draft entries.
    Returns list of dicts with lead_id, recipient, subject, body, name.
    """
    with open(filepath, 'r') as f:
        content = f.read()
    
    drafts = []
    # Find draft sections: ## DRAFT N: Business Name
    sections = re.split(r'\n## DRAFT \d+: ', content)
    
    for section in sections[1:]:  # Skip header before first DRAFT
        lines = section.split('\n')
        name = lines[0].strip()
        
        # Extract Prospect line
        prospect_line = ""
        for line in lines:
            if line.startswith('**Prospect:**'):
                prospect_line = line
                break
        
        # Extract CRM ID
        crm_match = re.search(r'\*\*CRM ID:\*\*\s*(\S+)', section)
        lead_id = crm_match.group(1) if crm_match else None
        
        # Extract email
        email_match = re.search(r'\*\*Contact:\*\*\s*.*?\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b', section)
        recipient = email_match.group(1) if email_match else None
        
        # Extract subject
        subject_match = re.search(r'\n### Subject: (.+)', section)
        subject = subject_match.group(1).strip() if subject_match else None
        
        # Extract body (everything after Subject: until next ## or end)
        if subject_match:
            body_start = subject_match.end()
            body_end = len(section)
            next_section = re.search(r'\n## ', section[body_start:])
            if next_section:
                body_end = body_start + next_section.start()
            body = section[body_start:body_end].strip()
        else:
            body = None
        
        if lead_id and recipient and subject and body:
            drafts.append({
                'name': name,
                'lead_id': lead_id,
                'recipient': recipient,
                'subject': subject,
                'body': body
            })
    
    return drafts


def main():
    parser = argparse.ArgumentParser(description='Send outreach emails with idempotency')
    parser.add_argument('--draft-file', help='Path to Hourly Outreach Draft Queue markdown')
    parser.add_argument('--lead-id', help='Single lead ID to send')
    parser.add_argument('--recipient', help='Recipient email (with --lead-id)')
    parser.add_argument('--subject', help='Subject line (with --lead-id)')
    parser.add_argument('--body', help='Email body (with --lead-id)')
    parser.add_argument('--name', default='', help='Business name for logging')
    parser.add_argument('--check-only', action='store_true', help='Just check idempotency, no sends')
    parser.add_argument('--dry-run', action='store_true', help='Parse drafts but do not send')
    
    args = parser.parse_args()
    
    # Single send mode
    if args.lead_id and args.recipient and args.subject:
        conn = sqlite3.connect(DB_PATH)
        if args.check_only:
            prior = check_idempotency(conn, args.lead_id, args.subject, args.body or "", args.recipient)
            if prior:
                print(f"🔴 ALREADY SENT: {args.lead_id} → {args.recipient} (status: {prior})")
            else:
                print(f"🟢 SAFE TO SEND: {args.lead_id} → {args.recipient}")
        else:
            result = send_single(args.lead_id, args.recipient, args.subject, args.body or "", args.name, conn)
            print(result)
        conn.close()
        return
    
    # Draft file mode
    if args.draft_file:
        drafts = parse_drafts_from_markdown(args.draft_file)
        print(f"Parsed {len(drafts)} drafts from {args.draft_file}")
        
        if args.dry_run:
            for d in drafts:
                print(f"  {d['name']}: {d['lead_id']} → {d['recipient']}")
                print(f"    Subject: {d['subject'][:80]}...")
                print(f"    Has email: {'✅' if d['recipient'] else '❌'}")
            return
        
        if args.check_only:
            conn = sqlite3.connect(DB_PATH)
            for d in drafts:
                prior = check_idempotency(conn, d['lead_id'], d['subject'], d['body'], d['recipient'])
                if prior:
                    print(f"🔴 {d['name']}: ALREADY SENT ({prior})")
                else:
                    print(f"🟢 {d['name']}: SAFE TO SEND → {d['recipient']}")
            conn.close()
            return
        
        # Actually send
        conn = sqlite3.connect(DB_PATH)
        results = []
        for d in drafts:
            if not d['recipient']:
                print(f"SKIP: {d['name']} — no recipient email found")
                results.append(f"SKIP: {d['name']} — no email")
                continue
            
            result = send_single(d['lead_id'], d['recipient'], d['subject'], d['body'], d['name'], conn)
            print(result)
            results.append(result)
        
        # Summary
        sent = sum(1 for r in results if r.startswith('OK:'))
        skipped = sum(1 for r in results if r.startswith('SKIPPED') or r.startswith('SKIP:'))
        failed = sum(1 for r in results if r.startswith('FAILED'))
        print(f"\n=== SEND SUMMARY ===")
        print(f"Sent: {sent}")
        print(f"Skipped (idempotency): {skipped}")
        print(f"Failed: {failed}")
        print(f"Total: {len(results)}")
        conn.close()
        return
    
    parser.print_help()


if __name__ == '__main__':
    main()
