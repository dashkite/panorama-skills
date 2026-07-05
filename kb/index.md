# Panorama Knowledge Base

Welcome to the Panorama Knowledge Base. This is a collection of in-depth, context-rich documentation for both LLMs and human developers.

## System Architecture

- [Application Isolation](application-isolation/index.md): This guide outlines execution sandboxing, memory/context boundaries, and runtime isolation within the Panorama architecture.
- [Developing Web Clients With RMVC+R](developing-web-clients-with-rmvc-r/index.md): RMVC+R stands for **Reactive Model-View-Controller + Resources**. This architecture treats the entire application as a set of interacting event streams and logical resources.
- [Introduction to Panorama](introduction-to-panorama/index.md): This guide introduces Panorama, a distributed runtime for specification-driven development (SDD). Since SDD makes it easier for AI to generate accurate results, we sometimes refer to Panorama as an...
- [Panorama Architecture Overview](panorama-architecture-overview/index.md): This article outlines the high-level design, goals, and core principles of the Panorama architecture.
- [Universal Logic Patterns](universal-logic-patterns/index.md): Universal logic ensures that the core behavior of models and controllers can be executed and tested in any environment (Node.js or Browser) without modification.

## Languages & Formats

- [Writing CoffeeScript (Dashkite Style Guide)](writing-coffeescript/index.md): Comprehensive style guide, code formatting standards, coding philosophy, and class instantiation patterns.
- [Writing Documentation (Dashkite Standard)](writing-documentation/index.md): This skill provides specialized workflows and style conventions for writing documentation for Byline/Central Park software.
- [YAML Management (yq)](yq-yaml-management/index.md): This skill provides specialized workflows for working with YAML files using the `yq` CLI, with a focus on managing the Byline metarepo configuration.

## Testing

- [Cloud-First Testing](cloud-first-testing/index.md): This guide details testing applications inside dedicated cloud test environments (composed of Lambdas, databases, and message queues) under the Panorama architecture.
- [Running Tests](running-tests/index.md): This skill provides standard workflows and troubleshooting tips for running tests within this metarepo.
- [Scenario-Based Testing (Dashkite Standard)](scenario-based-testing/index.md): This skill provides specialized workflows for implementing high-value, declarative tests using the `@dashkite/runner` module. Scenario-based testing decouples test logic from test data, enabling ra...
- [Writing Browser-Based Tests (Dashkite Standard)](writing-browser-based-tests/index.md): This skill provides specialized workflows for writing high-level developer interface (HX) tests using `@dashkite/mimic` and Puppeteer.
- [Writing Tests (Dashkite Standard)](writing-tests/index.md): This skill provides specialized workflows and principles for writing effective, low-maintenance tests for Byline/Central Park software.

## Human Experience (HX)

- [Design and Styling Standards](design-and-styling/index.md): This skill provides the architectural and technical standards for styling Dashkite applications, with a focus on professional quality, maintainability, and consistent Human Experience (HX).
- [Developing Web Clients](developing-web-clients/index.md): This skill provides general guidance and best practices for building Web applications within the Dashkite ecosystem.
- [Developing Web Clients With RMVC+R](developing-web-clients-with-rmvc-r/index.md): RMVC+R stands for **Reactive Model-View-Controller + Resources**. This architecture treats the entire application as a set of interacting event streams and logical resources.
- [Developing Web Components (Wayland & Zest)](developing-web-components/index.md): This skill provides specialized workflows for building native Web Components using the Wayland mixin library and the Zest DOM monad.
- [Error Handling & Logging](error-handling-and-logging/index.md): This article details conventions for catching, raising, and logging errors within the Panorama architecture.
- [Routing & Page Management](routing-and-page-management/index.md): This guide details page layouts, views orchestration, and application routing patterns within the Panorama architecture.
- [State Management Guidelines](state-management-guidelines/index.md): This article defines the conventions and patterns for managing state within Panorama applications.
- [Writing Browser-Based Tests (Dashkite Standard)](writing-browser-based-tests/index.md): This skill provides specialized workflows for writing high-level developer interface (HX) tests using `@dashkite/mimic` and Puppeteer.

## Design Patterns & Paradigms

- [Application Flow Graph](application-flow-graph/index.md): This guide defines processing flow graphs, event routing, and state transition specifications evaluated by Malibu under the Panorama architecture.
- [Error Handling & Logging](error-handling-and-logging/index.md): This article details conventions for catching, raising, and logging errors within the Panorama architecture.
- [Event Reactor Patterns](event-reactor-patterns/index.md): Event Reactors provide a higher-level abstraction for handling complex event streams compared to simple `for await...from` loops. They enable declarative event handling and are isomorphic to state ...
- [HTTP Request & Reply Processing](http-request-processing/index.md): This guide outlines rules-based request-reply interception, reactive client operations, and HTTP specifier evaluations within the Panorama architecture.
- [Reactive Programming](reactive-programming/index.md): Reactive programming in Dashkite revolves around the use of async iterators (reactors) to model application logic as a sequence of events.
- [State Management Guidelines](state-management-guidelines/index.md): This article defines the conventions and patterns for managing state within Panorama applications.
- [Universal Logic Patterns](universal-logic-patterns/index.md): Universal logic ensures that the core behavior of models and controllers can be executed and tested in any environment (Node.js or Browser) without modification.
- [Using Reactive Resources](using-reactive-resources/index.md): This skill provides patterns and workflows for working with reactive resources using the Dashkite stack.

