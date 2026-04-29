# Archive Manifest — 2026-04-26 shadow daemons
## lmstudio-proxy.mjs
- Original: ~/Desktop/OPENCLAW/scripts/lmstudio-proxy.mjs
- Reason: shadow LLM proxy not referenced in ~/.openclaw/openclaw.json. Official Gateway (pid 19151, ws://127.0.0.1:18789) is canonical local LLM transport.
- Verified unreferenced: grep -i lmstudio ~/.openclaw/openclaw.json -> no matches.
- Restore: mv back to ~/Desktop/OPENCLAW/scripts/ then `node lmstudio-proxy.mjs`.
- Note: a copy may still be running in memory under the prior path. Archiving the source prevents future re-launch from launchd or dev workflows; the running PID was not killed by this audit (out of scope for file-move archive).
- Risk: Green (file move only, no config edit).
