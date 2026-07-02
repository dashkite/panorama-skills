---
tags:
  - management
---

# Forgejo Repository Management (fj)

This skill provides specialized workflows for managing Forgejo repositories using the `fj` CLI.

## Common Workflows

### Creating a Repository
To create a new repository:
`fj repo create <org>/<name> --public|--private [options]`

Common options:
- `--template <template-repo>`: Create from a template repository.
- `--description "<desc>"`: Set the repository description.

### Deleting a Repository
To delete a repository (requires confirmation):
`fj repo delete <org>/<name> --confirm`

### Viewing Repository Information
To view a repository's metadata:
`fj repo view <org>/<name>`

## Best Practices
- **Namespace**: Always specify the organization or developer when referring to repositories (`org/repo-name`).
- **Confirmation**: Use `--confirm` for deletions to avoid interactive prompts.
- **Verification**: After creating a repository, verify its settings using `fj repo view`.
