#!/usr/bin/env python3
"""
OPENCLAW CRM — Lead scoring, pipeline tracking, and outreach management.
Agents use this via shell: python3 scripts/crm.py <command> [args]

Commands:
  add-lead       Add a prospect lead
  score-lead     Score/re-score a lead
  list-leads     List leads by stage or score
  advance        Move a lead to next pipeline stage
  log-action     Log an action taken on a lead
  report         Generate pipeline summary
  search         Search leads by keyword
"""

import sqlite3
import json
import sys
import os
import hashlib
from datetime import datetime, timezone
from email_ledger import ensure_schema as ensure_email_ledger_schema, summary as email_ledger_summary

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'crm.sqlite')

def get_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=WAL")
    db.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT NOT NULL DEFAULT 'unknown',
            source TEXT DEFAULT '',
            stage TEXT NOT NULL DEFAULT 'prospect',
            score INTEGER DEFAULT 0,
            tags TEXT DEFAULT '[]',
            contact_info TEXT DEFAULT '{}',
            notes TEXT DEFAULT '',
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            assigned_agent TEXT DEFAULT '',
            metadata TEXT DEFAULT '{}'
        )
    """)
    db.execute("""
        CREATE TABLE IF NOT EXISTS actions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lead_id TEXT NOT NULL,
            agent TEXT NOT NULL,
            action_type TEXT NOT NULL,
            description TEXT NOT NULL,
            result TEXT DEFAULT '',
            created_at TEXT NOT NULL,
            FOREIGN KEY (lead_id) REFERENCES leads(id)
        )
    """)
    db.execute("""
        CREATE TABLE IF NOT EXISTS scoring_criteria (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            weight INTEGER DEFAULT 1,
            description TEXT DEFAULT ''
        )
    """)
    ensure_email_ledger_schema(db)
    # Seed default scoring criteria if empty
    cursor = db.execute("SELECT COUNT(*) FROM scoring_criteria")
    if cursor.fetchone()[0] == 0:
        criteria = [
            ('budget_fit', 'Budget Fit', 3, 'Client budget matches our service range ($500-$5000)'),
            ('urgency', 'Urgency', 2, 'Client needs work done soon (within 2 weeks)'),
            ('clarity', 'Project Clarity', 2, 'Client has clear requirements and scope'),
            ('reachability', 'Reachability', 1, 'Can we easily contact them (email, platform DM)'),
            ('repeat_potential', 'Repeat Potential', 2, 'Likely to need ongoing work'),
            ('portfolio_value', 'Portfolio Value', 1, 'Would this make a good portfolio piece'),
            ('competition', 'Low Competition', 1, 'Few other freelancers competing for this'),
            ('tech_match', 'Tech Stack Match', 3, 'We have the skills for this project'),
        ]
        db.executemany(
            "INSERT INTO scoring_criteria (id, name, weight, description) VALUES (?,?,?,?)",
            criteria
        )
    db.commit()
    return db

# Pipeline stages in order
STAGES = ['prospect', 'researched', 'scored', 'outreach_drafted', 'outreach_sent', 'responded', 'negotiating', 'won', 'lost', 'archived']

def gen_id(name, source):
    return hashlib.md5(f"{name}:{source}".encode()).hexdigest()[:12]

def now():
    return datetime.now(timezone.utc).isoformat()

def cmd_add_lead(args):
    """Add a new lead. Usage: add-lead <name> <type> [--source src] [--contact json] [--notes text] [--tags tag1,tag2] [--agent agent_name]"""
    if len(args) < 2:
        print("Usage: add-lead <name> <type> [--source src] [--contact '{...}'] [--notes text] [--tags tag1,tag2]")
        sys.exit(1)
    
    name = args[0]
    lead_type = args[1]
    source = ''
    contact_info = '{}'
    notes = ''
    tags = '[]'
    agent = ''
    
    i = 2
    while i < len(args):
        if args[i] == '--source' and i+1 < len(args):
            source = args[i+1]; i += 2
        elif args[i] == '--contact' and i+1 < len(args):
            contact_info = args[i+1]; i += 2
        elif args[i] == '--notes' and i+1 < len(args):
            notes = args[i+1]; i += 2
        elif args[i] == '--tags' and i+1 < len(args):
            tags = json.dumps(args[i+1].split(',')); i += 2
        elif args[i] == '--agent' and i+1 < len(args):
            agent = args[i+1]; i += 2
        else:
            i += 1
    
    db = get_db()
    lead_id = gen_id(name, source)
    ts = now()
    
    try:
        db.execute("""
            INSERT INTO leads (id, name, type, source, stage, tags, contact_info, notes, created_at, updated_at, assigned_agent)
            VALUES (?, ?, ?, ?, 'prospect', ?, ?, ?, ?, ?, ?)
        """, (lead_id, name, lead_type, source, tags, contact_info, notes, ts, ts, agent))
        db.commit()
        print(json.dumps({"status": "created", "id": lead_id, "name": name, "stage": "prospect"}))
    except sqlite3.IntegrityError:
        print(json.dumps({"status": "exists", "id": lead_id, "name": name}))

def cmd_score_lead(args):
    """Score a lead. Usage: score-lead <lead_id> <criteria_id>=<1-10> [criteria_id=score ...]"""
    if len(args) < 2:
        print("Usage: score-lead <lead_id> budget_fit=8 urgency=6 clarity=7 ...")
        sys.exit(1)
    
    lead_id = args[0]
    db = get_db()
    
    lead = db.execute("SELECT * FROM leads WHERE id=?", (lead_id,)).fetchone()
    if not lead:
        print(json.dumps({"error": f"Lead {lead_id} not found"}))
        sys.exit(1)
    
    criteria = {r['id']: r for r in db.execute("SELECT * FROM scoring_criteria").fetchall()}
    
    scores = {}
    for arg in args[1:]:
        if '=' in arg:
            cid, val = arg.split('=', 1)
            if cid in criteria:
                scores[cid] = min(10, max(0, int(val)))
    
    # Weighted score calculation
    total_score = 0
    max_possible = 0
    breakdown = {}
    for cid, crit in criteria.items():
        raw = scores.get(cid, 0)
        weighted = raw * crit['weight']
        total_score += weighted
        max_possible += 10 * crit['weight']
        breakdown[cid] = {"raw": raw, "weight": crit['weight'], "weighted": weighted}
    
    # Normalize to 0-100
    normalized = round((total_score / max_possible) * 100) if max_possible > 0 else 0
    
    metadata = json.loads(lead['metadata']) if lead['metadata'] else {}
    metadata['score_breakdown'] = breakdown
    metadata['score_raw'] = total_score
    metadata['score_max'] = max_possible
    metadata['scored_at'] = now()
    
    db.execute("UPDATE leads SET score=?, stage='scored', metadata=?, updated_at=? WHERE id=?",
               (normalized, json.dumps(metadata), now(), lead_id))
    db.commit()
    
    priority = "🔴 HOT" if normalized >= 70 else "🟡 WARM" if normalized >= 40 else "🔵 COLD"
    print(json.dumps({
        "id": lead_id, "name": lead['name'], "score": normalized,
        "priority": priority, "breakdown": breakdown
    }, indent=2))

def cmd_list_leads(args):
    """List leads. Usage: list-leads [--stage stage] [--min-score N] [--agent name] [--limit N]"""
    db = get_db()
    query = "SELECT * FROM leads WHERE 1=1"
    params = []
    
    i = 0
    limit = 20
    while i < len(args):
        if args[i] == '--stage' and i+1 < len(args):
            query += " AND stage=?"; params.append(args[i+1]); i += 2
        elif args[i] == '--min-score' and i+1 < len(args):
            query += " AND score>=?"; params.append(int(args[i+1])); i += 2
        elif args[i] == '--agent' and i+1 < len(args):
            query += " AND assigned_agent=?"; params.append(args[i+1]); i += 2
        elif args[i] == '--limit' and i+1 < len(args):
            limit = int(args[i+1]); i += 2
        else:
            i += 1
    
    query += " ORDER BY score DESC LIMIT ?"
    params.append(limit)
    
    leads = [dict(r) for r in db.execute(query, params).fetchall()]
    
    if not leads:
        print(json.dumps({"leads": [], "count": 0}))
        return
    
    for lead in leads:
        actions = db.execute("SELECT COUNT(*) as cnt FROM actions WHERE lead_id=?", (lead['id'],)).fetchone()
        lead['action_count'] = actions['cnt']
        priority = "🔴 HOT" if lead['score'] >= 70 else "🟡 WARM" if lead['score'] >= 40 else "🔵 COLD"
        lead['priority'] = priority
    
    print(json.dumps({"leads": leads, "count": len(leads)}, indent=2))

def cmd_advance(args):
    """Advance lead to next stage. Usage: advance <lead_id> [--to stage] [--agent name] [--reason text]"""
    if len(args) < 1:
        print("Usage: advance <lead_id> [--to stage] [--agent name]")
        sys.exit(1)
    
    lead_id = args[0]
    db = get_db()
    lead = db.execute("SELECT * FROM leads WHERE id=?", (lead_id,)).fetchone()
    if not lead:
        print(json.dumps({"error": f"Lead {lead_id} not found"}))
        sys.exit(1)
    
    target_stage = None
    agent = ''
    reason = ''
    i = 1
    while i < len(args):
        if args[i] == '--to' and i+1 < len(args):
            target_stage = args[i+1]; i += 2
        elif args[i] == '--agent' and i+1 < len(args):
            agent = args[i+1]; i += 2
        elif args[i] == '--reason' and i+1 < len(args):
            reason = args[i+1]; i += 2
        else:
            i += 1
    
    current_idx = STAGES.index(lead['stage']) if lead['stage'] in STAGES else 0
    if target_stage:
        if target_stage not in STAGES:
            print(json.dumps({"error": f"Invalid stage: {target_stage}", "valid": STAGES}))
            sys.exit(1)
        new_stage = target_stage
    else:
        if current_idx + 1 >= len(STAGES):
            print(json.dumps({"error": "Already at final stage"}))
            sys.exit(1)
        new_stage = STAGES[current_idx + 1]
    
    db.execute("UPDATE leads SET stage=?, updated_at=? WHERE id=?", (new_stage, now(), lead_id))
    
    if agent or reason:
        db.execute("""
            INSERT INTO actions (lead_id, agent, action_type, description, created_at)
            VALUES (?, ?, 'stage_change', ?, ?)
        """, (lead_id, agent or 'system', f"{lead['stage']} → {new_stage}: {reason}", now()))
    
    db.commit()
    print(json.dumps({"id": lead_id, "name": lead['name'], "from": lead['stage'], "to": new_stage}))

def cmd_log_action(args):
    """Log an action on a lead. Usage: log-action <lead_id> <agent> <type> <description> [--result text]"""
    if len(args) < 4:
        print("Usage: log-action <lead_id> <agent> <action_type> <description> [--result text]")
        sys.exit(1)
    
    lead_id, agent, action_type, description = args[0], args[1], args[2], args[3]
    result = ''
    if len(args) > 5 and args[4] == '--result':
        result = args[5]
    
    db = get_db()
    db.execute("""
        INSERT INTO actions (lead_id, agent, action_type, description, result, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (lead_id, agent, action_type, description, result, now()))
    db.commit()
    print(json.dumps({"status": "logged", "lead_id": lead_id, "action": action_type}))

