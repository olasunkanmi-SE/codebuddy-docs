---
title: Linear
description: Manage Linear issues, projects, and cycles via the Linear CLI.
---

|              |                                                                |
| ------------ | -------------------------------------------------------------- |
| **Category** | Project Management                                             |
| **CLI**      | [`linear`](https://github.com/linear/linear-cli) (@linear/cli) |
| **Auth**     | API key                                                        |
| **Config**   | `LINEAR_API_KEY` (required), `LINEAR_TEAM_ID` (optional)       |

## What it does

Wraps the Linear CLI to give CodeBuddy access to your Linear workspace. The agent can create and manage issues, browse projects and cycles, and search across your team's work.

## Prerequisites

Install the Linear CLI:

```bash
npm install -g @linear/cli
```

Set your API key (generate one at **Linear → Settings → API**):

```bash
export LINEAR_API_KEY="lin_api_..."
```

Optionally set a default team:

```bash
export LINEAR_TEAM_ID="TEAM-ID"
```

## Capabilities

- **Issues** — create, update, assign, change status, comment
- **Projects** — list, view progress, milestones
- **Cycles** — view current cycle, upcoming, completed
- **Search** — full-text search across issues and projects
- **Labels** — apply, create, list

## Example prompts

- "Create a Linear issue for the login bug and assign it to me"
- "What's left in the current cycle?"
- "Move LIN-456 to 'In Review'"
- "Show all high-priority issues in the Backend project"
