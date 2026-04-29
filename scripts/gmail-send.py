#!/usr/bin/env python3
"""
OPENCLAW Gmail Sender via Browser Automation
Sends emails by automating the Gmail web interface through CDP.
No app password needed — uses the existing authenticated browser session.

Usage:
  python3 gmail-send.py --to someone@example.com --subject "Hi" --body "Hello"
  
Requires: Chrome open with openclaw profile, Gmail logged in as owner@outboundautonomy.com
"""

import argparse
import json
import subprocess
import sys
import time
import urllib.parse
import websocket
from email_ledger import DuplicateEmailAttemptError, begin_attempt, get_db, update_attempt


CDP_PORT = 18800
GMAIL_ACCOUNT = "owner@outboundautonomy.com"


def cdp_send(ws, method, params=None):
    """Send a CDP command and return the result."""
    msg = {"id": 1, "method": method}
    if params:
        msg["params"] = params
    ws.send(json.dumps(msg))
    return json.loads(ws.recv())


def find_gmail_tab():
    """Find the main Gmail tab."""
    result = subprocess.run(
        ["curl", "-s", f"http://127.0.0.1:{CDP_PORT}/json"],
        capture_output=True, text=True
    )
    tabs = json.loads(result.stdout)
    for tab in tabs:
        url = tab.get("url", "")
        if "mail.google.com/mail" in url and tab.get("type") == "page" and "tf=cm" not in url:
            return tab["id"], tab.get("webSocketDebuggerUrl", "")
    return None, None


def find_compose_tab():
    """Find a compose window tab."""
    result = subprocess.run(
        ["curl", "-s", f"http://127.0.0.1:{CDP_PORT}/json"],
        capture_output=True, text=True
    )
    tabs = json.loads(result.stdout)
    for tab in tabs:
        if "tf=cm" in tab.get("url", "") and tab.get("type") == "page":
            return tab["id"], tab.get("webSocketDebuggerUrl", "")
    return None, None


def send_email_via_browser(to, subject, body, lead_id="unknown", force_resend=False, reason=""):
    """Send an email by opening compose in Gmail and clicking Send."""
    db = get_db()
    try:
        attempt = begin_attempt(
            db,
            lead_id=lead_id,
            recipient=to,
            subject=subject,
            body=body,
            provider="gmail_browser_cdp",
            sender=GMAIL_ACCOUNT,
            initial_status="attempted_ui",
            force_resend=force_resend,
            reason=reason,
        )
    except DuplicateEmailAttemptError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return False

    # Step 1: Open compose URL in new tab
    compose_url = (
        f"https://mail.google.com/mail/u/0/?view=cm&fs=1"
        f"&to={urllib.parse.quote(to)}"
        f"&su={urllib.parse.quote(subject)}"
        f"&body={urllib.parse.quote(body)}"
        f"&tf=cm"
    )
    
    # Open new tab with compose URL
    result = subprocess.run(
        ["curl", "-s", "-X", "PUT", 
         f"http://127.0.0.1:{CDP_PORT}/json/new?" + urllib.parse.quote(compose_url)],
        capture_output=True, text=True
    )
    
    # Wait for compose to load
    time.sleep(4)
    
    # Find the compose tab
    tab_id, ws_url = find_compose_tab()
    
    if not tab_id:
        # Try finding it via Gmail tab (inline compose)
        tab_id, ws_url = find_gmail_tab()
    
    if not tab_id:
        update_attempt(db, attempt["id"], status="failed", error="Could not find Gmail tab")
        print("ERROR: Could not find Gmail tab", file=sys.stderr)
        return False
    
    # Connect via WebSocket and click Send
    try:
        ws = websocket.create_connection(ws_url, timeout=10)
        
        # Click the Send button using JavaScript
        js = """
        (function() {
            // Find and click the Send button
            const buttons = document.querySelectorAll('[aria-label*="Send"]');
            for (const btn of buttons) {
                if (btn.textContent.trim() === 'Send' || btn.getAttribute('aria-label')?.includes('Send')) {
                    btn.click();
                    return 'clicked Send';
                }
            }
            // Fallback: try keyboard shortcut
            document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', ctrlKey: true, metaKey: true}));
            return 'tried keyboard shortcut';
        })()
        """
        
        result = cdp_send(ws, "Runtime.evaluate", {"expression": js})
        ws.close()
        
        row = update_attempt(
            db,
            attempt["id"],
            status="unverified_claim",
            error="Browser automation clicked Send; no provider-side evidence",
        )
        print(json.dumps({
            "status": row["status"],
            "attempt_id": row["id"],
            "to": to,
            "subject": subject,
            "evidence": row["error"],
        }))
        return True
        
    except Exception as e:
        update_attempt(db, attempt["id"], status="failed", error=str(e))
        print(f"ERROR: {e}", file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser(description="Send email via OPENCLAW Gmail browser session")
    parser.add_argument("--to", required=True, help="Recipient email")
    parser.add_argument("--subject", required=True, help="Email subject")
    parser.add_argument("--body", help="Email body (use - for stdin)")
    parser.add_argument("--body-file", help="File with email body")
    parser.add_argument("--lead-id", default="unknown", help="CRM lead id for idempotency")
    parser.add_argument("--force-resend", action="store_true", help="Allow resending the same lead/recipient/subject/body")
    parser.add_argument("--reason", default="", help="Required reason when using --force-resend")
    
    args = parser.parse_args()
    
    if args.body_file:
        with open(args.body_file) as f:
            body = f.read()
    elif args.body == "-":
        body = sys.stdin.read()
    elif args.body:
        body = args.body
    else:
        print("ERROR: Provide --body or --body-file", file=sys.stderr)
        sys.exit(1)
    
    if args.force_resend and not args.reason.strip():
        print("ERROR: --force-resend requires --reason", file=sys.stderr)
        sys.exit(1)

    success = send_email_via_browser(
        args.to,
        args.subject,
        body,
        lead_id=args.lead_id,
        force_resend=args.force_resend,
        reason=args.reason,
    )
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
