---
name: developing-web-components
description: Expert guidance for building functional, reactive Web Components using Wayland and Zest. Use when creating or refactoring UI components in the Byline/Brooklyn ecosystem.
---

# Developing Web Components (Wayland & Zest)

> [!Note]
> For in-depth technical documentation and detailed context, refer to the [Developing Web Components (Wayland & Zest) Knowledge Base Article](../../kb/developing-web-components/index.md).


This skill provides specialized workflows for building native Web Components using the Wayland mixin library and the Zest DOM monad.

## Naming Conventions

### Component Tags (subject-action)
Component tags MUST follow a strict **`subject-action`** pattern (lowercase, hyphen-separated). This ensures consistency and makes it easy to identify the primary subject of a component.

- **Correct (subject-action)**: `posts-view`, `blog-editor`, `email-connector`, `post-summary`.
- **Incorrect**: `view-posts`, `editor`, `connector-email`.

## Component Structure

Components follow a strict separation of concerns across multiple files:

- **`index.coffee`**: Defines the component class, pipes mixins, and registers the tag.
- **`logic.coffee`**: Contains the reactive behavior (the "reactor").
- **`html.coffee`** (or **`.pug`**): Defines the component's markup using `@dashkite/domo`.
- **`css.styl`**: Component-specific styles in Stylus.

## Defining a Component (`index.coffee`)

Use `Fn.pipe` to compose the necessary Wayland mixins onto a base class.

```coffeescript
import * as Fn from "@dashkite/joy/function"
import { shadowed, renderable, styleable, reactive, observable, eventful } from "@dashkite/wayland"
import logic from "./logic"
import css from "./css"

class extends do Fn.pipe [
    shadowed, renderable, styleable
    reactive, observable, eventful
  ]

  @tag "my-component"
  @sheets [ css ]
  @observe.attributes [ "data-id" ]
  @reactor logic
```

### Core Mixins
- **`shadowed`**: Adds Shadow DOM support.
- **`renderable`**: Adds `@render` capability using Zest.
- **`styleable`**: Enables constructable stylesheets via `@sheets`.
- **`reactive`**: The foundation for reactor loops and lifecycle events.
- **`observable`**: Watches for DOM modifications or attribute changes.
- **`eventful`**: Declarative event management (e.g., `@click().prevent().send("action")`).

## Reactive Logic (`logic.coffee`)

The logic file exports a function that receives a `reactor` (an asynchronous event stream). Refer to the **`reactive-programming`** skill for detailed guidance on writing reactors and async generators.

```coffeescript
import html from "./html"

export default ( reactor ) ->
  for await event from reactor
    switch event.name
      when "connect"
        # component attached to DOM
        @render html { state: "loading" }
      
      when "modify"
        # watched attribute or DOM changed
        id = @dom.getAttribute "data-id"
        @render html { id }

    yield event
```

### Best Practices for Logic
- **Pure Rendering**: Keep the UI as a reflection of state.
- **Async Generators**: Use `yield event` to allow other reactors to process the same event stream.
- **External Dependencies**: Use `Registry` to fetch controllers or application-level services.

## DOM Interaction (`Zest`)

Inside your component, use Zest (`$`) for monadic DOM manipulation and projections.

- **Projections**: Use `.data` or `.attributes` proxies for clean access.
- **Event Delegation**: Use `.listen().within()` for complex interactions.
- **Declarative Updates**: Prefer `@render` for overall UI updates, but use Zest for surgical modifications if performance requires it.

## Best Practices
- **Favor Shadow DOM**: Use the `shadowed` mixin to ensure style isolation.
- **Minimal `index.coffee`**: Keep the definition file declarative; move all implementation to `logic.coffee`.
- **Lowercase Descriptives**: When documenting components, follow the `writing-documentation` skill for signatures.
