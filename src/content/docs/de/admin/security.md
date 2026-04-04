---
title: Security
description: Permission profiles, access control, credential proxy, SSRF protection, LLM safety, and input validation.
---

CodeBuddy enforces security through six independent layers. Each layer operates independently, so a bypass at one level is caught by another.

## Permission profiles

The `PermissionScopeService` controls which tools the agent can access. Configure the active profile in settings or in `.codebuddy/permissions.json`:

| Profile        | Capabilities                                                                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **restricted** | Read-only. No terminal, no file writes, no browser. Only `read_file`, `search_files`, `list_files`, `search_vector_db`, `get_diagnostics`, `think`, `travily_search`, and similar read-only tools. |
| **standard**   | Read/write with safe terminal commands. Dangerous command patterns are blocked. **This is the default.**                                                                                           |
| **trusted**    | Full access with auto-approval for all operations.                                                                                                                                                 |

### Catastrophic command blocking

The following patterns are blocked in **all profiles**, including `trusted`:

| Category              | Pattern                                  |
| --------------------- | ---------------------------------------- |
| Destructive           | `rm -rf /`, `rmdir /`                    |
| Disk wipe             | `mkfs`, `dd of=/dev/`                    |
| Fork bomb             | `:(){ :\|: & };:`                        |
| Remote code execution | `curl ... \| bash`, `wget ... \| python` |
| Privilege escalation  | `chmod 777`, `chown root`                |
| Exfiltration          | `eval $...`                              |

### Custom permissions

Configure per-workspace in `.codebuddy/permissions.json`:

```json
{
  "profile": "standard",
  "commandDenyPatterns": ["docker rm", "kubectl delete namespace"],
  "toolAllowlist": [],
  "toolBlocklist": ["browser"]
}
```

- **Max pattern length**: 200 characters (ReDoS prevention)
- **Config file size limit**: 64 KB
- **Regex pre-compilation**: Patterns are compiled at load time for O(1) lookup

## Access control

The `AccessControlService` determines **who** can use the agent in team environments:

| Mode      | Behavior                                                    |
| --------- | ----------------------------------------------------------- |
| **open**  | No restrictions. Anyone can use the agent. Default.         |
| **allow** | Only users in the allow list can access the agent.          |
| **deny**  | Users in the deny list are blocked; all others are allowed. |

### Identity resolution

User identity is resolved from:

1. GitHub authentication (if available)
2. Git config (`user.email`)

Identity is cached with a **5-minute TTL**. Email format is validated against RFC patterns; GitHub usernames are validated as 1–39 alphanumeric/hyphen characters.

### Audit logging

All access decisions are logged to a **500-entry ring buffer** with throttled output (100ms minimum interval between log writes):

```typescript
interface AccessAuditEntry {
  timestamp: number;
  user: string;
  action: string;
  allowed: boolean;
}
```

## Credential proxy

For teams that need centralized API key management, the `CredentialProxyService` runs a localhost-only HTTP server:

- **Key injection** — API keys are stored in the OS keychain and injected into upstream requests. Keys never appear in logs, memory entries, or agent context.
- **Per-provider rate limiting** — Token bucket algorithm, configurable requests per minute per provider.
- **Security limits** — 10 MB request body limit, 5-minute upstream timeout, 30-second idle client timeout.
- **Audit trail** — 1,000-entry ring buffer logs every proxied request.
- **Session tokens** — Short-lived tokens issued per session via the `X-CodeBuddy-Session-Token` header.

```json
{
  "codebuddy.credentialProxy.enabled": true,
  "codebuddy.credentialProxy.rateLimit": 60
}
```

## SSRF protection

The `NavigationGuard` prevents server-side request forgery in browser automation:

- **Allowed protocols**: `http:` and `https:` only
- **Blocked addresses**: RFC 1918 private ranges, loopback (`127.x`, `::1`), link-local (`169.254.x`), IPv6 unique-local (`fc00::/7`), unspecified (`0.0.0.0`, `::`)
- **Encoding obfuscation detection**: Catches octal (`0177.0.0.1`), decimal (`2130706433`), and hex (`0x7f000001`) IP encodings
- **IPv6 mapped addresses**: Blocks `::ffff:10.x`, `::ffff:127.x`, `::ffff:192.168.x` (IPv4-mapped IPv6 private ranges)
- **Post-navigation DNS rebinding check**: Verifies the resolved IP after page load
- **Length limits**: Hostname ≤ 253, pathname ≤ 2,048, total URL ≤ 8,192 characters

