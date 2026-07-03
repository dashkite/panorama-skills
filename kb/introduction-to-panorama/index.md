---
tags:
  - architecture
---

# Introduction to Panorama

This guide introduces Panorama, a distributed runtime for specification-driven development (SDD). Since SDD makes it easier for AI to generate accurate results, we sometimes refer to Panorama as an [AI runtime, or AIR](../panorama-architecture-overview/index.md). We call it a _distributed_ runtime because Panorama spans clients, servers (including both intermediaries and origins), and data storage. The runtime executes specifications in the cloud, much like cloud-native application platforms (CNAPs) do for conventional code-based applications.

## Benefits

Since the runtime itself is built, deployed, and verified by experienced developers, application creators are able to make use of best practices without writing any code. Similarly, this substantially reduces the burden on [generative AI coding tools](../generative-development-standards/index.md), since they never write any code.

Instead, an AI tool can generate the [specifications for an application](../panorama-architecture-overview/index.md) for the creator to review. Once the creator approves them, the runtime takes care of the rest. Application specifications are high-level, making it easier for creators to verify their correctness.

Creators can thus be confident that their applications are:

### Secure

Panorama defines and enforces security policies, uses strong encryption, and isolates applications.

### Performant

Panorama uses caching policies to intelligently cache your data and a client architecture that runs at native-parity speed.

### Available

Panorama runs on highly-available cloud infrastructure from Amazon Web Services.

### Reliable

Application specifications are processed deterministically so they run the same way every time. Changes are reviewed by the creator, just as with the original application specification.

### Tested

Applications can be deployed to a [test environment](../running-tests/index.md) to make sure everything works as expected.

## Features

- [Caching and security policies](../least-privilege-and-security/index.md) ([Enchant](https://github.com/dashkite/enchant))
- [Least privilege authorization](../least-privilege-and-security/index.md) ([Runes](https://github.com/dashkite/runes), [Cobalt](https://github.com/dashkite/cobalt), [Guardian](https://github.com/dashkite/guardian))
- [Graph-based knowledge graph](../graph-relational-mapping/index.md) ([Trellis](https://github.com/dashkite/trellis))
- [Graph-relational mapping](../graph-relational-mapping/index.md) ([Granite](https://github.com/dashkite/granite))
- [Rule-based HTTP request and reply processing](../application-flow-and-processing/index.md) ([Sublime](https://github.com/dashkite/sublime))
- Reactive HTTP client ([Atlas](https://github.com/dashkite/atlas))
- [Reactive model-view-controller layer](../developing-web-clients-with-rmvc-r/index.md) ([Belmont](https://github.com/dashkite/belmont), [Broadway](https://github.com/dashkite/broadway), [Addison](https://github.com/dashkite/addison))
- Credentials manager ([Sierra](https://github.com/dashkite/sierra))
- [Application state management](../state-management-guidelines/index.md) ([Cordoba](https://github.com/dashkite/cordoba))
- [Application routing](../routing-and-page-management/index.md) ([Monterey](https://github.com/dashkite/monterey))
- [Page management](../routing-and-page-management/index.md) ([Krypton](https://github.com/dashkite/krypton))
- [Reactive Web Components](../developing-web-components/index.md) ([Wayland](https://github.com/dashkite/wayland))
- [Application flow graph](../application-flow-and-processing/index.md) ([Malibu](https://github.com/dashkite/malibu))
- [Creator interaction](../kite-cli-reference/index.md) ([Kite CLI](https://github.com/dashkite/kite))
