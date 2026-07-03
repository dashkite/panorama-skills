---
tags:
  - architecture
---

# Introduction to Panorama

This guide introduces Panorama, a distributed runtime for specification-driven development (SDD). Since SDD makes it easier for AI to generate accurate results, we sometimes refer to Panorama as an [AI runtime, or AIR][air-overview]. We call it a _distributed_ runtime because Panorama spans clients, servers (including both intermediaries and origins), and data storage. The runtime executes specifications in the cloud, much like cloud-native application platforms (CNAPs) do for conventional code-based applications.

## Benefits

Since the runtime itself is built, deployed, and verified by experienced developers, application creators are able to make use of best practices without writing any code. Similarly, this substantially reduces the burden on [generative AI coding tools][generative-standards], since they never write any code.

Instead, an AI tool can generate the [specifications for an application][air-overview] for the creator to review. Once the creator approves them, the runtime takes care of the rest. Application specifications are high-level, making it easier for creators to verify their correctness.

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

Applications can be deployed to a [test environment][running-tests] to make sure everything works as expected.

## Features

- [Caching and security policies][security-policies] ([Enchant][enchant-repo])
- [Least privilege authorization][security-policies] ([Runes][runes-repo], [Cobalt][cobalt-repo], [Guardian][guardian-repo])
- [Graph-based knowledge graph][graph-mapping] ([Trellis][trellis-repo])
- [Graph-relational mapping][graph-mapping] ([Granite][granite-repo])
- [Rule-based HTTP request and reply processing][flow-processing] ([Sublime][sublime-repo])
- Reactive HTTP client ([Atlas][atlas-repo])
- [Reactive model-view-controller layer][mvc-layer] ([Belmont][belmont-repo], [Broadway][broadway-repo], [Addison][addison-repo])
- Credentials manager ([Sierra][sierra-repo])
- [Application state management][state-management] ([Cordoba][cordoba-repo])
- [Application routing][routing-and-page] ([Monterey][monterey-repo])
- [Page management][routing-and-page] ([Krypton][krypton-repo])
- [Reactive Web Components][web-components] ([Wayland][wayland-repo])
- [Application flow graph][flow-processing] ([Malibu][malibu-repo])
- [Creator interaction][kite-cli-ref] ([Kite CLI][kite-repo])

[air-overview]: ../panorama-architecture-overview/index.md
[generative-standards]: ../generative-development-standards/index.md
[running-tests]: ../running-tests/index.md
[security-policies]: ../least-privilege-and-security/index.md
[graph-mapping]: ../graph-relational-mapping/index.md
[flow-processing]: ../application-flow-and-processing/index.md
[mvc-layer]: ../developing-web-clients-with-rmvc-r/index.md
[state-management]: ../state-management-guidelines/index.md
[routing-and-page]: ../routing-and-page-management/index.md
[web-components]: ../developing-web-components/index.md
[kite-cli-ref]: ../kite-cli-reference/index.md

[enchant-repo]: https://github.com/dashkite/enchant
[runes-repo]: https://github.com/dashkite/runes
[cobalt-repo]: https://github.com/dashkite/cobalt
[guardian-repo]: https://github.com/dashkite/guardian
[trellis-repo]: https://github.com/dashkite/trellis
[granite-repo]: https://github.com/dashkite/granite
[sublime-repo]: https://github.com/dashkite/sublime
[atlas-repo]: https://github.com/dashkite/atlas
[belmont-repo]: https://github.com/dashkite/belmont
[broadway-repo]: https://github.com/dashkite/broadway
[addison-repo]: https://github.com/dashkite/addison
[sierra-repo]: https://github.com/dashkite/sierra
[cordoba-repo]: https://github.com/dashkite/cordoba
[monterey-repo]: https://github.com/dashkite/monterey
[krypton-repo]: https://github.com/dashkite/krypton
[wayland-repo]: https://github.com/dashkite/wayland
[malibu-repo]: https://github.com/dashkite/malibu
[kite-repo]: https://github.com/dashkite/kite
