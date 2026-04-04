---
title: Settings Reference
description: Complete list of all CodeBuddy settings.
---

CodeBuddy exposes **99 settings** across the editor's Settings UI and `settings.json`. Settings use several prefixes — provider settings use short names (e.g., `anthropic.apiKey`), while feature settings use the `codebuddy.*` prefix.

Open settings: **Cmd + ,** → search for `codebuddy` or the provider name.

---

## Provider selection

| Setting               | Type | Default  | Description                                                                                              |
| --------------------- | ---- | -------- | -------------------------------------------------------------------------------------------------------- |
| `generativeAi.option` | enum | `"Groq"` | Active AI provider: `Gemini`, `Groq`, `Anthropic`, `XGrok`, `Deepseek`, `OpenAI`, `Qwen`, `GLM`, `Local` |

## Provider API keys & models

### Google Gemini

| Setting                 | Type   | Default            | Description       |
| ----------------------- | ------ | ------------------ | ----------------- |
| `google.gemini.apiKeys` | string | —                  | Gemini API key    |
| `google.gemini.model`   | string | `"gemini-2.5-pro"` | Gemini model name |

### Groq

| Setting              | Type   | Default                     | Description     |
| -------------------- | ------ | --------------------------- | --------------- |
| `groq.llama3.apiKey` | string | —                           | Groq API key    |
| `groq.llama3.model`  | string | `"llama-3.1-70b-versatile"` | Groq model name |

### Anthropic

| Setting            | Type   | Default               | Description          |
| ------------------ | ------ | --------------------- | -------------------- |
| `anthropic.apiKey` | string | —                     | Anthropic API key    |
| `anthropic.model`  | string | `"claude-sonnet-4-5"` | Anthropic model name |

### OpenAI

| Setting         | Type   | Default    | Description       |
| --------------- | ------ | ---------- | ----------------- |
| `openai.apiKey` | string | —          | OpenAI API key    |
| `openai.model`  | string | `"gpt-4o"` | OpenAI model name |

### Deepseek

| Setting           | Type   | Default           | Description                                                       |
| ----------------- | ------ | ----------------- | ----------------------------------------------------------------- |
| `deepseek.apiKey` | string | —                 | Deepseek API key                                                  |
| `deepseek.model`  | string | `"deepseek-chat"` | Deepseek model (e.g., `deepseek-chat` V3, `deepseek-reasoner` R1) |

### Qwen

| Setting       | Type   | Default      | Description                                                    |
| ------------- | ------ | ------------ | -------------------------------------------------------------- |
| `qwen.apiKey` | string | —            | Qwen (DashScope) API key                                       |
| `qwen.model`  | string | `"qwen-max"` | Qwen model (e.g., `qwen-max`, `qwen-plus`, `qwen3-coder-plus`) |

### GLM (Zhipu AI)

| Setting      | Type   | Default   | Description                                       |
| ------------ | ------ | --------- | ------------------------------------------------- |
| `glm.apiKey` | string | —         | GLM (Zhipu AI) API key                            |
| `glm.model`  | string | `"glm-4"` | GLM model (e.g., `glm-4`, `glm-4-plus`, `glm-4v`) |

### Local LLM

| Setting         | Type   | Default                       | Description                                                                                                       |
| --------------- | ------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `local.model`   | string | `"qwen2.5-coder"`             | Local model name (e.g., `qwen2.5-coder`, `llama3.2`, `gemma3`)                                                    |
| `local.baseUrl` | string | `"http://localhost:11434/v1"` | Base URL. Ollama: `http://localhost:11434/v1`, Docker Model Runner: `http://localhost:12434/engines/llama.cpp/v1` |
| `local.apiKey`  | string | `"not-needed"`                | API key for local LLM (if required)                                                                               |

### Tavily (web search)

| Setting         | Type   | Default | Description                        |
| --------------- | ------ | ------- | ---------------------------------- |
| `tavily.apiKey` | string | —       | Tavily API key for web search tool |

---

## Core settings

