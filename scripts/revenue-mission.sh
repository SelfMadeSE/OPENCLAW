#!/bin/bash
# OPENCLAW Revenue Mission — Autonomous daily revenue loop
# Fires agents one at a time (LM Studio single-thread) in the correct sequence.
# Each step has a timeout to prevent queue starvation.
#
# Usage: bash scripts/revenue-mission.sh [--step N]
# Steps: 1=plan 2=research 3=draft 4=content 5=audit
# Without --step, runs all steps in sequence.

set -euo pipefail
cd "$(dirname "$0")/.."

TIMEOUT=${OPENCLAW_STEP_TIMEOUT:-300}
LOG_DIR="data/revenue-logs"
mkdir -p "$LOG_DIR"
TODAY=$(date +%Y-%m-%d)
LOG="$LOG_DIR/$TODAY.log"

log() { echo "[$(date +%H:%M:%S)] $1" | tee -a "$LOG"; }

run_agent() {
    local agent="$1"
    local prompt="$2"
    local label="$3"
    
    log "▶ STEP: $label (agent=$agent, timeout=${TIMEOUT}s)"
    
    # Run with timeout, capture output
    local output
    output=$(timeout "$TIMEOUT" openclaw agent \
        --agent "$agent" \
        --message "$prompt" \
        --timeout "$TIMEOUT" 2>&1) || true
    
    echo "$output" >> "$LOG"
    
    # Extract last meaningful line
    local summary
    summary=$(echo "$output" | tail -5 | head -1)
    log "✓ DONE: $label — $summary"
}

# Step 1: Morning Planning
step_plan() {
    run_agent orchestrator \
        "DAILY REVENUE MISSION — $(date +%Y-%m-%d)

Review the current CRM pipeline:
\$(python3 scripts/crm.py report)

Review pending decisions:
\$(python3 scripts/agent-protocol.py list)

Review pending handoffs:
\$(python3 scripts/agent-protocol.py status)

Based on this state, plan today's priorities. Create handoffs for each agent with specific tasks.
Focus on moving leads through the pipeline toward revenue.
Save your plan to workspaces/orchestrator/artifacts/daily-plan-${TODAY}.md" \
        "Morning Planning"
}

# Step 2: Lead Research
step_research() {
    run_agent outreach \
        "DAILY LEAD RESEARCH — $(date +%Y-%m-%d)

Your job: Find and qualify new revenue leads.

1. Use web search to find 3-5 potential freelance opportunities:
   - Search for: web design freelance projects, small business websites needed, React developer needed
   - Focus on: Upwork, Fiverr, local business directories, Reddit hiring boards

2. For each lead found, add it to the CRM:
   python3 /Users/ryleebenson/Desktop/OPENCLAW/scripts/crm.py add-lead '<name>' '<type>' --source '<where found>' --notes '<details>' --tags '<tags>' --agent outreach

3. Score each new lead:
   python3 /Users/ryleebenson/Desktop/OPENCLAW/scripts/crm.py score-lead <id> budget_fit=N urgency=N clarity=N tech_match=N reachability=N repeat_potential=N

4. Write a research summary to workspaces/outreach/artifacts/research-${TODAY}.md

Focus on leads with realistic revenue potential." \
        "Lead Research"
}

# Step 3: Outreach Drafts
step_draft() {
    run_agent outreach \
        "OUTREACH DRAFTING — $(date +%Y-%m-%d)

Review top-scored leads:
python3 /Users/ryleebenson/Desktop/OPENCLAW/scripts/crm.py list-leads --min-score 40

For each lead scored 40+:
1. Draft a personalized outreach message / proposal
2. Save it to workspaces/outreach/artifacts/proposal-<lead_name>-${TODAY}.md
3. Advance the lead in CRM:
   python3 /Users/ryleebenson/Desktop/OPENCLAW/scripts/crm.py advance <id> --to outreach_drafted --agent outreach --reason 'Proposal drafted'
4. Log the action:
   python3 /Users/ryleebenson/Desktop/OPENCLAW/scripts/crm.py log-action <id> outreach draft 'Drafted initial proposal'

Make proposals professional, specific to the client's needs, and include:
- What we offer (relevant to their project)
- Rylee's relevant experience
- Proposed timeline and approach
- Pricing range appropriate to scope" \
        "Outreach Drafts"
}

# Step 4: Content Creation
step_content() {
    run_agent marketing \
        "DAILY CONTENT CREATION — $(date +%Y-%m-%d)

Create content that drives inbound leads:

1. Write a short LinkedIn-style post about AI automation for small businesses
   - Save to workspaces/marketing/artifacts/post-${TODAY}.md

2. Draft a YouTube video concept for one of these topics:
   - How AI can build websites for local businesses
   - Behind the scenes: autonomous AI agents at work
   - From beats to business: a producer's AI journey
   - Save to workspaces/marketing/artifacts/video-concept-${TODAY}.md

3. Generate 3 tweet/thread ideas about freelancing + AI
   - Save to workspaces/marketing/artifacts/social-${TODAY}.md

All content should be production-ready (not outlines). Write the actual post text." \
        "Content Creation"
}

# Step 5: Audit
step_audit() {
    run_agent auditor \
        "DAILY AUDIT — $(date +%Y-%m-%d)

Review today's outputs:

1. Check workspaces/outreach/artifacts/ for today's proposals
2. Check workspaces/marketing/artifacts/ for today's content
3. Check the CRM state: python3 /Users/ryleebenson/Desktop/OPENCLAW/scripts/crm.py report

For each artifact:
- Is it professional quality? (Would Rylee be proud to send this?)
- Is it factually accurate?
- Does it make realistic promises?
- Is pricing reasonable?
- Any red flags?

Write your audit to workspaces/auditor/artifacts/audit-${TODAY}.md

Include:
- PASS/FAIL for each artifact
- Specific issues found
- Recommendations
- Overall pipeline health assessment" \
        "Daily Audit"
}

# Main execution
STEP="${2:-all}"
case "${1:-all}" in
    --step)
        case "$STEP" in
            1|plan) step_plan ;;
            2|research) step_research ;;
            3|draft) step_draft ;;
            4|content) step_content ;;
            5|audit) step_audit ;;
            *) echo "Unknown step: $STEP (use 1-5 or plan/research/draft/content/audit)" ;;
        esac
        ;;
    all)
        log "🚀 STARTING FULL REVENUE MISSION"
        step_plan
        sleep 5
        step_research
        sleep 5
        step_draft
        sleep 5
        step_content
        sleep 5
        step_audit
        log "🏁 REVENUE MISSION COMPLETE"
        log ""
        log "=== PIPELINE STATUS ==="
        python3 scripts/crm.py report 2>&1 | tee -a "$LOG"
        ;;
esac
