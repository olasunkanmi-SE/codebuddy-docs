---
title: Project Rules
description: Define per-project instructions that CodeBuddy follows in every conversation.
---

Project rules let you define project-specific instructions that CodeBuddy follows in every conversation. The `ProjectRulesService` loads rules at workspace open, watches for file changes, and injects them into the agent's system prompt.

## Creating rules

Create a `.codebuddy/rules.md` file in your project root:

```markdown
# Project Rules

## Code Style

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use named exports, not default exports
- Maximum line length: 100 characters

## Testing

- Write tests for every new function
- Use Vitest for unit tests
- Minimum 80% code coverage for new code

## Dependencies

- Use pnpm as the package manager
- Prefer well-maintained packages with >1000 weekly downloads
- Always pin dependency versions

## Architecture

- Follow the repository pattern for data access
- Use Zod for all input validation
- Keep controllers thin — business logic goes in services
```

## Discovery locations

The `ProjectRulesService` checks four locations in order, using the first one found:

| Priority | Path                        | Description                                   |
| -------- | --------------------------- | --------------------------------------------- |
| 1        | `.codebuddy/rules.md`       | Primary location                              |
| 2        | `.codebuddy/rules/index.md` | Alternative for complex rule sets             |
| 3        | `.codebuddyrules`           | Root-level single file                        |
| 4        | `CODEBUDDY.md`              | Convention-based (similar to CONTRIBUTING.md) |

## Token budget

Rules are injected into the system prompt, so they consume context window tokens. To prevent rules from crowding out working context:

- **Default budget**: 2,000 tokens (~8,000 characters)
- **Configurable**: `codebuddy.rules.maxTokens` setting
- **Truncation**: If rules exceed the budget, they are truncated with a warning

## How rules are applied

When CodeBuddy starts a new conversation in your project:

1. `ProjectRulesService` reads the rules file
2. Rules are appended to the Developer Agent's system prompt under a `## Project Rules` section
3. The agent follows these rules for all code generation, tool use, and decisions.
4. Rules can also be merged with custom rules from the `codebuddy.rules.customRules` setting

Changes to the rules file are detected automatically — no need to restart the editor.

## Monorepo support

For monorepos, define rules at different levels:

```
my-monorepo/
  .codebuddy/rules.md          ← applies to the whole repo
  packages/
    frontend/
      .codebuddy/rules.md      ← overrides for frontend
    backend/
      .codebuddy/rules.md      ← overrides for backend
```

## Configuration

| Setting                         | Type    | Default | Description                                                          |
| ------------------------------- | ------- | ------- | -------------------------------------------------------------------- |
| `codebuddy.rules.enabled`       | boolean | `true`  | Enable project rules loading                                         |
| `codebuddy.rules.maxTokens`     | number  | `2000`  | Maximum token budget for rules                                       |
| `codebuddy.rules.showIndicator` | boolean | `true`  | Show rules status in the UI                                          |
| `codebuddy.rules.customRules`   | string  | `""`    | Additional rules from editor settings (merged with file-based rules) |

## Tips

- **Be specific** — "Use Zod for validation" is better than "Validate inputs"
- **Include examples** when conventions are nuanced
- **Keep rules concise** — They're loaded into every conversation
- **Update rules** as your project evolves
- **Use categories** (Code Style, Testing, Architecture) for readability
