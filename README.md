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

We support two indexing services: [The Graph](https://thegraph.com) and [Envio](https://envio.dev).

## Documentation 📚

In-depth documentation is available at [docs.sablier.com](https://docs.sablier.com/api/overview). We provide a separate
indexer for each protocol:

- [Sablier Airdrops](https://docs.sablier.com/api/airdrops/indexers) - Airdrop distribution data
- [Sablier Flow](https://docs.sablier.com/api/flow/indexers) - Payment streams data
- [Sablier Lockup](https://docs.sablier.com/api/lockup/indexers) - Vesting streams data

## Quickstart 🚀

Query the Envio GraphQL endpoints directly to access Sablier protocol data:

- **Airdrops**: `https://indexer.hyperindex.xyz/508d217/v1/graphql`
- **Flow**: `https://indexer.hyperindex.xyz/3b4ea6b/v1/graphql`
- **Lockup**: `https://indexer.hyperindex.xyz/53b7e25/v1/graphql`

For detailed documentation, queries, and examples, visit our [API docs](https://docs.sablier.com/api/overview).

## Contributing 🤝

We welcome contributions! [Open an issue](https://github.com/sablier-labs/indexers/issues/new),
[start a discussion](https://github.com/sablier-labs/indexers/discussions/new), or submit a PR.

Read our [CONTRIBUTING](./CONTRIBUTING.md) guide to get started. Join our [Discord server][discord] for questions and
feedback.

## License 📄

This repo is licensed under GPL 3-0 or later.
