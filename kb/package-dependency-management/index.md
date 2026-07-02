---
tags:
  - package
  - operations
---

# Package & Dependency Management

This article outlines how npm packages, internal repository linking, and versioning are managed in the Panorama ecosystem.

## The Metarepo Context
A Panorama metarepo is **not** a PNPM workspace or a monorepo.
- **Local Linking**: Internal packages are linked using relative paths during development (e.g. `pnpm add ../joy`) which updates the package file and establishes physical symlinks.
- **Independence**: Sub-repositories retain independent dependency trees to facilitate sharing them across multiple metarepos.

> [!Note]
> *This article is currently a baseline stub. Full NPM publishing workflows, local linking recipes, and version conflict resolution guidelines will be added in subsequent updates.*