| Setting                         | Type    | Default    | Description                                               |
| ------------------------------- | ------- | ---------- | --------------------------------------------------------- |
| `codebuddy.enableStreaming`     | boolean | `true`     | Enable streaming responses from AI models                 |
| `codebuddy.autoApprove`         | boolean | `false`    | Automatically approve agent actions without confirmation  |
| `codebuddy.allowFileEdits`      | boolean | `true`     | Allow the agent to create, modify, and delete files       |
| `codebuddy.allowTerminal`       | boolean | `true`     | Allow the agent to execute terminal commands              |
| `codebuddy.verboseLogging`      | boolean | `false`    | Show detailed agent activity logs for debugging           |
| `codebuddy.indexCodebase`       | boolean | `false`    | Enable vector database indexing for semantic code search  |
| `codebuddy.contextWindow`       | enum    | `"16k"`    | Max context window size: `4k`, `8k`, `16k`, `32k`, `128k` |
| `codebuddy.includeHidden`       | boolean | `false`    | Include hidden files (`.`-prefixed) in context gathering  |
| `codebuddy.maxFileSize`         | string  | `"1"`      | Max file size in MB for context gathering                 |
| `codebuddy.requireDiffApproval` | boolean | `false`    | Require manual approval before file changes are applied   |
| `codebuddy.language`            | enum    | `"en"`     | UI language: `en`, `es`, `fr`, `de`, `zh-cn`, `ja`, `yo`  |
| `codebuddy.browserType`         | enum    | `"system"` | How to open URLs: `reader`, `simple`, `system`            |
| `codebuddy.nickname`            | string  | `""`       | Your display name in chat conversations                   |
| `codebuddy.compactMode`         | boolean | `false`    | Reduce spacing between messages for a denser view         |

## Chat view & UI

| Setting              | Type   | Default            | Description                                                                                                                                                             |
| -------------------- | ------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `font.family`        | enum   | `"JetBrains Mono"` | Chat font family: `Montserrat`, `SF Mono`, `Space Mono`, `Fira Code`, `Source Code Pro`, `JetBrains Mono`, `Roboto Mono`, `Ubuntu Mono`, `IBM Plex Mono`, `Inconsolata` |
| `chatview.theme`     | enum   | `"Atom One Dark"`  | Syntax highlight theme: `Atom One Dark`, `Code Pen`, `github dark`, `night owl`, `tokyo night`, and others                                                              |
| `chatview.font.size` | number | `16`               | Chat font size in pixels                                                                                                                                                |

## Agent limits

| Setting                                | Type   | Default | Range     | Description                                                  |
| -------------------------------------- | ------ | ------- | --------- | ------------------------------------------------------------ |
| `codebuddy.agent.maxEventCount`        | number | `2000`  | 500–10000 | Max stream events before the agent pauses                    |
| `codebuddy.agent.maxToolInvocations`   | number | `400`   | 50–2000   | Max tool calls before the agent pauses                       |
| `codebuddy.agent.maxDurationMinutes`   | number | `10`    | 1–60      | Max wall-clock minutes before the agent pauses               |
| `codebuddy.agent.maxConcurrentStreams` | number | `3`     | 1–10      | Max concurrent agent streams; additional requests are queued |

## Inline completion

| Setting                            | Type    | Default           | Description                                                                                      |
| ---------------------------------- | ------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| `codebuddy.completion.enabled`     | boolean | `true`            | Enable inline code completions (ghost text)                                                      |
| `codebuddy.completion.provider`    | enum    | `"Local"`         | Completion provider: `Gemini`, `Groq`, `Anthropic`, `Deepseek`, `OpenAI`, `Qwen`, `GLM`, `Local` |
| `codebuddy.completion.model`       | string  | `"qwen2.5-coder"` | Model to use for completions                                                                     |
| `codebuddy.completion.apiKey`      | string  | `""`              | API key for completion provider (falls back to main key if empty)                                |
| `codebuddy.completion.debounceMs`  | number  | `300`             | Delay in ms before triggering a completion (min: 50)                                             |
| `codebuddy.completion.maxTokens`   | number  | `128`             | Maximum tokens to generate per completion                                                        |
| `codebuddy.completion.triggerMode` | enum    | `"automatic"`     | Trigger mode: `automatic`, `manual`                                                              |
| `codebuddy.completion.multiLine`   | boolean | `true`            | Allow multi-line completions                                                                     |

## Project rules

