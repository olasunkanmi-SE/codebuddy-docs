---
title: GitHub
description: Manage repositories, issues, pull requests, and Actions workflows via the GitHub CLI.
---

|              |                                 |
| ------------ | ------------------------------- |
| **Category** | Version Control                 |
| **CLI**      | [`gh`](https://cli.github.com/) |
| **Auth**     | OAuth (`gh auth login`)         |

## What it does

Wraps the GitHub CLI (`gh`) to give CodeBuddy full access to your GitHub repositories. The agent can create issues, open pull requests, trigger workflow runs, manage releases, and search code — all through natural language.

## Prerequisites

Install the GitHub CLI and authenticate:

```bash
# macOS
brew install gh

# Linux
sudo apt install gh   # Debian/Ubuntu
sudo dnf install gh   # Fedora

# Windows
winget install GitHub.cli
```

Then log in:

```bash
gh auth login
```

Verify it works:

```bash
gh auth status
```

## Capabilities

- **Issues** — create, list, view, close, label, assign, comment
- **Pull requests** — create, list, review, merge, check status
- **Actions** — trigger workflows, view run status, download logs
- **Branches** — create, delete, list, compare
- **Releases** — create, list, download assets
- **Code search** — search across repositories and organizations
- **Repos** — create, clone, fork, view settings

## Example prompts

- "Create a GitHub issue titled 'Fix login timeout' with the `bug` label"
- "Open a PR from `feature/auth` to `main` with a summary of changes"
- "List all open PRs that need my review"
- "Trigger the CI workflow on the `develop` branch"
- "Show me the last 5 failed Actions runs"
