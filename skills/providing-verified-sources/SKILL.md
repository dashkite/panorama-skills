---
name: providing-verified-sources
description: Guidelines for adding and verifying external sources to support key claims in analysis and documentation. Use when referencing external resources, verifying links, or compiling a sources appendix.
---

# Providing Verified Sources

> [!Note]
> For in-depth technical documentation and detailed context, refer to the [Providing Verified Sources Knowledge Base Article](../../kb/providing-verified-sources/index.md).


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

## Academic Sources Guidelines

Referencing academic sources (such as conference papers, journal articles, and technical reports) requires additional care due to paywalls, PDF formatting, and the length of publications.

- **Prefer Persistent Identifiers**: Use Digital Object Identifiers (DOIs) via `https://doi.org/<DOI>` or stable library archive landing pages (e.g., `https://arxiv.org/abs/<id>`) instead of direct PDF download links or unstable university hosted URLs. DOIs are persistent and globally unique.
- **Embedded Citations with Location details**: Since academic papers are often long, embed the specific location (page or section number) of the claim in the link text itself.
  - *Example*: `[Section 3.2][raft-paper]` or `[Page 4][dynamo-paper]`
- **Handling Paywalls & PDF access**:
  - Link to the official publication DOI page.
  - If a free, legal pre-print or open-access version is available (such as on arXiv or a researcher's web page), provide a secondary reference link to it.
  - Ensure the exact supporting passage is quoted in the *Sources* appendix so that the reader can verify the claim without requiring an academic subscription.

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

This script will parse the target file for reference link definitions, fetch each URL, strip HTML tags (for HTML content), and print the HTTP status alongside a content snippet for manual inspection.

For academic and binary sources, the script has specific behaviors:
- **PDF Documents**: If the remote server responds with a `Content-Type` of `application/pdf`, the script validates the HTTP connection but skips text parsing to avoid dumping binary data. It reports success and indicates that the source is a PDF file.
- **Paywalled and DOI links**: The script follows redirects (such as those from `doi.org` to journal publishers) and verifies the final HTTP status. If a paywall restricts full-text access, the script verifies connectivity, and the developer/agent must manually review the citation text against the source.

## The Sources Appendix

Once links are verified, compile a detailed *Sources* appendix at the end of the document. This appendix must always be a subsection of the `## Appendices` section. If no such section exists at the end of the document, it must be created.

### Structure of the Appendix

1. **Parent Heading**: Add a `## Appendices` second-level heading at the end of the document.
2. **Sources Heading**: Under the `## Appendices` section, add a `### Sources` third-level heading.
3. **Claim Heading**: For each claim, add a fourth-level heading (e.g. `#### Support For Foreign Key Constraints`).
4. **Source Title**: Within each claim section, add a fifth-level heading (`##### Source`) and provide the title of the source using the same reference link used in the main body.
5. **Blockquote**: Beneath the source title, include a blockquote (`>`) containing the exact supporting text extracted from the source page.

### Appendix Example

```markdown
## Appendices

### Sources

#### Support For Foreign Key Constraints
##### Source
[PostgreSQL Migration Guide - Amazon Aurora DSQL User Guide][referential-integrity]

> Referential integrity patterns: Aurora DSQL supports table relationships and JOIN operations. For referential integrity, implement validation in your application layer.
```
