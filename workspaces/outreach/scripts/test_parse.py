#!/usr/bin/env python3
import re

with open('artifacts/outreach-drafts/2026-04-30-hourly-outreach-draft-queue-1220am.md') as f:
    content = f.read()

sections = re.split(r'\n## DRAFT \d+: ', content)

for i, section in enumerate(sections[1:], 1):
    lines = section.split('\n')
    name = lines[0].strip()
    print(f'--- DRAFT {i}: {name} ---')
    
    pid = re.search(r'\*\*Prospect ID:\*\*\s*`([^`]+)`', section)
    print(f'  Prospect ID: {pid.group(1) if pid else "MISSING"}')
    
    em = re.search(r'\*\*Email to:\*\*\s*`([^`]+)`', section)
    print(f'  Email to: {em.group(1) if em else "MISSING"}')
    
    subj = re.search(r'\n### Subject: (.+)', section)
    print(f'  Subject (\\n prefix): {subj.group(1).strip() if subj else "MISSING"}')
    
    # Look for any Subject line
    for line in lines:
        if 'Subject:' in line:
            print(f'  Subject line raw: {line}')
