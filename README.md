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

## Envio Cloud releases

The internal CLI uses the existing `envio-cloud` login for `sablier-labs`. Local targets map to Cloud projects as
follows:

| Local target | Cloud project  |
| ------------ | -------------- |
| `airdrops`   | `merkle-envio` |
| `streams`    | `lockup-envio` |
| `analytics`  | `analytics`    |

```bash
just envio::list
just envio::status streams
just envio::logs streams latest-nonproduction --build --since 24h --limit 50
just envio::endpoint streams latest-nonproduction
just envio::deploy streams --ref HEAD --timeout 60m
just envio::promote streams <prepared-commit>
just envio::release streams --ref HEAD --timeout 60m
```

`status`, `logs`, and `endpoint` select `production` by default, or accept `latest-nonproduction` or an unambiguous
prepared commit SHA. `promote` defaults to `latest-nonproduction`. Endpoint discovery prints only the URL to stdout and
fails when the selection is absent, ambiguous, or missing its endpoint. Do not pass `just --quiet`: that flag suppresses
the URL. The underlying CLI uses `--indexer` and `--deployment`.

Deployment creates a temporary detached worktree at `--ref` (default `HEAD`), preserves the public root cache copy, and
writes the **source SHA** and deployment timestamp into public `IndexerInfo` metadata. It then force-pushes a distinct
**prepared SHA** to `deployment/<target>`. Cloud selectors always identify that prepared commit. The caller's checkout
and index are untouched. Historical prepared objects are recovered locally or by fetching an exact SHA; provide the full
prepared SHA if an older object is unavailable and no longer heads the deployment branch.

The workflow verifies hosted repository, branch, root directory, and config settings before pushing. It observes
auto-deploy, triggers an inactive commit once, polls every ten seconds, and requires valid metrics for every chain in
the exact deployed config to reach its current head or configured end block. Public candidate GraphQL checks require the
captured source SHA and timestamp on every chain. Every target requires the Cloud production record's endpoint to match
the configured stable alias before cleanup. Analytics verifies completed metrics, successful `UserTransaction` queries
on the candidate and stable alias, and the actual Cloud production marker. Its schema does not expose deployment
metadata, so analytics deployment identity relies on that Cloud marker and endpoint mapping. Before promotion, timeouts
and failed builds preserve production and print bounded build/runtime logs. If verification fails after promotion,
cleanup stops and reports that production may already have changed.

`deploy` leaves a synced candidate for previewing. It retains the existing `all` default; `release` requires one
explicit target. `release` composes deployment and promotion. Promotion displays the current production, candidate, and
exact previous deployments to delete, then requires interactive confirmation. It rechecks production and readiness,
promotes, verifies the production marker and stable GraphQL alias, and only then deletes the reviewed previous
deployments. Successful promotion retains production only. A full three-deployment project stops before pushing and
lists cleanup candidates; production is never deleted to free capacity.

```bash
just envio::cleanup streams
just envio::cleanup streams --apply --commit <exact-nonproduction-id> --commit <another-id>
```

Cleanup is a dry run by default. Applying requires explicit exact IDs and confirmation, verifies the kept production,
and rechecks its marker before every deletion. A partial failure reports remaining IDs and a retry command; inspect
current state before retrying. A retained deployment can be rolled back with `promote`; after deletion, rebuild from its
original source with `release --ref <old-source-sha>`.

Mutations hold a local per-project lock. Do not run concurrent operations for the same project from the dashboard,
another checkout, or another machine: Cloud has no conditional promotion/deletion primitive. Unexpected production
changes abort the workflow. If a process is killed, verify it exited before removing the lock directory reported by the
next command.

## Contributing

Contributions are welcome. See [`AGENTS.md`](AGENTS.md) for the development workflow, commands, and conventions.

## License

This project is licensed under [GPL-3.0-or-later](LICENSE.md).
