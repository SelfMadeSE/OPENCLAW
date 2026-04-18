# Nanobrowser — AI-Powered Web Automation

## What It Does
Chrome extension that lets your local LLM browse the web autonomously.
Multi-agent: Planner (decides strategy) + Navigator (executes on page).

## Install
1. Go to: https://github.com/nanobrowser/nanobrowser
2. Download from Chrome Web Store (or load unpacked from repo)
3. Click the Nanobrowser icon in Chrome extensions

## Configure LM Studio
In Nanobrowser settings:
- API Base URL: http://localhost:1234/v1
- API Key: sk-lm-lTx6H171:rNxT8R8M7ptHEyiQUU47
- Planner Model: qwen3.5-27b-claude-4.6-opus-reasoning-distilled
- Navigator Model: qwen/qwen3.5-9b

## Example Tasks
### Upwork Lead Research
"Go to upwork.com/freelance-jobs and find all web design jobs posted in the last 24 hours. 
Extract: job title, budget, client description. Save as a list."

### Fiverr Market Research  
"Search fiverr.com for '3D animation' services. List the top 10 gigs, their prices, 
and what makes them successful."

### Music Blog Outreach
"Search Google for 'hip hop music blogs submit beats 2025'. 
Visit the first 5 results. Find their submission contact email or form URL."

### YouTube Research
"Go to youtube.com and search 'trap beats 2025'. 
List the top 10 video titles, view counts, and channel names."

## Tips
- Use the Planner model for complex multi-step tasks
- Navigator handles the actual clicking/scrolling
- Tasks run in your current Chrome tab
- Save results to clipboard or a text file
