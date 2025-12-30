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

| Shape                   | Count   | Percentage |
| ----------------------- | ------- | ---------- |
| linear                  | 251,154 | 41.83%     |
| dynamicTimelock         | 162,380 | 27.05%     |
| cliff                   | 143,331 | 23.87%     |
| linearUnlockLinear      | 12,358  | 2.06%      |
| dynamicUnlockLinear     | 9,805   | 1.63%      |
| tranchedTimelock        | 6,120   | 1.02%      |
| tranchedMonthly         | 5,074   | 0.85%      |
| tranchedStepper         | 4,335   | 0.72%      |
| dynamicUnlockCliff      | 1,855   | 0.31%      |
| dynamicMonthly          | 1,054   | 0.18%      |
| linearUnlockCliff       | 998     | 0.17%      |
| dynamicStepper          | 775     | 0.13%      |
| unknown                 | 506     | 0.08%      |
| dynamicExponential      | 281     | 0.05%      |
| dynamicDoubleUnlock     | 125     | 0.02%      |
| dynamicCliffExponential | 117     | 0.02%      |
| tranchedBackweighted    | 3       | <0.01%     |
| Total                   | 600,377 | 100%       |
