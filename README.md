![Sablier Branding](./banner.png)

# Sablier Indexers [![Github Actions][gha-badge]][gha] [![Discord][discord-badge]][discord] [![Twitter][twitter-badge]][twitter]

[gha]: https://github.com/sablier-labs/indexers/actions
[gha-badge]: https://github.com/sablier-labs/indexers/actions/workflows/ci.yml/badge.svg
[discord]: https://discord.gg/bSwRCwWRsT
[discord-badge]: https://img.shields.io/discord/659709894315868191
[twitter-badge]: https://img.shields.io/twitter/follow/Sablier
[twitter]: https://x.com/Sablier

Data indexers for the [Sablier](https://sablier.com) protocol for onchain token distribution. The indexers monitor
Sablier's smart contract events and transform them into structured, queryable data APIs via GraphQL. The data is used to
power the [Sablier Interface](https://app.sablier.com).

There are two indexing providers: [Envio](https://envio.dev) (preferred) and [The Graph](https://thegraph.com).

## Documentation 📚

In-depth documentation is available at [docs.sablier.com](https://docs.sablier.com/api/overview).

The package now exposes two public indexer keys:

- `airdrops` for campaign distribution data
- `streams` for the Flow + Lockup streams

`analytics` remains a separate target rather than a public indexer key because it's meant to be a private indexer for
internal use only.

Protocol-specific docs remain available here:

- [Sablier Airdrops](https://docs.sablier.com/api/airdrops/indexers) - Airdrop distribution data
- [Sablier Flow](https://docs.sablier.com/api/flow/indexers) - Payment streams data
- [Sablier Lockup](https://docs.sablier.com/api/lockup/indexers) - Vesting streams data

## Quickstart 🚀

You can query the public Envio GraphQL endpoints directly to access Sablier protocol data:

- **Airdrops**: `https://indexer.hyperindex.xyz/508d217/v1/graphql`
- **Streams**: `https://indexer.hyperindex.xyz/53b7e25/v1/graphql`

The standard Envio endpoints require [Hasura](https://docs.envio.dev/docs/HyperIndex/navigating-hasura) GraphQL query
syntax.

> [!TIP]
>
> If you're migrating from The Graph, Envio also exposes `/converter` endpoints that accept subgraph-compatible queries,
> convert them to HyperIndex (standard GraphQL), and return responses in the same format as a standard subgraph:
>
> - **Airdrops**: `https://indexer.hyperindex.xyz/508d217/converter`
> - **Streams**: `https://indexer.hyperindex.xyz/53b7e25/converter`

For detailed documentation, queries, and examples, visit our [API docs](https://docs.sablier.com/api/overview).

## Contributing 🤝

We welcome contributions! [Open an issue](https://github.com/sablier-labs/indexers/issues/new),
[start a discussion](https://github.com/sablier-labs/indexers/discussions/new), or submit a PR.

Read our [CONTRIBUTING](./CONTRIBUTING.md) guide to get started. Join our [Discord server][discord] for questions and
feedback.

## License 📄

This repo is licensed under GPL 3-0 or later.
