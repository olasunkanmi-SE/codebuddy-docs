---
title: Configuration
description: Configure AI providers, agent limits, security profiles, and project-specific settings.
---

CodeBuddy is configured through your editor's settings. Open settings with `Cmd+,` (macOS) or `Ctrl+,` (Windows/Linux) and search for "CodeBuddy".

## AI provider setup

CodeBuddy supports 10 AI providers through a unified `buildChatModel()` factory. Configure your preferred provider:

### Cloud providers

| Provider  | Setting key                  | Models                                             |
| --------- | ---------------------------- | -------------------------------------------------- |
| Anthropic | `codebuddy.anthropic.apiKey` | Claude Sonnet 4, Claude Opus 4, Claude Haiku       |
| OpenAI    | `codebuddy.openai.apiKey`    | GPT-4o, GPT-4o-mini, GPT-4-turbo, o3-mini          |
| Google    | `codebuddy.google.apiKey`    | Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.0 Flash |
| Groq      | `codebuddy.groq.apiKey`      | Llama 3.3 70B, Llama 3.1 8B, Mixtral 8x7B          |
| DeepSeek  | `codebuddy.deepseek.apiKey`  | DeepSeek Chat, Coder, Reasoner                     |
| xAI       | `codebuddy.xai.apiKey`       | Grok models                                        |
| Qwen      | `codebuddy.qwen.apiKey`      | Qwen Plus, Turbo, Max                              |
| GLM       | `codebuddy.glm.apiKey`       | GLM-4 Plus, GLM-4 Flash                            |

### Local providers

| Provider          | Setting key                | Notes                                                        |
| ----------------- | -------------------------- | ------------------------------------------------------------ |
| Ollama            | `codebuddy.ollama.baseUrl` | Default: `http://localhost:11434`. Any locally hosted model. |
| OpenAI-compatible | `codebuddy.local.baseUrl`  | LM Studio, vLLM, or any server implementing the OpenAI API.  |

All providers share the same `ChatModel` type, so switching providers requires only a configuration change.

## Key settings

```json
{
  // Primary AI model
  "codebuddy.defaultModel": "claude-sonnet-4-20250514",

  // Auto-approve safe operations (file reads, searches)
  "codebuddy.autoApprove": true,

  // Maximum cost per task (USD, 6 decimal precision)
  "codebuddy.costLimit": 1.0,

  // Language for the UI (en, es, fr, de, ja, zh-cn, yo)
  "codebuddy.language": "en"
}
```

## Agent limits

Control how far the agent can go before stopping:

```json
{
  // Maximum events per task (default: 2000)
  "codebuddy.agent.maxEvents": 2000,

  // Maximum tool invocations per task (default: 400)
  "codebuddy.agent.maxToolInvocations": 400,

  // Maximum task duration in minutes (default: 10)
  "codebuddy.agent.maxDuration": 10,

  // Maximum concurrent agent streams (default: 3)
  "codebuddy.agent.concurrentStreams": 3,

  // Context window size in tokens (4k-128k)
  "codebuddy.context.windowSize": 128000
}
```

## Security configuration

### Permission profiles

Set the active permission profile to control what tools the agent can use:

```json
{
  "codebuddy.security.permissionProfile": "standard"
}
```

| Profile      | Capabilities                                                                     |
| ------------ | -------------------------------------------------------------------------------- |
| `restricted` | Read-only. No terminal, no file writes, no browser.                              |
| `standard`   | Read/write with safe terminal commands. Dangerous patterns blocked. **Default.** |
| `trusted`    | Full access with auto-approval.                                                  |

### Access control

Control who can use the agent in team environments:

```json
{
  "codebuddy.security.accessMode": "open"
}
```

| Mode    | Behavior                                 |
| ------- | ---------------------------------------- |
| `open`  | No restrictions (default)                |
| `allow` | Only listed users can access             |
| `deny`  | Listed users are blocked, others allowed |

### Credential proxy

For teams that need centralized API key management:

```json
{
  "codebuddy.credentialProxy.enabled": true,
  "codebuddy.credentialProxy.rateLimit": 60
}
```

The proxy runs on localhost, injects API keys from the OS keychain, and rate-limits requests per provider.

## Project rules

Create a `.codebuddy/rules.md` file in your project root to set project-specific instructions that CodeBuddy follows in every conversation:

```markdown
# Project Rules

- Use TypeScript strict mode
- Follow the existing code style
- Always write tests for new functions
- Use pnpm instead of npm
```

CodeBuddy also checks `.codebuddy/rules/index.md`, `.codebuddyrules`, and `CODEBUDDY.md` as fallback locations. Rules are limited to a 2,000-token budget (approximately 8,000 characters) and truncated with a warning if exceeded.

See [Project Rules](/features/project-rules/) for details.

## MCP servers

Enable and configure MCP server connections:

```json
{
  "codebuddy.mcp.enabled": true,
  "codebuddy.mcp.timeout": 30000
}
```

Server definitions go in `.codebuddy/mcp.json`. See [MCP Integration](/concepts/mcp/) for full configuration.

## Environment variables

For CI/CD or team setups, configure providers via environment variables:

```bash
export CODEBUDDY_OPENAI_API_KEY="sk-..."
export CODEBUDDY_ANTHROPIC_API_KEY="sk-ant-..."
export CODEBUDDY_GOOGLE_API_KEY="AIza..."
```

## Next steps

- [Settings Reference](/reference/settings/) — Complete list of all 60+ settings
- [Security](/admin/security/) — Detailed security model documentation
- [Quickstart](/getting-started/quickstart/) — Run your first task
