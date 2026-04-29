#!/usr/bin/env python3
"""
Update CRM data for 5:20 PM MT cycle — 3 new prospects drafted
"""
import json
from datetime import datetime, timezone

CRM_PATH = "/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/crm_data.json"

with open(CRM_PATH, 'r') as f:
    data = json.load(f)

now = datetime.now(timezone.utc).isoformat()
ts = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

updates = [
    {
        'id': 'arbortec-tree-service-20260428-213516',
        'action': {
            'type': 'outreach_draft',
            'timestamp': ts,
            'method': 'email (verified: info@arbortectree.com)',
            'status': 'drafted_queued',
            'draft_path': 'artifacts/outreach-drafts/2026-04-28-0520pm-CRM-actions.md',
            'notes': 'Audit 96/100 A grade. HIGH: /contact/ 404, zero forms across 5 pages. Established 1989, 20+ city service pages. Score 80 HOT.'
        }
    },
    {
        'id': 'colorado-garage-door-service-20260428-220734',
        'action': {
            'type': 'outreach_draft',
            'timestamp': ts,
            'method': 'email (verified: dj@cologaragedoor.com, dennis@cologaragedoor.com)',
            'status': 'drafted_queued',
            'draft_path': 'artifacts/outreach-drafts/2026-04-28-0520pm-CRM-actions.md',
            'notes': "Denver's oldest garage door co since 1974. /contact/ 404, ~300 content words, phone/email in schema only. 24/7 emergency with no booking. Score 85 HOT."
        }
    },
    {
        'id': 'truecoat-painters-20260429-011600',
        'action': {
            'type': 'outreach_draft',
            'timestamp': ts,
            'method': 'email (found: alissa@truepropartners.com in HTML — likely owner/manager)',
            'status': 'drafted_queued',
            'draft_path': 'artifacts/outreach-drafts/2026-04-28-0520pm-CRM-actions.md',
            'notes': 'Woman-owned Denver/Boulder painting co. No phone/email visible on site, form-only lead capture. Phone hidden in HTML. Score 82 HOT.'
        }
    }
]

for u in updates:
    pid = u['id']
    if pid in data['prospects']:
        if 'actions' not in data['prospects'][pid]:
            data['prospects'][pid]['actions'] = []
        data['prospects'][pid]['actions'].append(u['action'])
        data['prospects'][pid]['status'] = 'outreach_drafted'
        data['prospects'][pid]['updated_at'] = now
        print(f"✓ {pid} — action logged, status → outreach_drafted")
    else:
        print(f"✗ {pid} — NOT FOUND in CRM")
        # Try fuzzy match
        for key in data['prospects']:
            if pid.split('-2026')[0].replace('-', '') in key.replace('-', ''):
                print(f"  → Fuzzy match: {key}")
                if 'actions' not in data['prospects'][key]:
                    data['prospects'][key]['actions'] = []
                data['prospects'][key]['actions'].append(u['action'])
                data['prospects'][key]['status'] = 'outreach_drafted'
                data['prospects'][key]['updated_at'] = now
                print(f"  ✓ {key} — updated via fuzzy match")

# Update session info
data['last_outreach_session'] = {
    'session_id': '210d6add-b9d4-45f3-8c90-b77191e95006',
    'timestamp': now,
    'task': 'Hourly Outreach Draft Queue 5:20 PM MT — 3 new emails drafted',
    'emails_drafted': 3,
    'priority_level': 'HIGH',
    'queue_status': 'RED — AWAITING GMAIL APP PASSWORD RESET (535 5.7.8)',
    'leads': [
        'arbortec-tree-service-20260428-213516',
        'colorado-garage-door-service-20260428-220734',
        'truecoat-painters-20260429-011600'
    ]
}

data['last_updated'] = now
data['version'] = '1.3'

with open(CRM_PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"\n✓ CRM update complete — 3 prospects updated to outreach_drafted")
print(f"✓ File: crm_data.json")
