#!/usr/bin/env python3
import json
from datetime import datetime, timezone

crm_path = "/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/crm_data.json"

with open(crm_path, 'r') as f:
    data = json.load(f)

now = datetime.now(timezone.utc).isoformat()

actions = [
    {
        'prospect_id': 'bug-man-inc-denver-pest-control-20260428-210429',
        'action': {
            'type': 'outreach_draft',
            'timestamp': now,
            'method': 'email (verified: denverpestcontrol@denverpestcontrol.com)',
            'status': 'drafted_queued',
            'draft_path': 'artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0220pm.md',
            'notes': 'Bug Man Inc. drafted. 30+ reviews with named techs but /contact/ 404. Page title says "Thornton CO" for Denver Metro business. No online booking. Score 78. RED - requires approval.'
        }
    },
    {
        'prospect_id': 'colorado-garage-door-service-20260428-220734',
        'action': {
            'type': 'outreach_draft',
            'timestamp': now,
            'method': 'email (verified: dj@cologaragedoor.com)',
            'status': 'drafted_queued',
            'draft_path': 'artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0220pm.md',
            'notes': 'Colorado Garage Door Service drafted. Denver\'s oldest (since 1974). /contact/ page 404. Emails only in schema markup, invisible to visitors. 323-char homepage. Score 85. RED - requires approval.'
        }
    },
    {
        'prospect_id': 'denver-tree-company-20260428-211036',
        'action': {
            'type': 'outreach_draft',
            'timestamp': now,
            'method': 'email (verified: info@denvertreecompany.com)',
            'status': 'drafted_queued',
            'draft_path': 'artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0220pm.md',
            'notes': 'Denver Tree Company drafted. Live audit 96/100 A grade. Zero social proof near CTAs. 8 images missing alt text. No online emergency booking despite 24/7 claim. Score 96/A. RED - requires approval.'
        }
    }
]

for entry in actions:
    pid = entry['prospect_id']
    action = entry['action']
    if pid in data['prospects']:
        if 'actions' not in data['prospects'][pid]:
            data['prospects'][pid]['actions'] = []
        data['prospects'][pid]['actions'].append(action)
        data['prospects'][pid]['status'] = 'outreach_drafted'
        data['prospects'][pid]['updated_at'] = now
        print(f"✓ Updated {pid}")
    else:
        print(f"✗ Prospect {pid} not found")

data['last_outreach_session'] = {
    'session_id': 'hourly-queue-0220pm-2026-04-28',
    'timestamp': now,
    'task': 'Hourly Outreach Draft Queue 2:20 PM MT — 3 emails drafted',
    'emails_drafted': 3,
    'priority_level': 'MEDIUM',
    'queue_status': 'RED — AWAITING RYLEE APPROVAL',
    'leads': [
        'bug-man-inc-denver-pest-control-20260428-210429',
        'colorado-garage-door-service-20260428-220734',
        'denver-tree-company-20260428-211036'
    ]
}
data['last_updated'] = now
data['version'] = '1.3'

with open(crm_path, 'w') as f:
    json.dump(data, f, indent=2)

print(f"\n✓ CRM updated: 3 prospects logged, session recorded")
