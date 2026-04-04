---
title: GitLab
description: Manage GitLab repositories, merge requests, issues, and CI/CD pipelines via glab.
---

|              |                                             |
| ------------ | ------------------------------------------- |
| **Category** | Version Control                             |
| **CLI**      | [`glab`](https://gitlab.com/gitlab-org/cli) |
| **Auth**     | OAuth (`glab auth login`)                   |
| **Config**   | `GITLAB_HOST` (optional, for self-hosted)   |

## What it does

Wraps the GitLab CLI (`glab`) to give CodeBuddy access to your GitLab projects. The agent can manage merge requests, issues, CI/CD pipelines, and more.

## Prerequisites

Install and authenticate:

```bash
# macOS
brew install glab

# Linux
brew install glab  # or download from https://gitlab.com/gitlab-org/cli/-/releases

# Windows
winget install GLab.GLab
```

```bash
glab auth login
```

For self-hosted GitLab:

```bash
export GITLAB_HOST="https://gitlab.yourcompany.com"
glab auth login --hostname gitlab.yourcompany.com
```

## Capabilities

- **Merge requests** — create, list, review, approve, merge
- **Issues** — create, list, assign, label, close
- **CI/CD** — trigger pipelines, view job logs, retry failed jobs
- **Repos** — clone, fork, view project settings
- **Releases** — create, list, download assets

## Example prompts

- "Create a merge request from `feature/auth` to `main`"
- "Show all open MRs that need my review"
- "Retry the failed CI job on pipeline #1234"
- "List all issues labeled `critical` in this project"
