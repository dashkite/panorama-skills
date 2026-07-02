---
tags:
  - management
---

# Metarepo Management (Byline/Central Park)

This guide provides in-depth technical documentation for managing the Byline metarepo using `@dashkite/tempo`.

## What is a Metarepo?

A **metarepo** is a collection of independent git repositories mapped as subdirectories within a parent project. Unlike a monorepo or a PNPM workspace:
- **Independent History**: Each subdirectory retains its own standalone Git repository, branch history, and remote upstream.
- **Reusability**: Sub-repositories (such as core libraries) can easily be shared across multiple metarepos.
- **Symlinked Structure**: Tempo clones repositories into a centralized hidden directory (`.tempo/repos/`) and symlinks them into the metarepo root.

## Directory Structure & Configuration

Tempo reads `.tempo/repos.yaml` to determine which repositories belong to the project.

```
<metarepo_root>/
├── .tempo/
│   ├── repos.yaml               # Metadata mapping repo names to remotes
│   └── repos/                   # True clone location for all sub-repos
│       ├── brooklyn/
│       ├── chelsea/
│       └── ...
├── brooklyn -> .tempo/repos/brooklyn   # Root symlinks pointing to true repos
├── chelsea -> .tempo/repos/chelsea
└── ...
```

## Core Workflows

### Branching Strategy
Before editing code inside any sub-repository, **always switch to a branch that matches the name of the metarepo** (e.g., `central-park` or `winterfell`).
- **Why**: Keeps all modifications isolated to the current project context.
- **How**: Check the branch using `git status` in the sub-repository, and switch/create using `git checkout -b central-park` if needed.

### Adding a New Repository
1. **Register & Clone**: Run `tempo add -P <provider>:<org>/<name>` (e.g., `tempo add -P codeberg:dashkite/flashdom`).
   - The `-P` flag disables progress bars, which can crash non-TTY or sandboxed terminals.
2. **Tag the Repo**: Use categories to group commands (e.g., `tempo tag module client flashdom`).
3. **Initialize Directory Structure**: If creating a brand-new repo from scratch, use the template initializer:
   `./.scripts/init <repo-name> <template>`
   *Templates*: `browser` (web-only client), `node` (backend tools), `universal` (anywhere).
4. **Relink dependencies**: Run `pnpm install` at the metarepo root to resolve any cross-repository package resolutions.

### Managing Developmental Dependencies
When editing shared dependencies (e.g., updating `@dashkite/joy` and testing it inside `brooklyn`):
1. Navigate to the dependency's repo (`.tempo/repos/joy`) and ensure it is on the correct metarepo branch (`central-park`).
2. Do not edit `package.json` manually. Instead, use `pnpm add` with a relative path inside the dependent repo:
   `pnpm add ../joy`
3. Run `pnpm install` in the metarepo root to refresh symlinks.

## Executing Commands in Bulk

### `tempo exec` (Raw Shell Commands)
Runs a shell command across all repositories:
`tempo exec -P "<command>"`

### `tempo run` (Saved Scripts)
Runs predefined scripts defined in `.tempo/scripts.yaml`. Common tasks:
- `tempo run commit "message"`: Commits unstaged files across all sub-repos.
- `tempo run pull`: Pulls changes for all sub-repos.
- `tempo run push`: Pushes commits for all sub-repos.

# Technical Notes

### TTY / Progress Bar Crash
When running `tempo` commands in CI/CD or agent terminal sandboxes, you may encounter this error:
`RangeError: Invalid count value: Infinity`
- **Cause**: Tempo tries to render a dynamic progress bar but fails because the terminal is non-interactive (non-TTY).
- **Solution**: Always append the `-P` or `--no-progress` option to `tempo` commands (e.g., `tempo sync -P`, `tempo exec -P ...`).

### Symlinks and Editor Warnings
Because sub-repositories are symlinked, some editors (like VS Code or vim) may show warnings about circular references or fail to resolve Go-To-Definition mappings.
- **Solution**: Open the specific sub-repository directory directly in your editor if deep-code navigation fails.
