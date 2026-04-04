---
title: Installation
description: Install CodeBuddy in VS Code, Cursor, Windsurf, or VSCodium. Set up your AI coding agent and start shipping autonomous features in minutes.
---

CodeBuddy works with any editor that supports the VS Code extension API. Choose your IDE below.

## VS Code

1. Open VS Code
2. Go to the Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for **CodeBuddy**
4. Click **Install**

Or from the command line:

```bash
code --install-extension codebuddy.codebuddy
```

## Cursor

1. Open Cursor
2. Open the Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for **CodeBuddy**
4. Click **Install**

Or from the command line:

```bash
cursor --install-extension codebuddy.codebuddy
```

## Windsurf

1. Open Windsurf
2. Open the Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for **CodeBuddy**
4. Click **Install**

## VSCodium / Open VSX

CodeBuddy is published on the [Open VSX Registry](https://open-vsx.org/) for editors that don't use the Microsoft Marketplace (VSCodium, Gitpod, Theia, Eclipse Che, etc.).

1. Open your editor
2. Open the Extensions view
3. Search for **CodeBuddy**
4. Click **Install**

Or from the command line:

```bash
codium --install-extension codebuddy.codebuddy
```

## Install from VSIX

If you have a `.vsix` file (for example, from a private build or air-gapped environment), the command works in any compatible editor:

```bash
code --install-extension codebuddy-4.2.1.vsix        # VS Code
cursor --install-extension codebuddy-4.2.1.vsix      # Cursor
codium --install-extension codebuddy-4.2.1.vsix      # VSCodium
```

## Onboarding wizard

After installation, CodeBuddy opens the **Onboarding Wizard** automatically on first launch. The wizard walks you through five steps:

1. **Welcome** — Introduction to CodeBuddy's capabilities
2. **Provider selection** — Choose and configure your AI provider. CodeBuddy tests connectivity to verify your API key works.
3. **Workspace analysis** — Automatic detection of your project's languages (10 supported), frameworks (React, Next.js, Vue, Express, FastAPI, Django, etc.), and installed tools
4. **Security setup** — Choose a permission profile (restricted, standard, or trusted) and access control mode
5. **First task** — Run a guided task to verify everything is working

You can re-run the wizard at any time from the command palette (`Cmd+Shift+P`):

```
CodeBuddy: Open Onboarding Wizard
```

## Verify your installation

Run the built-in diagnostic tool to check that everything is configured correctly:

```
CodeBuddy: Run Doctor
```

Doctor runs 9 checks: API key validity, terminal restrictions, directory permissions, MCP configuration, security settings, credential proxy, permission scope, access control, and input validation.

## Next steps

- [Configure your provider and settings](/getting-started/configuration/)
- [Run your first task](/getting-started/quickstart/)
