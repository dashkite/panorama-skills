---
name: yq-yaml-management
description: Expert guidance for querying and manipulating YAML files using the yq CLI. Use for extracting data, updating fields, and transforming YAML structures (e.g., querying .tempo/repos.yaml).
---

# YAML Management (yq)

> [!Note]
> For in-depth technical documentation and detailed context, refer to the [YAML Management (yq) Knowledge Base Article](../../kb/yq-yaml-management/index.md).


This skill provides specialized workflows for working with YAML files using the `yq` CLI, with a focus on managing the Byline metarepo configuration.

## Common Workflows

### Querying Data
To extract a value from a YAML file:
`yq '<path>' <file>`

**Example: Finding the provider for a repository in `.tempo/repos.yaml`**:
`yq '.[] | select(.name == "<repo-name>") | .provider' .tempo/repos.yaml`

### Filtering and Selecting
To filter a list of objects:
`yq '.[] | select(.organization == "dashkite")' .tempo/repos.yaml`

### Updating Fields
To update a field in place:
`yq -i '.[] | select(.name == "<repo-name>") | .tags += ["<tag>"]' .tempo/repos.yaml`

### Deleting Elements
To delete an entry from a list:
`yq -i 'del(.[] | select(.name == "<repo-name>"))' .tempo/repos.yaml`

## Best Practices
- **In-place Updates**: Use the `-i` flag for in-place modifications after verifying the query without it.
- **Pipe Chain**: Use the pipe operator (`|`) to build complex selectors incrementally.
- **Verification**: Always verify the output of a query before applying a modification or using the result in another command.
