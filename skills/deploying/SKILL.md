---
name: deploying
description: Expert guidance for deploying Web sites, modules, and cloud infrastructure using Genie and Dynamic Resource Names (DRNs). Use when configuring genie.yaml for deployment or running 'genie deploy/publish'.
---

# Deploying (Dashkite Standard)

> [!Note]
> For in-depth technical documentation and detailed context, refer to the [Deploying (Dashkite Standard) Knowledge Base Article](../../kb/deploying/index.md).


This skill provides specialized workflows for deploying software across different environments (development, testing, production) using Genie and Dynamic Resource Names (DRNs).

## Core Concepts

- **Logical Identification**: We use DRNs to identify resources regardless of the deployment mode. This allows the same configuration to work across environments by resolving logical names to environment-specific resources.
- **Unified Tooling**: All deployments are managed via `@dashkite/genie` and its plugins.

## Web Sites and Applications

### 1. Requirements
Ensure the following are installed as development dependencies:
- `@dashkite/genie`
- `@dashkite/genie-sky`
- `@dashkite/genie-drn`
- `@dashkite/genie-publish`
- `@dashkite/drn-sky`

### 2. Infrastructure Setup (`genie deploy`)
Define the S3 bucket in `genie.yaml` using a DRN. Example:

```yaml
s3:
  - domain: drn:domain/www/pandastrike/com
    cors: true
    website:
      index: index.html
      error: index.html
```

Run `genie deploy` to provision the infrastructure.

### 3. Edge Routing (CloudFront)
Edge deployment (AWS CloudFront distributions) for new URLs is typically managed in a dedicated infrastructure repository (e.g., `./daenarys`) rather than within the application shell itself.

### 4. Publishing (`genie publish`)
Define the publish configuration in `genie.yaml`. For web sites, the default configuration usually only requires the bucket name. Example:

```yaml
publish:
  bucket: drn:domain/www/pandastrike/com
```

Run `genie publish` to upload the files.

### 5. Import Maps (Optional)
Requires `@dashkite/genie-atlas`. Add an `atlas` stanza to `genie.yaml` to override defaults. Example:

```yaml
atlas:
  target: ./build/browser/src/index.html
  entries:
    - ./build/browser/src/index.js
```

## Modules

To publish modules, use the specialized **`@dashkite/genie-module`** preset.

1. Ensure `@dashkite/genie-module` is installed as a development dependency.
2. Run `genie publish`.

Note: `genie-module` provides a different variant of the publish task specifically for modules. Do NOT use it for web clients.

## Cloud Infrastructure

Provision diverse cloud components using the `sky` stanza in `genie.yaml`.
- **Command**: `genie deploy` to provision or `genie undeploy` to remove.
- Refer to the specific `sky` sub-stanza for the component type being deployed.

## Automation & Watching

### Genie Watch (Experimental)
Install `@dashkite/genie-watch` and run `genie watch` to automatically publish changes during development. This is especially useful when working on a module and a dependent application simultaneously.

## Related Skills
- **Using DRNs**: For details on resolving and describing Dynamic Resource Names.
- **Building and Publishing**: For general build workflows.
