---
tags:
  - testing
---

# Writing Tests (Dashkite Standard)

This skill provides specialized workflows and principles for writing effective, low-maintenance tests for Byline/Central Park software.

## Core Principles

- **Maximize Information / Minimize Cost**: Optimize the ratio of test value to maintenance cost.
- **Prioritize High-Value Tests**: Focus on the most critical paths first.
- **Test Hierarchy**: Prefer **functional** > **integration** > **unit** tests when all other factors are equal.
- **Code Ratio**: Strive for a 1:1 ratio between test code and system code.
- **Clarity of Purpose**: Tests should be minimal and expressive. Move ancillary logic to helper files.

## Assertion Principles

- **Simple Assertions**: Use `assert` directly for boolean checks.
- **Strict Assertions**: Dashkite's `assert` is strict and accepts only true or false; avoid using truthy/falsy coercion in assertions.
- **Equality**: Use `assert.equal` for simple equality checks.
- **Deep Equality**: Use `assert.deepEqual` for arrays and objects.

## Testing JavaScript/CoffeeScript Modules

### Tooling
- **Assertion Library**: `@dashkite/assert`
- **Test Runner**: `@dashkite/amen`
- **Console Output**: `@dashkite/amen-console` (for terminal use)

### Project Structure
- Place tests in `test/index.coffee`.
- Use subcategories liberally to organize tests.
- For large suites, import test groups (arrays or reactors) from separate files.

### Standard Template (`test/index.coffee`)

```coffeescript
import assert from "@dashkite/assert"
import { test } from "@dashkite/amen"
import print from "@dashkite/amen-console"

# $ refers to the system under test
import $ from "../src"

do ->
  print await test "<module-name>", [
    test "<test-name>", ->
      # test logic here
      # use assert.equal, assert.deepEqual, etc.
  ]
```

## Scaling and Generative Testing

When a test requires handling more than a few variations, or is a candidate for generative testing, incorporate the **`scenario-based-testing`** skill. 

## Browser-Based Testing (HX)

When you need to verify high-level developer flows, UI components, or Shadow DOM interactions, incorporate the **`writing-browser-based-tests`** skill. 

This approach uses `@dashkite/mimic` and Puppeteer to:
- Define declarative browser interaction flows.
- Verify components against actual cloud deployments.
- Inspect and interact with Shadow DOM roots.

### When to Use Scenario-Based Testing
This approach is particularly valuable for systems with large combinatorics or complex rulebases where manual testing would be prohibitively expensive or incomplete.

- **High Combinatorics**: For example, testing the **Sublime/Athena rulebase** for generating HTTP requests and responses. The variations in headers, methods, and URL patterns are too large to test individually but are easily modeled as declarative scenarios.
- **Edge Case Discovery**: When you need to generate and run thousands of variations (Generative Testing) to find rare failures.
- **Complex Logic**: When the transformation logic is simple to describe as input/output pairs but complex to implement.

## Testing RMVC+R Controllers

When testing controllers independent of the browser:
- **Registration**: Register required resource providers (e.g., `Providers.add "mock", Lakeshore`).
- **Seeding**: Use `Storage.set` to seed mock resources before resolving the controller.
- **Async Execution**: Use `yield from` within an async generator or a `for await...from` loop to process the controller's event stream.
- **Resolution Order**: Call `controller.listen()` *before* `controller.resolve()` if you need to capture the initial `value` events triggered during resolution.

```coffeescript
test "resolve and listen", ->
  controller = Controllers.Post.make()
  await yield from do ->
    for await event from controller.listen()
      if event.name == "value"
        assert.equal event.value.post.title, "Expected"
        break
      yield event
    controller.resolve specifier
```

## Debugging Failures

When a test fails or hangs, apply the following heuristic to identify the root cause:

- **Prioritize Recent Changes**: Focus investigation on the most recently modified application-level code (e.g., controllers, router guards).
- **Core Library Stability**: Assume stable core libraries (like Wayland, Zest, or Krypton) are working correctly unless application-level diagnostics definitively prove otherwise.
- **Avoid Speculative Refactoring**: Never refactor core libraries based on speculation or as a "preemptive fix" for application-level issues.

## Running Tests

- **Genie**: Run `genie test` in the repository root.
- **Manual**: Run `coffee test/index.coffee` (ensure dependencies are installed).
- **Exit Codes**: Tests must exit with a non-zero code upon failure.
