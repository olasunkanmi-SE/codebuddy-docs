---
title: Debugger Integration
description: Agent-driven debugging via the Debug Adapter Protocol (DAP) — threads, stack traces, variables, breakpoints, and stepping.
---

CodeBuddy can interact with any debugger through the **Debug Adapter Protocol (DAP)**. When a debug session is active, the agent gains tools to inspect threads, walk stack frames, evaluate expressions, and control execution — all without leaving the chat.

## Prerequisites

Start a debug session normally (F5 or **Run and Debug**). CodeBuddy detects the active `vscode.DebugSession` automatically. Any debugger that implements DAP works: Node.js, Python, Go, Java, C++, Rust, etc.

## Agent tools

The `debugger` tool exposes these actions:

| Action         | What it does                                                     |
| -------------- | ---------------------------------------------------------------- |
| **threads**    | Lists all threads in the active debug session                    |
| **stackTrace** | Returns up to 20 stack frames for a given thread                 |
| **scopes**     | Lists scopes (local, global, closure) for a stack frame          |
| **variables**  | Reads variables within a scope (by `variablesReference`)         |
| **evaluate**   | Evaluates an expression in the REPL context of an optional frame |
| **stepOver**   | Steps over the current line (DAP `next`)                         |
| **stepInto**   | Steps into the current function call                             |
| **stepOut**    | Steps out of the current function                                |
| **continue**   | Resumes execution until the next breakpoint                      |
| **pause**      | Pauses a running thread                                          |

## Example workflow

```
You: "The function returns null instead of the expected array. Debug it."

Agent: [thinks] I'll inspect the active debug session to find the issue.
       [debugger:threads] → Thread 1 (paused at breakpoint)
       [debugger:stackTrace threadId=1] → Frame 0: processItems() at src/handler.ts:42
       [debugger:scopes frameId=0] → Local scope (ref: 1001)
       [debugger:variables ref=1001] → items = undefined, config = {...}

       The issue is that `items` is undefined at line 42. The function
       `fetchItems()` on line 38 likely returned undefined instead of an array.
       [debugger:evaluate expression="typeof fetchItems" frameId=0] → "function"
       [debugger:evaluate expression="fetchItems()" frameId=0] → undefined

       The root cause is `fetchItems()` returns nothing when the cache is empty.
```

## Limitations

- Requires an **active** debug session — the agent cannot start one
- DAP custom requests depend on the debug adapter implementation; some adapters may not support all actions
- The `evaluate` action runs in REPL context, which may have side effects
- Stack trace depth defaults to 20 frames; pass `levels` parameter to increase
