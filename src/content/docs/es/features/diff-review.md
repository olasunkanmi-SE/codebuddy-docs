---
title: Diff Review
description: LCS-based diff review with per-hunk accept/reject and editor integration.
---

CodeBuddy never modifies your code without your knowledge. Every change goes through the `DiffReviewService`, which computes line-level diffs, groups them into reviewable hunks, and lets you accept or reject changes selectively.

## How it works

When CodeBuddy proposes code changes, the `DiffReviewService`:

1. Computes a **longest common subsequence (LCS)** diff between the original and proposed content
2. Groups consecutive changes into **hunks** with 3 lines of context around each change
3. Presents the diff in the editor using a custom `TextDocumentContentProvider` (scheme: `codebuddy-diff`)
4. Tracks each change so it can be undone later

The service maintains a history of the 50 most recent changes for undo support.

## Review options

| Action          | Description                                           |
| --------------- | ----------------------------------------------------- |
| **Accept all**  | Apply every proposed change across all files          |
| **Accept file** | Apply changes for a specific file only                |
| **Accept hunk** | Apply a single diff hunk while leaving others pending |
| **Reject**      | Discard all changes                                   |
| **Edit**        | Modify the proposed changes before applying           |

Each hunk shows:

- **Added lines** in green
- **Removed lines** in red
- **Context lines** (3 above and below each change)

## Auto-approve mode

For workflows where you trust CodeBuddy, enable auto-approve:

```json
{
  "codebuddy.autoApprove": true
}
```

With auto-approve enabled, safe operations (file reads, searches, diagnostics) proceed automatically. Write operations still show diffs unless `codebuddy.requireDiffApproval` is set to `false`.

## Inline review comments

When you run **Review Selected Code** or a PR review, CodeBuddy can annotate your files with inline comment threads using the Comments API.

### How it works

The `InlineReviewService` parses the LLM's review output and creates comment threads directly in your editor:

- Comments appear as gutter annotations with severity-colored indicators
- Each thread shows the severity label, title, and full body
- Comments are read-only (no reply widget) — they're informational

### Severity levels

| Severity     | Icon | Meaning                                       |
| ------------ | ---- | --------------------------------------------- |
| **Critical** | 🔴   | Security vulnerability, data loss risk, crash |
| **Moderate** | 🟡   | Logic error, performance issue, bad practice  |
| **Minor**    | 🔵   | Style issue, naming, minor improvement        |
| **Info**     | ℹ️   | Suggestion, alternative approach              |

### Parsing review output

The service uses a two-pass parser:

1. **JSON extraction** — Looks for a `REVIEW_COMMENTS` JSON block in the LLM output
2. **Markdown fallback** — If no JSON found, parses markdown headers with severity indicators (🔴, 🟡, 🔵 emojis, or "Critical Issues" / "Moderate Issues" headers)

The parser stops at non-issue sections (strengths, recommendations, optimizations) to avoid false positives.

### Settings

| Setting                           | Type    | Default | Description                              |
| --------------------------------- | ------- | ------- | ---------------------------------------- |
| `codebuddy.review.inlineComments` | boolean | `true`  | Enable inline comment thread annotations |

### Commands

| Command                          | What it does                               |
| -------------------------------- | ------------------------------------------ |
| **Clear Inline Review Comments** | Removes all comment threads from all files |

Thread count is capped at 500 to prevent performance degradation on large reviews.

## Pull request review

The **Review Pull Request** command runs a comprehensive review of the current branch's changes:

1. **Change detection** — Identifies modified files by comparing against the base branch
2. **Branch selection** — Auto-detects the base branch or prompts you to select one
3. **Diff generation** — Computes diffs for all changed files
4. **LLM review** — Sends the diff to the LLM with a review-specific prompt
5. **Inline annotations** — Results appear as inline comment threads (if enabled)
6. **Summary** — A high-level summary appears in the chat panel

The PR review prompt builder structures the diff for optimal LLM analysis, including file paths, change types (added/modified/deleted), and surrounding context.

## Undo

All changes made by CodeBuddy are tracked. Undo the last set of changes with:

```
CodeBuddy: Undo Last Changes
```

Or use the editor's built-in undo (`Cmd+Z`) for individual file changes. The diff service emits events (`added`, `applied`, `rejected`) that other services can subscribe to for audit logging.
