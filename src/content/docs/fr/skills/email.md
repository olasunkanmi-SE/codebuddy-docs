---
title: Email (SMTP)
description: Send emails via mailsend-go SMTP client.
---

|              |                                                                   |
| ------------ | ----------------------------------------------------------------- |
| **Category** | Communication                                                     |
| **CLI**      | [`mailsend`](https://github.com/muquit/mailsend-go) (mailsend-go) |
| **Auth**     | Basic (SMTP credentials)                                          |
| **Config**   | `SMTP_HOST`, `SMTP_PORT` (optional)                               |

## What it does

Wraps `mailsend-go` to let CodeBuddy send emails via SMTP. The agent can compose and send emails with attachments, useful for automated notifications, reports, and team communication.

## Prerequisites

Install mailsend-go:

```bash
# macOS
brew install mailsend-go

# Linux — download from GitHub releases
# https://github.com/muquit/mailsend-go/releases
```

Configure your SMTP server:

```bash
export SMTP_HOST="smtp.gmail.com"
export SMTP_PORT="587"
```

## Capabilities

- **Send** — compose and send emails with subject, body, recipients
- **Attachments** — attach files from the workspace
- **CC/BCC** — multiple recipients
- **HTML** — send HTML-formatted emails

## Example prompts

- "Send an email to team@company.com with today's build report"
- "Email the test results to the QA team with the log file attached"
