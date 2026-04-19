#!/usr/bin/env python3
"""
OPENCLAW Agent Decision Protocol — Structured handoff and decision tracking.
Agents use this to propose, vote on, and execute decisions as a group.

Commands:
  propose     Submit a decision proposal
  vote        Cast a vote on a proposal
  decide      Finalize a decision (auto or manual)
  list        List active proposals
  history     Show decision history
  handoff     Create a structured task handoff between agents
  status      Show current handoffs and their status
"""

import sqlite3
import json
import sys
import os
import hashlib
from datetime import datetime, timezone

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'decisions.sqlite')

def get_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=WAL")
    db.execute("""
        CREATE TABLE IF NOT EXISTS proposals (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            proposed_by TEXT NOT NULL,
            category TEXT DEFAULT 'general',
            urgency TEXT DEFAULT 'normal',
            options TEXT DEFAULT '[]',
            votes TEXT DEFAULT '{}',
            status TEXT DEFAULT 'open',
            decision TEXT DEFAULT '',
            reasoning TEXT DEFAULT '',
            created_at TEXT NOT NULL,
            decided_at TEXT DEFAULT '',
            metadata TEXT DEFAULT '{}'
        )
    """)
    db.execute("""
        CREATE TABLE IF NOT EXISTS handoffs (
            id TEXT PRIMARY KEY,
            from_agent TEXT NOT NULL,
            to_agent TEXT NOT NULL,
            task_type TEXT NOT NULL,
            title TEXT NOT NULL,
            context TEXT DEFAULT '',
            deliverables TEXT DEFAULT '[]',
            constraints TEXT DEFAULT '[]',
            deadline TEXT DEFAULT '',
            status TEXT DEFAULT 'pending',
            result TEXT DEFAULT '',
            created_at TEXT NOT NULL,
            completed_at TEXT DEFAULT '',
            quality_score INTEGER DEFAULT 0
        )
    """)
    db.commit()
    return db

def now():
    return datetime.now(timezone.utc).isoformat()

def gen_id(text):
    return hashlib.md5(f"{text}:{now()}".encode()).hexdigest()[:10]

def cmd_propose(args):
    """Submit a proposal. Usage: propose <title> --by <agent> --desc <text> [--options 'opt1,opt2'] [--urgency low|normal|high|critical] [--category cat]"""
    if len(args) < 1:
        print("Usage: propose <title> --by <agent> --desc <description> [--options 'a,b,c'] [--urgency normal] [--category general]")
        sys.exit(1)
    
    title = args[0]
    by = ''; desc = ''; options = []; urgency = 'normal'; category = 'general'
    
    i = 1
    while i < len(args):
        if args[i] == '--by' and i+1 < len(args):
            by = args[i+1]; i += 2
        elif args[i] == '--desc' and i+1 < len(args):
            desc = args[i+1]; i += 2
        elif args[i] == '--options' and i+1 < len(args):
            options = args[i+1].split(','); i += 2
        elif args[i] == '--urgency' and i+1 < len(args):
            urgency = args[i+1]; i += 2
        elif args[i] == '--category' and i+1 < len(args):
            category = args[i+1]; i += 2
        else:
            i += 1
    
    db = get_db()
    pid = gen_id(title)
    
    db.execute("""
        INSERT INTO proposals (id, title, description, proposed_by, category, urgency, options, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'open', ?)
    """, (pid, title, desc, by, category, urgency, json.dumps(options), now()))
    db.commit()
    
    print(json.dumps({"status": "proposed", "id": pid, "title": title, "urgency": urgency}))

def cmd_vote(args):
    """Vote on a proposal. Usage: vote <proposal_id> --by <agent> --choice <option> [--reason text]"""
    if len(args) < 1:
        print("Usage: vote <proposal_id> --by <agent> --choice <option> [--reason text]")
        sys.exit(1)
    
    pid = args[0]
    by = ''; choice = ''; reason = ''
    i = 1
    while i < len(args):
        if args[i] == '--by' and i+1 < len(args):
            by = args[i+1]; i += 2
        elif args[i] == '--choice' and i+1 < len(args):
            choice = args[i+1]; i += 2
        elif args[i] == '--reason' and i+1 < len(args):
            reason = args[i+1]; i += 2
        else:
            i += 1
    
    db = get_db()
    prop = db.execute("SELECT * FROM proposals WHERE id=?", (pid,)).fetchone()
    if not prop:
        print(json.dumps({"error": f"Proposal {pid} not found"}))
        sys.exit(1)
    
    votes = json.loads(prop['votes'])
    votes[by] = {"choice": choice, "reason": reason, "at": now()}
    
    db.execute("UPDATE proposals SET votes=? WHERE id=?", (json.dumps(votes), pid))
    db.commit()
    
    print(json.dumps({"status": "voted", "proposal": pid, "voter": by, "choice": choice, "total_votes": len(votes)}))

def cmd_decide(args):
    """Finalize a decision. Usage: decide <proposal_id> [--choice option] [--reasoning text]"""
    if len(args) < 1:
        print("Usage: decide <proposal_id> [--choice option] [--reasoning text]")
        sys.exit(1)
    
    pid = args[0]
    choice = ''; reasoning = ''
    i = 1
    while i < len(args):
        if args[i] == '--choice' and i+1 < len(args):
            choice = args[i+1]; i += 2
        elif args[i] == '--reasoning' and i+1 < len(args):
            reasoning = args[i+1]; i += 2
        else:
            i += 1
    
    db = get_db()
    prop = db.execute("SELECT * FROM proposals WHERE id=?", (pid,)).fetchone()
    if not prop:
        print(json.dumps({"error": f"Proposal {pid} not found"}))
        sys.exit(1)
    
    votes = json.loads(prop['votes'])
    
    # Auto-decide by majority if no explicit choice
    if not choice and votes:
        tally = {}
        for v in votes.values():
            c = v['choice']
            tally[c] = tally.get(c, 0) + 1
        choice = max(tally, key=tally.get)
        reasoning = f"Majority vote: {json.dumps(tally)}"
    
    db.execute("""
        UPDATE proposals SET status='decided', decision=?, reasoning=?, decided_at=? WHERE id=?
    """, (choice, reasoning, now(), pid))
    db.commit()
    
    print(json.dumps({
        "status": "decided", "proposal": pid, "decision": choice,
        "reasoning": reasoning, "votes": votes
    }, indent=2))

