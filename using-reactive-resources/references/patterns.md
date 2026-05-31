# Reactive Resource Patterns

## Mocking APIs (Lakeshore)

Use Lakeshore to define custom mock behavior for development.

```coffee
import Lakeshore from "@dashkite/lakeshore"

# Define mock behavior
Lakeshore.register "mock://api/users/{id}",
  get: ({ url, bindings }) ->
    # Simulate data
    { description: "ok", content: { id: bindings.id, name: "Alice" } }

  put: ({ url, bindings }, content) ->
    # Accept changes
    { description: "ok", content }

# Resolve as a mock resource
resource = await Resource.resolve
  template: "mock://api/users/{id}"
  bindings: { id: "456" }

# Subscribe and use
resource.subscribe ({ name, value }) ->
  if name == "value" then console.log "User:", value

resource.get()
```

## Handling HTTP Errors (Broadway)

Broadway publishes specific error messages as semantic events.

```coffee
resource.subscribe ({ name }) ->
  switch name
    when "not-found" then console.log "Resource doesn't exist"
    when "unauthorized" then console.log "Authentication required"
    when "forbidden" then console.log "Insufficient permissions"
    when "method-not-allowed" then console.log "Resource doesn't support this method"
```

## Resource Creation (POST)

When using `POST`, the `created` event includes a `locator` for the new resource.

```coffee
# Resolve the collection
collection = await Resource.resolve
  template: "mock://api/users"

# Subscribe to creation
collection.subscribe ({ name, locator, value }) ->
  if name == "created"
    console.log "New user created at:", locator
    console.log "Initial data:", value

# Create a new user
collection.post { name: "Bob" }
```

## Local Storage Persistence (Halstead)

Halstead is ideal for local-only settings or state.

```coffee
# Settings resource
settings = await Resource.resolve
  template: "local://app/settings"

# Update theme
settings.put { theme: "light" }

# Retrieve settings
settings.get()
```
