![Sablier Branding](./banner.png)

# Sablier Indexers [![GitHub Actions][gha-badge]][gha] [![Discord][discord-badge]][discord] [![X][x-badge]][x]

[gha]: https://github.com/sablier-labs/indexers/actions
[gha-badge]: https://github.com/sablier-labs/indexers/actions/workflows/ci.yml/badge.svg
[discord]: https://discord.gg/bSwRCwWRsT
[discord-badge]: https://img.shields.io/discord/659709894315868191
[x]: https://x.com/Sablier
[x-badge]: https://img.shields.io/twitter/follow/Sablier

Data indexers for the [Sablier](https://sablier.com) protocol. They monitor Sablier smart-contract events and transform
them into structured GraphQL data APIs used by the [Sablier Interface](https://app.sablier.com).

The repository maintains indexers for [Envio](https://envio.dev) and [The Graph](https://thegraph.com). Envio is the
preferred hosted provider; The Graph subgraphs remain available for multi-vendor coverage.

## Links

- [API documentation](https://docs.sablier.com/api/overview)
- [Airdrops indexer docs](https://docs.sablier.com/api/airdrops/indexers)
- [Flow indexer docs](https://docs.sablier.com/api/flow/indexers)
- [Lockup indexer docs](https://docs.sablier.com/api/lockup/indexers)
- [Package on npm](https://www.npmjs.com/package/@sablier/indexers)
- [Changelog](CHANGELOG.md)
- [Discord][discord]

## Indexer Surfaces

The published package exposes two public indexer keys:

- `airdrops` for campaign distribution data
- `streams` for Flow and Lockup payment-stream data

`analytics` remains a private Envio target for internal metrics and is not part of the public package surface.

## Contributing

Contributions are welcome. See [`AGENTS.md`](AGENTS.md) for the development workflow, commands, and conventions.

## License

Package metadata declares `GPL-3.0-or-later`. Add a repository `LICENSE` file before relying on GitHub license
detection.
