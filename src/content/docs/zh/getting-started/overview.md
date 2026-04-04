---
title: Overview
description: Discover CodeBuddy — the autonomous AI software engineer. Learn about its multi-agent architecture, self-healing execution, and enterprise-grade security.
---

<div data-pagefind-weight="10">
CodeBuddy is an autonomous AI software engineer extension for **VS Code, Cursor, Windsurf, VSCodium**, and any editor built on the VS Code extension API. It independently plans, writes, debugs, tests, documents, and deploys entire features while reading your codebase, running terminal commands, editing files, searching the web, and correcting its own mistakes until tasks are complete.
</div>

## Key capabilities

- **10 AI providers** — Cloud (OpenAI, Anthropic, Google, Groq, DeepSeek, xAI, Qwen, GLM) and local (Ollama, Docker, LM Studio, OpenRouter). Switch providers with a single setting change.
- **27+ built-in tools** — File editing, terminal execution, web search, browser automation, debugging (DAP), memory, test runner, code composition, and task management.
- **Multi-agent architecture** — Built on [deepagentsjs](https://github.com/langchain-ai/deepagentsjs) (LangChain's Deep Agents framework). 9 specialized subagents (code-analyzer, doc-writer, debugger, file-organizer, architect, reviewer, tester, architecture-expert + general-purpose) coordinated by a Developer Agent via `createDeepAgent()`. Includes built-in planning (TodoListMiddleware), file system access (FilesystemMiddleware), and context-isolated subagent spawning (SubAgentMiddleware).
- **Model Context Protocol (MCP)** — Connect unlimited external tools via Docker gateway, stdio, or SSE transports. Per-server circuit breakers prevent cascading failures.
- **Self-healing execution** — Four-layer resilience: provider failover, stream-level error recovery with exponential backoff, agent safety guard (2,000 event / 400 tool-call / 10-minute limits), and context window compaction.
- **Persistent memory** — Three-tier memory with file-based storage, hybrid vector + BM25 search, temporal decay, and MMR diversity re-ranking. Memories persist across sessions in user and project scopes.
- **Enterprise security** — Three permission profiles (restricted, standard, trusted), access control (open/allow/deny modes), credential proxy with rate limiting, SSRF protection, LLM prompt injection detection, and dangerous command blocking.
- **16 skills** — Pre-built integrations for GitHub, Jira, AWS, Datadog, PostgreSQL, MongoDB, Redis, Kubernetes, Sentry, Elasticsearch, and more.
- **Full internationalization** — 7 languages: English, Spanish, French, German, Japanese, Simplified Chinese, Yoruba.
- **Cost tracking** — Per-model pricing tables (30+ models), per-conversation token tracking, configurable cost limits.

## How it works

1. **You describe a task** in natural language — "Add a login page with email/password auth"
2. **CodeBuddy plans** the implementation, breaking it into steps
3. **Specialized agents execute** — the Architect designs, the code-analyzer reviews, the Developer Agent implements, the Tester validates
4. **You review the changes** through the diff review system before they're applied
5. **CodeBuddy self-heals** — if something fails, it retries with error context, fails over to backup providers, and detects loops

## Supported editors

| Editor         | Install source                                               |
| -------------- | ------------------------------------------------------------ |
| VS Code 1.96+  | [VS Code Marketplace](https://marketplace.visualstudio.com/) |
| Cursor         | VS Code Marketplace                                          |
| Windsurf       | VS Code Marketplace                                          |
| VSCodium       | [Open VSX Registry](https://open-vsx.org/)                   |
| Gitpod / Theia | Open VSX Registry                                            |

## System requirements

- One of the supported editors listed above
- Node.js 18+ (for MCP servers)
- An API key from at least one supported AI provider
- Docker Desktop (optional, for Docker gateway MCP and local models)
