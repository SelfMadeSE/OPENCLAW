#!/usr/bin/env python3
"""
Update CRM data with new outreach drafts
"""

import json
import os
from datetime import datetime, timezone

def load_crm_data():
    """Load the main CRM data file"""
    crm_path = "/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/crm_data.json"
    with open(crm_path, 'r') as f:
        return json.load(f)

def save_crm_data(data):
    """Save the updated CRM data"""
    crm_path = "/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/crm_data.json"
    with open(crm_path, 'w') as f:
        json.dump(data, f, indent=2)

def update_prospect_status(data, prospect_id, status, last_action):
    """Update a single prospect's status and last action"""
    if prospect_id in data['prospects']:
        data['prospects'][prospect_id]['status'] = status
        data['prospects'][prospect_id]['lastAction'] = last_action
        data['prospects'][prospect_id]['updated_at'] = datetime.now(timezone.utc).isoformat()
        print(f"✓ Updated {prospect_id}: {status}")
        return True
    else:
        print(f"✗ Prospect {prospect_id} not found")
        return False

def main():
    """Main function to update CRM with new drafts"""
    
    # Load current CRM data
    crm_data = load_crm_data()
    
    # Define the prospects to update
    prospects_to_update = [
        {
            'prospect_id': 'scaleflow-automation-20260423-140730',
            'status': 'drafted',
            'last_action': {
                'type': 'outreach_draft',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'draftLocation': 'artifacts/outreach-drafts/2026-04-24-hourly-outreach-drafts.md',
                'contactMethod': 'email',
                'notes': 'Personalized outreach email drafted highlighting Outbound Autonomy expertise for scaling their outbound sales efforts - leads with free website audit offer'
            }
        },
        {
            'prospect_id': 'nexus-creative-studio-20260423-140737', 
            'status': 'drafted',
            'last_action': {
                'type': 'outreach_draft',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'draftLocation': 'artifacts/outreach-drafts/2026-04-24-hourly-outreach-drafts.md',
                'contactMethod': 'email',
                'notes': 'Personalized outreach drafted focusing on converting creative excellence into automated growth with workflow automation and lead capture optimization'
            }
        },
        {
            'prospect_id': 'pixelforge-digital-20260423-140750',
            'status': 'drafted', 
            'last_action': {
                'type': 'outreach_draft',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'draftLocation': 'artifacts/outreach-drafts/2026-04-24-hourly-outreach-drafts.md',
                'contactMethod': 'email',
                'notes': 'Technical outreach drafted focusing on elevating capabilities beyond WordPress to handle complex web applications and advanced automation features'
            }
        }
    ]
    
    # Update each prospect
    success_count = 0
    for prospect in prospects_to_update:
        if update_prospect_status(crm_data, prospect['prospect_id'], prospect['status'], prospect['last_action']):
            success_count += 1
    
    # Update session info
    session_info = {
        'session_id': '210d6add-b9d4-45f3-8c90-b77191e95006',
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'task': 'Hourly Outreach Draft Queue',
        'emails_drafted': success_count,
        'total_revenue_potential': '$38K-75K initial + $6K-11K/month recurring',
        'priority_level': 'HIGH',
        'queue_status': 'DRAFTED - PENDING NEXUS/SENTINEL APPROVAL',
        'drafts_created': [
            'scaleflow-automation-20260423-140730',
            'nexus-creative-studio-20260423-140737', 
            'pixelforge-digital-20260423-140750'
        ]
    }
    
    # Add or update session info in CRM data
    crm_data['last_outreach_session'] = session_info
    crm_data['last_updated'] = datetime.now(timezone.utc).isoformat()
    crm_data['version'] = f"hourly-update-{datetime.now().strftime('%Y-%m-%d-%H%M')}"
    
    # Save updated CRM data
    save_crm_data(crm_data)
    
    print(f"\n✓ CRM update completed: {success_count} prospects updated")
    print(f"✓ Session info updated: {session_info['session_id']}")
    print(f"✓ Queue status: {session_info['queue_status']}")

if __name__ == "__main__":
    main()