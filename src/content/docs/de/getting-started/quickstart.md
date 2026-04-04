---
title: Quickstart
description: Run your first task with CodeBuddy in under 5 minutes.
---

This guide walks you through your first CodeBuddy interaction — from opening the chat panel to reviewing and applying code changes.

## Prerequisites

- CodeBuddy installed in your editor ([Installation](/getting-started/installation/))
- An API key configured for at least one AI provider

## Open the chat panel

Click the **CodeBuddy icon** in the activity bar (left sidebar) to open the chat panel, or use the keyboard shortcut:

- **macOS**: `Cmd+Shift+B`
- **Windows/Linux**: `Ctrl+Shift+B`

## Send your first task

Type a task in natural language. For example:

```
Create a utility function that validates email addresses and write tests for it
```

CodeBuddy will:

1. Analyze your project structure, language, and framework
2. Create an execution plan using the `think` tool
3. Write the utility function using `edit_file`
4. Generate test cases and run them with `run_tests`
5. Present a diff for you to review

You'll see real-time progress as the agent works — tool calls, file reads, terminal output, and reasoning steps are all streamed to the chat panel.

## Review and apply changes

CodeBuddy shows proposed changes in a **diff view** powered by the `DiffReviewService`. Each change displays added lines (green) and removed lines (red) with 3 lines of context around each hunk.

| Action          | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| **Accept all**  | Apply every proposed change                                   |
| **Accept file** | Apply changes for a specific file only                        |
| **Reject**      | Discard all changes and optionally ask CodeBuddy to try again |
| **Edit**        | Modify the proposed changes before applying                   |

All changes are tracked. You can undo the last set of changes with `CodeBuddy: Undo Last Changes` from the command palette.

## Try multi-agent delegation

For more complex tasks, CodeBuddy automatically delegates to specialized subagents:

```
Refactor the authentication module to use JWT tokens. Design the new architecture,
implement it, write tests, and create documentation.
```

This task triggers multiple agents:

- **architect** — Designs the JWT architecture
- **Developer Agent** — Implements the changes
- **tester** — Writes and runs tests
- **doc-writer** — Creates documentation
- **reviewer** — Reviews the final implementation

## Use memory

Ask CodeBuddy to remember project-specific knowledge:

```
Remember that we always use Zod for input validation in this project
```

This saves a `Rule` memory entry in the project scope. CodeBuddy will follow this convention in all future conversations in this workspace.

## What's next?

- [Multi-Agent Architecture](/concepts/architecture/) — Understand how subagents collaborate
- [Skills](/features/skills/) — Connect to GitHub, Jira, AWS, and more
- [Configuration](/getting-started/configuration/) — Customize providers, limits, and security
