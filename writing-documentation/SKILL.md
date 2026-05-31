---
name: writing-documentation
description: Expert guidance for writing software documentation following Dashkite's standards. Covers Overview (README), Reference (API/Functions), Usage Guides (Recipes), and Contributor Guides.
---

# Writing Documentation (Dashkite Standard)

This skill provides specialized workflows and style conventions for writing documentation for Byline/Central Park software.

## Documentation Structure

- **README.md**: Located in the repository root. Provides the high-level overview.
- **docs/ Directory**: All other documentation files (Reference, Recipes, etc.) MUST be placed in a `docs/` directory.
- **Filenames**: Use **lowercase** filenames for all files in the `docs/` directory (e.g., `reference.md`, `recipes.md`).

## Documentation Types

### 1. Overview Documentation (README)
Place in the `README.md` file of a repository root. Structure:
- **Purpose**: Brief description, common scenario example, and differentiating features.
- **License**: The License notice should immediately follow the high-level summary. Unless otherwise specified, use the Hippocratic License Markdown verbatim: `[![Hippocratic License HL3-CORE](https://img.shields.io/static/v1?label=Hippocratic%20License&message=HL3-CORE&labelColor=5e2751&color=bc8c3d)](https://firstdonoharm.dev/version/3/0/core.html)`
- **Installation**: Use ecosystem-appropriate assumptions (e.g., "use your favorite package manager").
- **Usage**: Examples of common scenarios with concise explanations.
- **Other Resources**: Links to files in the `docs/` directory.
- **Status**: Production readiness (default: "not suitable"). Include bug filing/issue tracker info.

### 2. Reference Documentation
For classes and functions (HTTP APIs should be generated from API descriptions). Place in `docs/reference.md`.
- **Heading**: Name of the function or property.
- **Signatures**: One per line, using MathJax notation between `$` characters.
  - **Special Characters**: If a function name is `$`, escape it within the MathJax delimiters (e.g., `$\text{\$} \to Type$`).
  - **Return Types**: For functions that return `undefined`, use the empty set notation (`\emptyset`).
  - **Naming**: Use **lowercase descriptive names** for all arguments and return values (e.g., `element`, `handle`, `predicate`). Avoid capitalized class or type names.
  - **Colons**:
    - **Functions/Methods**: Always include a colon, even if there are no arguments (e.g., `$func: \to value$`, `$func: arg \to value$`).
    - **Getters/Properties**: Omit the colon (e.g., `$property \to value$`).
  - **Format**: `$name: [args] \to [return\_name]$` or `$name: [args] \dashrightarrow [promise\_name]$`.
- **Description**: Brief, referencing signature names.
- **Example**: Simple assertions using the repository's main language.
  - *Example*: `assert.deepEqual [ 2, 4, 6 ], collect map double, [ 1..3 ]`

### 3. Usage Guides (Recipes)
Task-based scenarios (Recipes). Place in `docs/recipes.md`.
- Brief task description.
- How the software enables the task.
- Code example.
- Step-by-step algorithm/algorithm for developers.
- Focus on the software; use comments (e.g., `# implementation goes here`) for external complexity.

### 4. Technical Notes
When providing implementation details or architectural context that isn't a direct API reference:
- **Section Heading**: Use a top-level `# Technical Notes` heading.
- **Note Subheadings**: Each individual note MUST be its own subsection using a level 3 header (`###`), even if there is only a single note in the section.

### 5. Contributor Guides (Optional)
Include when actively promoting a library. Place in `docs/contributing.md`.
- Include/link coding style guide and process descriptions (tickets, PRs).
- **Mandatory**: Must be accompanied by a Code of Conduct.

## Style and Tone Conventions

- **Tone**: Positive, enthusiastic, but sparse and factual.
- **Avoid Superfluous Modifiers**: Omit adverbs/adjectives like "perfectly" or "aggressively" unless they add technical meaning.
- **No Direct Criticism**: Do not criticize other software. Focus on factual performance.
- **Editorial Policy**: Avoid the term "user" in favor of an active role ("developer", "creator", etc.) and terms or acronyms based on the word "user", such as "UX". In particular, use HX (for "human experience") instead of UX.
- **Formatting**: **NEVER use horizontal rules (`---`) as separators.** Rely on subheadings and CSS for visual separation.
- **Precision**: Be factual and concise.
