---
title: Notification Center
description: SQLite-backed notification system with 11 sources, deduplication, severity levels, and automatic pruning.
---

CodeBuddy includes a notification center that aggregates events from across the extension — git operations, MCP connections, agent actions, PR reviews, and more — into a single, queryable feed.

## Notification sources

| Source            | Example notifications                                 |
| ----------------- | ----------------------------------------------------- |
| **System**        | Extension activation, updates, configuration changes  |
| **Commands**      | Command execution results, errors                     |
| **Git**           | Branch switches, merge conflicts, commit results      |
| **Chat**          | Model switches, context window warnings               |
| **MCP**           | Server connections, disconnections, tool registration |
| **Model Manager** | Model downloads, Ollama status changes                |
| **Workspace**     | File indexing progress, analysis completion           |
| **GitLab**        | Pipeline status, merge request updates                |
| **Jira**          | Issue status changes, assignment notifications        |
| **PR Review**     | Review completion, comments, approval status          |
| **Agent**         | Task completion, errors, checkpoint creation          |

## Notification types

Each notification has a severity level:

| Type      | Icon   | Use case                                         |
| --------- | ------ | ------------------------------------------------ |
| `info`    | Blue   | Informational — operation completed successfully |
| `warning` | Yellow | Attention needed — degraded performance, retries |
| `error`   | Red    | Failure — operation failed, intervention needed  |
| `success` | Green  | Positive result — test passed, deploy succeeded  |

## Deduplication

Notifications are deduplicated within a **30-second window**. If the same `type + title` combination is emitted twice within 30 seconds, the second notification is silently suppressed. This prevents flooding from rapid events like file watcher triggers or retry loops.

The dedup map is capped at **200 entries**. When the cap is reached, stale entries (older than 30 seconds) are pruned.

## Storage

Notifications are stored in the **SQLite database** (via `SqliteDatabaseService`), not in memory. This means:

- Notifications survive extension restarts
- They can be queried with SQL (by source, type, read status)
- The webview can load the full notification history on open

### Schema

```sql
CREATE TABLE notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT,
  read_status INTEGER DEFAULT 0,
  timestamp TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
```

## Automatic pruning

The notification table is capped at **500 entries**. Pruning runs at most once every **5 minutes** (gated by interval, not per-insert) to avoid overhead:

1. Count total notifications
2. If count exceeds 500, delete the oldest `(count - 500)` entries
3. Deletion uses a subquery sorted by `timestamp ASC` with a `LIMIT`

## API

### Adding notifications

```typescript
await notificationService.addNotification(
  "success",
  "Tests passed",
  "All 42 tests passed in 3.2s",
  NotificationSource.Agent,
);
```

### Querying

```typescript
// Get latest 50 notifications
const notifications = await notificationService.getNotifications(50);

// Get unread count (for badges)
const unread = await notificationService.getUnreadCount();
```

### Marking as read

```typescript
// Single notification
await notificationService.markAsRead(notificationId);

// All notifications
await notificationService.markAllAsRead();
```

## Events

The service fires `onDidNotificationChange` whenever a notification is added, read, or cleared. The webview listens to this event to update the notification panel in real time.

## Webview integration

The chat UI's notification panel subscribes to the event emitter and renders notifications as a scrollable list with:

- Source badges (color-coded by source)
- Relative timestamps ("2 minutes ago")
- Read/unread indicators
- Dismiss and "mark all as read" actions
