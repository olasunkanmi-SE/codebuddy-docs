---
title: Contributing
description: How to set up the development environment, run tests, and submit pull requests.
---

CodeBuddy is open source under the MIT license. Contributions are welcome — bug fixes, new features, documentation improvements, and translations.

**Repository**: [github.com/olasunkanmi-SE/codebuddy](https://github.com/olasunkanmi-SE/codebuddy)

## Getting started

### Prerequisites

- **Node.js** 20+
- **Git**
- **VS Code, Cursor, or any compatible editor** (VS Code Insiders recommended for extension development)

### Setup

```bash
# Fork and clone
git clone https://github.com/<your-username>/codebuddy.git
cd codebuddy

# Install dependencies
npm ci

# Install webview dependencies
cd webviewUi && npm ci && cd ..

# Compile
npm run compile

# Build webview
npm run build:webview
```

### Development workflow

```bash
# Watch for TypeScript changes
npm run watch

# In a separate terminal, watch for webview changes
npm run dev:webview
```

Press **F5** in your editor to launch the Extension Development Host with CodeBuddy loaded.

## Project structure

| Directory                | Contents                                           |
| ------------------------ | -------------------------------------------------- |
| `src/`                   | Extension source (TypeScript)                      |
| `src/agents/`            | LangGraph agent, subagents, tool providers         |
| `src/services/`          | Core services (indexing, testing, embedding, etc.) |
| `src/webview-providers/` | Webview ↔ extension message handlers               |
| `src/workers/`           | Worker threads (AST analysis, embedding)           |
| `src/infrastructure/`    | Logger, telemetry, observability                   |
| `src/MCP/`               | MCP protocol integration                           |
| `webviewUi/`             | Webview frontend (separate npm project)            |
| `skills/`                | Built-in skill definitions (SKILL.md files)        |
| `l10n/`                  | Translation bundles                                |
| `.github/`               | CI workflows, issue/PR templates                   |

## Available scripts

| Script                  | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `npm run build`         | Full build: compile + format + webview + package              |
| `npm run compile`       | TypeScript compilation                                        |
| `npm run watch`         | Watch mode for TypeScript                                     |
| `npm run lint`          | ESLint check                                                  |
| `npm run fix`           | ESLint auto-fix                                               |
| `npm run format`        | Prettier formatting                                           |
| `npm test`              | Run extension tests                                           |
| `npm run test:coverage` | Tests with coverage report (text-summary, lcov, json-summary) |
| `npm run build:webview` | Build webview frontend                                        |
| `npm run dev:webview`   | Webview dev server                                            |
| `npm run package`       | Package with esbuild (production)                             |

## Branching strategy

- **`development`** — active development branch. Create feature branches from here.
- **`main`** — stable releases. PRs from `development` → `main` for releases.

## Pull request process

1. **Fork** the repository
2. Create a branch from `development`: `git checkout -b feature/my-feature development`
3. Make your changes
4. Run `npm run lint && npm run compile && npm test`
5. Push and open a PR against `development`

### PR checklist

- [ ] Description of what changed and why
- [ ] Type: bug fix / feature / breaking change / refactor / docs / CI
- [ ] Tests added or updated
- [ ] Linting passes

## Coding standards

- **TypeScript strict mode** — all code is type-checked with `strict: true`
- **ESLint** — run `npm run lint` before committing; `npm run fix` for auto-fixes
- **Prettier** — run `npm run format` to format all files
- **Naming** — use `camelCase` for variables/functions, `PascalCase` for classes/types, `kebab-case` for file names
- **Services** — follow the dependency injection pattern via `ServiceFactory`. Register new services in the factory
- **Workers** — use the `parentPort.postMessage()` / `onmessage` pattern. Keep worker files in `src/workers/`
- **Error handling** — use structured error types. Don't silently swallow errors
- **Security** — never expose API keys in logs or webview messages. All external inputs must be validated

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

Tests use the built-in extension testing framework. Place test files alongside source files with a `.test.ts` suffix, or in a `__tests__/` directory.

When adding a new feature:

1. Add unit tests for the service layer
2. Add integration tests if the feature interacts with external systems (mock them)
3. Ensure existing tests still pass — CI will block the PR if they don't

## Documentation

This documentation site lives in a separate repository: [codebuddy-docs](https://github.com/olasunkanmi-SE/codebuddy-docs). To contribute docs changes:

```bash
git clone https://github.com/olasunkanmi-SE/codebuddy-docs.git
cd codebuddy-docs
npm ci
npm run dev
```

Docs are built with [Astro Starlight](https://starlight.astro.build). Markdown files are in `src/content/docs/`.

## Reporting issues

Open a [GitHub Issue](https://github.com/olasunkanmi-SE/codebuddy/issues/new) with:

- **Environment**: OS, editor and version, CodeBuddy version
- **Steps to reproduce**: minimal steps to trigger the bug
- **Expected vs actual behavior**
- **Logs**: copy relevant output from the Output panel → CodeBuddy

For feature requests, describe the use case and the proposed solution.

## License

CodeBuddy is licensed under the [MIT License](https://github.com/olasunkanmi-SE/codebuddy/blob/main/LICENSE). By contributing, you agree that your contributions will be licensed under the same terms.

- [ ] Code compiles without errors

### Templates

The repository provides templates for:

- **Bug reports** — structured form with repro steps, expected/actual, version
- **Feature requests** — problem, proposed solution, alternatives, context
- **Pull requests** — description, type checklist, testing checklist

## CI pipeline

Every PR triggers a matrix build on **Ubuntu, Windows, and macOS**:

1. Checkout → generate diff
2. Node 20 setup → `npm ci`
3. Security audit
4. Lint → compile → format
5. Build webview (`npm ci && lint && build` in `webviewUi/`)
6. Compile tests → run tests (xvfb on Linux)
7. Coverage upload → **30% minimum line coverage** threshold
8. Package

Tests run under `xvfb-run` on Linux for headless extension integration testing.

## Release process

Releases are triggered by pushing a version tag:

```bash
git tag v4.3.0
git push origin v4.3.0
```

The deploy pipeline:

1. Builds and packages a `.vsix` file
2. Publishes to the **VS Code Marketplace** and **Open VSX Registry**
3. Publishes to the **Open VSX Registry**
4. Creates a GitHub Release with the `.vsix` attachment

## Dependencies

Dependabot is configured for automatic dependency updates:

| Scope            | Frequency | PR limit |
| ---------------- | --------- | -------- |
| Root npm         | Weekly    | 10       |
| `webviewUi/` npm | Weekly    | 5        |
| GitHub Actions   | Monthly   | —        |

## Code of conduct

The project follows a standard Code of Conduct. See `CODE_OF_CONDUCT.md` in the repository.

## Security

To report security vulnerabilities, see `SECURITY.md` in the repository. Do not open public issues for security concerns.
