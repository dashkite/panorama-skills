---
name: metarepo-management
description: Expert guidance for managing the Byline metarepo using @dashkite/tempo. Use when adding, removing, or syncing repositories, running commands across the metarepo, or initializing new modules.
---

# Metarepo Management (Byline/Central Park)

This skill provides specialized workflows for the Byline metarepo, leveraging `@dashkite/tempo` and custom project-level scripts.

> [!Note]
> For in-depth technical documentation on the metarepo architecture, command details, and troubleshooting, refer to the [Metarepo Management Knowledge Base Article](../../kb/metarepo-management.md).

> [!Important]
> A metarepo is _not_ a monorepo nor a PNPM workspace.

## Metarepo Structure
- All project repositories are cloned into `.tempo/repos/<repo-name>`.
- Repositories are symlinked from the metarepo root to their respective folder in `.tempo/repos/`.
- The list of repositories is managed in `.tempo/repos.yaml`.
- **Metarepo Documentation**: Documentation specific to the metarepo itself (rather than individual sub-repositories) is stored in `.meta/docs/`. This includes product requirements, todo lists, and session summaries.

## Common Workflows

### Determining Repository Metadata
Before performing operations, you can use the **`yq-yaml-management`** skill to query `.tempo/repos.yaml`.
- **Find Provider**: `yq '.[] | select(.name == "<repo-name>") | .provider' .tempo/repos.yaml`

### Repository Visibility & Provider Guidelines
When creating new repositories (using **`gh-repo-management`** or **`fj-repo-management`**):
- **Provider Preference**: Favor **Codeberg** (`provider: codeberg`) unless otherwise specified.
- **Default Visibility**: Favor **public** repositories.
- **Application Repositories**: Directly application-related repos (e.g., the Byline API) should be **private**.
- **Interoperability Exception**: Application-related repos should be **public** if they are useful for third-party developers (e.g., Web components that use a private API).
- **When in Doubt**: Always ask the developer before deciding on visibility or provider.

### Managing Repositories (GitHub / Codeberg)
For operations on the remote repository itself (creation, deletion, etc.):
- **GitHub**: For repos with `provider: github`, use the **`gh-repo-management`** skill.
- **Codeberg**: For repos with `provider: codeberg`, use the **`fj-repo-management`** skill.

### Adding a New Repository
1.  **Add to Metarepo**: Run `tempo add -P <repo-reference>`.
    -   Repo references take the form `<provider>:<organization>/<name>` (e.g., `codeberg:dashkite/flashdom`).
    -   The `-P` option prevents Tempo from attempting to display a progress bar.
2.  **Tag Repository**: Run `tempo tag <tags...> <repo-name>` to categorize the repository.
    -   Recommended tags: `module`, `client`, `apis`, `server`, or `tool`.
3.  **Initialize Module**: If you are creating a **new** repository from scratch (not adding an existing one), initialize the structure using:
    `./.scripts/init <repo-name> <template>`
    -   Supported templates: `browser`, `node`, `universal`.
    -   **Important**: Do NOT run `init` when adding an existing repository.
4.  **Install Dependencies**: Run `pnpm install` in the root to ensure workspace links are updated.

### Removing a Repository
- Run `tempo remove <repo-reference>` (or `rm`) to remove the symlink and entry from `.tempo/repos.yaml`.
- **Note**: You MUST use the full repo reference (e.g., `github:dashkite/runner`), not just the name.

### Managing Tags
- **Add Tags**: `tempo tag <tags...> <repo-name>`
- **Remove Tags**: `tempo untag <tags...> <repo-name>`

### Syncing Repositories
- Run `tempo sync -P` to ensure all local repositories are up-to-date with their remote counterparts.

## Managing Developmental Dependencies

When working with core tools or shared modules that are under active development:
- **Use the Metarepo-Named Branch**: Switch the dependency's repository to the branch with the same name as the metarepo (e.g., `central-park` or `winterfell`) before editing.
- **Local Linking**: Use pnpm to add local development depenencies, ex: `pnpm add ../joy`. This will both update the `package.json` file and install the dependency.

## Executing Commands Across Repositories

### Using `tempo exec`
Run a direct shell command in all repositories:
`tempo exec "<command>"`

- **Preventing Progress Bar Failures**: In environments without a fully configured TTY (such as sandboxed terminal sessions, background tasks, or certain CI environments), the progress bar can fail with a `RangeError: Invalid count value: Infinity` error. To prevent this, pass the `-P` or `--no-progress` flag:
  `tempo exec -P "<command>"`

### Using `tempo run` (Saved Scripts)
Run scripts defined in `.tempo/scripts.yaml`:
`tempo run <script-name> [arguments]`

Common scripts available in `.tempo/scripts.yaml`:
- `commit`: Commit all changes in each repo with a message.
- `pull`: Pull changes in all repos.
- `push`: Push changes in all repos.
- `release`: Run a patch release across repos.

### Partial Operations
You can target specific repositories or tags using the `--include`, `--exclude`, or `--tags` options with `tempo run` or `tempo exec`.

## Managing Repositories with Git

- **Metarepo Symlinks**: Directories in the root are symlinks to `.tempo/repos/`.
- **Branching Strategy**: Before making changes to any repository within the metarepo, **create or switch to a branch with the same name as the metarepo** (e.g., `central-park`).
  -   *Example*: If working in `central-park`, ensure the sub-repo is on the `central-park` branch before editing.
- **Batch Commits**: Use `tempo run commit "<message>"` for batch commits across all repositories.
