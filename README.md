![Sablier Branding](./banner.png)

# Sablier Indexers [![Github Actions][gha-badge]][gha] [![Discord][discord-badge]][discord] [![Twitter][twitter-badge]][twitter]

[gha]: https://github.com/sablier-labs/indexers/actions
[gha-badge]: https://github.com/sablier-labs/indexers/actions/workflows/ci.yml/badge.svg
[discord]: https://discord.gg/bSwRCwWRsT
[discord-badge]: https://img.shields.io/discord/659709894315868191
[twitter-badge]: https://img.shields.io/twitter/follow/Sablier
[twitter]: https://x.com/Sablier

Data indexers for [Sablier](https://sablier.com) protocol for onchain token distribution. The indexers monitor Sablier's
smart contract events and transform them into structured, queryable data via GraphQL. The data is used to power the
[Sablier Interface](https://app.sablier.com).

We support two indexing services: [The Graph](https://thegraph.com) and [Envio](https://envio.dev).

## Documentation 📚

In-depth documentation is available at [docs.sablier.com](https://docs.sablier.com/api/overview). We provide a separate
indexer for each protocol:

- [Sablier Airdrops](https://docs.sablier.com/api/airdrops/indexers) - Airdrop distribution data
- [Sablier Flow](https://docs.sablier.com/api/flow/indexers) - Payment streams data
- [Sablier Lockup](https://docs.sablier.com/api/lockup/indexers) - Vesting streams data

## Deployments 🚀

### Envio

Sync the changes to the `deployment/main` branch, and the Envio Hosted Service will automatically build and deploy the
new indexers.

### The Graph

#### Version Label

Each subgraph has a version label used to track changes made to the subgraph. The format is:

```text
v{PROTOCOL_VERSION}--v{SUBGRAPH_VERSION}
```

Here's an example for how to set the version label if the current version label is `v2.0--v1.0.0`:

| Change               | New Version Label     |
| -------------------- | --------------------- |
| Hot fix              | `v2.0--v1.0.1`        |
| New addresses        | `v2.0--v1.1.0`        |
| Staging              | `v2.1--v1.0.0-beta.0` |
| New protocol release | `v2.1--v1.0.0`        |

For a full list of protocol versions, see the [Sablier SDK](https://github.com/sablier-labs/sdk) (run the
`print-versions` command).

#### Scripts

Go to each protocol's directory and run the `deploy-all` recipe. For example:

```shell
cd graph/lockup
just deploy-all v2.1--v1.0.0
```

Then, do the same for the other protocols.

> [!NOTE] The Graph is not officially supported on some chains, e.g. Lightlink. To make deployments to these custom
> instances of The Graph, use the `deploy-custom` recipe.

## Contributing 🤝

We welcome contributions! [Open an issue](../../issues/new), [start a discussion](../../discussions/new), or submit a
PR.

Read our [CONTRIBUTING](./CONTRIBUTING.md) guide to get started. Join our [Discord server][discord] for questions and
feedback.

## License 📄

This repo is licensed under GPL 3-0 or later.
