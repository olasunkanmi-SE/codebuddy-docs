---
title: Testing Integration
description: Auto-detected test frameworks, the run_tests tool, tester subagent, and test-fix loops.
---

CodeBuddy can run your project's tests, parse the results, and fix failing tests — all through natural language. It auto-detects your test framework and knows how to filter, run, and interpret results for 6 frameworks.

## Supported frameworks

| Priority | Framework      | Detected via                                | Command                     |
| -------- | -------------- | ------------------------------------------- | --------------------------- |
| 1        | **Vitest**     | `package.json` scripts/devDeps              | `npx vitest run`            |
| 2        | **Jest**       | `package.json` scripts/devDeps              | `npx jest`                  |
| 3        | **Mocha**      | `package.json` scripts/devDeps              | `npx mocha` / `npm test --` |
| 4        | **Pytest**     | `pytest.ini`, `pyproject.toml`, `setup.py`  | `python -m pytest`          |
| 5        | **Go test**    | `go.mod`                                    | `go test ./...`             |
| 6        | **Cargo test** | `Cargo.toml`                                | `cargo test`                |
| fallback | **npm test**   | `package.json` with non-default test script | `npm test --`               |

Detection runs in priority order — the first match wins. You can also override detection entirely with a custom command.

### Test name filtering

Each framework supports running a specific test by name:

| Framework | Flag                |
| --------- | ------------------- |
| Jest      | `--testNamePattern` |
| Vitest    | `-t`                |
| Mocha     | `--grep`            |
| Pytest    | `-k`                |
| Go        | `-run`              |
| Cargo     | `--` (pass-through) |

## How it works

### The `run_tests` tool

In Agent mode, CodeBuddy uses the `run_tests` tool to execute tests:

```
run_tests({ testPath?: "src/auth/", testName?: "should validate token" })
```

The tool:

1. Detects the framework (or uses your custom command)
2. Spawns the test process with `shell: false` for security
3. Parses the output into structured results
4. Formats a markdown summary for the agent

### Test results

```typescript
{
  framework: "jest",
  command: "npx jest src/auth/",
  passed: 42,
  failed: 3,
  skipped: 1,
  total: 46,
  duration: "4.2s",
  success: false,
  failures: [
    {
      testName: "should validate expired token",
      file: "src/auth/token.test.ts",
      message: "Expected: false, Received: true",
      expected: "false",
      actual: "true"
    }
  ]
}
```

The agent receives a formatted summary with pass/fail counts, up to 10 failure details, and the last 2,000 characters of raw output.

### Test-fix loops

The **tester subagent** specializes in test-driven workflows:

1. **Analyze** — read the code under test
2. **Identify** — determine what test cases are needed
3. **Write** — create or update test files
4. **Run** — execute tests via `run_tests`
5. **Fix** — if tests fail, fix the code and re-run

This subagent is invoked automatically during collaboration playbooks:

| Workflow    | Subagent chain                                                      |
| ----------- | ------------------------------------------------------------------- |
| New feature | Architect → Reviewer → Developer → **Tester** → Reviewer            |
| Bug fix     | Debugger → Developer → **Tester**                                   |
| Refactor    | Code Analyzer → Architect → File Organizer → Developer → **Tester** |

The tester has access to: `run_tests`, `edit_file`, `manage_terminal`, `ripgrep_search`, `get_diagnostics`, `list_files`, `search_vector_db`, `git`, `browser`, and MCP tools.

## Security

Test execution uses strict security measures:

- **`shell: false`** — arguments are passed as an array, preventing shell injection
- **Argument sanitization** — all arguments are validated against shell metacharacters (`;|&$(){}!<>`) with a 500-character limit
- **Environment** — forced to `FORCE_COLOR=0, CI=true` for clean, parseable output
- **Custom command parsing** — respects single/double quotes properly

## Settings

| Setting                 | Type   | Default  | Description                                            |
| ----------------------- | ------ | -------- | ------------------------------------------------------ |
| `codebuddy.testCommand` | string | `""`     | Custom test command. Overrides auto-detection entirely |
| `codebuddy.testTimeout` | number | `120000` | Test execution timeout in ms (5,000–600,000)           |

## Example prompts

- "Run the tests for the auth module"
- "Run only the test named 'should validate token'"
- "Write tests for `src/utils/parser.ts` and run them"
- "Fix the failing tests and make sure they all pass"
- "Add unit tests for all exported functions in this file"
