---
name: building-and-publishing
description: Expert guidance for building and publishing Byline components and assets using Genie and Dashkite's cloud-first development model. Use when deploying code to development or production environments.
---

# Build & Publish (Cloud-First Development)

> [!Note]
> For in-depth technical documentation and detailed context, refer to the [Build & Publish (Cloud-First Development) Knowledge Base Article](../../kb/building-and-publishing/index.md).


This skill provides the standard operating procedures for building and deploying Byline/Central Park projects using the `Genie` task runner and a cloud-first methodology.

## Cloud-First Philosophy
Dashkite embraces **Cloud-First Development**. To ensure environmental parity and accurate validation of server components, standard procedure is to publish directly to internal cloud development URLs rather than relying on local test servers.

- **Parity**: Ensures that code pushed to production isn't relying on quirky local setups.
- **Server Components**: Inherent requirements for server components make cloud publishing the truest source of validation.
- **Verification**: Always verify your changes on the published development URL.

## The Tooling (Genie & Masonry)

### Genie Task Runner
Most projects are managed by `genie.yaml`, which defines tasks and hooks.
- **Common Task**: `genie build publish` (Executes the build and then publishes to the cloud).
- **Hooks**: Plugins (like `Genie Atlas`) often hook into the `.after("build")` phase.

### Bootstrap Tooling & Manual Scripts
For "bootstrap" tooling (e.g., `genie-coffee` or core building blocks) that do not use Genie:
- **Check for Scripts**: If a tooling-related repo does not have a `genie.yaml` or Genie installed, look for a `scripts/` directory.
- **Task Equivalence**: These repos typically use standalone scripts in the `scripts/` directory that mirror Genie task names.
- **Example**: Use `./scripts/build` instead of `genie build`.

### Masonry
Asset transformation building blocks. It provides a functional pipeline architecture for files (e.g., `M.start [ M.glob, M.read, M.tr, M.write ]`).

## Workflows

### Standard Deployment
To build and publish a project (typically within a module's directory):
`npx genie build publish`

### Module vs. Client Publishing
The publishing process differs depending on the target:
- **Modules**: Use the `@dashkite/genie-module` preset. It is often hardcoded to a specific environment and is required for publishing shared libraries.
- **Web Clients**: Use the standard `@dashkite/genie-publish` task. Configuration is minimal (usually just the `bucket` property).

### Tooling Deployment (No Genie)
If `genie` is not available:
1.  Check for `./scripts/build` and `./scripts/publish`.
2.  Execute them directly from the repository root.

### Import Map Generation (Atlas)
Import maps are handled by `Atlas` and `Genie Atlas`.
- `Genie Atlas` defines the `atlas:generate` task.
- `Masonry Atlas` parses `index.html` and injects the `<script type='importmap'>` into the `<head>`.
- This process typically runs automatically during the `build` phase.

### Validation
After a successful `genie publish` (or manual publish script), you should receive a URL where the code is live. Use this URL to perform your final validation.

## Build Process (No Bundling)
Byline avoids complex bundlers (Webpack/ESBuild) in favor of:
- **Native ES Modules**
- **Import Maps**
- **Genie/Masonry** for lightweight asset transformation.
