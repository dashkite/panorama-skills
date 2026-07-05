---
tags:
  - testing
  - operations
---

# Cloud-First Testing

This guide details testing applications inside dedicated cloud test environments (composed of Lambdas, databases, and message queues) under the Panorama architecture.

## Cloud-First Paradigms
Rather than relying solely on local mocks and simulated environments, changes are validated inside dedicated cloud environments.
- **Isolated Deployments**: Testing changes by deploying to dedicated, isolated test environments before pushing to production.
- **DRN Scoping**: Using Dynamic Resource Names (DRNs) to target endpoints, databases, and lambdas mapped specifically to the test environment.

> [!Note]
> *This article is currently a baseline stub. Concrete testing setups, cloud environment provisioning guidelines, and test suites execution details will be added in subsequent updates.*
