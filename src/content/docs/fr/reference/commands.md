---
title: Commands Reference
description: Complete list of all CodeBuddy commands, keyboard shortcuts, and where they appear.
---

CodeBuddy registers **52 commands** in the command palette, plus several internal commands used programmatically. Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and type "CodeBuddy" to see all available commands.

## Code actions

These commands operate on the current editor selection. They appear in the **editor context menu** (right-click) when text is selected.

| Command                                 | Shortcut (Mac / Win)           | What it does                                               |
| --------------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| **Add Comment to Selected Code**        | `Cmd+Shift+J` / `Ctrl+Shift+J` | Generates explanatory comments for the selected code       |
| **Review Selected Code**                | `Cmd+Shift+R` / `Ctrl+Shift+R` | Runs an AI code review for best-practice compliance        |
| **Refactor Selected Code**              | `Cmd+Shift+;` / `Ctrl+Shift+;` | AI-driven refactoring for readability and maintainability  |
| **Optimize Selected Code**              | `Cmd+Shift+0` / `Ctrl+Shift+0` | AI-driven optimization for performance and efficiency      |
| **Explain This Code**                   | `Cmd+Shift+1` / `Ctrl+Shift+1` | Provides a clear explanation of the selected code          |
| **Generate Commit Message**             | `Cmd+Shift+2` / `Ctrl+Shift+2` | Generates a commit message from the current git diff       |
| **Inline Chat**                         | `Cmd+Shift+8` / `Ctrl+Shift+8` | Opens an inline chat dialog in the editor                  |
| **Interview Me**                        | —                              | Generates technical interview questions from selected code |
| **Generate Architectural Diagram**      | `Cmd+Shift+7` / `Ctrl+Shift+7` | Creates a Mermaid diagram from the selected code           |
| **Analyze Codebase & Answer Questions** | `Cmd+Shift+6` / `Ctrl+Shift+6` | Runs full architectural analysis of the workspace          |
| **Review Pull Request**                 | —                              | Conducts a comprehensive AI-driven PR review               |

## Automation triggers

Manually trigger scheduled automations. These normally run on their configured schedules, but you can invoke them on demand.

| Command                        | What it does                                              |
| ------------------------------ | --------------------------------------------------------- |
| **Trigger Daily Standup**      | Generates a standup report from recent git activity       |
| **Trigger Code Health Check**  | Scans the codebase for health issues, hotspots, and TODOs |
| **Trigger Dependency Check**   | Checks dependencies for vulnerabilities and updates       |
| **Trigger Git Watchdog**       | Monitors git state for anomalies on protected branches    |
| **Trigger End-of-Day Summary** | Generates a summary of the day's coding activity          |

## Integration commands

| Command                                | What it does                                       |
| -------------------------------------- | -------------------------------------------------- |
| **Jira Tickets (List, Branch, View)**  | Lists Jira tickets and creates branches from them  |
| **GitLab Issues (List, Branch, View)** | Lists GitLab issues and creates branches from them |

## Security & administration

These commands require an open workspace.

| Command                           | What it does                                                                |
| --------------------------------- | --------------------------------------------------------------------------- |
| **Run Doctor**                    | Executes 9 diagnostic checks and reports findings with severity levels      |
| **Doctor Auto-Fix**               | Automatically fixes all fixable issues found by Doctor                      |
| **Run Security Diagnostics**      | Runs security diagnostics and outputs to the "CodeBuddy Security" channel   |
| **Open External Security Config** | Opens the external security configuration file                              |
| **Show Onboarding Wizard**        | Re-shows the 5-step setup wizard                                            |
| **Credential Proxy Audit Log**    | Displays the credential proxy audit log (method, provider, status, latency) |

## Permission & access control

| Command                        | What it does                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------- |
| **Switch Permission Profile**  | Quick-pick to switch between `restricted`, `standard`, and `trusted` profiles |
| **Switch Access Control Mode** | Quick-pick to switch between `open`, `allow`, and `deny` modes                |
| **Access Control Audit Log**   | Dumps allowed/denied actions per user to the output channel                   |

## Workspace & context

| Command                                 | What it does                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| **Index Workspace for Semantic Search** | Indexes the workspace into a vector DB for semantic code search                   |
| **Init .codebuddyignore**               | Creates a `.codebuddyignore` file with defaults, or opens an existing one         |
| **Clear Workspace Context**             | Clears all chat history and sessions for the current workspace                    |
| **Generate Documentation**              | Auto-generates README, API docs, and architecture diagrams from codebase analysis |

