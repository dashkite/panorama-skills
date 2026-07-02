# Panorama Knowledge Base

Welcome to the Panorama Knowledge Base. This is a collection of in-depth, context-rich documentation for both LLMs and human developers.

## System Architecture

- [Developing Web Clients With RMVC+R](developing-web-clients-with-rmvc-r/index.md): Expert guidance for building Web clients using the RMVC+R (Reactive Model-View-Controller + Resources) architecture and the Dashkite stack. Use when designing application-level components, controllers, or resource interactions.
- [Introduction to Panorama](introduction-to-panorama/index.md): This guide introduces the Panorama architecture, detailing the project vision, core philosophy, and developer experience.
- [Panorama Architecture Overview](panorama-architecture-overview/index.md): This article outlines the high-level design, goals, and core principles of the Panorama architecture.
- [Universal Logic Patterns](universal-logic-patterns/index.md): Guidance for writing universal, platform-independent logic for models and controllers. Use when you need to ensure core logic can be tested in Node.js while supporting browser-based views.

## Languages & Formats

- [Writing CoffeeScript (Dashkite Style Guide)](writing-coffeescript/index.md): Comprehensive style guide, code formatting standards, coding philosophy, and class instantiation patterns.
- [Writing Documentation (Dashkite Standard)](writing-documentation/index.md): Expert guidance for writing software documentation following Dashkite's standards. Covers Overview (README), Reference (API/Functions), Usage Guides (Recipes), and Contributor Guides.
- [YAML Management (yq)](yq-yaml-management/index.md): Expert guidance for querying and manipulating YAML files using the yq CLI. Use for extracting data, updating fields, and transforming YAML structures (e.g., querying .tempo/repos.yaml).

## Testing

- [Running Tests](running-tests/index.md): Guidance for running and debugging tests in the Chicago System metarepo. Use when needing to verify code changes or investigate test failures.
- [Scenario-Based Testing (Dashkite Standard)](scenario-based-testing/index.md): Expert guidance for writing declarative, scenario-based tests using @dashkite/runner. Use when you need to scale test coverage through manual or generative scenarios in YAML.
- [Writing Browser-Based Tests (Dashkite Standard)](writing-browser-based-tests/index.md): Expert guidance for writing declarative browser-based tests (HX) using Mimic and Puppeteer. Use when verifying UI components, user flows, and Shadow DOM interactions.
- [Writing Tests (Dashkite Standard)](writing-tests/index.md): Expert guidance for writing software tests following Dashkite's standards. Covers testing principles, cost-benefit analysis, and specific patterns for CoffeeScript/JavaScript testing using Amen and Assert.

## Human Experience (HX)

- [Design and Styling Standards](design-and-styling/index.md): Standards and best practices for design, layout, and styling using Stylus and the Dashkite stack. Use when creating stylesheets, refactoring UI components, or implementing complex layouts.
- [Developing Web Clients](developing-web-clients/index.md): General guidance for building Web clients in the Dashkite ecosystem. Use when designing application structure, choosing between buttons and links, or establishing common UI patterns.
- [Developing Web Clients With RMVC+R](developing-web-clients-with-rmvc-r/index.md): Expert guidance for building Web clients using the RMVC+R (Reactive Model-View-Controller + Resources) architecture and the Dashkite stack. Use when designing application-level components, controllers, or resource interactions.
- [Developing Web Components (Wayland & Zest)](developing-web-components/index.md): Expert guidance for building functional, reactive Web Components using Wayland and Zest. Use when creating or refactoring UI components in the Byline/Brooklyn ecosystem.
- [Error Handling & Logging](error-handling-and-logging/index.md): This article details conventions for catching, raising, and logging errors within the Panorama architecture.
- [State Management Guidelines](state-management-guidelines/index.md): This article defines the conventions and patterns for managing state within Panorama applications.
- [Writing Browser-Based Tests (Dashkite Standard)](writing-browser-based-tests/index.md): Expert guidance for writing declarative browser-based tests (HX) using Mimic and Puppeteer. Use when verifying UI components, user flows, and Shadow DOM interactions.

## Design Patterns & Paradigms

