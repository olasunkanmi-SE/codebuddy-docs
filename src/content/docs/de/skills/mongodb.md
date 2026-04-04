---
title: MongoDB
description: Query and manage MongoDB databases via mongosh.
---

|              |                                                          |
| ------------ | -------------------------------------------------------- |
| **Category** | Databases                                                |
| **CLI**      | [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/) |
| **Auth**     | None (uses connection string)                            |
| **Config**   | `MONGODB_URI` (optional)                                 |

## What it does

Wraps `mongosh` (MongoDB Shell) to give CodeBuddy access to MongoDB databases. The agent can run queries, inspect collections, manage indexes, and perform aggregations.

## Prerequisites

Install mongosh:

```bash
# macOS
brew install mongosh

# Linux (Debian/Ubuntu)
sudo apt-get install -y mongodb-mongosh

# Windows
winget install MongoDB.Shell
```

Optionally set a default connection URI:

```bash
export MONGODB_URI="mongodb://localhost:27017/mydb"
```

## Capabilities

- **Queries** — find, insert, update, delete, aggregate
- **Collections** — list, create, drop, stats
- **Indexes** — create, list, drop, explain
- **Aggregation** — pipelines, `$lookup`, `$group`, `$match`
- **Admin** — server status, replica set info, profiling

## Example prompts

- "Show all collections in the `myapp` database"
- "Find users who haven't logged in for 90 days"
- "Create an index on `orders.createdAt`"
- "Run an aggregation to get total revenue by month"
