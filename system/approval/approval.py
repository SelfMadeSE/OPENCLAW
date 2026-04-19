#!/usr/bin/env python3
"""
OPENCLAW Approval & Risk System

Escalation flow: attempt → collaborate → escalate → human

Agents MUST:
1. Attempt the task themselves first
2. Ask another agent for help (collaborate)
3. Escalate to orchestrator only if collaboration fails
4. Only escalate to human as absolute last resort

Tiers:
    GREEN  — auto-approved (internal tasks, drafts, research)
    YELLOW — agent-approved (outreach drafts, content for review)
    ORANGE — orchestrator-approved (financial, external-facing)
    RED    — human-approved (payments, account access, public posts)

Usage:
    python approval.py request --agent outreach --action "send cold email" --tier yellow
    python approval.py check --id <request-id>
    python approval.py approve --id <request-id> --by orchestrator
    python approval.py deny --id <request-id> --by orchestrator --reason "needs revision"
    python approval.py list
    python approval.py policy
"""

import os
import sys
import json
import uuid
import fcntl
import logging
import tempfile
import argparse
from contextlib import contextmanager
from pathlib import Path
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent.parent
APPROVAL_DIR = Path(__file__).resolve().parent
REQUESTS_FILE = APPROVAL_DIR / "requests.json"
POLICY_FILE = APPROVAL_DIR / "policy.json"
LOGS_DIR = BASE_DIR / "logs"

TIERS = {
    "green": {
        "name": "Auto-Approved",
        "approver": "auto",
        "description": "Internal tasks, drafts, research, memory writes",
        "examples": ["write draft", "search web", "store memory", "analyze data"]
    },
    "yellow": {
        "name": "Agent-Approved",
        "approver": "any_agent",
        "description": "Content drafts, outreach templates, proposals for review",
        "examples": ["draft email", "create proposal", "generate content", "plan campaign"]
    },
    "orange": {
        "name": "Orchestrator-Approved",
        "approver": "orchestrator",
        "description": "External-facing actions, financial decisions, API calls",
        "examples": ["send email", "post to platform", "create gig listing", "modify workflow"]
    },
    "red": {
        "name": "Human-Approved",
        "approver": "human",
        "description": "Payments, account access, public posts, irreversible actions",
        "examples": ["process payment", "access credentials", "publish content", "delete data"]
    }
}

# Actions and their default tiers
ACTION_TIERS = {
    "search_web": "green",
    "write_memory": "green",
    "read_memory": "green",
    "draft_content": "green",
    "analyze_data": "green",
    "generate_image": "green",
    "draft_email": "yellow",
    "draft_proposal": "yellow",
    "create_content": "yellow",
    "review_code": "yellow",
    "send_email": "orange",
    "post_social": "orange",
    "create_gig": "orange",
    "submit_proposal": "orange",
    "modify_system": "orange",
    "process_payment": "red",
    "access_credentials": "red",
    "publish_content": "red",
    "delete_data": "red",
    "external_api_write": "red"
}


def _atomic_write_json(path, data):
    """Write JSON data atomically via temp file + os.replace."""
    tmp_fd, tmp_path = tempfile.mkstemp(dir=str(Path(path).parent), suffix='.tmp')
    try:
        with os.fdopen(tmp_fd, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        os.replace(tmp_path, str(path))
    except:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
        raise


@contextmanager
def _file_lock(path):
    """fcntl-based file lock for atomic read-modify-write operations."""
    lock_path = str(path) + ".lock"
    fd = open(lock_path, 'w')
    try:
        fcntl.flock(fd, fcntl.LOCK_EX)
        yield
    finally:
        fcntl.flock(fd, fcntl.LOCK_UN)
        fd.close()


class ApprovalSystem:
    def __init__(self):
        self._ensure_files()

    def _ensure_files(self):
        if not REQUESTS_FILE.exists():
            _atomic_write_json(REQUESTS_FILE, [])
        if not POLICY_FILE.exists():
            _atomic_write_json(POLICY_FILE, {
                "tiers": TIERS,
                "action_tiers": ACTION_TIERS,
                "escalation_order": ["attempt", "collaborate", "escalate", "human"]
            })

    def _load_requests(self) -> list:
        return json.loads(REQUESTS_FILE.read_text())

    def _save_requests(self, reqs: list):
        _atomic_write_json(REQUESTS_FILE, reqs)

    def classify_action(self, action: str) -> str:
        """Determine the approval tier for an action."""
        # Exact match
        if action in ACTION_TIERS:
            return ACTION_TIERS[action]
        # Partial match (one direction only — key must appear in action)
        for key, tier in ACTION_TIERS.items():
            if key in action.lower():
                return tier
        logger.warning("Unknown action %r, defaulting to yellow tier", action)
        return "yellow"

    def request_approval(self, agent: str, action: str,
                        tier: str = None, details: str = "",
                        escalation_history: list = None) -> dict:
        """Submit an approval request."""
        if tier is None:
            tier = self.classify_action(action)

        req = {
            "id": uuid.uuid4().hex[:12],
            "agent": agent,
            "action": action,
            "tier": tier,
            "details": details,
            "status": "pending",
            "escalation_history": escalation_history or [],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "decided_at": None,
            "decided_by": None,
            "decision": None,
            "reason": None
        }

        # Auto-approve green tier
        if tier == "green":
            req["status"] = "approved"
            req["decided_by"] = "auto"
            req["decision"] = "approved"
            req["decided_at"] = datetime.now(timezone.utc).isoformat()
            req["reason"] = "Auto-approved (green tier)"

        with _file_lock(REQUESTS_FILE):
            reqs = self._load_requests()
            reqs.append(req)
            self._save_requests(reqs)
        self._log("approval_requested", req)
        return req

    def approve(self, req_id: str, by: str, reason: str = "") -> bool:
        with _file_lock(REQUESTS_FILE):
            reqs = self._load_requests()
            for req in reqs:
                if req["id"] == req_id:
                    req["status"] = "approved"
                    req["decided_by"] = by
                    req["decision"] = "approved"
                    req["decided_at"] = datetime.now(timezone.utc).isoformat()
                    req["reason"] = reason
                    self._save_requests(reqs)
                    self._log("approval_granted", req)
                    return True
        return False

    def deny(self, req_id: str, by: str, reason: str) -> bool:
        with _file_lock(REQUESTS_FILE):
            reqs = self._load_requests()
            for req in reqs:
                if req["id"] == req_id:
                    req["status"] = "denied"
                    req["decided_by"] = by
                    req["decision"] = "denied"
                    req["decided_at"] = datetime.now(timezone.utc).isoformat()
                    req["reason"] = reason
                    self._save_requests(reqs)
                    self._log("approval_denied", req)
                    return True
        return False

    def check(self, req_id: str) -> dict:
        reqs = self._load_requests()
        for req in reqs:
            if req["id"] == req_id:
                return req
        return None

    def list_pending(self) -> list:
        reqs = self._load_requests()
        return [r for r in reqs if r["status"] == "pending"]

    def can_proceed(self, agent: str, action: str) -> dict:
        """Quick check: can this agent do this action right now?"""
        tier = self.classify_action(action)
        if tier == "green":
            return {"allowed": True, "tier": tier, "reason": "Auto-approved"}
        return {
            "allowed": False,
            "tier": tier,
            "reason": f"Requires {TIERS[tier]['approver']} approval",
            "next_step": "Submit approval request"
        }

    def _log(self, event: str, req: dict):
        log_file = LOGS_DIR / "approvals.jsonl"
        log_file.parent.mkdir(parents=True, exist_ok=True)
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "event": event,
            "req_id": req["id"],
            "agent": req["agent"],
            "action": req["action"],
            "tier": req["tier"],
            "status": req["status"]
        }
        with open(log_file, "a") as f:
            f.write(json.dumps(entry) + "\n")


