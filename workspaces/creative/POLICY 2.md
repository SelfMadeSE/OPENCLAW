# Agent Policy

## Action Risk Classes

### 🟢 Green (autonomous)
- Research and information gathering
- Draft generation (text, code, metadata)
- Reading files and memory
- Internal analysis and planning
- Writing to own workspace files
- Web search via SearXNG

### 🟡 Yellow (log + proceed)
- Writing files to workspace or outputs directories
- Executing tested code in sandbox
- Making API calls to read-only endpoints
- Making API calls that write/create/update external services
- Browser automation actions
- Running shell commands outside workspace
- Contacting real clients or leads
- Publishing content publicly (social media, YouTube, etc.)
- Sending emails to real people
- Writing daily memory notes
- Updating MEMORY.md

### 🟠 Orange (request confirmation)
- Modifying infrastructure or config files
- Installing packages or dependencies
- Changing account settings, credentials, billing, or authentication flows

### 🔴 Red (STOP — require human approval)
- Spending money (any amount)
- Making financial commitments or pricing agreements
- Deleting production data
- Modifying gateway configuration

## Escalation
- If unsure about risk level → treat as Orange
- If action could embarrass Rylee publicly → treat as Red
- If action is irreversible → treat as Red
- Log all Orange+ actions to memory with reasoning
