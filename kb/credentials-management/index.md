---
tags:
  - security
---

# Credentials Management

This guide outlines secret storage, keys rotation, and least-privilege credentials retrieval managed by Sierra under the Panorama architecture.

## Secure Credentials Architecture
Applications running in the Panorama cloud must access external APIs and databases without exposing plaintext keys to creators or other running specifications.
- **Sierra**: Interacts with cloud KMS/Secret managers to resolve, cache, and securely inject API keys and database credentials at runtime.
- **Isolation Protection**: Integrates with sandboxed runtimes to prevent credentials from leaking across application execution boundaries.

> [!Note]
> *This article is currently a baseline stub. Secret storage schemas, environment injection patterns, and credential rotation rules will be added in subsequent updates.*
