---
title: Sentry
description: Track errors, analyze frequency and impact, and triage issues via sentry-cli.
---

|              |                                                                                      |
| ------------ | ------------------------------------------------------------------------------------ |
| **Category** | Monitoring                                                                           |
| **CLI**      | [`sentry-cli`](https://docs.sentry.io/cli/)                                          |
| **Auth**     | API key                                                                              |
| **Config**   | `SENTRY_AUTH_TOKEN` (required), `SENTRY_ORG` (required), `SENTRY_PROJECT` (required) |

## What it does

Wraps `sentry-cli` to give CodeBuddy access to your Sentry error tracking. The agent can view recent errors, analyze frequency and impact, link errors to source code, and triage issues.

## Prerequisites

Install sentry-cli:

```bash
# macOS
brew install getsentry/tools/sentry-cli

# npm (any platform)
npm install -g @sentry/cli

# curl
curl -sL https://sentry.io/get-cli/ | bash
```

Configure authentication:

```bash
export SENTRY_AUTH_TOKEN="your-auth-token"
export SENTRY_ORG="your-org"
export SENTRY_PROJECT="your-project"
```

Verify:

```bash
sentry-cli info
```

## Capabilities

- **Issues** — list, view, resolve, unresolve
- **Events** — view recent error events and stack traces
- **Releases** — create, list, associate commits
- **Source maps** — upload, validate
- **Deploys** — register deployments

## Example prompts

- "Show the top 5 unresolved errors in production this week"
- "Find the source code causing the TypeError in the auth module"
- "Create a new Sentry release for v2.1.0 and associate the latest commits"
- "Upload source maps for the production build"
