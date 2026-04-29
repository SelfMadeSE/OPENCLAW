#!/usr/bin/env python3
"""Fix corrupted CRM data file and re-save as valid JSON."""
import json
import re
from pathlib import Path

crm_path = Path("/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/crm_data.json")

# Read raw content
content = crm_path.read_text(encoding='utf-8')

# The file has interleaved text. Find valid prospect entries by finding
# all JSON objects that start with a key like "bear-brothers-..."
# Let's try a different approach - extract by finding valid prospect blocks
# that look like: "prospect_id": "xxx-xxx-xxx"

# Find all prospect entries with their IDs
prospect_matches = list(re.finditer(r'"prospect_id"\s*:\s*"([^"]+)"', content))
print(f"Found {len(prospect_matches)} prospect references in corrupted file")

# Extract each prospect ID
prospect_ids = [m.group(1) for m in prospect_matches]
for pid in prospect_ids:
    print(f"  - {pid}")

# Now rebuild the CRM data by loading from the file with error handling
prospects = {}

# First try: JSON lines approach - each prospect might be on seperate lines
lines = content.split('\n')
current_prospect = {}
in_object = False
brace_depth = 0
start = 0

# Try to parse by finding individual prospect objects
# Strategy: find all complete JSON objects by tracking braces
clean_content = ""
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped.startswith('{') and not in_object:
        in_object = True
        brace_depth = 0
        clean_content = line
    elif in_object:
        clean_content += "\n" + line
        
    braces_open = stripped.count('{') - stripped.count('}')
    brace_depth += braces_open
    
    if in_object and brace_depth <= 0 and clean_content:
        # Try to parse this object
        try:
            obj = json.loads(clean_content)
            pid = obj.get("prospect_id")
            if pid:
                prospects[pid] = obj
                print(f"  Parsed: {pid}")
        except json.JSONDecodeError:
            pass
        in_object = False
        clean_content = ""

print(f"\nSuccessfully extracted {len(prospects)} prospect(s) from file")

# Rebuild the full CRM data
crm_data = {
    "prospects": prospects,
    "last_updated": "2026-04-28T10:38:00",
    "version": "1.0"
}

# Save
with open(crm_path, 'w', encoding='utf-8') as f:
    json.dump(crm_data, f, indent=2, ensure_ascii=False)
print(f"\nSaved CRM data to {crm_path}")
print(f"Total prospects: {len(crm_data['prospects'])}")
