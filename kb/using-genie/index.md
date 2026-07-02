---
tags:
  - tooling
---

# Using Genie

Genie is a build tool used in Dashkite projects to manage compilation, testing, and other development tasks through presets and configuration.

## Core Concepts

- **Presets**: Plugins that add functionality to Genie (e.g., `@dashkite/genie-coffee` for CoffeeScript support).
- **Targets**: Specify the output environment (e.g., `node`, `browser`).
- **Configuration**: Managed via `genie.yaml`.

## Usage

- **Build**: Compiles source files into the `build/` directory.
  ```bash
  genie build
  ```
- **Test**: Runs the project's tests.
  ```bash
  genie test
  ```
- **Clean**: Removes build artifacts (if `@dashkite/genie-clean` is used).
  ```bash
  genie clean
  ```

## Configuration (genie.yaml)

Configuration for presets is defined in `genie.yaml`. For example, to specify targets for CoffeeScript:

```yaml
coffee:
  targets:
    - node
    - browser
```

## Build Artifacts

- Compiled files are typically found in `build/browser/` or `build/node/`.
- Node.js artifacts can be run directly: `node build/node/src/index.js`.
