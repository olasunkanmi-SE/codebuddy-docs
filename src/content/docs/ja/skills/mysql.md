---
title: MySQL
description: Query and manage MySQL databases via the mysql client.
---

|              |                                                           |
| ------------ | --------------------------------------------------------- |
| **Category** | Databases                                                 |
| **CLI**      | [`mysql`](https://dev.mysql.com/doc/refman/en/mysql.html) |
| **Auth**     | Basic (username/password)                                 |
| **Config**   | `MYSQL_HOST`, `MYSQL_PORT` (optional)                     |

## What it does

Wraps the `mysql` CLI client to give CodeBuddy access to MySQL databases. The agent can execute queries, inspect schemas, and manage database objects.

## Prerequisites

Install the MySQL client:

```bash
# macOS
brew install mysql-client

# Linux (Debian/Ubuntu)
sudo apt-get install mysql-client

# Linux (Fedora)
sudo dnf install mysql

# Windows
winget install Oracle.MySQL
```

The skill includes a bundled `install.sh` for automated setup.

Connect using standard MySQL environment variables or pass credentials directly:

```bash
export MYSQL_HOST="localhost"
export MYSQL_PORT="3306"
```

## Capabilities

- **Queries** — execute SELECT, INSERT, UPDATE, DELETE
- **Schema** — list databases, tables, columns, indexes
- **Admin** — show processlist, variables, status
- **Performance** — EXPLAIN queries, slow query analysis

## Example prompts

- "Show the schema for the `orders` table"
- "Find all users who signed up in the last 30 days"
- "Explain this slow query and suggest improvements"
- "List all databases on this server"
