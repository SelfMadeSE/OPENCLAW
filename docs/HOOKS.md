# Hooks Reference

Hooks are the official extensibility seam between the gateway and per-agent runtime. Configured in `~/.openclaw/openclaw.json` under `hooks.internal.entries`.

## Currently enabled

| Hook | Purpose | Side effects |
|---|---|---|
| `command-logger` | Captures every tool/sub-agent invocation per session | Appends to per-session command log |
| `session-memory` | Writes session-scoped memory entries | Memory plugin stores them; auditor reads on consolidation |
| `bootstrap-extra-files` | On agent boot, ensures workspace has required files (BOOT, IDENTITY, MEMORY, etc.) | May create missing skeleton files |
| `boot-md` | Renders BOOT.md as the agent's first system context | Determines initial behavior tone |

## Authentication
- `hooks.enabled: true`
- `hooks.token`: shared secret consumed by hook callers (do not commit)

## Hook order (boot)
1. `bootstrap-extra-files` (ensure files exist)
2. `boot-md` (load boot context)
3. `session-memory` (warm short-term memory)
4. `command-logger` (begin recording)

## Adding a hook
1. Define in `hooks.internal.entries` with `name`, `enabled`, optional config
2. Hot-reload picks it up; verify with `openclaw doctor`
3. Document here

## Custom hooks (none yet)
Reserved namespace: `hooks.external.entries`. Wire only after auditing — external hooks have full per-agent context.
