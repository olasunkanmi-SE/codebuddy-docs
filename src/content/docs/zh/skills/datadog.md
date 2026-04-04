---
title: Datadog
description: Query metrics, logs, APM traces, and monitor alerts via Datadog dogshell.
---

|              |                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Category** | Monitoring                                                                                                              |
| **CLI**      | [`dog`](https://docs.datadoghq.com/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell/) (dogshell) |
| **Auth**     | API key                                                                                                                 |
| **Config**   | `DATADOG_API_KEY` (required), `DATADOG_APP_KEY` (required), `DATADOG_HOST` (optional)                                   |

## What it does

Wraps the Datadog `dog` CLI (dogshell) to give CodeBuddy access to your Datadog observability data. The agent can query metrics, search logs, inspect APM traces, and check monitor status.

## Prerequisites

Install dogshell:

```bash
pip install datadog
```

Configure with your keys:

```bash
export DATADOG_API_KEY="your-api-key"
export DATADOG_APP_KEY="your-app-key"
```

Optionally set the Datadog site (default: `datadoghq.com`):

```bash
export DATADOG_HOST="https://api.datadoghq.eu"  # EU site
```

Verify:

```bash
dog metric list
```

## Capabilities

- **Metrics** — query, post, list available metrics
- **Logs** — search, filter by service/level/time range
- **APM traces** — inspect traces, view spans, latency analysis
- **Monitors** — list, check status, mute/unmute
- **Dashboards** — list, pull widget data
- **Events** — post, search, stream

## Example prompts

- "Show the p99 latency for `/api/users` over the last 24 hours"
- "Find all error logs from the payment service in the last hour"
- "Which monitors are currently in alert status?"
- "Post an event to Datadog noting today's deployment"
