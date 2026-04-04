---
title: Onboarding Wizard
description: 5-step setup wizard — provider selection, workspace detection, security configuration, and first task.
---

When you first install CodeBuddy, the onboarding wizard walks you through initial setup in five steps. It auto-detects your project's languages and frameworks, tests provider connectivity, and configures security defaults.

## Steps

### Step 1: Welcome

Introduction to CodeBuddy's capabilities. No configuration required — just proceed.

### Step 2: Provider Setup

Choose your LLM provider and enter your API key:

| Provider      | Config key              | Default model     |
| ------------- | ----------------------- | ----------------- |
| Anthropic     | `anthropic.apiKey`      | Claude Sonnet 4.5 |
| OpenAI        | `openai.apiKey`         | GPT-4o            |
| Google Gemini | `google.gemini.apiKeys` | Gemini 2.5 Pro    |
| Groq          | `groq.llama3.apiKey`    | Llama 3.1 70B     |
| DeepSeek      | `deepseek.apiKey`       | DeepSeek Chat     |
| Qwen          | `qwen.apiKey`           | Qwen Max          |
| GLM           | `glm.apiKey`            | GLM-4             |
| Local/Ollama  | `local.baseUrl`         | Qwen 2.5 Coder    |

The wizard **tests the provider** after you enter your key — it makes a short API call and reports latency. If the test fails, you can try a different provider.

### Step 3: Workspace Detection

The wizard analyzes your workspace to detect:

- **Languages** — Looks for indicator files: `tsconfig.json` → TypeScript, `requirements.txt` → Python, `go.mod` → Go, `Cargo.toml` → Rust, etc.
- **Frameworks** — Checks `package.json` dependencies (React, Next.js, Vue, Angular, Express, NestJS) and Python requirements (FastAPI, Django, Flask)
- **Git** — Whether the workspace is a git repository
- **Docker** — Whether `Dockerfile` or `docker-compose.yml` exists
- **Package manager** — npm, yarn, pnpm, pip, or poetry

This information is stored as project context and used to tailor agent responses.

### Step 4: Security

Configures the default [permission profile](/admin/security/):

- **Restricted** — Read-only, no terminal, no file writes
- **Standard** — Read/write with safe terminal commands (default)
- **Trusted** — Full access with auto-approval

### Step 5: First Task

Suggests a first task based on your detected project type:

- For existing projects: "Analyze my codebase architecture"
- For new projects: "Help me set up the project structure"

## Re-running the wizard

```
CodeBuddy: Show Onboarding Wizard
```

The wizard tracks completion state in the editor's global storage with a version number. When the wizard version is bumped in an update, it will re-show automatically to cover new setup steps.

## Detection heuristics

### Language detection

| Language   | Indicator files                                         |
| ---------- | ------------------------------------------------------- |
| TypeScript | `tsconfig.json`, `.ts`                                  |
| JavaScript | `package.json`, `.js`, `.mjs`                           |
| Python     | `requirements.txt`, `pyproject.toml`, `setup.py`, `.py` |
| Java       | `pom.xml`, `build.gradle`, `.java`                      |
| Go         | `go.mod`, `go.sum`, `.go`                               |
| Rust       | `Cargo.toml`, `.rs`                                     |
| PHP        | `composer.json`, `.php`                                 |
| Ruby       | `Gemfile`, `.rb`                                        |
| C#         | `.csproj`, `.sln`, `.cs`                                |
| Swift      | `Package.swift`, `.swift`                               |

### Framework detection (npm)

| Framework | Dependencies         |
| --------- | -------------------- |
| React     | `react`, `react-dom` |
| Next.js   | `next`               |
| Vue       | `vue`                |
| Angular   | `@angular/core`      |
| Express   | `express`            |
| NestJS    | `@nestjs/core`       |

### Framework detection (pip)

| Framework | Package   |
| --------- | --------- |
| FastAPI   | `fastapi` |
| Django    | `django`  |
| Flask     | `flask`   |