## Checkpoints

| Command                  | What it does                                                          |
| ------------------------ | --------------------------------------------------------------------- |
| **Revert to Checkpoint** | Shows a list of workspace checkpoints and reverts to the selected one |

## Diff review

| Command            | Where it appears                 | What it does                                             |
| ------------------ | -------------------------------- | -------------------------------------------------------- |
| **Apply Change**   | Editor title bar (on diff views) | Applies a pending diff change to the file on disk        |
| **Discard Change** | Editor title bar (on diff views) | Removes a pending diff change and closes the diff editor |

These buttons appear as check (✓) and close (✕) icons in the editor title bar when viewing a CodeBuddy diff (`codebuddy-diff` scheme).

## Composer sessions

| Command                          | What it does                                                             |
| -------------------------------- | ------------------------------------------------------------------------ |
| **Review Composer Session**      | Shows session summary with Apply All / Reject All / Review Files options |
| **Apply Composer Session**       | Applies all changes in a composer session at once                        |
| **Reject Composer Session**      | Discards all changes in a composer session                               |
| **Clear Inline Review Comments** | Clears all inline comment threads created by code reviews                |

## Project rules

| Command                      | Shortcut                       | What it does                                              |
| ---------------------------- | ------------------------------ | --------------------------------------------------------- |
| **Open Project Rules**       | `Cmd+Shift+9` / `Ctrl+Shift+9` | Opens `.codebuddy/rules.md` for editing                   |
| **Initialize Project Rules** | —                              | Creates a new `.codebuddy/rules.md` with scaffold content |
| **Reload Project Rules**     | —                              | Reloads rules from disk into the active service           |

## Inline completion

| Command                           | What it does                                             |
| --------------------------------- | -------------------------------------------------------- |
| **Toggle Inline Completions**     | Toggles `codebuddy.completion.enabled` on or off         |
| **Configure Completion Settings** | Opens editor settings filtered to `codebuddy.completion` |

## Agent queue

| Command                              | What it does                                                                       |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| **Show Agent Queue Status**          | Shows running and queued agent slots; allows cancelling individual or all requests |
| **Cancel All Queued Agent Requests** | Cancels all waiting agent requests in the concurrency queue                        |

## Smart reader

| Command                               | What it does                                                |
| ------------------------------------- | ----------------------------------------------------------- |
| **Open URL in Smart Reader**          | Prompts for a URL and opens it in the built-in reader panel |
| **Open Selection in Smart Reader**    | Opens the selected URL text in the reader panel             |
| **Open Current Page in Smart Reader** | Re-opens the last browsed URL in the reader                 |

## Codebase analysis

These are internal commands triggered via the **Analyze Codebase** flow:

| Command               | What it does                                                                       |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Show Cache Status** | Displays analysis cache status (snapshots, DB size, timestamps) in a webview panel |
| **Clear Cache**       | Clears the persistent codebase analysis cache                                      |
| **Refresh Analysis**  | Force-refreshes codebase analysis with progress notification                       |

## Keyboard shortcuts summary

| Shortcut (Mac) | Shortcut (Win/Linux) | Command                             |
| -------------- | -------------------- | ----------------------------------- |
| `Cmd+Shift+J`  | `Ctrl+Shift+J`       | Add Comment to Selected Code        |
| `Cmd+Shift+R`  | `Ctrl+Shift+R`       | Review Selected Code                |
| `Cmd+Shift+;`  | `Ctrl+Shift+;`       | Refactor Selected Code              |
| `Cmd+Shift+0`  | `Ctrl+Shift+0`       | Optimize Selected Code              |
| `Cmd+Shift+1`  | `Ctrl+Shift+1`       | Explain This Code                   |
| `Cmd+Shift+2`  | `Ctrl+Shift+2`       | Generate Commit Message             |
| `Cmd+Shift+6`  | `Ctrl+Shift+6`       | Analyze Codebase & Answer Questions |
| `Cmd+Shift+7`  | `Ctrl+Shift+7`       | Generate Architectural Diagram      |
| `Cmd+Shift+8`  | `Ctrl+Shift+8`       | Inline Chat                         |
| `Cmd+Shift+9`  | `Ctrl+Shift+9`       | Open Project Rules                  |
