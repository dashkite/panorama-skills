---
name: using-drns
description: Expert guidance for working with Dynamic Resource Names (DRNs) in core and Sky contexts. Use when resolving, storing, or describing resources referred to by 'drn:' strings.
---

# Using DRNs (Dynamic Resource Names)

This skill provides specialized workflows for working with Dynamic Resource Names (DRNs) to refer to and manage resources uniformly across the ecosystem.

## Core Concepts

- **DRN Format**: Strings starting with `drn:`, followed by a type (type names may be qualified using colons, ex: `s3:origin`) and a resource path (e.g., `drn:s3:origin/my-site/my-bucket`).
- **Resolution**: Converting a DRN string into a live resource object or data.
- **Replacement**: Deeply traversing objects to replace embedded DRN strings with their resolved resources. Note: DRNs themselves cannot be nested.
- **Storage**: Writing or removing additional configuration data for an environment locally (via DRN Sky).

## Key Modules

### @dashkite/drn (Core)
Provides the base resolution and encoding logic.
- **`resolve(uri)`**: Returns the resource.
- **`replace(object)`**: Recursively resolves all DRNs in an object.
- **`describe(uri)`**: Returns a structured description object.

### @dashkite/drn-sky (Sky Preset)
A preset that extends core with storage operations and built-in cloud resolvers.
- **`store(uri, data)`**: Writes data to the resource.
- **`remove(uri)`**: Deletes the resource.
- **Resolvers**: `s3`, `lambda`, `graphene`, `domain`.

## Common Workflows

### Resolving Resources
Use `resolve` when you need a single resource, or `replace` when dealing with configuration objects.

```coffeescript
import { resolve, replace } from "@dashkite/drn-sky"

# Single resolution
api = await resolve "drn:domain/api/example/com"

# Bulk resolution
config = await replace 
  bucket: "drn:s3:my-assets"
  func: "drn:lambda:processor"
```

### Storing and Removing Data
Use `store` and `remove` for resources that require additional environmental configuation (for example, Graphene needs to store the DynamoDB table name since it uses a random key to avoid name collisions).

```coffeescript
import { store, remove } from "@dashkite/drn-sky"

# Store local environment config
await store "drn:graphene:my-db", { address: "abc123" }

# Delete local environment config
await remove "drn:graphene:my-db"
```

### Registering Custom Types
If a resource type is missing, use `Resolvers.register` to add it.

```coffeescript
import { Resolvers } from "@dashkite/drn"

Resolvers.register
  type: "my-custom"
  template: "/my-custom/{id}"
  apply: ({ id }) -> # resolve logic
```

## Best Practices
- **Favor Strings**: Refer to resources using DRN strings whenever possible to maintain portability.
- **Cloud-First**: Use DRN Sky when working with AWS/Sky resources to leverage built-in resolvers.
- **Describe for Inspection**: Use `describe` to programmatically inspect the segments of a resource name.
of a resource name.