| Setting                         | Type    | Default | Description                                                                                       |
| ------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------- |
| `codebuddy.rules.enabled`       | boolean | `true`  | Enable project rules from `.codebuddy/rules.md`                                                   |
| `codebuddy.rules.maxTokens`     | number  | `2000`  | Max tokens for project rules (truncates if exceeded)                                              |
| `codebuddy.rules.showIndicator` | boolean | `true`  | Show indicator when project rules are active                                                      |
| `rules.customRules`             | array   | `[]`    | Custom rules for code generation (objects with `id`, `name`, `description`, `content`, `enabled`) |
| `rules.customSystemPrompt`      | string  | `""`    | Additional instructions appended to the base system prompt                                        |
| `rules.subagents`               | object  | `{}`    | Per-subagent toggle configuration. Keys: subagent ID, values: `{ enabled: boolean }`              |

## Code review

| Setting                           | Type    | Default | Description                                         |
| --------------------------------- | ------- | ------- | --------------------------------------------------- |
| `codebuddy.review.inlineComments` | boolean | `true`  | Show code review comments inline in workspace files |

## Testing

| Setting                 | Type   | Default  | Description                                                                          |
| ----------------------- | ------ | -------- | ------------------------------------------------------------------------------------ |
| `codebuddy.testCommand` | string | `""`     | Custom test command. If empty, auto-detects (Jest, Vitest, Mocha, Pytest, Go, Cargo) |
| `codebuddy.testTimeout` | number | `120000` | Test execution timeout in ms (5000–600000)                                           |

## Vector database

| Setting                                          | Type    | Default          | Description                                           |
| ------------------------------------------------ | ------- | ---------------- | ----------------------------------------------------- |
| `codebuddy.vectorDb.enabled`                     | boolean | `true`           | Enable vector database for semantic code search       |
| `codebuddy.vectorDb.embeddingModel`              | enum    | `"gemini"`       | Embedding provider: `gemini`, `openai`, `local`       |
| `codebuddy.vectorDb.maxTokens`                   | number  | `6000`           | Max tokens per chunk                                  |
| `codebuddy.vectorDb.batchSize`                   | number  | `10`             | Files per embedding batch (1–50)                      |
| `codebuddy.vectorDb.searchResultLimit`           | number  | `8`              | Max search results (1–20)                             |
| `codebuddy.vectorDb.enableBackgroundProcessing`  | boolean | `true`           | Index changes in the background                       |
| `codebuddy.vectorDb.enableProgressNotifications` | boolean | `true`           | Show indexing progress                                |
| `codebuddy.vectorDb.progressLocation`            | enum    | `"notification"` | Progress location: `notification`, `statusBar`        |
| `codebuddy.vectorDb.debounceDelay`               | number  | `1000`           | Re-index debounce delay in ms                         |
| `codebuddy.vectorDb.performanceMode`             | enum    | `"balanced"`     | Performance mode: `balanced`, `performance`, `memory` |
| `codebuddy.vectorDb.fallbackToKeywordSearch`     | boolean | `true`           | Fall back to keyword search when vectors fail         |
| `codebuddy.vectorDb.cacheEnabled`                | boolean | `true`           | Cache search results                                  |
| `codebuddy.vectorDb.logLevel`                    | enum    | `"info"`         | Log level: `debug`, `info`, `warn`, `error`           |

## Hybrid search

| Setting                                             | Type    | Default | Range | Description                                         |
| --------------------------------------------------- | ------- | ------- | ----- | --------------------------------------------------- |
| `codebuddy.hybridSearch.vectorWeight`               | number  | `0.7`   | 0–1   | Weight for semantic similarity scores               |
| `codebuddy.hybridSearch.textWeight`                 | number  | `0.3`   | 0–1   | Weight for BM25 keyword scores                      |
| `codebuddy.hybridSearch.topK`                       | integer | `10`    | 1–50  | Max results returned                                |
| `codebuddy.hybridSearch.mmr.enabled`                | boolean | `false` | —     | Enable MMR diversity re-ranking                     |
| `codebuddy.hybridSearch.mmr.lambda`                 | number  | `0.7`   | 0–1   | MMR trade-off: 0 = max diversity, 1 = max relevance |
| `codebuddy.hybridSearch.temporalDecay.enabled`      | boolean | `false` | —     | Boost recently indexed content                      |
| `codebuddy.hybridSearch.temporalDecay.halfLifeDays` | integer | `30`    | 1–365 | Days until a result's score is halved               |

