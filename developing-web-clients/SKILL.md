---
name: developing-web-clients
description: General guidance for building Web clients in the Dashkite ecosystem. Use when designing application structure, choosing between buttons and links, or establishing common UI patterns.
---

# Developing Web Clients

This skill provides general guidance and best practices for building Web applications within the Dashkite ecosystem.

## Naming Conventions

### Internal Identifiers (subject-action)
To reduce cognitive load and maintain a clear separation from user-facing copy, all internal identifiers—including page names, route names, and context keys—MUST follow a strict **`subject-action`** pattern (lowercase, space-separated).

- **Correct (subject-action)**: `posts view`, `blog edit`, `post edit`.
- **Incorrect**: `view posts`, `edit blog`, `editor`.

This convention applies strictly to the code (e.g., `pages.add { name: "posts view" }`). User-facing copy, requirements, and narratives may use more natural forms (e.g., "View Posts" or "Edit Blog").

## UI Patterns and Human Experience (HX)

### Navigation vs. Actions
- **Links for Navigation**: Simple navigation (e.g., moving from a list view to an editor) SHOULD always be represented as a link (`<a>` tag), not a button. This respects browser behavior (middle-click to open in new tab, status bar preview) and follows established Web conventions.
- **Buttons for Actions**: Use buttons (`<button>` tag) for operations that have side effects, such as creating, updating, or deleting resources, or when the operation involves complex logic beyond simple navigation.
- **Exception**: If a navigation step is preceded by a mandatory side effect (e.g., clicking "Add Post" first creates a new post resource before redirecting to the editor), a button is appropriate because the primary intent is the creation of the resource.

## Development Workflow

### Publishing
When making changes to library modules (e.g., Astoria, Mimic), you must `genie publish` the library repository AND the main Web client repository (e.g., Chelsea). This ensures the `importmap` is regenerated with the correct hashes, allowing the browser to load the latest code.

## Related Skills
- **Developing Web Components**: For technical details on implementing individual components.
- **Developing Web Clients with RMVC+R**: For architecture-specific patterns.
