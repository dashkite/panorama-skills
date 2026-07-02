---
tags:
  - patterns
---

# Event Reactor Patterns

Event Reactors provide a higher-level abstraction for handling complex event streams compared to simple `for await...from` loops. They enable declarative event handling and are isomorphic to state machines.

## Core API

### `EventReactor.make( source )`
Creates a new event reactor instance from a source channel or async iterator.

### `.bind( target )`
Binds the reactor's context to a specific object (e.g., the component instance or controller).

### `.forward( pattern )`
Forwards events matching the pattern to the reactor's output stream. Use `"*"` to forward all events.

### `.when( pattern, handler )`
Defines a specific behavior for events matching the pattern. The handler is an async function or generator.

## Advanced Patterns

### State Machine Isomorphism
A reactor's `.when` blocks effectively define the transitions of a state machine. Use this to maintain clear state-based logic within components.

```coffeescript
EventReactor
  .make reactor
  .bind @
  .when "connect", -> 
    # Transition to 'connected' state
    @render html state: "loading"
  .when "value", ( event ) ->
    # Transition to 'data' state
    @render html data: event.value
```

### Merging Streams
Use `yield from` to merge another event stream into the current reactor's logic.

```coffeescript
.when "connect", ->
  # Pull events from another controller into this reactor
  yield from @controller.listen()
```

### Pattern Matching
Patterns can be specific event names or wildcards. The most specific match wins.

### Nesting Reactors
For very complex state machines, break them into smaller reactors and use them within `.when` blocks to handle sub-states.

## Best Practices

- **Declarative First**: Prefer `.when` blocks over large `switch` statements inside a `for await` loop.
- **Context Binding**: Always `.bind @` if your handlers need to call methods on the component (like `@render` or `@dispatch`).
- **Flow Control**: Use `yield` inside handlers to propagate events to the component's output channel.

## Technical Notes

### Reactor Termination
A reactor typically runs until the source channel is closed. Ensure that any resources or intervals started within a reactor are cleaned up when the reactor terminates.
