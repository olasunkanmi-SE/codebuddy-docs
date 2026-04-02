---
title: Elasticsearch
description: Query and manage Elasticsearch clusters via curl and es-cli.
---

|              |                           |
| ------------ | ------------------------- |
| **Category** | Databases                 |
| **CLI**      | `curl` + `es-cli` wrapper |
| **Auth**     | API key                   |
| **Config**   | `ES_URL` (optional)       |

## What it does

Uses `curl` and a bundled `es-cli` wrapper to give CodeBuddy access to Elasticsearch clusters. The agent can search indices, manage mappings, check cluster health, and run aggregations.

## Prerequisites

Elasticsearch access via HTTP. Set the cluster URL:

```bash
export ES_URL="http://localhost:9200"
```

For secured clusters, configure authentication as needed per your Elasticsearch setup (API key, basic auth, etc.).

The skill includes a bundled `install.sh` for setting up the CLI wrapper.

Verify connectivity:

```bash
curl -s "$ES_URL/_cluster/health" | python3 -m json.tool
```

## Capabilities

- **Search** — full-text queries, bool queries, aggregations
- **Indices** — create, delete, list, stats, mappings
- **Cluster** — health, node stats, shard allocation
- **Documents** — index, get, update, delete, bulk
- **Aliases** — create, list, swap

## Example prompts

- "Check the cluster health status"
- "Search the `logs-*` index for errors in the last hour"
- "Show the mapping for the `products` index"
- "Run an aggregation to count events by status code"
