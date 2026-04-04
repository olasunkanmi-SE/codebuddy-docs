---
title: Jira
description: Manage Jira issues, sprints, and boards via the Jira CLI.
---

|              |                                                                            |
| ------------ | -------------------------------------------------------------------------- |
| **Category** | Project Management                                                         |
| **CLI**      | [`jira`](https://github.com/ankitpokhrel/jira-cli) (ankitpokhrel/jira-cli) |
| **Auth**     | API key (`jira init`)                                                      |
| **Config**   | `JIRA_API_TOKEN` (required), `JIRA_BASE_URL` (required)                    |

## What it does

Wraps the `jira` CLI to give CodeBuddy access to your Atlassian Jira instance. The agent can create issues, manage sprints, search with JQL, and link code changes to tickets.

## Prerequisites

Install the Jira CLI:

```bash
# macOS
brew install ankitpokhrel/jira-cli/jira-cli

# Linux / Windows
go install github.com/ankitpokhrel/jira-cli/cmd/jira@latest
```

Then initialize:

```bash
jira init
```

This prompts for your Jira base URL, email, and API token. You can also set environment variables:

```bash
export JIRA_API_TOKEN="your-api-token"
export JIRA_BASE_URL="https://your-org.atlassian.net"
```

## Capabilities

- **Issues** — create, update, assign, transition, comment
- **Sprints** — list, manage, add/remove issues
- **Search** — JQL queries, filters
- **Boards** — list, view backlog, active sprint
- **Time tracking** — log work, view time spent

## Example prompts

- "Create a Jira story in the AUTH sprint for implementing password reset"
- "Show me all unresolved bugs assigned to me"
- "Move PROJ-123 to 'In Review' and add a comment with the PR link"
- "What's in the current sprint backlog?"
