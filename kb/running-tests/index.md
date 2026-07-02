---
tags:
  - testing
---

# Running Tests

This skill provides standard workflows and troubleshooting tips for running tests within this metarepo.

## Common Commands

### Running Tests for a Module
Always run tests from the module's root directory:
```bash
cd <module-name>
npx genie test
```

### Building a Module
If tests are failing due to missing files or stale artifacts, rebuild the module:
```bash
cd <module-name>
npx genie build
```

**NOTE::** Running `genie test` also builds, so this is a precaution.

## Testing Frameworks

We use the Dashkite testing stack:
- **@dashkite/amen**: The test runner.
- **@dashkite/assert**: The assertion library. **Note**: The `assert` module is the assertion function itself; it does not provide an `ok` method (use `assert(value)`).

## Troubleshooting

### Debugging with Stack Traces
To get a full stack trace when tests fail, set the `debug` environment variable:
```bash
debug=true npx genie test
```
*(Note: Do not confuse this with the `--debug` flag, which only provides debugging output for Genie itself, not the test processes).*

### Silent Test Exits
If `genie test` finishes without output, it usually indicates the process exited before async tasks completed.
- **Missing Await**: Ensure all async functions and promises are properly awaited.
- **Async Generator Hangs**: When looping over event streams (like `for await event from events`), ensure the loop has a termination condition (`break`) and that the underlying channel is eventually closed.
- **Amen Structure**: Ensure that nested tests are properly returned or passed as an array to the outer `test` call.

### Manual Node Execution
To bypass `genie` and see raw error output:
```bash
node <module-name>/build/node/test/index.js
```