## Data Modeling & State

- [Graph-Relational Mapping](graph-relational-mapping/index.md): This guide details graph database query conventions, relational mappings, and knowledge representations under the Panorama architecture.
- [State Management Guidelines](state-management-guidelines/index.md): This article defines the conventions and patterns for managing state within Panorama applications.
- [Using Reactive Resources](using-reactive-resources/index.md): This skill provides patterns and workflows for working with reactive resources using the Dashkite stack.

## Repository & Metarepo Management

- [Forgejo Repository Management (fj)](fj-repo-management/index.md): This skill provides specialized workflows for managing Forgejo repositories using the `fj` CLI.
- [GitHub Repository Management (gh)](gh-repo-management/index.md): This skill provides specialized workflows for managing GitHub repositories using the `gh` CLI.
- [Metarepo Management (Byline/Central Park)](metarepo-management/index.md): Details on managing the Central Park metarepo with Tempo, repository provider choices, and batch execution.

## Tooling & Libraries

- [Kite CLI Reference](kite-cli-reference/index.md): This guide details commands, execution workflows, and testing tools inside the Kite Command Line Interface (CLI).
- [Using DRNs (Dynamic Resource Names)](using-drns/index.md): This skill provides specialized workflows for working with Dynamic Resource Names (DRNs) to refer to and manage resources uniformly across the ecosystem.
- [Using Generic](using-generic/index.md): The `@dashkite/generic` library allows for the creation of dynamic, runtime generic functions (dispatchers) that choose an implementation based on the types or properties of their arguments.
- [Using Genie](using-genie/index.md): Genie is a build tool used in Dashkite projects to manage compilation, testing, and other development tasks through presets and configuration.
- [YAML Management (yq)](yq-yaml-management/index.md): This skill provides specialized workflows for working with YAML files using the `yq` CLI, with a focus on managing the Byline metarepo configuration.

## Ecosystem & Dependencies

- [Package & Dependency Management](package-dependency-management/index.md): This article outlines how npm packages, internal repository linking, and versioning are managed in the Panorama ecosystem.

## Operations & CI/CD

- [Build & Publish (Cloud-First Development)](building-and-publishing/index.md): This skill provides the standard operating procedures for building and deploying Byline/Central Park projects using the `Genie` task runner and a cloud-first methodology.
- [Caching Policies](caching-policies/index.md): This guide outlines performance caching rules, freshness criteria, and invalidation conventions evaluated by Enchant.
- [Cloud-First Testing](cloud-first-testing/index.md): This guide details testing applications inside dedicated cloud test environments (composed of Lambdas, databases, and message queues) under the Panorama architecture.
- [Continuous Integration (CI)](continuous-integration/index.md): This article describes the continuous integration pipeline, automated verification workflows, and PR standards for the Panorama architecture.
- [Deploying (Dashkite Standard)](deploying/index.md): This skill provides specialized workflows for deploying software across different environments (development, testing, production) using Genie and Dynamic Resource Names (DRNs).
- [Package & Dependency Management](package-dependency-management/index.md): This article outlines how npm packages, internal repository linking, and versioning are managed in the Panorama ecosystem.
- [Registry Management](registry-management/index.md): The Registry acts as a central hub for sharing singleton-like services, controllers, and configuration across the application without tight coupling.

## Generative Development

- [Generative Development Standards](generative-development-standards/index.md): This guide outlines standards and protocols for generative AI systems and human developers collaborating within the Panorama ecosystem.

## Collaboration & Workflows

- [Generative Development Standards](generative-development-standards/index.md): This guide outlines standards and protocols for generative AI systems and human developers collaborating within the Panorama ecosystem.

## Security & Verification

- [Application Isolation](application-isolation/index.md): This guide outlines execution sandboxing, memory/context boundaries, and runtime isolation within the Panorama architecture.
- [Credentials Management](credentials-management/index.md): This guide outlines secret storage, keys rotation, and least-privilege credentials retrieval managed by Sierra under the Panorama architecture.
- [Least Privilege Authorization](least-privilege/index.md): This guide outlines authorization tokens, scope validation, sandboxed execution, and access control patterns managed by Runes, Cobalt, and Guardian.
- [Providing Verified Sources](providing-verified-sources/index.md): This skill provides guidelines and tools for adding verified external references to documentation and analysis documents within Panorama projects. Adding verified sources increases the credibility ...
- [Security Policies](security-policies/index.md): This guide details rules, enforcement domains, and authorization checks specified for Panorama applications and evaluated by Enchant.
