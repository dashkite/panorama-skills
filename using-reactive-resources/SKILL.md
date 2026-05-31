---
name: using-reactive-resources
description: Guidance for using reactive resource providers (Belmont, Broadway, Halstead, Lakeshore). Use when you need to resolve locators to resources, subscribe to changes, or perform CRUD operations on remote or local resources.
---

# Using Reactive Resources

This skill provides patterns and workflows for working with reactive resources using the Dashkite stack.

## Core Concepts

- **Belmont**: The resource manager that maps locators to URLs and delegates to providers.
- **Provider**: A protocol-specific implementation (HTTP, LocalStorage, Mock) that publishes reactive events.
- **Locator**: An abstract description of a resource (e.g., origin, name, bindings).
- **Resource Instance**: A topic that publishes events like `value`, `delete`, and `not found`.

## Workflows

### 1. Registering Providers

Providers must be registered for their respective protocol schemes.

```coffee
import Providers from "@dashkite/belmont/providers"
import Broadway from "@dashkite/broadway"
import Halstead from "@dashkite/halstead"
import Lakeshore from "@dashkite/lakeshore"

Providers.add "http", Broadway
Providers.add "https", Broadway
Providers.add "local", Halstead
Providers.add "mock", Lakeshore
```

### 2. Resolving Resources

Use `Resource.resolve` with a locator or a template.

```coffee
import Resource from "@dashkite/belmont"

# Using a locator (requires discovery for Broadway)
resource = await Resource.resolve
  origin: "https://api.example.com"
  name: "profile"
  bindings: { id: "123" }

# Using a template (required for Halstead/Lakeshore)
resource = await Resource.resolve
  template: "local://settings"
```

### 3. Interacting with Resources

Resources are reactive topics. Subscribe to them to handle data updates or errors.

```coffee
resource.subscribe ({ name, value, url, method, scope }) ->
  # Use scope to distinguish between resource and model events
  return unless scope == "resource"
  
  switch name
    when "value" then console.log "Data:", value
    when "created" then console.log "Resource created with value:", value
    when "delete" then console.log "Deleted"
    when "not-found" then console.log "Resource not found at #{url}"
    when "method-not-allowed" then console.error "#{method} not supported for #{url}"

# Trigger actions
resource.get()
resource.put { theme: "dark" }
resource.delete()
```

## Patterns and Examples

See [references/patterns.md](references/patterns.md) for:
- Mocking APIs with Lakeshore
- Handling HTTP errors in Broadway
- Persistent state with Halstead
- Resource creation with POST
