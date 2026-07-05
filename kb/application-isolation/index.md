---
tags:
  - security
  - architecture
---

# Application Isolation

This guide outlines execution sandboxing, memory/context boundaries, and runtime isolation within the Panorama architecture.

## Runtime Boundaries
Panorama ensures that multiple application specifications running on the distributed cloud nodes are isolated from each other to prevent cross-tenant interference.
- **Context Sandboxing**: Executing application specifications in ephemeral, isolated sandboxes.
- **Resource Protection**: Preventing leaking of credential storage or configuration across application borders.

> [!Note]
> *This article is currently a baseline stub. Sandbox limits, isolation layers, and security boundary benchmarks will be added in subsequent updates.*