def main():
    parser = argparse.ArgumentParser(description="OPENCLAW Approval System")
    sub = parser.add_subparsers(dest="command")

    r = sub.add_parser("request", help="Request approval")
    r.add_argument("--agent", required=True)
    r.add_argument("--action", required=True)
    r.add_argument("--tier", choices=["green", "yellow", "orange", "red"])
    r.add_argument("--details", default="")

    c = sub.add_parser("check", help="Check request status")
    c.add_argument("--id", required=True)

    a = sub.add_parser("approve", help="Approve request")
    a.add_argument("--id", required=True)
    a.add_argument("--by", required=True)
    a.add_argument("--reason", default="")

    d = sub.add_parser("deny", help="Deny request")
    d.add_argument("--id", required=True)
    d.add_argument("--by", required=True)
    d.add_argument("--reason", required=True)

    sub.add_parser("list", help="List pending requests")

    sub.add_parser("policy", help="Show approval policy")

    q = sub.add_parser("can", help="Quick check if action allowed")
    q.add_argument("--agent", required=True)
    q.add_argument("--action", required=True)

    args = parser.parse_args()
    system = ApprovalSystem()

    if args.command == "request":
        req = system.request_approval(args.agent, args.action, args.tier, args.details)
        tier_icon = {"green": "🟢", "yellow": "🟡", "orange": "🟠", "red": "🔴"}.get(req["tier"], "⚪")
        status_icon = "✅" if req["status"] == "approved" else "⏳"
        print(f"{tier_icon} {status_icon} [{req['id']}] {req['agent']}: {req['action']} → {req['status']}")

    elif args.command == "check":
        req = system.check(args.id)
        if req:
            print(json.dumps(req, indent=2))
        else:
            print(f"❌ Not found: {args.id}")

    elif args.command == "approve":
        if system.approve(args.id, args.by, args.reason):
            print(f"✅ Approved by {args.by}")
        else:
            print(f"❌ Not found: {args.id}")

    elif args.command == "deny":
        if system.deny(args.id, args.by, args.reason):
            print(f"❌ Denied by {args.by}: {args.reason}")
        else:
            print(f"❌ Not found: {args.id}")

    elif args.command == "list":
        pending = system.list_pending()
        if not pending:
            print("📭 No pending approvals")
        else:
            for req in pending:
                tier_icon = {"green": "🟢", "yellow": "🟡", "orange": "🟠", "red": "🔴"}.get(req["tier"], "⚪")
                print(f"  {tier_icon} [{req['id']}] {req['agent']}: {req['action']}")

    elif args.command == "policy":
        for tier_id, tier in TIERS.items():
            icon = {"green": "🟢", "yellow": "🟡", "orange": "🟠", "red": "🔴"}.get(tier_id, "⚪")
            print(f"\n{icon} {tier['name']} ({tier_id})")
            print(f"   Approver: {tier['approver']}")
            print(f"   {tier['description']}")
            print(f"   Examples: {', '.join(tier['examples'])}")

    elif args.command == "can":
        result = system.can_proceed(args.agent, args.action)
        icon = "✅" if result["allowed"] else "🚫"
        print(f"{icon} {result['reason']} (tier: {result['tier']})")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
