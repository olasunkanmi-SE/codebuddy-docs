---
title: Redis
description: Manage Redis key-value stores via redis-cli.
---

|              |                                                  |
| ------------ | ------------------------------------------------ |
| **Category** | Databases                                        |
| **CLI**      | [`redis-cli`](https://redis.io/docs/manual/cli/) |
| **Auth**     | Basic (password, if configured)                  |
| **Config**   | `REDIS_HOST`, `REDIS_PORT` (optional)            |

## What it does

Wraps `redis-cli` to give CodeBuddy access to Redis instances. The agent can get/set keys, inspect data structures, monitor performance, and manage cluster state.

## Prerequisites

Install redis-cli:

```bash
# macOS
brew install redis

# Linux (Debian/Ubuntu)
sudo apt-get install redis-tools

# Linux (Fedora)
sudo dnf install redis

# Windows
winget install Redis.Redis
```

The skill includes a bundled `install.sh` for automated setup.

Optionally configure connection:

```bash
export REDIS_HOST="localhost"
export REDIS_PORT="6379"
```

## Capabilities

- **Keys** — GET, SET, DEL, KEYS, SCAN, TTL, EXPIRE
- **Data structures** — lists, sets, hashes, sorted sets, streams
- **Pub/Sub** — publish, subscribe, channels
- **Admin** — INFO, CONFIG, DBSIZE, FLUSHDB, MONITOR
- **Cluster** — cluster info, nodes, slots

## Example prompts

- "Show all keys matching `session:*`"
- "What's the memory usage of this Redis instance?"
- "Set a 1-hour TTL on all keys matching `cache:*`"
- "Show the members of the `active_users` sorted set"
