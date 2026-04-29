# TOOLS.md - Local Notes

**⚠️ RECEPTIONIST/TELEPHONY KILLED 2026-04-26. OA is URL → audit → build/improve only.**
Twilio references below are internal infrastructure notes only (these credentials may exist for other uses). OA does NOT offer Twilio, telephony, or phone-answering services.

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## n8n (Workflow Automation)

- **MCP Server**: `n8n-mcp` (configured in mcporter + openclaw config)
- **Instance**: https://outboundautonomy.app.n8n.cloud
- **Access**: Use `mcporter call n8n-mcp.<tool_name>` or the mcporter skill directly
- **Available tools** (25 total): `search_workflows`, `execute_workflow`, `get_execution`, `get_workflow_details`, `create_workflow_from_code`, `validate_workflow`, `search_data_tables`, `add_data_table_rows`, and more
- **Use for**: Triggering outreach sequences, Stripe payment workflows, ~~Twilio SMS/voice~~, email automation, lead processing

## External Service Credentials

All credentials are injected as environment variables by the gateway:
- `STRIPE_PK_TEST` / `STRIPE_SK_TEST` — Stripe test keys
- `STRIPE_PK_LIVE` / `STRIPE_SK_LIVE` — Stripe live keys ⚠️ production
- ~~`TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` (+15709894873)~~ — **KILLED 2026-04-26**
- `GITHUB_PAT` — GitHub personal access token
- `GMAIL_ADDRESS` / `GMAIL_PASSWORD` — owner@outboundautonomy.com

---

Add whatever helps you do your job. This is your cheat sheet.
