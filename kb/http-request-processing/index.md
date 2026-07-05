---
tags:
  - patterns
---

# HTTP Request & Reply Processing

This guide outlines rules-based request-reply interception, reactive client operations, and HTTP specifier evaluations within the Panorama architecture.

## Reactive HTTP Operations
HTTP communications in Panorama are modeled as reactive, stream-based flows rather than static block-and-wait request structures.
- **Sublime Specifiers**: Declarative rules that intercept incoming HTTP requests, mapping them to corresponding replies or backend streams.
- **Atlas**: A reactive HTTP client used to fetch, stream, and interact with remote HTTP endpoints as event streams.

> [!Note]
> *This article is currently a baseline stub. Full Sublime specification schemas, Atlas request-reply examples, and routing middleware patterns will be added in subsequent updates.*