- [Error Handling & Logging](error-handling-and-logging/index.md): This article details conventions for catching, raising, and logging errors within the Panorama architecture.
- [Event Reactor Patterns](event-reactor-patterns/index.md): Expert guidance for implementing complex reactive logic using @dashkite/reactive/event-reactor. Use when components or controllers require advanced event merging, state transitions, or nested reactors.
- [Reactive Programming](reactive-programming/index.md): Expert guidance for writing reactive event streams and reactors using CoffeeScript async generators. Use when implementing controllers, component logic, or any async iterator delegation.
- [State Management Guidelines](state-management-guidelines/index.md): This article defines the conventions and patterns for managing state within Panorama applications.
- [Universal Logic Patterns](universal-logic-patterns/index.md): Guidance for writing universal, platform-independent logic for models and controllers. Use when you need to ensure core logic can be tested in Node.js while supporting browser-based views.
- [Using Reactive Resources](using-reactive-resources/index.md): Guidance for using reactive resource providers (Belmont, Broadway, Halstead, Lakeshore). Use when you need to resolve locators to resources, subscribe to changes, or perform CRUD operations on remote or local resources.

## Data Modeling & State

- [State Management Guidelines](state-management-guidelines/index.md): This article defines the conventions and patterns for managing state within Panorama applications.
- [Using Reactive Resources](using-reactive-resources/index.md): Guidance for using reactive resource providers (Belmont, Broadway, Halstead, Lakeshore). Use when you need to resolve locators to resources, subscribe to changes, or perform CRUD operations on remote or local resources.

## Repository & Metarepo Management

- [Forgejo Repository Management (fj)](fj-repo-management/index.md): Expert guidance for managing Forgejo repositories using the Forgejo CLI (fj). Use for creating, deleting, and configuring repositories.
- [GitHub Repository Management (gh)](gh-repo-management/index.md): Expert guidance for managing GitHub repositories using the GitHub CLI (gh). Use for creating, deleting, and configuring repositories.
- [Metarepo Management (Byline/Central Park)](metarepo-management/index.md): Details on managing the Central Park metarepo with Tempo, repository provider choices, and batch execution.

## Tooling & Libraries

- [Using DRNs (Dynamic Resource Names)](using-drns/index.md): Expert guidance for working with Dynamic Resource Names (DRNs) in core and Sky contexts. Use when resolving, storing, or describing resources referred to by 'drn:' strings.
- [Using Generic](using-generic/index.md): The `@dashkite/generic` library allows for the creation of dynamic, runtime generic functions (dispatchers) that choose an implementation based on the types or properties of their arguments.
- [Using Genie](using-genie/index.md): Genie is a build tool used in Dashkite projects to manage compilation, testing, and other development tasks through presets and configuration.
- [YAML Management (yq)](yq-yaml-management/index.md): Expert guidance for querying and manipulating YAML files using the yq CLI. Use for extracting data, updating fields, and transforming YAML structures (e.g., querying .tempo/repos.yaml).

## Ecosystem & Dependencies

- [Package & Dependency Management](package-dependency-management/index.md): This article outlines how npm packages, internal repository linking, and versioning are managed in the Panorama ecosystem.

## Operations & CI/CD

- [Build & Publish (Cloud-First Development)](building-and-publishing/index.md): Expert guidance for building and publishing Byline components and assets using Genie and Dashkite's cloud-first development model. Use when deploying code to development or production environments.
- [Continuous Integration (CI)](continuous-integration/index.md): This article describes the continuous integration pipeline, automated verification workflows, and PR standards for the Panorama architecture.
- [Deploying (Dashkite Standard)](deploying/index.md): Expert guidance for deploying Web sites, modules, and cloud infrastructure using Genie and Dynamic Resource Names (DRNs). Use when configuring genie.yaml for deployment or running 'genie deploy/publish'.
- [Package & Dependency Management](package-dependency-management/index.md): This article outlines how npm packages, internal repository linking, and versioning are managed in the Panorama ecosystem.
- [Registry Management](registry-management/index.md): Best practices for using and mocking @dashkite/registry in tests and components. Use when you need to store or retrieve shared application services, controllers, or global state.

## Generative Development

- [Generative Development Standards](generative-development-standards/index.md): This guide outlines standards and protocols for generative AI systems and human developers collaborating within the Panorama ecosystem.

## Collaboration & Workflows

- [Generative Development Standards](generative-development-standards/index.md): This guide outlines standards and protocols for generative AI systems and human developers collaborating within the Panorama ecosystem.

## Security & Verification

- [Providing Verified Sources](providing-verified-sources/index.md): Guidelines for adding and verifying external sources to support key claims in analysis and documentation. Use when referencing external resources, verifying links, or compiling a sources appendix.
