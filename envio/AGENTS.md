# Envio Indexers

Envio HyperIndex implementations for `airdrops`, `analytics`, and `streams`.

## Stack

- Envio `3.1.2`, TypeScript, per-indexer TS projects.
- Shared compatibility facade in `envio/common/facade.ts`.
- Generated Envio metadata under ignored `.envio/` directories.

## Commands

From the repo root:

```bash
just envio::type-check                 # Type-check all Envio indexers
na tsc --noEmit -p envio/<indexer>/tsconfig.json
just codegen::envio [indexer]          # Schema + config + bindings
just codegen::envio-bindings [indexer] # Bindings only
just codegen::envio-config [indexer]   # config.yaml only
just codegen::schema envio [indexer]   # Envio GraphQL schema only
just envio::prices-check               # Verify analytics price cache
just envio::prices-sync                # Sync analytics price cache
just envio::check-vendors [chain_id]   # Compare vendor assets
just envio::deploy [indexer]           # Force-push deployment branch; confirmed recipe
just envio::open                       # Open Envio dashboard
```

From `envio/<indexer>/`:

```bash
just codegen                 # Full codegen for that indexer
just codegen-bindings        # Envio bindings
just codegen-config          # Envio config
just codegen-schema          # Envio schema
just envio dev               # Run Envio dev mode with TUI
just envio dev tui_off       # Run without TUI
just envio start             # Start Envio
just envio stop              # Stop Envio
just test                    # Run that indexer's Vitest tests
```

## Architecture

- `airdrops/` - Public airdrops indexer.
- `analytics/` - Private internal metrics indexer.
- `streams/` - Public Flow + Lockup streams indexer.
- `common/` - Shared facade, effects, store helpers, IDs, fees, and token metadata helpers.
- `indexer.just` - Shared local recipe file imported by each indexer.
- `<indexer>/bindings.ts` - Hand-maintained compatibility facade over generated Envio types.
- `<indexer>/config.yaml` and `<indexer>/<indexer>.graphql` - Generated artifacts except analytics schema.

## Type Checking

The root `tsconfig.json` excludes `envio/`. Running root `just type-check`, `just tsc-check`, or `na tsc --noEmit` will
not catch Envio type errors. Envio v3 generates one `envio` module augmentation per indexer, so type-check each indexer
as a separate TS project through `just envio::type-check`.

## Generated Bindings

Run `just codegen::envio` from the repo root or `just codegen` from an Envio indexer directory when bindings are stale.
Envio v3 writes generated type metadata to ignored `envio/<indexer>/.envio/types.d.ts` and
`envio/<indexer>/envio-env.d.ts`.

Envio v3 does not emit an importable generated package. The `bindings.ts` files are hand-maintained facades over the
`envio` module augmentation; keep their contract and event lists in sync with `config.yaml`.

## Schema Rules

- `airdrops.graphql` and `streams.graphql` are generated from `schema/`; do not edit them directly.
- `analytics/analytics.graphql` is maintained directly in the analytics indexer.
- After schema changes, update each affected `bindings.ts` import/export list and each indexer's
  `ENVIO_HASURA_PUBLIC_AGGREGATE` in its `justfile`.

## Production URLs

For GraphQL query tasks, use:

- `airdrops`: `https://indexer.hyperindex.xyz/508d217/v1/graphql`
- `streams`: `https://indexer.hyperindex.xyz/53b7e25/v1/graphql`

`converterURL` endpoints are derived in `src/indexers/envio-deployments.ts`.

## Querying Envio

Envio exposes a Hasura-style GraphQL API, not The Graph subgraph syntax.

- Entity names are PascalCase singular and protocol-prefixed where needed (`LockupStream`, `FlowStream`, `LockupAction`,
  `FlowAction`, `LockupBatch`, `FlowBatch`, ...).
- Canonical public schemas live at `envio/streams/streams.graphql` and `envio/airdrops/airdrops.graphql`.
- `BigInt` scalars such as `chainId` must be passed as strings.
- `Bytes` scalars are stored lowercase; lowercase address inputs before `_eq`.
- Default `limit` is 10; pass it explicitly for larger reads.
- Filter operators are Hasura operators such as `_eq`, `_in`, `_gt`, `_lt`, `_and`, `_or`.

## Code Style

- Keep handler code TypeScript-safe under each indexer's own `tsconfig.json`.
- Use shared helpers in `envio/common/` before adding per-indexer duplicates.
- Preserve the Envio facade contract while Envio v3 generated APIs keep shifting.

## Contribution Workflow

Follow the root `AGENTS.md` validation flow. Envio changes normally require `just envio::type-check` and targeted
codegen verification.
