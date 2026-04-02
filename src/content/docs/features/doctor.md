---
title: Doctor
description: 9 automated diagnostic checks for security config, MCP, credentials, permissions, and more.
---

The Doctor is CodeBuddy's built-in diagnostics engine. It runs 9 modular checks against your workspace configuration and reports findings with severity levels, actionable descriptions, and auto-fix support.

## Running Doctor

```
CodeBuddy: Run Doctor
```

Doctor results appear in the **CodeBuddy Doctor** output channel and update a status bar indicator.

## Checks

| Check                     | What it validates                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| **API Key Audit**         | Keys exist in SecretStorage, aren't placeholders, no leaked keys in settings.json           |
| **Input Validator**       | Input guard patterns are functional and cover browser refs + keyboard keys                  |
| **Terminal Restrictions** | Blocked command patterns are compiled and cover catastrophic operations                     |
| **Directory Permissions** | Workspace directory exists, is readable/writable, `.codebuddy/` dir is accessible           |
| **MCP Config**            | MCP server entries are well-formed, commands exist, env vars are set                        |
| **Security Config**       | `.codebuddy/security.json` loads without errors, regex patterns compile, no invalid entries |
| **Credential Proxy**      | If enabled, proxy is reachable and session tokens are valid                                 |
| **Permission Scope**      | Active profile is valid, custom deny patterns compile, tool allow/blocklists are consistent |
| **Access Control**        | Mode is valid, user lists are non-empty when required, identity resolution works            |

## Severity levels

| Severity     | Meaning                                                        | Icon |
| ------------ | -------------------------------------------------------------- | ---- |
| **Critical** | Blocks agent functionality or exposes a security vulnerability | 🔴   |
| **Warn**     | Non-blocking but may cause unexpected behavior                 | 🟡   |
| **Info**     | Suggestion for improvement                                     | 🔵   |

Findings are sorted critical → warn → info.

## Auto-fix

Some findings include an auto-fix. Run all available fixes at once:

```
CodeBuddy: Doctor Auto-Fix
```

Auto-fixable issues include:

- Creating missing `.codebuddy/` directories
- Generating starter `security.json` or `permissions.json` files
- Removing placeholder API keys from settings

## Status bar

The Doctor status bar item shows a summary after each run:

- **✓** — No issues found
- **⚠ N** — N warnings
- **✕ N** — N critical issues

Click the status bar item to re-run Doctor.

## Background execution

Doctor runs automatically at extension activation (after a short delay) and when you open a new workspace. To suppress background runs, you can dismiss the status bar item — Doctor will only run when invoked manually.

## Concurrent execution

If Doctor is already running when you trigger it again, the second call joins the in-flight scan rather than starting a new one. This prevents duplicate work when multiple subsystems request a health check simultaneously.
