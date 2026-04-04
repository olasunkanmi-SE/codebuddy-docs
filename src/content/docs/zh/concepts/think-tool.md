---
title: Think Tool
description: Structured reasoning tool that lets the agent plan and analyze before acting, complementing Deep Agents' built-in TodoListMiddleware for task decomposition.
---

The `think` tool gives the agent a dedicated space for structured reasoning. Instead of immediately calling tools or generating code, the agent can pause to analyze information, plan multi-step approaches, and reason through complex problems.

This complements the [Deep Agents](https://github.com/langchain-ai/deepagentsjs) `write_todos` tool (provided by `TodoListMiddleware`) — while `write_todos` tracks task progress externally, `think` enables internal deliberation before committing to actions.

## When it's used

The agent invokes `think` when it needs to:

- **Analyze tool outputs** — Process results from previous tool calls before deciding the next step
- **Plan multi-step solutions** — Break down a complex request into numbered action steps
- **Evaluate trade-offs** — Compare implementation approaches before committing
- **Follow complex guidelines** — Reason through project rules or coding standards
- **Debug systematically** — Formulate hypotheses about a bug before inspecting code

## How it works

The think tool accepts a single `thought` parameter — a free-form string where the agent writes its reasoning. The tool doesn't execute code, fetch data, or make changes. It simply creates space for deliberate analysis in the agent's execution trace.

```
Agent: [think]
  The user wants to refactor the authentication module. Let me analyze:
  1. Current auth is in src/auth/ with 3 files: login.ts, session.ts, middleware.ts
  2. login.ts has a SQL injection vulnerability (string concatenation in query)
  3. session.ts uses in-memory store — won't work in multi-instance deployment
  4. middleware.ts is clean but could use rate limiting

  Plan:
  1. Fix SQL injection in login.ts first (security priority)
  2. Migrate session store to Redis adapter pattern
  3. Add rate limiting middleware
  4. Update tests for each change
```

## Output

The tool returns the agent's thought as a structured plan, which becomes part of the conversation context. This means:

- The agent can reference its own reasoning in subsequent turns
- The user can see the agent's thought process in the conversation
- The plan guides the agent's subsequent tool calls

## Why it matters

Without `think`, agents tend to act impulsively — calling the first tool that seems relevant. The think tool encourages a "plan then act" workflow that produces more coherent multi-step solutions, especially for:

- Large refactoring tasks
- Debugging sessions with multiple hypotheses
- Architecture decisions with trade-offs
- Tasks that span multiple files
