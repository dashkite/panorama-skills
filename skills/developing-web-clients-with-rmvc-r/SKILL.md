---
name: developing-web-clients-with-rmvc-r
description: Expert guidance for building Web clients using the RMVC+R (Reactive Model-View-Controller + Resources) architecture and the Dashkite stack. Use when designing application-level components, controllers, or resource interactions.
---

# Developing Web Clients With RMVC+R

> [!Note]
> For in-depth technical documentation and detailed context, refer to the [Developing Web Clients With RMVC+R Knowledge Base Article](../../kb/developing-web-clients-with-rmvc-r/index.md).


RMVC+R stands for **Reactive Model-View-Controller + Resources**. This architecture treats the entire application as a set of interacting event streams and logical resources.

## Architecture Components

### 1. The View (Web Component)
- **Role**: The UI representation. Each component acts as its own state machine.
- **Logic**: Contained in a `logic.coffee` file as a **reactor** (async event loop).
- **Behavior**: Merges all relevant events into a single stream.
- **Tooling**: `@dashkite/wayland` for definitions, `@dashkite/zest` for DOM access. See the **`developing-web-components`** skill for implementation details.

### 2. The Controller
- **Role**: Reusable logic that manages state and aggregates resources.
- **Interface**: Provides a `listen()` method to pull state changes and methods to push logical events.
- **Reactive Logic**: The `listen()` method returns an async iterator (reactor). Refer to the **`reactive-programming`** skill for guidance on writing reactors using async generators and the `yield from` / `await return` pattern.
- **Decoupling**: Translates device events (HX) into logical events, allowing testing independent of the browser.
- **Tooling**: `@dashkite/addison` for resource aggregation.

### 3. The Model
- **Role**: Encapsulates domain logic and serializable data interfaces.
- **Abstraction**: Controllers work with models, not raw data. Models provide logical views (e.g., getters) for the controller and view.
- **Universal Constraint**: Models and Controllers SHOULD be "Universal" (platform-independent) whenever independent testing outside the browser is required. They must not reference DOM-specific globals like `document`, `Node`, or `HTMLElement`. Move any DOM-specific preparation or transformation to view-level helpers. Note: Web Components (the View) are inherently DOM-based and are exempt from this constraint.

### 4. The Resource
- **Role**: Reactive interfaces for data, modeled on HTTP (RESTful).
- **Behavior**: Resources are themselves reactors. Operations (like `put`) produce events rather than direct responses.
- **Aggregate Events**: The shape of the `value` property in emitted events depends on the model type:
  - **Composite Models**: (Using `@dashkite/addison/composite`) These aggregate multiple resources. The `value` contains the **entire aggregate state** (e.g., `{ profile: ..., blog: ... }`). 
  - **Atomic Models**: (Using `@dashkite/addison/atomic`) These represent a single resource. The `value` property contains the **direct resource value**.
- **Not Found Semantics**: Composite models MUST always re-dispatch the `not found` event from their underlying resources, even if no fallback is provided. This ensures that controllers and components can respond to missing resources (e.g., by triggering a creation flow).
- **Reactor Event Precedence**: When using `EventReactor`, matching is order-dependent. A wildcard handler (`.when "*"`) will intercept all events; place more specific handlers (like `"value"` or `"created"`) **before** any catch-all blocks to ensure specialized logic is executed.
- **Providers**: Managed by `@dashkite/belmont`.
  - **HTTP**: `@dashkite/broadway`
  - **Local**: `@dashkite/halstead`
  - **Mock**: `@dashkite/lakeshore`

## The Stack

- **View Definition**: `@dashkite/wayland`
- **DOM Manipulation**: `@dashkite/zest`
- **Reactivity**: `for await...from` loops or `@dashkite/reactive` event reactors.
- **Templates**: Pug or `@dashkite/domo` (prefer Domo for complexity).
- **Styles**: Stylus.

## The Development Process

1.  **Model**: Build and test the domain models first.
2.  **Controller**: Build and test the controllers (can be done independent of the platform).
3.  **View**: Build and test the Web Components (Wayland). Refer to the **`developing-web-components`** skill for guidance on component structure and reactive logic.

## Best Practices

- **Separation of Concerns**: Keep models and controllers in separate repositories/modules from views to maximize reusability and testability.
- **Logical Mapping**: Ensure the View maps device events to logical events before sending them to the Controller.
- **State Persistence**: Use controllers or local resource providers (Halstead) to persist state across sessions.
- **Cloud-First**: Follow the `building-and-publishing` skill for deployment and validation.
