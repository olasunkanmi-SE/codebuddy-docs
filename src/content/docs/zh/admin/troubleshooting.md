---
title: Troubleshooting
description: Built-in diagnostics, common issues, and resolution steps.
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I fix 'API key not configured' in CodeBuddy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open settings and add your API key: set codebuddy.anthropic.apiKey to your key, or export CODEBUDDY_ANTHROPIC_API_KEY as an environment variable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I fix 'MCP server failed to start'?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Check your server configuration in .codebuddy/mcp.json, ensure Node.js 18+ is installed, verify Docker is running for Docker servers, and test the server command manually. If the circuit breaker tripped after 3+ failures, wait 5 minutes or restart the extension."
      }
    },
    {
      "@type": "Question",
      "name": "What does 'Task exceeded cost limit' mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The task consumed more tokens than the configured codebuddy.costLimit. Increase the limit or switch to a more cost-efficient model like gpt-4o-mini."
      }
    },
    {
      "@type": "Question",
      "name": "Why am I seeing 'Tool call denied'?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The active permission profile blocks the tool, or auto-approve is off. Either approve the tool call when prompted, change the permission profile, or add the tool to codebuddy.autoApproveTools."
      }
    },
    {
      "@type": "Question",
      "name": "How do I fix 'Forced stop: max tool invocations'?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The agent hit the 400 tool-call safety limit. This usually means it is looping. Provide more specific instructions, check if a file is being edited repeatedly, or review .codebuddy/rules.md for conflicts."
      }
    },
    {
      "@type": "Question",
      "name": "What does 'Provider failover active' mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The primary LLM provider is returning errors. CodeBuddy automatically fails over to backup providers. Check your API key validity, rate limits, and provider status pages. Cooldowns: rate limit (1 min), auth (10 min), billing (30 min), overloaded (2 min)."
      }
    }
  ]
}
</script>

## Doctor command

Run the built-in diagnostic tool to verify your setup:

```
CodeBuddy: Run Doctor
```

Doctor executes **9 automated checks** and reports findings with severity levels:

| Check                      | What it verifies                                            |
| -------------------------- | ----------------------------------------------------------- |
| **API key audit**          | API keys are configured and valid for the selected provider |
| **Input validator**        | Input guard is functioning (prevents injection)             |
| **Terminal restrictions**  | Dangerous command patterns are properly blocked             |
| **Directory permissions**  | Workspace and `.codebuddy/` directories are writable        |
| **MCP configuration**      | MCP server configs are valid and servers are reachable      |
| **Security configuration** | Permission profile and access control are properly set      |
| **Credential proxy**       | Proxy is running and responding (if enabled)                |
| **Permission scope**       | Tool allowlist/blocklist is consistent                      |
| **Access control**         | User identity resolution and access mode are working        |

### Finding severity levels

| Level        | Meaning                                 |
| ------------ | --------------------------------------- |
| **critical** | Something is broken and must be fixed   |
| **warn**     | Potential issue that may cause problems |
| **info**     | Informational — no action needed        |

Some findings include an **auto-fix** flag. Run `CodeBuddy: Doctor Auto-Fix` to apply automatic corrections.

Doctor can also run silently in the background (`runBackground()`) and show alerts in the status bar without interrupting your workflow.

## Common issues

### "API key not configured"

**Cause**: No API key set for the selected provider.

**Fix**: Open settings and add your API key:

```json
{
  "codebuddy.anthropic.apiKey": "sk-ant-..."
}
```

Or set it via environment variable:

```bash
export CODEBUDDY_ANTHROPIC_API_KEY="sk-ant-..."
```

### "MCP server failed to start"

**Cause**: The MCP server command is invalid, dependencies are missing, or Docker is not running.

**Fix**:

1. Check your server configuration in `.codebuddy/mcp.json`
2. Ensure Node.js 18+ is installed (for stdio servers)
3. For Docker gateway: verify Docker Desktop is running with `docker info`
4. Test the server command manually:
   ```bash
   npx -y @your-org/mcp-server
   ```
5. Check the circuit breaker — if a server failed 3+ times, it enters a 5-minute cooldown. Wait or restart the extension.

### "Task exceeded cost limit"

**Cause**: The task consumed more tokens than the configured `codebuddy.costLimit`.

**Fix**: Increase the limit or use a more cost-efficient model:

```json
{
  "codebuddy.costLimit": 5.0,
  "codebuddy.defaultModel": "gpt-4o-mini"
}
```

### "Tool call denied"

**Cause**: The active permission profile blocks the tool, or auto-approve is off.

**Fix**: Either approve the tool call when prompted, change the permission profile, or add the tool to auto-approve:

```json
{
  "codebuddy.autoApproveTools": ["read_file", "edit_file"],
  "codebuddy.security.permissionProfile": "standard"
}
```

### "Forced stop: max tool invocations"

**Cause**: The agent hit the 400 tool-call safety limit or the 2,000 event limit.

**Fix**: This usually means the agent is looping. Check if:

- The task is too vague — provide more specific instructions
- A file is being edited repeatedly — the file edit loop detector triggers at 4 edits to the same file
- Project rules conflict with the task — review `.codebuddy/rules.md`

You can increase limits (not generally recommended):

```json
{
  "codebuddy.agent.maxToolInvocations": 600,
  "codebuddy.agent.maxEvents": 3000
}
```

### "Provider failover active"

**Cause**: The primary LLM provider is returning errors (429, 503, auth failure, etc.).

**Fix**: CodeBuddy automatically fails over to backup providers. Check:

- Your API key is valid and has sufficient credits
- You haven't exceeded the provider's rate limit
- The provider's status page for outages

Cooldown durations: rate limit (1 min), auth (10 min), billing (30 min), overloaded (2 min).

### Extension not loading

1. Check editor version (requires 1.96.0+ or equivalent)
2. Disable other AI extensions that may conflict
3. Check the Output panel → CodeBuddy for error logs
4. Run `CodeBuddy: Run Doctor` for diagnostics
5. Check `.codebuddy/logs/` for detailed agent logs

## Log files

Agent logs are written to `.codebuddy/logs/codebuddy-{date}.log` with structured JSON entries:

```json
{
  "timestamp": "2026-03-26T10:30:00.000Z",
  "level": "ERROR",
  "module": "MCPService",
  "message": "Connection failed",
  "traceId": "abc123",
  "sessionId": "def456"
}
```

Logs use a 1,000-entry circular buffer and include OpenTelemetry trace IDs for distributed debugging.

## Getting help

- **GitHub Issues**: [github.com/olasunkanmi-SE/codebuddy/issues](https://github.com/olasunkanmi-SE/codebuddy/issues)
- **Discussions**: Ask questions and share tips in GitHub Discussions
