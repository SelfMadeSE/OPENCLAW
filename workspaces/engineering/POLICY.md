# Agent Policy

## Action Risk Classes

### Green (autonomous)
- Research and information gathering
- Draft generation (text, code, metadata)
- Reading files and memory
- Internal analysis and planning

### Yellow (log + proceed)
- Writing files to workspace or outputs
- Executing tested code in sandbox
- Making API calls to read-only endpoints
- Sending internal agent messages

### Orange (request confirmation)
- Modifying infrastructure or config files
- Installing packages or dependencies
- Making API calls that write/create/update
- Generating content for public posting

### Red (escalate to Rylee)
- Spending money or committing to prices
- Sending emails or DMs to real people
- Posting content publicly
- Deleting files or data
- Modifying security settings
- Any action that cannot be undone

## Prohibited Actions
- Never commit secrets to files
- Never send credentials over unencrypted channels
- Never impersonate Rylee without explicit approval
- Never delete backups or version control history
- Never bypass the approval system