def cmd_list(args):
    """List proposals. Usage: list [--status open|decided|all]"""
    status = 'open'
    if len(args) >= 2 and args[0] == '--status':
        status = args[1]
    
    db = get_db()
    if status == 'all':
        rows = db.execute("SELECT * FROM proposals ORDER BY created_at DESC LIMIT 20").fetchall()
    else:
        rows = db.execute("SELECT * FROM proposals WHERE status=? ORDER BY created_at DESC LIMIT 20", (status,)).fetchall()
    
    proposals = []
    for r in rows:
        p = dict(r)
        p['votes'] = json.loads(p['votes'])
        p['options'] = json.loads(p['options'])
        p['vote_count'] = len(p['votes'])
        proposals.append(p)
    
    print(json.dumps({"proposals": proposals, "count": len(proposals)}, indent=2))

def cmd_handoff(args):
    """Create a handoff. Usage: handoff <title> --from <agent> --to <agent> --type <type> --context <text> [--deliverables 'a,b'] [--constraints 'x,y']"""
    if len(args) < 1:
        print("Usage: handoff <title> --from <agent> --to <agent> --type <type> --context <text>")
        sys.exit(1)
    
    title = args[0]
    from_a = ''; to_a = ''; task_type = ''; context = ''
    deliverables = []; constraints = []
    
    i = 1
    while i < len(args):
        if args[i] == '--from' and i+1 < len(args):
            from_a = args[i+1]; i += 2
        elif args[i] == '--to' and i+1 < len(args):
            to_a = args[i+1]; i += 2
        elif args[i] == '--type' and i+1 < len(args):
            task_type = args[i+1]; i += 2
        elif args[i] == '--context' and i+1 < len(args):
            context = args[i+1]; i += 2
        elif args[i] == '--deliverables' and i+1 < len(args):
            deliverables = args[i+1].split(','); i += 2
        elif args[i] == '--constraints' and i+1 < len(args):
            constraints = args[i+1].split(','); i += 2
        else:
            i += 1
    
    db = get_db()
    hid = gen_id(title)
    
    db.execute("""
        INSERT INTO handoffs (id, from_agent, to_agent, task_type, title, context, deliverables, constraints, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    """, (hid, from_a, to_a, task_type, title, context, json.dumps(deliverables), json.dumps(constraints), now()))
    db.commit()
    
    print(json.dumps({"status": "created", "id": hid, "from": from_a, "to": to_a, "title": title}))

def cmd_complete_handoff(args):
    """Complete a handoff. Usage: complete <handoff_id> --result <text> [--quality 1-10]"""
    if len(args) < 1:
        print("Usage: complete <handoff_id> --result <text> [--quality 1-10]")
        sys.exit(1)
    
    hid = args[0]
    result = ''; quality = 0
    i = 1
    while i < len(args):
        if args[i] == '--result' and i+1 < len(args):
            result = args[i+1]; i += 2
        elif args[i] == '--quality' and i+1 < len(args):
            quality = int(args[i+1]); i += 2
        else:
            i += 1
    
    db = get_db()
    db.execute("""
        UPDATE handoffs SET status='completed', result=?, quality_score=?, completed_at=? WHERE id=?
    """, (result, quality, now(), hid))
    db.commit()
    print(json.dumps({"status": "completed", "handoff": hid, "quality": quality}))

def cmd_status(args):
    """Show handoff status."""
    db = get_db()
    pending = [dict(r) for r in db.execute("SELECT * FROM handoffs WHERE status='pending' ORDER BY created_at DESC LIMIT 10").fetchall()]
    active = [dict(r) for r in db.execute("SELECT * FROM handoffs WHERE status='in_progress' ORDER BY created_at DESC LIMIT 10").fetchall()]
    completed = [dict(r) for r in db.execute("SELECT * FROM handoffs WHERE status='completed' ORDER BY completed_at DESC LIMIT 5").fetchall()]
    
    print(json.dumps({"pending": pending, "active": active, "recent_completed": completed}, indent=2))

def cmd_history(args):
    """Show decision history."""
    db = get_db()
    decisions = [dict(r) for r in db.execute(
        "SELECT * FROM proposals WHERE status='decided' ORDER BY decided_at DESC LIMIT 20"
    ).fetchall()]
    for d in decisions:
        d['votes'] = json.loads(d['votes'])
        d['options'] = json.loads(d['options'])
    print(json.dumps(decisions, indent=2))

COMMANDS = {
    'propose': cmd_propose,
    'vote': cmd_vote,
    'decide': cmd_decide,
    'list': cmd_list,
    'history': cmd_history,
    'handoff': cmd_handoff,
    'complete': cmd_complete_handoff,
    'status': cmd_status,
}

if __name__ == '__main__':
    if len(sys.argv) < 2 or sys.argv[1] not in COMMANDS:
        print(__doc__)
        print(f"\nCommands: {', '.join(COMMANDS.keys())}")
        sys.exit(0)
    
    COMMANDS[sys.argv[1]](sys.argv[2:])
