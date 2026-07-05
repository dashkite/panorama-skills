---
tags:
  - security
---

# Least Privilege Authorization

This guide outlines authorization tokens, scope validation, sandboxed execution, and access control patterns managed by Runes, Cobalt, and Guardian.

## Access Control & Execution Isolation
Every component or resource request in Panorama must declare its required permissions to restrict runtime scope.
- **Runes**: Permission tokens representing cryptographically bound capabilities.
- **Cobalt**: Edge authorization controller validating runes against incoming requests.
- **Guardian**: Runs the policy engine (Enchant) within a dedicated Lambda configured with extremely limited privileges. Even if Enchant contains an exploitable vulnerability, an attacker cannot pivot to other backend systems (such as the database) because the hosting Lambda is isolated and has no direct database access.

> [!Note]
> *This article is currently a baseline stub. Detailed token verification algorithms, capability scopes, and permission schemas will be added in subsequent updates.*
