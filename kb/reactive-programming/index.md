---
tags:
  - patterns
---

# Reactive Programming

Reactive programming in Dashkite revolves around the use of async iterators (reactors) to model application logic as a sequence of events.

## Async Generator Semantics

CoffeeScript uses the presence of the `await` keyword to determine whether a generator function should be synchronous or asynchronous. When writing reactors that delegate to other event streams, follow these patterns.

### Delegation with `yield from`
Use `yield from` to delegate iteration to another async iterable (such as an `EventReactor` or another reactor's `listen()` method). This allows events from the source to flow directly through your function.

```coffeescript
listen: ->
  yield from EventReactor
    .make @model.listen()
    .bind @
    .forward "*"
  # ... handlers ...
```

### Forcing Async Semantics (`await return`)
If a generator function body does not contain any other `await` statements, the CoffeeScript compiler will default to a synchronous generator. To ensure it returns an **async iterator** (compatible with `for await...from`), append `await return` to the end of the function.

```coffeescript
listen: ->
  yield from someAsyncIterable
  await return
```

### Avoiding Redundant Closures
Do not wrap reactor definitions in IIFEs (e.g., `do =>`) unless you specifically require a localized state closure. `yield from` works directly on the result of a reactor chain or async iterable.

## Exception Handling

Errors in reactors follow standard async generator semantics. When an error is thrown in a reactor, it propagates up the chain.

### Propagation with `yield from`
When delegating with `yield from`, an error thrown in the delegated iterator will be raised at the point of the `yield from` expression in the delegating generator.

### Standard `try/catch`
You can use standard `try/catch` blocks around `yield from` or within your reactor logic to handle exceptions.

```coffeescript
listen: ->
  try
    yield from someAsyncIterable
  catch error
    console.error "Reactor failed:", error
  await return
```

### Event Reactor `catch`
The `EventReactor` class provides a `.catch(handler)` method for declarative error handling. It supports chaining and handles errors from both the source reactor and individual handlers.

```coffeescript
yield from EventReactor
  .make someReactor()
  .when "some-event", -> # ...
  .catch ( error ) ->
    console.error "Reactor or handler failed:", error
```

## Event Reactor Patterns

For high-level declarative handling of event streams, use `@dashkite/reactive/event-reactor`.

- **Declarative Handlers**: Use `.when( pattern, handler )` to define state transitions.
- **Context Binding**: Use `.bind( @ )` to ensure handlers have access to instance methods.
- **Forwarding**: Use `.forward( "*" )` to pass through all events not handled by specific `.when` blocks.

## Best Practices

- **Uniformity**: All methods intended to be used as event streams (like `listen`) should consistently return async iterators.
- **Simplicity**: Favor `yield from` and `EventReactor` over complex manual `for await` loops when possible.
- **Universal Logic**: Keep reactive logic in models and controllers platform-independent; refer to the `universal-logic-patterns` skill.

## Related Skills
- **Event Reactor Patterns**: For detailed API usage of the EventReactor class.
- **Developing Web Clients with RMVC+R**: For architectural context.
- **Universal Logic Patterns**: For guidance on platform-independent logic.
