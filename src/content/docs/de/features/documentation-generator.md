---
title: Documentation Generator
description: Auto-generate README, API docs, architecture diagrams, and component documentation from codebase analysis.
---

The Documentation Generator analyzes your codebase and produces comprehensive documentation — API references, architecture diagrams, component docs, and README files — all from your actual code structure.

## What it generates

| Output                      | Description                                                            |
| --------------------------- | ---------------------------------------------------------------------- |
| **README.md**               | Project overview, tech stack, setup instructions, architecture summary |
| **API documentation**       | Endpoints with methods, parameters, responses, and examples            |
| **Architecture diagrams**   | Mermaid or PlantUML diagrams showing component relationships           |
| **Component documentation** | Per-component docs with props, methods, and usage examples             |
| **Navigation index**        | Table of contents linking all generated docs                           |

Output is written to `docs/generated/` in the workspace root.

## Running the generator

```
CodeBuddy: Generate Documentation
```

A progress notification tracks each phase:

1. **Analyzing codebase** (0%) — Runs full codebase understanding analysis
2. **Extracting API endpoints** (20%) — Finds routes, controllers, handlers
3. **Analyzing architecture** (40%) — Maps components, data flow, patterns
4. **Generating README** (60%) — Writes project README from analysis
5. **Generating API documentation** (70%) — Writes endpoint reference
6. **Creating architecture diagrams** (80%) — Generates visual diagrams
7. **Generating component documentation** (90%) — Writes per-component docs
8. **Creating navigation index** (95%) — Builds table of contents

## Configuration

The generator accepts a `DocumentationConfig`:

| Option                | Type    | Default      | Description                       |
| --------------------- | ------- | ------------ | --------------------------------- |
| `includeArchitecture` | boolean | `true`       | Generate architecture section     |
| `includeAPI`          | boolean | `true`       | Generate API reference            |
| `includeUsage`        | boolean | `true`       | Generate README/usage docs        |
| `includeContributing` | boolean | `true`       | Generate contributing guide       |
| `includeLicense`      | boolean | `true`       | Include license information       |
| `outputFormat`        | enum    | `"markdown"` | `markdown`, `html`, or `both`     |
| `diagramFormat`       | enum    | `"mermaid"`  | `mermaid`, `plantuml`, or `ascii` |

## What it extracts

### API endpoints

For each route discovered:

- HTTP method and path
- Description from JSDoc/docstrings
- Parameters with types, required flags, and descriptions
- Response status codes and schemas
- Usage examples

### Architecture info

- **Overview** — High-level project description
- **Main components** — Services, controllers, models with their types
- **Data flow** — How data moves through the system
- **Dependencies** — External packages with version and purpose
- **Patterns** — Detected design patterns (singleton, factory, observer, etc.)
- **Diagram** — Visual representation of component relationships

### Component documentation

For each component, service, class, or function:

- Name and type classification
- Description from comments/docstrings
- Props (for UI components) with types and required flags
- Methods with parameters, return types, and descriptions
- Usage example code

## Integration with codebase analysis

The generator leverages the `CodebaseUnderstandingService` — the same service that powers the "Analyze Codebase" command. This means it benefits from:

- Cached analysis results (no duplicate work)
- Pattern extraction across the full workspace
- Framework-aware analysis (React, Express, FastAPI, etc.)
