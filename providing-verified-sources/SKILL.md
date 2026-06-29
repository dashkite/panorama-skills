---
name: providing-verified-sources
description: Guidelines for adding and verifying external sources to support key claims in analysis and documentation. Use when referencing external resources, verifying links, or compiling a sources appendix.
---

# Providing Verified Sources

This skill provides guidelines and tools for adding verified external references to documentation and analysis documents within Panorama projects. Adding verified sources increases the credibility of technical analyses and prevents hallucination of capabilities or constraints.

## General Principles

- **Support Key Claims**: Provide authoritative sources (such as official documentation, official blogs, or release notes) for key technical claims, especially constraints or differences between technologies.
- **Maintain Document Flow**: Integrate references without interrupting the reader. Avoid adding conversational text specifically to introduce a link (e.g. "According to the AWS documentation page X...").
- **Target Specificity**: Use the most specific URL available. Prefer specific pages, subpages, or anchor/fragment identifiers (e.g. `#section-name`) over generic landing pages or homepage links.

## Link Formatting Guidelines

- **Use Reference Links**: To keep the Markdown clean and readable, use Markdown reference links instead of inline links.
- **Embedded Links**: Embed link references directly inside the relevant text.
  - *Example*: `[Does not support foreign key constraints][referential-integrity]`
- **Reference Definitions**: Define the reference links at the very bottom of the document.
  - *Example*: `[referential-integrity]: https://docs.aws.amazon.com/aurora-dsql/latest/userguide/working-with-postgresql-compatibility-migration-guide.html`

## Link and Content Verification

To guard against hallucinated links, broken URLs, or outdated information, all links must be verified programmatically before publishing.

### Verification Criteria
1. The URL must return a successful HTTP status code (typically `200 OK`).
2. The page content must explicitly support the claim made in the document.

### Using the Verification Script
To avoid triggering multiple separate network permission prompts during development or evaluation, use the provided link verification script to validate all links in a single process run:

```bash
node ./providing-verified-sources/scripts/verify-links.js <path-to-document>
```

This script will parse the target file for reference link definitions, fetch each URL, strip HTML tags, and print the HTTP status alongside a text snippet of the page for manual inspection.

## The Sources Appendix

Once links are verified, compile a detailed *Sources* appendix at the end of the document. This appendix provides additional context and verification details without distracting from the main analysis.

### Structure of the Appendix

1. **Appendix Heading**: Add a `## Sources` section at the end of the document.
2. **Claim Heading**: For each claim, add a level 3 heading (e.g. `### Support For Foreign Key Constraints`).
3. **Source Title**: Within each claim section, add a subhead called `#### Source` and provide the title of the source, using the same reference link used in the main body.
4. **Blockquote**: Beneath the source title, include a blockquote (`>`) containing the exact supporting text extracted from the source page.

### Appendix Example

```markdown
## Sources

### Support For Foreign Key Constraints
#### Source
[PostgreSQL Migration Guide - Amazon Aurora DSQL User Guide][referential-integrity]

> Referential integrity patterns: Aurora DSQL supports table relationships and JOIN operations. For referential integrity, implement validation in your application layer.
```
