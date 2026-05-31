---
name: writing-browser-based-tests
description: Expert guidance for writing declarative browser-based tests (HX) using Mimic and Puppeteer. Use when verifying UI components, user flows, and Shadow DOM interactions.
---

# Writing Browser-Based Tests (Dashkite Standard)

This skill provides specialized workflows for writing high-level user interface (HX) tests using `@dashkite/mimic` and Puppeteer.

## Core Concepts

- **Mimic Reliability**: Mimic is exhaustively tested (25+ test cases covering all combinators). If a test fails, assume the issue is with the application state or test logic rather than the library. Do not spend cycles double-checking Mimic's internal reporting.
- **Declarative Flows**: Use Mimic combinators within Katana-compatible pipelines (`pipe`, or its alias `flow`) to define browser interactions as a sequence of operations.
- **Execution**: Note that `pipe` returns a function. To execute a flow defined inline, precede it with `do` (e.g., `await do pipe [ ... ]`).
- **Cloud-First Testing**: Tests should typically run against deployment URLs (e.g., the Brooklyn Lookbook) to ensure environmental parity.
- **Shadow DOM Support**: Mimic provides first-class support for Web Components through the `shadow` combinator.
- **Shorthands**: Use `agent/`, `view/`, or device shorthands (e.g., `iphone/15`) from Mimic's `agents.yaml` for concise environment setup.

## Tooling
- **Orchestration**: `puppeteer`
- **Combinators**: `@dashkite/mimic` (powered by `@dashkite/katana`)
- **Assertion**: `@dashkite/assert`
- **Runner**: `@dashkite/amen`

## Workflows

### 1. Configuration (Resolved URLs)
Since Byline uses Dynamic Resource Names (DRNs), use a `test/configuration.yaml` file to resolve deployment URLs at build time.

```yaml
# test/configuration.yaml
url: drn:domain/my-app/linkables/io
```

Import this in your test as `configuration`.

### 2. Standard Test Structure
Wrap your Mimic flows inside standard Amen `test` blocks. Use `Mimic.browser()` to initialize the flow.

```coffeescript
import assert from "@dashkite/assert"
import { test, success } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import { pipe } from "@dashkite/joy/function"
import * as K from "@dashkite/katana"
import Mimic from "@dashkite/mimic"
import configuration from "./configuration"

do ->
  print await test "My Component (HX)", [
    test "Verification Flow", ->
      await do pipe [
        Mimic.browser
        Mimic.page
        Mimic.goto configuration.url
        Mimic.wait()
        Mimic.select "my-component"
        Mimic.shadow
        Mimic.select "h1"
        Mimic.text
        K.peek ([ title ]) -> assert.equal title, "Expected Title"
      ]
  ]

  process.exit if success then 0 else 1
```

## Mimic Pattern Reference

- **Lifecycle & Navigation**: 
  - `Mimic.browser(options)`: Initialize a new browser session.
  - `Mimic.goto(url)`: Navigate to a URL.
  - `Mimic.wait(options)`: Wait for network idle.
  - `Mimic.reload()`, `Mimic.back()`, `Mimic.forward()`.
- **Emulation**:
  - `Mimic.emulate(shorthand|device)`: Emulate a device (e.g., `iphone/15`).
  - `Mimic.agent(shorthand|ua)`: Set user agent (e.g., `agent/mac/webkit`).
  - `Mimic.viewport(shorthand|options)`: Set viewport (e.g., `view/hd`).
  - `Mimic.media(type, features)`: Emulate media (e.g., `print`).
- **Selection**: `Mimic.select(selector)`, `Mimic.shadow`, `Mimic.waitFor(selector|fn)`.
- **Interaction**: 
  - `Mimic.click`, `Mimic.type(text)`, `Mimic.submit`.
  - `Mimic.focus`, `Mimic.blur`, `Mimic.clear`.
  - `Mimic.drag`, `Mimic.drop`, `Mimic.upload(...paths)`.
- **Inspection & Debugging**: 
  - `Mimic.text`: Array of `textContent`.
  - `Mimic.attribute(name)`: Get attribute value.
  - `Mimic.visible`: Filter for visible nodes.
  - `Mimic.content`: Get page HTML.
  - `Mimic.accessibility`: Get accessibility tree snapshot.
- **Advanced Control**:
  - `Mimic.mock(pattern, handler)`: Intercept network requests.
  - `Mimic.clock.tick(ms)`: Advance virtual time.
  - `Mimic.storage.clear()`: Clear browser storage.
  - `Mimic.dialog.accept()`, `Mimic.dialog.dismiss()`.
- **Persistence**:
  - `Mimic.screenshot.image(options)`: Capture image.
  - `Mimic.screenshot.pdf(options)`: Capture PDF.
  - `Mimic.cookies.get()`, `Mimic.cookies.set(cookies)`.

## Best Practices
- **Favor Descriptive Names**: Avoid abbreviations; follow the `writing-coffeescript` skill whenever possible.
- **Manage the Stack**: Interactions (like `select`) and inspections (like `text`) push new items to the stack. Use `K.drop` (or `( stack ) -> stack[...-1]`) to return to the `page` context before starting a new selection sequence.
- **Precise Synchronization**: Prefer `Mimic.waitFor` over `Mimic.wait()` when waiting for specific DOM changes or state transitions to avoid flaky race conditions.
- **Group Tests**: Use Amen's ability to take arrays of tests to organize the suite into logical categories (e.g., "Interaction", "Navigation").
- **Isolate Logic**: Wrap each test group into its own function and export it from a separate file (e.g., `test/cases/navigation.coffee`) to keep the main test suite maintainable.
- **Refer to Skills**: Combine with the `writing-tests` skill for overall test architecture and the `developing-web-components` skill for component-specific context.
