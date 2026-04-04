---
title: Skills
description: Pre-built integrations that connect CodeBuddy to external services through a three-source discovery hierarchy.
---

Skills are pre-built integrations that connect CodeBuddy to external services like GitHub, Jira, databases, cloud providers, and monitoring tools. The `SkillManager` discovers skills from three sources, handles dependency installation (OS-aware), and injects skill prompts into the agent's context.

## Available skills

| Skill                             | Category           | Description                                  |
| --------------------------------- | ------------------ | -------------------------------------------- |
| [AWS](/skills/aws/)               | Cloud              | EC2, S3, Lambda, CloudWatch, IAM management  |
| [Datadog](/skills/datadog/)       | Monitoring         | Query metrics, logs, traces, and monitors    |
| [GitHub](/skills/github/)         | Version Control    | Issues, PRs, Actions, branches, releases     |
| [Jira](/skills/jira/)             | Project Management | Create/update issues, manage sprints         |
| [Kubernetes](/skills/kubernetes/) | Infrastructure     | Pods, deployments, services, logs            |
| [PostgreSQL](/skills/postgres/)   | Database           | SQL queries, schema management, backups      |
| [Sentry](/skills/sentry/)         | Monitoring         | Error tracking, issue triage, release health |

Additional skills available: Elasticsearch, Email, GitLab, Gmail, Linear, MongoDB, MySQL, Redis, Telegram.

## Discovery hierarchy

Skills are loaded from three sources. Higher priority sources override lower ones:

| Priority    | Source    | Path                   | Scope                             |
| ----------- | --------- | ---------------------- | --------------------------------- |
| 1 (highest) | Workspace | `.codebuddy/skills/`   | Project-specific skills           |
| 2           | Global    | `~/.codebuddy/skills/` | User-wide skills (all workspaces) |
| 3 (lowest)  | Built-in  | Bundled with extension | Default skill catalog             |

## Installing a skill

Activate skills through the command palette:

```
CodeBuddy: Install Skill
```

Or ask CodeBuddy directly:

```
Install the GitHub skill so I can manage issues
```

### Dependency management

Skills can declare CLI dependencies (e.g., `aws` CLI, `kubectl`, `psql`). The `SkillService` handles installation across platforms:

| Platform    | Package managers        |
| ----------- | ----------------------- |
| **macOS**   | brew, npm, pip          |
| **Linux**   | apt, snap, npm, pip     |
| **Windows** | choco, winget, npm, pip |

Installation results are cached for 30 seconds to avoid repeated subprocess calls. Architecture-specific binaries (x64, arm64) are selected automatically.

### Environment isolation

Skills run with a restricted environment. These sensitive environment variables are blocked:

`LD_PRELOAD`, `DYLD_INSERT_LIBRARIES`, `PATH`, `HOME`, `SHELL`, `SSH_AUTH_SOCK`, `GPG_AGENT_INFO`, `HISTFILE`, and others (14 total).

## Using skills

Once installed, skills are available automatically. Just ask CodeBuddy to perform actions related to the skill:

```
Create a Jira ticket for the login bug we just fixed
```

```
Show me the Redis cache hit rate from Datadog for the last hour
```

```
Deploy the latest image to the staging Kubernetes cluster
```

## Creating custom skills

Create a directory under `.codebuddy/skills/` with a `SKILL.md` file:

```
.codebuddy/skills/
  my-skill/
    SKILL.md          # Required: skill definition
    scripts/          # Optional: bundled scripts
    install.sh        # Optional: installation script
```

The `SKILL.md` uses YAML frontmatter for metadata and Markdown for instructions:

```markdown
---
name: api-auditor
displayName: API Auditor
description: Audit and test API endpoints for reliability
category: testing
version: 1.0.0
dependencies:
  - name: curl
    check: curl --version
---

# API Auditor

When this skill is active, you audit API endpoints by...
```

### Frontmatter fields

| Field          | Required | Description                                        |
| -------------- | -------- | -------------------------------------------------- |
| `name`         | Yes      | Unique identifier                                  |
| `displayName`  | No       | Human-readable name for UI                         |
| `description`  | Yes      | When to activate — matched against user requests   |
| `icon`         | No       | Emoji or icon identifier                           |
| `category`     | No       | Skill category (cloud, database, monitoring, etc.) |
| `version`      | No       | Semantic version                                   |
| `dependencies` | No       | CLI tools needed (with check commands)             |
| `config`       | No       | Configuration fields the skill needs               |
| `auth`         | No       | Authentication type (api-key, oauth, cli)          |

See the [Skills API reference](/reference/skills-api/) for a full tutorial on creating custom skills.