## External security configuration

The `.codebuddy/security.json` file provides workspace-level security controls. It's loaded at activation and reloaded when the file changes.

### Schema

```json
{
  "allowedPaths": [
    {
      "path": "/shared/configs",
      "allowReadWrite": false,
      "description": "Read-only access to shared config files"
    }
  ],
  "commandDenyPatterns": [
    "docker\\s+system\\s+prune",
    "kubectl\\s+delete\\s+namespace"
  ],
  "networkAllowPatterns": ["^https://api\\.example\\.com"],
  "networkDenyPatterns": ["^https?://169\\.254\\.169\\.254"],
  "blockedPathPatterns": [".credentials", "secrets"]
}
```

### Fields

| Field                  | Type     | Description                                                                                                                                              |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedPaths`         | array    | Directories outside the workspace the agent may access. Each entry has `path`, `allowReadWrite` (default: false = read-only), and optional `description` |
| `commandDenyPatterns`  | string[] | Regex patterns merged with built-in blocked command patterns                                                                                             |
| `networkAllowPatterns` | string[] | If present, only matching URLs can be fetched (allowlist mode)                                                                                           |
| `networkDenyPatterns`  | string[] | URLs matching these patterns are always blocked (evaluated before allow)                                                                                 |
| `blockedPathPatterns`  | string[] | Path segments that are always blocked from directory reads                                                                                               |

### Default blocked paths

These path components are always blocked, even without a config file:

`.ssh` `.gnupg` `.gpg` `.aws` `.azure` `.gcloud` `.kube` `.docker` `credentials` `.netrc` `.npmrc` `.pypirc` `id_rsa` `id_ed25519` `id_ecdsa` `id_dsa` `private_key` `.secret` `.env` `.env.local` `.env.production` `.env.staging` `.env.development` `.token` `.htpasswd`

### Default network deny patterns

Always enforced regardless of config:

- `^https?://169.254.169.254` — AWS/GCP metadata endpoint (SSRF vector)
- `^https?://metadata.google.internal` — GCP metadata
- `^https?://0.0.0.0` — Localhost with credentials

### Limits

- Maximum **50 user-supplied patterns** per category (ReDoS prevention)
- Maximum **10,000 character** input length for regex testing
- Invalid regex patterns are logged as warnings and skipped (fail-open per pattern, fail-closed per category)

## LLM prompt injection defense

The `sanitizeForLLM()` function sanitizes all text before it reaches the model. It applies three layers:

1. **Unicode normalization** — NFKC normalization prevents homoglyph attacks
2. **Injection pattern redaction** — 15+ regex patterns replace malicious text with `[REDACTED]`
3. **Hard character cap** — 8,000 characters maximum per input

### Detected injection patterns

| Category                 | Example patterns                                                              |
| ------------------------ | ----------------------------------------------------------------------------- |
| **Instruction override** | "ignore previous instructions", "disregard all previous", "forget everything" |
| **Role hijacking**       | "you are now", "act as a jailbreak", "pretend you are"                        |
| **Special tokens**       | `[INST]`, `[/INST]`, `<\|im_start\|>`, `<\|im_end\|>`, `<\|endoftext\|>`      |
| **Structural markers**   | `system:`, `assistant:`, `human:`, `<system>`, `<prompt>`, `<instruction>`    |

All patterns use case-insensitive global matching and are applied in a single pass.

## Input validation

The `InputGuard` validates all parameters before they reach tools:

| Validation                   | Rule                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| Element references (browser) | Max 512 chars, null bytes/control chars/shell chars (`; \| & \` $ ( ) { } \\`) blocked |
| Keyboard keys                | `^[A-Za-z0-9+\-_]{1,64}$` — only alphanumeric and modifier symbols                     |
| File paths                   | Workspace boundary enforcement                                                         |
| URLs                         | Protocol and length validation via NavigationGuard                                     |

The ref validation uses a **blocklist** approach rather than an allowlist because Playwright's accessibility tree can emit refs with spaces, Unicode, and quotes for internationalized pages.

## Data privacy

- **Local by default** — All data (memory, checkpoints, logs, skills) stays on your disk
- **Direct API calls** — Requests go directly to your configured provider. No intermediary.
- **No telemetry** — No data is collected without explicit opt-in
- **Log isolation** — Logs are written to `.codebuddy/logs/` with a 1,000-entry circular buffer. Credentials are never logged.
