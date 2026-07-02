---
name: design-and-styling
description: Standards and best practices for design, layout, and styling using Stylus and the Dashkite stack. Use when creating stylesheets, refactoring UI components, or implementing complex layouts.
---

# Design and Styling Standards

> [!Note]
> For in-depth technical documentation and detailed context, refer to the [Design and Styling Standards Knowledge Base Article](../../kb/design-and-styling/index.md).


This skill provides the architectural and technical standards for styling Dashkite applications, with a focus on professional quality, maintainability, and consistent Human Experience (HX).

## The Foundational Layer (Posh)

All applications use `@dashkite/posh` for foundational styles. It provides:
- **Josh's Custom CSS Reset**: A modern reset that handles box-sizing and common browser quirks.
- **Normalization**: Standardizes basic elements like links and lists.
- **Theming System**: Uses CSS variables (e.g., `--highlight`, `--accent`) to drive the visual language.

### Important Note on Lists
The `@dashkite/posh` normalization sets a default `list-style: outside disc` for `li` within `ul`. To remove bullets, you MUST apply `list-style: none` directly to the `li` elements or ensure the selector is specific enough to override normalization.

## Stylus Best Practices

### 1. Robust Selectors
Prefer semantic and specific selectors. Avoid ambiguous tag-only selections in global or shared styles.
- **Good**: `main .page.active .view.active h1`
- **Avoid**: `h1` (unless intended as a global reset)

### 2. Nesting and Readability
Leverage Stylus nesting to represent component structure, but avoid excessive depth (typically > 3 levels) to keep the generated CSS manageable.

### 3. Using CSS Variables
Always favor theme variables over hardcoded colors or sizes.
- **Colors**: `--background`, `--foreground`, `--accent`, `--highlight`.
- **Sizes**: `--copy-max-width`, `--copy-font-size`, `--small-copy-font-size`.

## Application Layout Patterns (Byline Standard)

### The Application Frame
The frame exists outside individual pages/views. It provides persistent navigation and headers.

### View Alignment and Centering
- **Horizontal**: Views should be centered horizontally using a `max-width` (typically `var(--copy-max-width)` or `var(--page-max-width)`).
- **Vertical**: Views should be aligned to the **start (top)** of the page container.
- **Spacing**: Use consistent `padding-inline` (standard 1rem) and `padding-block` for views.

### Navigation Links
Simple navigation should always be represented as a link (`<a>`), not a button, unless it involves a mandatory side effect (e.g., creating a resource).

## Visual Polish and Aesthetic

### Typography
- Use the established font scale (defined in `theme.styl`).
- Maintain legible line heights (standard 1.5).

### Consistency and Interactivity
- Ensure margins and gaps are consistent across similar components.
- Use transitions (e.g., `transition: color 0.2s ease-in-out`) for hover states on interactive elements.
- **Hover States**: NEVER rely on `:hover` states to communicate information, as they are not available on mobile devices. Hover states may augment another communication mechanism but must never be used alone.

## Related Skills
- **Developing Web Components**: For technical details on component implementation.
- **Developing Web Clients**: For general UX/HX guidance.
