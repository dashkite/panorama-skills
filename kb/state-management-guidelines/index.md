---
tags:
  - state
  - patterns
  - hx
---

# State Management Guidelines

This article defines the conventions and patterns for managing state within Panorama applications.

## Reactive Model-View-Controller + Resources (RMVC+R)
State flows reactively from underlying resource providers (like Belmont, Broadway, Halstead, Lakeshore) up to controllers and view models.
- **Local State**: Kept scoped within components to preserve encapsulation and reusability.
- **Global/Shared State**: Managed via shared controllers and accessed using the global Registry.

> [!Note]
> *This article is currently a baseline stub. Full state flow guidelines, resource lifecycle patterns, and registry mocking recipes will be added in subsequent updates.*
