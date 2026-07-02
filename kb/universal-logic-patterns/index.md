---
tags:
  - architecture
  - patterns
---

# Universal Logic Patterns

Universal logic ensures that the core behavior of models and controllers can be executed and tested in any environment (Node.js or Browser) without modification.

## Core Principle

**Separate domain logic from presentation logic.** Domain logic (models and controllers) should be "pure" regarding the environment, while presentation logic (Web Components and view helpers) handles the DOM.

## Patterns & Practices

### Avoid DOM Globals
Models and Controllers should not reference:
- `document`
- `window`
- `Node` / `Element` / `HTMLElement`
- `document.createDocumentFragment()`

### Move DOM Assembly to View Helpers
Instead of models generating DOM nodes, they should provide data or raw HTML strings. The view layer (or a view helper) is responsible for turning that data into DOM structures.

**Example: Title Extraction**
- **Non-Universal**: Using `root.querySelector("h1")` in a model helper.
- **Universal**: Using regex `markdown.match(/^#\s+(.+)$/m)` in the model helper.

### Use Environment-Agnostic Libraries
Prefer libraries that work in both environments:
- `marked` for Markdown parsing (generates HTML strings).
- `@dashkite/joy` for functional utilities.
- `js-yaml` for configuration parsing.

### Abstraction via Registry
If a model or controller requires platform-specific behavior, access it via the **Registry** rather than hardcoding references to globals.

## Refactoring browser-only logic to Universal
1. Identify all references to DOM globals.
2. If the reference is for *parsing* (e.g., extracting a title), use string manipulation or a universal parser.
3. If the reference is for *formatting/assembly* (e.g., wrapping content in a `<header>`), move that logic into a `prepare` or `format` helper within the component's directory.
4. Update the component to call the helper before rendering.

## Testing
Universal logic can be tested directly using `genie test` in a Node.js environment, providing faster feedback cycles and better test isolation.
