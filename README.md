# Panorama Skills & Knowledge Base

This repository provides triggerable agent skills and an in-depth Knowledge Base (KB) for developers and LLMs working within the Byline and Central Park metarepos.

[![Hippocratic License HL3-CORE](https://img.shields.io/static/v1?label=Hippocratic%20License&message=HL3-CORE&labelColor=5e2751&color=bc8c3d)](https://firstdonoharm.dev/version/3/0/core.html)

## Purpose
The purpose of this repository is to store and manage agent guidelines, styles, and workflows in parallel structures:
- **Skills**: Compact, triggerable rule files (`skills/<name>/SKILL.md`) designed to fit into agent contexts with a low-token footprint.
- **Knowledge Base (KB)**: Extensive, detailed technical guides (`kb/<name>/index.md`) providing rationale, examples, and troubleshooting notes for humans and LLMs.

## Structure
The repository is structured as follows:

```
panorama-skills/
├── bin/                           # Installer and utility scripts
│   ├── install                    # Syncs skills and KB to the .gemini directory
│   └── rebuild-index              # Dynamically rebuilds the kb/index.md sitemap
├── kb/                            # Human & LLM-readable Knowledge Base
│   ├── index.md                   # Categorized sitemap for the KB
│   └── <name>/index.md            # Detailed article folders
└── skills/                        # Flat, triggerable agent skills
    └── <name>/SKILL.md            # Actionable guidelines linking back to the KB
```

## How to Use the Knowledge Base

### For Human Developers
Browse the categorized sitemap at [kb/index.md](kb/index.md) to navigate articles by category (Languages, Testing, Web Development, Operations, etc.). Each article's folder contains an `index.md` with in-depth rationales and code examples.

### For AI Agents
Each triggerable `SKILL.md` file contains a link pointing to its corresponding KB article at `../../kb/<name>/index.md`. When an agent needs a deeper understanding of a skill's rules, it follows this relative link.

## Installation & Syncing
Since standard agent tools may fail to resolve symlinks, we copy files directly into the metarepo's configuration folder.

Use the install script to sync your skills and KB to the metarepo's `.gemini/` directory:

```bash
./bin/install
```

This replaces any existing `.gemini/skills` symlink with a direct, flat installation folder and populates `.gemini/kb/`.

## Rebuilding the Sitemap Index
If you add a new KB article or modify the `tags` array in an article's frontmatter, rebuild the main sitemap using the rebuilder script:

```bash
./bin/rebuild-index
```

This parses the YAML frontmatter of each article and regenerates [kb/index.md](kb/index.md) grouped by category.

## Status
Not suitable. Please file bugs in the Byline issue tracker.
