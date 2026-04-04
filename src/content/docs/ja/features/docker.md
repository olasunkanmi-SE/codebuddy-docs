---
title: Docker Integration
description: Docker Model Runner, Ollama containers, MCP Docker Gateway, and container management.
---

CodeBuddy integrates with Docker for running local AI models and managing MCP servers. This covers three capabilities: **Docker Model Runner** for GPU-accelerated inference, **Ollama containers** via docker-compose, and the **MCP Docker Gateway** for unified tool catalogs.

## Docker Model Runner

Docker Model Runner is Docker Desktop's built-in inference engine. CodeBuddy can enable it, pull models, and route requests to it automatically.

### Setup

1. Ensure Docker Desktop is installed and running
2. In CodeBuddy, use the Docker panel or ask the agent: "Enable Docker Model Runner"

This runs:

```bash
docker desktop enable model-runner --tcp=12434
```

Models are then accessible at `http://localhost:12434/engines/llama.cpp/v1` (OpenAI-compatible API).

### Model management

| Action         | CLI equivalent                                                                 |
| -------------- | ------------------------------------------------------------------------------ |
| List models    | `docker model ls --json`                                                       |
| Pull a model   | `docker model pull <name>`                                                     |
| Delete a model | `docker model rm <name>`                                                       |
| Use a model    | Auto-configures `local.model`, `local.baseUrl`, and switches to Local provider |

### Port fallback

When you select "Use Model", CodeBuddy tries Docker Model Runner on port **12434** first (1-second timeout). If unavailable, it falls back to Ollama on port **11434**. The appropriate `local.baseUrl` is set automatically.

## Ollama via Docker Compose

CodeBuddy bundles a `docker-compose.yml` for running Ollama in a container:

```yaml
# Key settings:
# - 32 GB memory limit
# - GPU passthrough (optional)
# - Persistent volume for models
# - Port 11434 exposed
```

Start with: "Start Ollama container" or via the Docker panel.

```bash
docker compose -f <extension-path>/docker-compose.yml up -d
```

### Ollama model management

| Action       | CLI equivalent                                 |
| ------------ | ---------------------------------------------- |
| Check status | `docker ps --filter name=ollama --format json` |
| List models  | `docker exec ollama ollama list`               |
| Pull a model | `docker exec ollama ollama pull <name>`        |

### Docker availability detection

CodeBuddy probes the Docker socket directly (`/var/run/docker.sock` on macOS/Linux, `\\.\pipe\docker_engine` on Windows) to check if Docker is running. Results are **cached for 15 seconds** to avoid repeated spawn failures.

## MCP Docker Gateway

The MCP Docker Gateway provides a unified catalog of MCP tools from a single Docker-managed endpoint.

### How it works

1. CodeBuddy detects the Docker Gateway via `docker mcp --help` + `docker info`
2. When `docker-gateway` is the only enabled MCP server, all MCP tools come from one unified catalog
3. Communication uses stdio or SSE transport

### Reliability features

| Feature                  | Behavior                                                                 |
| ------------------------ | ------------------------------------------------------------------------ |
| **Circuit breaker**      | 3 failures → 5-minute cooldown per server                                |
| **Idle shutdown**        | Gateway disconnects after 5 minutes of inactivity, reconnects on-demand  |
| **macOS PATH fixup**     | Injects `/usr/local/bin:/opt/homebrew/bin` etc. for proper CLI discovery |
| **Graceful degradation** | If Docker is unavailable, the agent continues with core tools only       |

## Docker panel commands

The Docker panel in the CodeBuddy webview exposes 10 operations:

| Command                      | Description                            |
| ---------------------------- | -------------------------------------- |
| `docker-enable-runner`       | Enable Docker Model Runner             |
| `docker-start-compose`       | Start Ollama container                 |
| `docker-check-status`        | Check Docker availability              |
| `docker-check-ollama-status` | Check Ollama container status          |
| `docker-get-models`          | List all local models                  |
| `docker-get-local-model`     | Get current local model config         |
| `docker-pull-model`          | Pull a Docker model                    |
| `docker-pull-ollama-model`   | Pull an Ollama model                   |
| `docker-delete-model`        | Delete a model                         |
| `docker-use-model`           | Switch to a model (with port fallback) |

## Terminal security

Docker commands executed through the terminal are strictly whitelisted. Only these argument patterns pass validation:

- Model operations: `model ls`, `model pull <name>`, `model rm <name>`
- Container operations: `ps --filter name=ollama`, `compose up -d`, `exec ollama ollama list`
- MCP operations: `mcp server ls`, `mcp gateway run`
- Setup: `desktop enable model-runner --tcp=12434`

Model names are validated against `/^[a-zA-Z0-9/:\-.]+$/` to prevent injection.

## Configuration

Docker integration uses existing local model settings — there are no Docker-specific settings:

| Setting               | Description                                       |
| --------------------- | ------------------------------------------------- |
| `local.model`         | Model name (auto-set when using "Use Model")      |
| `local.baseUrl`       | Endpoint URL (auto-set with port fallback)        |
| `generativeAi.option` | Set to `"Local"` when switching to a Docker model |

See [Local Models](/concepts/local-models/) for the full local model setup guide.