## Security & permissions

| Setting                                    | Type    | Default                | Description                                                                                                                                      |
| ------------------------------------------ | ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `codebuddy.permissionScope.defaultProfile` | enum    | `"standard"`           | Default permission profile: `restricted` (read-only, no terminal), `standard` (read/write, safe terminal), `trusted` (full access, auto-approve) |
| `codebuddy.accessControl.defaultMode`      | enum    | `"open"`               | Access control mode: `open` (no restrictions), `allow` (only listed users), `deny` (block listed users)                                          |
| `codebuddy.credentialProxy.enabled`        | boolean | `false`                | Route API calls through a local proxy that injects credentials from OS keychain                                                                  |
| `codebuddy.credentialProxy.rateLimits`     | object  | `{"anthropic":60,...}` | Per-provider rate limits (requests/min). Keys: provider names, values: 1–3600                                                                    |

## Connectors & MCP

| Setting                       | Type   | Default | Description                                 |
| ----------------------------- | ------ | ------- | ------------------------------------------- |
| `codebuddy.connectors.states` | object | `{}`    | Connection status of external connectors    |
| `codebuddy.mcp.servers`       | object | `{}`    | MCP server configurations                   |
| `codebuddy.mcp.disabledTools` | object | `{}`    | Per-server lists of disabled MCP tool names |

## Automations

| Setting                                               | Type     | Default                           | Description                                                                |
| ----------------------------------------------------- | -------- | --------------------------------- | -------------------------------------------------------------------------- |
| `codebuddy.automations.dailyStandup.enabled`          | boolean  | `true`                            | Daily Standup automation (8:00 AM)                                         |
| `codebuddy.automations.codeHealth.enabled`            | boolean  | `true`                            | Daily Code Health Check (9:00 AM)                                          |
| `codebuddy.automations.codeHealth.hotspotMinChanges`  | number   | `3`                               | Min changes in 30 days to flag a file as a hotspot                         |
| `codebuddy.automations.codeHealth.largeFileThreshold` | number   | `300`                             | Min lines for "large file" warning (min: 50)                               |
| `codebuddy.automations.codeHealth.maxTodoItems`       | number   | `50`                              | Max TODO/FIXME/HACK items to report (min: 10)                              |
| `codebuddy.automations.dependencyCheck.enabled`       | boolean  | `true`                            | Daily Dependency Check (11:00 AM)                                          |
| `codebuddy.automations.gitWatchdog.enabled`           | boolean  | `true`                            | Git Watchdog (every 2 hours)                                               |
| `codebuddy.automations.gitWatchdog.protectedBranches` | string[] | `["main","master","develop",...]` | Branches to protect from stale cleanup. Exact names or `prefix/*` patterns |
| `codebuddy.automations.endOfDaySummary.enabled`       | boolean  | `true`                            | End-of-Day Summary (5:30 PM)                                               |

## Failover

| Setting                        | Type     | Default | Description                                                                                                                  |
| ------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `codebuddy.failover.enabled`   | boolean  | `true`  | Auto-switch to fallback LLM on failure (rate limit, timeout, auth error)                                                     |
| `codebuddy.failover.providers` | string[] | `[]`    | Ordered fallback providers: `Anthropic`, `OpenAI`, `Gemini`, `Groq`, `Deepseek`, `Qwen`, `GLM`, `Local`. Empty = auto-detect |

## Telemetry

| Setting                             | Type    | Default | Description                                                                               |
| ----------------------------------- | ------- | ------- | ----------------------------------------------------------------------------------------- |
| `codebuddy.telemetry.persistTraces` | boolean | `true`  | Persist agent telemetry traces to disk                                                    |
| `codebuddy.telemetry.retentionDays` | number  | `7`     | Days to retain traces before pruning (1–90)                                               |
| `codebuddy.telemetry.otlpEndpoint`  | string  | `""`    | OTLP HTTP endpoint for trace export (e.g., LangFuse, LangSmith, Jaeger). Empty = disabled |

## Standup

| Setting                    | Type   | Default | Description                                                                                          |
| -------------------------- | ------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `codebuddy.standup.myName` | string | `""`    | Your name in standup/meeting notes (filters your action items). Falls back to `git config user.name` |
