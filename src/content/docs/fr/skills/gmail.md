---
title: Gmail
description: Read and send Gmail messages via gmail-cli with OAuth authentication.
---

|              |                                     |
| ------------ | ----------------------------------- |
| **Category** | Communication                       |
| **CLI**      | `gmail-cli` (custom Python)         |
| **Auth**     | OAuth (`gmail-cli auth`)            |
| **Config**   | `GMAIL_CREDENTIALS_PATH` (optional) |

## What it does

Wraps a Python-based `gmail-cli` to give CodeBuddy read and send access to your Gmail account via OAuth. More capable than the generic Email skill for Gmail-specific features like labels, threads, and search.

## Prerequisites

Install the CLI and authenticate:

```bash
pip install gmail-cli
gmail-cli auth
```

The skill includes a bundled `install.sh` for automated setup. The OAuth flow opens a browser window for Google sign-in.

Optionally set the credentials path:

```bash
export GMAIL_CREDENTIALS_PATH="~/.gmail-cli/credentials.json"
```

## Capabilities

- **Read** — list messages, search by query, view threads
- **Send** — compose and send messages, reply to threads
- **Labels** — list, apply, remove
- **Search** — Gmail search operators (from:, to:, subject:, has:attachment, etc.)

## Example prompts

- "Show my unread emails from the last 24 hours"
- "Search for emails from `notifications@github.com` with attachments"
- "Send a reply to the latest thread from the product team"
