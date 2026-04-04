---
title: PostgreSQL
description: Query and manage PostgreSQL databases via psql.
---

|              |                                                                 |
| ------------ | --------------------------------------------------------------- |
| **Category** | Databases                                                       |
| **CLI**      | [`psql`](https://www.postgresql.org/docs/current/app-psql.html) |
| **Auth**     | None (uses `psql` connection parameters)                        |

## What it does

Wraps the `psql` CLI to give CodeBuddy access to PostgreSQL databases. The agent can execute queries, inspect schemas, run migrations, and analyze query performance.

## Prerequisites

Install the PostgreSQL client tools:

```bash
# macOS
brew install postgresql

# Linux (Debian/Ubuntu)
sudo apt-get install postgresql-client

# Linux (Fedora)
sudo dnf install postgresql

# Windows
winget install PostgreSQL.PostgreSQL
```

Verify the connection:

```bash
psql -h localhost -U postgres -c '\conninfo'
```

The skill uses standard `psql` connection parameters — set `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` environment variables or pass a connection string.

## Capabilities

- **Queries** — execute read and write SQL statements
- **Schema inspection** — list tables, columns, indexes, constraints
- **Migrations** — run migration scripts
- **Performance** — `EXPLAIN ANALYZE` queries, index recommendations
- **Admin** — database size, active connections, lock monitoring

The skill includes a bundled `install.sh` for automated setup.

## Example prompts

- "Show me the schema for the users table"
- "Find all orders placed in the last 7 days with a total over $100"
- "Explain this slow query and suggest index improvements"
- "List all tables larger than 1 GB"
