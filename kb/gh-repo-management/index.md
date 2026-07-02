---
tags:
  - management
---

# GitHub Repository Management (gh)

This skill provides specialized workflows for managing GitHub repositories using the `gh` CLI.

## Common Workflows

### Creating a Repository
To create a new repository:
`gh repo create <org>/<name> --public|--private [options]`

Common options:
- `--template <template-repo>`: Create from a template repository.
- `--description "<desc>"`: Set the repository description.
- `--homepage <url>`: Set the repository homepage.

### Deleting a Repository
To delete a repository (requires confirmation):
`gh repo delete <org>/<name> --confirm`

### Viewing Repository Information
To view a repository's metadata:
`gh repo view <org>/<name>`

## Best Practices
- **Namespace**: Always specify the organization or developer when referring to repositories (`org/repo-name`).
- **Confirmation**: Use `--confirm` for deletions to avoid interactive prompts.
- **Verification**: After creating a repository, verify its settings using `gh repo view`.
