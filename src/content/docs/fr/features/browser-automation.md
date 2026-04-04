---
title: Browser Automation
description: Playwright-powered headless browser automation with SSRF protection and security sandboxing.
---

CodeBuddy integrates Playwright for headless browser automation, enabling tasks like testing web UIs, scraping data, filling forms, and taking screenshots. The `browser` tool wraps an MCP Playwright server with multiple security layers — SSRF prevention, input sanitization, JavaScript execution restrictions, and audit logging.

## Setup

Browser automation requires Playwright with Chromium:

```bash
npx playwright install chromium
```

## Supported actions

| Action          | Parameter      | Description                                          |
| --------------- | -------------- | ---------------------------------------------------- |
| `navigate`      | `url`          | Open a URL in the browser                            |
| `click`         | `ref`          | Click an element by accessibility reference          |
| `type`          | `ref`, `text`  | Type text into an input field                        |
| `select_option` | `ref`, `value` | Select an option from a dropdown                     |
| `hover`         | `ref`          | Hover over an element                                |
| `press_key`     | `key`          | Press a keyboard key                                 |
| `screenshot`    | —              | Capture the current page as an image                 |
| `snapshot`      | —              | Get the accessibility tree (structured page content) |
| `evaluate`      | `expression`   | Execute JavaScript in the browser context            |
| `wait`          | `time`         | Wait for a specified duration                        |
| `tabNew`        | `url?`         | Open a new browser tab                               |
| `tabClose`      | —              | Close the current tab                                |
| `tabSwitch`     | —              | Switch between open tabs                             |
| `tabList`       | —              | List all open tabs                                   |
| `goBack`        | —              | Navigate back in history                             |
| `goForward`     | —              | Navigate forward in history                          |

## Security layers

### SSRF protection

The `NavigationGuard` prevents Server-Side Request Forgery by blocking navigation to internal networks:

- **Blocked addresses**: RFC 1918 private ranges (`10.x`, `172.16-31.x`, `192.168.x`), loopback (`127.x`, `::1`), link-local (`169.254.x`), IPv6 unique-local (`fc00::/7`)
- **Encoding detection**: Catches octal, decimal, and hex IP obfuscation attempts
- **Post-navigation check**: Verifies DNS resolution didn't redirect to a private IP after the page loaded
- **Protocol restriction**: Only `http:` and `https:` URLs are allowed
- **Length limits**: Hostname ≤ 253 chars, pathname ≤ 2,048 chars, total URL ≤ 8,192 chars

### Input sanitization

The `InputGuard` validates all inputs before they reach the browser:

- Element references: Maximum 512 characters, shell injection characters stripped
- Key inputs: Must match `^[A-Za-z0-9+\-_]{1,64}$`
- No raw user input is passed to `evaluate()` without sanitization

### JavaScript restrictions

The `evaluate` action blocks dangerous patterns:

- `fetch()` and `XMLHttpRequest` — prevents data exfiltration
- `eval()` and `Function()` — prevents arbitrary code execution
- `localStorage`, `sessionStorage`, `document.cookie` — prevents credential theft
- `WebSocket` — prevents covert channels

## Example usage

```
Open localhost:3000, take a screenshot of the login page, and check if the form is accessible
```

```
Navigate to our staging site, fill in the registration form with test data, and verify the success page
```

```
Open the dashboard, click the "Export" button, and verify the CSV download contains the expected columns
```

## Configuration

```json
{
  "codebuddy.browser.headless": true,
  "codebuddy.browser.timeout": 30000,
  "codebuddy.browser.viewport": { "width": 1280, "height": 720 }
}
```

Set `headless` to `false` to watch browser automation in real time.
