---
title: Telegram
description: Send messages and notifications via telegram-send.
---

|              |                                                            |
| ------------ | ---------------------------------------------------------- |
| **Category** | Communication                                              |
| **CLI**      | [`telegram-send`](https://github.com/rahiel/telegram-send) |
| **Auth**     | Bot token (`telegram-send --configure`)                    |
| **Config**   | `TELEGRAM_CONFIG` (optional)                               |

## What it does

Wraps `telegram-send` to let CodeBuddy send messages to Telegram chats. Useful for sending notifications, build results, and alerts to personal or group chats.

## Prerequisites

Install and configure:

```bash
pip install telegram-send
telegram-send --configure
```

The configure step walks you through creating a Telegram bot and linking it to a chat. Optionally set a custom config path:

```bash
export TELEGRAM_CONFIG="~/.config/telegram-send.conf"
```

## Capabilities

- **Messages** — send text messages to configured chats
- **Files** — send files and images
- **Formatting** — Markdown and HTML message formatting
- **Groups** — send to group chats (configure with `--configure-group`)

## Example prompts

- "Send a Telegram message that the deployment to production succeeded"
- "Notify the team chat that the build failed with the error details"
- "Send today's standup summary to my Telegram"
