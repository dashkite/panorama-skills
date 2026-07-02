---
tags:
  - operations
---

# Registry Management

The Registry acts as a central hub for sharing singleton-like services, controllers, and configuration across the application without tight coupling.

## Core API

### `Registry.set( key, value )`
Registers a value or service under a specific key. This is typically done during application initialization.

### `Registry.get( key )`
Returns a promise that resolves to the registered value. If the value isn't yet available, the promise will wait until it is set.

## Common Keys
- `application`: The main application orchestrator (often a Monterey instance).
- `messages`: The localized message service.
- `message bar inbox`: A reactive topic for sending global UI notifications.

## Best Practices

### Decoupled Logic
Components and controllers should fetch their dependencies from the Registry rather than importing them directly. This makes it easier to swap implementations or use mocks during testing.

```coffeescript
import Registry from "@dashkite/registry"

logic = ( reactor ) ->
  application = await Registry.get "application"
  # use application...
```

### Mocking in Tests
When testing logic that depends on the Registry, always seed the Registry with the required mocks before executing the test.

```coffeescript
import Registry from "@dashkite/registry"

test "my logic", ->
  # Seed with mock
  Registry.set "application", mockApplication
  
  # Execute logic that calls Registry.get
  await runMyLogic()
```

### Reactive Streams in Registry
Values stored in the Registry can be reactive (e.g., Topics or Reactors). This allows disparate parts of the system to communicate through a shared channel retrieved from the Registry.

## Technical Notes

### Resolution Order
Since `Registry.get` returns a promise, it handles asynchronous initialization gracefully. You can call `get` before the corresponding `set` is executed elsewhere in the system.