def cmd_report(args):
    """Generate pipeline report."""
    db = get_db()
    
    # Stage counts
    stages = {}
    for row in db.execute("SELECT stage, COUNT(*) as cnt, AVG(score) as avg_score FROM leads GROUP BY stage"):
        stages[row['stage']] = {"count": row['cnt'], "avg_score": round(row['avg_score'] or 0)}
    
    # Top leads
    top = [dict(r) for r in db.execute("SELECT id, name, type, score, stage FROM leads ORDER BY score DESC LIMIT 5").fetchall()]
    
    # Recent actions
    recent = [dict(r) for r in db.execute("SELECT * FROM actions ORDER BY created_at DESC LIMIT 10").fetchall()]
    
    total = db.execute("SELECT COUNT(*) FROM leads").fetchone()[0]
    hot = db.execute("SELECT COUNT(*) FROM leads WHERE score >= 70").fetchone()[0]
    warm = db.execute("SELECT COUNT(*) FROM leads WHERE score >= 40 AND score < 70").fetchone()[0]
    
    report = {
        "total_leads": total,
        "hot_leads": hot,
        "warm_leads": warm,
        "pipeline": stages,
        "top_leads": top,
        "recent_actions": recent,
        "generated_at": now()
    }
    print(json.dumps(report, indent=2))

