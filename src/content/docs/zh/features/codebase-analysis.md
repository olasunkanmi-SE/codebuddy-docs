---
title: Codebase Analysis
description: Automated architecture detection, call graph analysis, endpoint mapping, and pattern recognition across 7 languages.
---

CodeBuddy can analyze your entire codebase to understand its architecture, detect patterns, map API endpoints, and build a call graph. This powers the **architecture-expert** subagent and the `get_architecture_knowledge` tool, letting you ask questions about your project's structure and get answers grounded in actual static analysis data.

## Quick start

Run the command:

```
CodeBuddy: Analyze Codebase & Answer Questions   (Cmd+Shift+6)
```

This triggers a full analysis with a progress notification. Once complete, you can ask questions like:

- _"What architectural patterns does this project use?"_
- _"Show me all API endpoints"_
- _"What are the most-imported modules?"_
- _"Are there any circular dependencies?"_

## What gets analyzed

### Language support

The Tree-Sitter analyzer supports **7 languages**:

| Language   | File extensions               |
| ---------- | ----------------------------- |
| JavaScript | `.js`, `.jsx`, `.mjs`, `.cjs` |
| TypeScript | `.ts`, `.tsx`, `.mts`, `.cts` |
| Python     | `.py`                         |
| Java       | `.java`                       |
| Go         | `.go`                         |
| Rust       | `.rs`                         |
| PHP        | `.php`, `.phtml`              |

Additionally, configuration files (`package.json`, `tsconfig.json`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle`, `composer.json`) and schema files (`*.sql`, `schema.prisma`) are parsed for dependency and model information.

### Extraction targets

For each supported language, Tree-Sitter extracts:

- **Classes, interfaces, structs, traits, enums** — with methods, properties, and decorators
- **Functions** — with parameters, return types, export/async status
- **Imports and exports** — source modules and specifiers
- **React components** — detected in JSX/TSX files
- **API endpoints** — via framework-specific pattern matching

### Framework endpoint detection

| Language                    | Frameworks detected                  |
| --------------------------- | ------------------------------------ |
| **JavaScript / TypeScript** | Express, NestJS, Fastify, Hono       |
| **Python**                  | FastAPI, Flask, Django               |
| **Java**                    | Spring (`@GetMapping`, etc.), JAX-RS |
| **Go**                      | Gin, Chi, Echo, `net/http`           |
| **Rust**                    | Actix, Axum, Rocket                  |
| **PHP**                     | Laravel, Symfony                     |

NestJS decorators (`@Get`, `@Post`, `@Put`, `@Delete`, `@Patch`) are parsed via the TypeScript compiler API for accurate parameter and return type extraction.

## Architecture detection

The `ArchitectureDetector` examines file path patterns to identify layers and architectural patterns:

**Layer detection**: Controllers, services, repositories, models, middleware, views, config, utils, tests.

**Pattern matching**:

| Pattern                  | Detection criteria                     |
| ------------------------ | -------------------------------------- |
| **Layered Architecture** | Controllers + services + repositories  |
| **MVC**                  | Controllers + models + views           |
| **Microservices**        | Multiple service directories           |
| **Frontend SPA**         | Components + views directories         |
| **Full-stack Web App**   | Pages + components + API routes        |
| **CLI Tool**             | `cmd/` or `commands/` directories      |
| **Library / SDK**        | `src/` with no framework indicators    |
| **REST API**             | API endpoints + no frontend components |

Each detected pattern includes a **confidence score** (e.g., "Layered Architecture (85% confidence)").

## Call graph analysis

The analysis builds an import/dependency graph and extracts:

- **Node and edge counts** — Total modules and import relationships
- **Dependency hubs** — Most-imported modules (up to 8)
- **Entry points** — Modules not imported by anything else (up to 8)
- **Circular dependencies** — Detected cycles (up to 5)

## Middleware and auth detection

For web applications, the analysis identifies:

- **Authentication strategies** — JWT, OAuth, session-based, API key
- **Middleware chain** — Ordered middleware pipeline (up to 10)
- **Auth flows** — Login, registration, token refresh (up to 5)
- **Error handlers** — Count and source files

## Caching and performance

Analysis results are cached in SQLite to avoid re-analyzing unchanged codebases:

- **Git state tracking** — Branch name, commit hash, and diff hash are stored with each analysis
- **Change detection** — On subsequent runs, CodeBuddy checks if the git state has changed significantly before re-analyzing
- **Worker thread** — The analysis runs in a `worker_threads` Worker to avoid blocking the extension host
- **File limits** — Up to 1,000 files are analyzed per run
- **Cancellation** — Long-running analyses can be cancelled via the progress notification

**Excluded directories**: `node_modules`, `dist`, `build`, `.git`, `.codebuddy`, `coverage`, `.next`, `.nuxt`.

## Cache management commands

| Command               | What it does                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Show Cache Status** | Opens a panel showing: cache status, last analysis date, branch, file count, snapshot count, database size |
| **Clear Cache**       | Deletes all cached analysis snapshots (with confirmation)                                                  |
| **Refresh Analysis**  | Forces a fresh analysis regardless of cache state                                                          |

## Architecture-expert subagent

The analysis data powers the `architecture-expert` subagent via the `get_architecture_knowledge` tool. This tool accepts a `section` parameter:

| Section      | What it returns                                            |
| ------------ | ---------------------------------------------------------- |
| `overview`   | Project type, entry points, frameworks, total files        |
| `patterns`   | Architectural patterns with confidence scores              |
| `call-graph` | Import graph stats, dependency hubs, circular dependencies |
| `middleware` | Auth strategies, middleware chain, error handlers          |
| `endpoints`  | API routes with HTTP method, path, and source file         |
| `models`     | Data models with property names                            |
| `all`        | Everything above (capped at 12,000 characters)             |

If no analysis data is available, the tool suggests running the **Analyze Codebase** command first.

## Git branch watching

CodeBuddy watches `.git/HEAD` for branch changes. When you switch branches, it offers to re-analyze:

> **CodeBuddy**: Branch changed to `feature/auth`. Analyze now?
> **[Analyze Now]** | **[Later]**
