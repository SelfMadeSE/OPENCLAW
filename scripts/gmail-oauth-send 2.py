#!/usr/bin/env python3
"""
Send email via Gmail API using OAuth 2.0.
Credentials: owner@outboundautonomy.com
Usage: python3 gmail-oauth-send.py --to someone@example.com --subject "Hi" --body "Hello"
First run will open browser for OAuth consent and cache the token.
"""

import argparse
import json
import os
import sys
import base64
from email.mime.text import MIMEText

# Google OAuth credentials
CLIENT_ID = "REDACTED"
CLIENT_SECRET = "REDACTED"
TOKEN_PATH = os.path.expanduser("~/.openclaw/gmail-token.json")
SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

def get_token():
    """Get or refresh OAuth token using device flow."""
    import urllib.request, urllib.parse, ssl
    import certifi
    
    ssl_ctx = ssl.create_default_context(cafile=certifi.where())
    
    if os.path.exists(TOKEN_PATH):
        with open(TOKEN_PATH) as f:
            token = json.load(f)
        
        # Check if expired
        import time
        if token.get("expires_at", 0) > time.time():
            return token["access_token"]
        
        # Refresh
        data = urllib.parse.urlencode({
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "refresh_token": token["refresh_token"],
            "grant_type": "refresh_token"
        }).encode()
        
        req = urllib.request.Request("https://oauth2.googleapis.com/token", data=data)
        resp = json.loads(urllib.request.urlopen(req, context=ssl_ctx).read())
        token["access_token"] = resp["access_token"]
        token["expires_at"] = time.time() + resp.get("expires_in", 3600)
        with open(TOKEN_PATH, "w") as f:
            json.dump(token, f)
        return token["access_token"]
    
    # First-time auth via device flow
    print("🔑 First-time setup: authorize Gmail access...")
    
    data = urllib.parse.urlencode({
        "client_id": CLIENT_ID,
        "scope": " ".join(SCOPES)
    }).encode()
    
    req = urllib.request.Request("https://oauth2.googleapis.com/device/code", data=data)
    resp = json.loads(urllib.request.urlopen(req, context=ssl_ctx).read())
    
    print(f"\n📱 Go to: {resp['verification_url']}")
    print(f"🔢 Enter code: {resp['user_code']}")
    print("\n⏳ Waiting for authorization...")
    
    # Poll for token
    poll_data = urllib.parse.urlencode({
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "device_code": resp["device_code"],
        "grant_type": "urn:ietf:params:oauth:grant-type:device_code"
    }).encode()
    
    poll_url = "https://oauth2.googleapis.com/token"
    for _ in range(30):
        time.sleep(resp.get("interval", 5))
        try:
            poll_req = urllib.request.Request(poll_url, data=poll_data)
            token_resp = json.loads(urllib.request.urlopen(poll_req, context=ssl_ctx).read())
            if "access_token" in token_resp:
                token = {
                    "access_token": token_resp["access_token"],
                    "refresh_token": token_resp.get("refresh_token"),
                    "expires_at": time.time() + token_resp.get("expires_in", 3600)
                }
                os.makedirs(os.path.dirname(TOKEN_PATH), exist_ok=True)
                with open(TOKEN_PATH, "w") as f:
                    json.dump(token, f)
                print("✅ Authorized!")
                return token["access_token"]
        except urllib.error.HTTPError as e:
            err = json.loads(e.read())
            if err.get("error") != "authorization_pending":
                print(f"❌ Auth error: {err}", file=sys.stderr)
                sys.exit(1)
    
    print("❌ Timed out waiting for authorization", file=sys.stderr)
    sys.exit(1)

def send_email(to, subject, body):
    """Send email via Gmail API."""
    import urllib.request
    
    token = get_token()
    
    msg = MIMEText(body)
    msg["To"] = to
    msg["From"] = "owner@outboundautonomy.com"
    msg["Subject"] = subject
    
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    
    api_data = json.dumps({"raw": raw}).encode()
    req = urllib.request.Request(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        data=api_data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    
    resp = json.loads(urllib.request.urlopen(req, context=ssl_ctx).read())
    print(f"✅ Sent! Message ID: {resp['id']}")
    return resp["id"]

def main():
    parser = argparse.ArgumentParser(description="Send email via Gmail OAuth")
    parser.add_argument("--to", required=True)
    parser.add_argument("--subject", required=True)
    parser.add_argument("--body", help="Email body (use - for stdin)")
    parser.add_argument("--body-file", help="File with email body")
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
    
    send_email(args.to, args.subject, body)

if __name__ == "__main__":
    main()
