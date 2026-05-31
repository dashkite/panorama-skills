---
name: scenario-based-testing
description: Expert guidance for writing declarative, scenario-based tests using @dashkite/runner. Use when you need to scale test coverage through manual or generative scenarios in YAML.
---

# Scenario-Based Testing (Dashkite Standard)

This skill provides specialized workflows for implementing high-value, declarative tests using the `@dashkite/runner` module. Scenario-based testing decouples test logic from test data, enabling rapid scaling and generative testing.

## Core Concepts

- **Separation of Concerns**: Test logic is defined in CoffeeScript "runners," while test data and assertions are defined in YAML "scenarios."
- **Declarative Assertions**: Scenarios include paths (CoffeeScript expressions) that are evaluated against the test result.
- **Generative Testing**: Scenarios can be programmatically generated as data and passed to the runner, allowing for thousands of test cases with minimal extra code.

## Tooling
- **Runner**: `@dashkite/runner`
- **Data Format**: YAML (for scenario definitions)
- **Assertion DSL**: Path-based assertions using CoffeeScript syntax.

## Workflows

### 1. Define Scenarios (YAML)
Create a YAML structure (e.g., `test/scenarios.yaml`) that defines the inputs and expected outputs for each test case.

```yaml
- name: My Component
  scenarios:
    - name: Valid Input Scenario
      input:
        key: "value"
      assertions:
        - path: "$.status"
          expect: "success"
        - path: "$.data.id"
          type: "equal"
          expect: 123
```

### 2. Implement Runner (CoffeeScript)
Define the execution logic for your scenarios.

```coffeescript
import Runner from "@dashkite/runner"
import scenarios from "./scenarios.yaml"

Runner
  .make scenarios
  .apply
    "My Component":
      "*": ({ input }) ->
        # Execution logic goes here
        # Return the result to be used by assertions
        result
```

## Scenario Structure Reference

- **`name`**: Unique identifier for a scenario or group.
- **`input`**: Data passed to the runner function.
- **`assertions`**: A list of checks.
  - **`path`**: CoffeeScript expression evaluated against the result (the result is `$` in this context).
  - **`type`**: Assertion type (e.g., `deepEqual`, `equal`, `regexp`). Defaults to a truthy check if omitted.
  - **`expect`**: The value to compare against.

## Technical Notes

### Result Access in Assertions
Within an assertion `path`, the result returned by the runner function is available as the variable `$`.

### Error Handling
If a scenario includes `throws` or `rejects` properties, the runner automatically wraps the execution in the appropriate assertion check.

## Best Practices
- **Use Subgroups**: Organize scenarios into logical groups for better test reporting.
- **Generative Generation**: For complex logic, write a script to generate the `scenarios` array instead of manually editing YAML.
- **Minimal Logic**: Keep the runner logic focused on execution; move verification and data checks into the declarative assertions.
- **Refer to Skills**: Combine with the `writing-tests` skill for overall test architecture.
