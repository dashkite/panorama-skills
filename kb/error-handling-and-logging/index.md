---
tags:
  - patterns
  - hx
---

# Error Handling & Logging

This article details conventions for catching, raising, and logging errors within the Panorama architecture.

## Robust Asynchronous Failure Handling
Since Panorama relies heavily on async generators, event streams, and reactive event loops, standard try/catch blocks are often insufficient.
- **Generator Errors**: Generator delegation must handle yields and generator throws cleanly.
- **Human-Friendly Reporting (HX)**: Errors should bubble up to controllers or UI components in a readable format, preventing raw uncaught promise rejections from leaking to the console.

> [!Note]
> *This article is currently a baseline stub. Concrete error reactor patterns, console logging filters, and stack-trace debugging tips will be added in subsequent updates.*
