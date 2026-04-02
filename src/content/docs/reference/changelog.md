---
title: Changelog
description: Release history and notable changes for CodeBuddy.
---

For the full changelog with every commit, see the [CHANGELOG.md](https://github.com/olasunkanmi-SE/codebuddy/blob/main/CHANGELOG.md) in the repository.

## v4.2.1 (2026-03-28)

**Patch release** — bug fixes and compliance improvements.

### Changed

- Enhanced project metadata, compliance, and contribution setup
- Improved responsiveness and content overflow in webview UI
- Removed connector feature and enhanced account settings

### Fixed

- Robust error handling for terminal session operations
- Corrected `ErrorBoundary` component import path in webview UI

---

## v4.2.0 (2026-03-22)

### Added

- **Browser Automation Tool** — Playwright-powered browser control with SSRF protection, injection guards, and expression sandboxing
- **Onboarding Wizard** — 5-step structured setup (Welcome → Provider → Workspace → Security → First Task) with provider testing and project detection
- **Concurrency Queue** — priority-based agent stream queue with starvation prevention and AbortSignal cancellation
- **Cost Tracking Dashboard** — centralized AI usage cost summary and aggregation
- **Team Intelligence Graph** — team graph with health stats, collaboration tracking, and audit documentation

### Fixed

- Isolated command chat history to prevent cross-command contamination
- Fixed chat history agent ID handling

---

## v4.1.0 (2026-02-15)

### Added

- **Telemetry & Observability** — local OpenTelemetry integration with trace correlation and structured logging
- **Google Gemini** provider support in developer agent
- **News Reader** — RSS feed aggregation with save/delete functionality and daily cleanup
- **Notification Center** — SQLite-backed notifications with browser preferences
- **Connector Service** — unified connector abstraction for MCP and skills
- **Dependency Graph** — auto-generated import-graph visualization
- **Enhanced Context Retrieval** — improved context selection with simplified function signatures
- **Reader-to-Chat Integration** — send reader content directly to chat

### Changed

- Simplified function signatures and removed unused regex patterns
- Updated npm dependencies to latest versions
- Replaced lint with fix in GitHub CI workflow

---

## v4.0.0 (2026-01-10)

**Major release** — multi-agent architecture and worker thread infrastructure.

### Added

- **Diff Review** — pending change tracking with UI integration
- **AST Indexing** — worker thread-based tree-sitter indexing with compact mode
- **Git Branch Detection** — automatic analysis prompt on branch change
- **Agent Timeline** — visual agent activity tracking component
- **Memory Management Tools** — task and memory tools with scheduler service
- **Scheduled Tasks** — automation framework with cron-like scheduling
- **News Component** — customizable font settings and UI enhancements
- Code insertion and terminal execution buttons in webview

### Changed

- Customizable agent settings and enhanced user preferences
- Updated FAQ with new model options and enhanced troubleshooting

---

## v3.7.x

Maintenance releases with stability improvements and bug fixes. See the [GitHub Releases](https://github.com/olasunkanmi-SE/codebuddy/releases) page for details.

---

## v3.4.4 and earlier

See the [GitHub Releases](https://github.com/olasunkanmi-SE/codebuddy/releases) page for the full history.

---

## Staying up to date

CodeBuddy updates automatically through the extension marketplace. You can also update manually:

```
Extensions: Check for Extension Updates
```

Or install a specific version from a `.vsix` file:

```bash
code --install-extension codebuddy-4.2.1.vsix
```