def cmd_search(args):
    """Search leads by keyword. Usage: search <query>"""
    if not args:
        print("Usage: search <query>")
        sys.exit(1)
    
    db = get_db()
    query = '%' + ' '.join(args) + '%'
    results = [dict(r) for r in db.execute(
        "SELECT * FROM leads WHERE name LIKE ? OR notes LIKE ? OR source LIKE ? ORDER BY score DESC LIMIT 10",
        (query, query, query)
    ).fetchall()]
    print(json.dumps({"results": results, "count": len(results)}, indent=2))

def cmd_criteria(args):
    """List scoring criteria."""
    db = get_db()
    criteria = [dict(r) for r in db.execute("SELECT * FROM scoring_criteria ORDER BY weight DESC").fetchall()]
    print(json.dumps(criteria, indent=2))

def cmd_email_ledger(args):
    """Report email attempt ledger. Usage: email-ledger [--limit N]"""
    db = get_db()
    data = email_ledger_summary(db)
    limit = 20
    i = 0
    while i < len(args):
        if args[i] == '--limit' and i + 1 < len(args):
            limit = int(args[i + 1])
            i += 2
        else:
            i += 1
    data["recent"] = data["recent"][:limit]
    print(json.dumps(data, indent=2))

COMMANDS = {
    'add-lead': cmd_add_lead,
    'score-lead': cmd_score_lead,
    'list-leads': cmd_list_leads,
    'advance': cmd_advance,
    'log-action': cmd_log_action,
    'report': cmd_report,
    'search': cmd_search,
    'criteria': cmd_criteria,
    'email-ledger': cmd_email_ledger,
}

if __name__ == '__main__':
    if len(sys.argv) < 2 or sys.argv[1] not in COMMANDS:
        print(__doc__)
        print(f"\nAvailable commands: {', '.join(COMMANDS.keys())}")
        print(f"\nPipeline stages: {' → '.join(STAGES)}")
        sys.exit(0)
    
    COMMANDS[sys.argv[1]](sys.argv[2:])
