## Type Checking

The root `tsconfig.json` excludes `envio/`. Running root `just type-check` / `just tsc-check` or `na tsc --noEmit` will
**not** catch type errors here. Envio v3 generates one `envio` module augmentation per indexer, so type-check each
indexer as a separate TS project:

```bash
just envio::type-check
```

For a single indexer, run `na tsc --noEmit -p envio/<indexer>/tsconfig.json`.

## Type Errors in Bindings

Run `just codegen::envio` from the repo root to regenerate bindings, or `just codegen` from an Envio indexer directory.
Envio v3 writes generated type metadata to ignored `envio/<indexer>/.envio/types.d.ts` and
`envio/<indexer>/envio-env.d.ts`.

Do **not** import generated internals from `envio/<indexer>/bindings/src/*`. The `envio/<indexer>/bindings.ts` files are
hand-maintained compatibility facades over `envio/common/facade.ts`; keep their contract and event lists in sync with
`config.yaml`.

## Running Indexers

From an Envio indexer directory, use the shared `envio/indexer.just` recipe:

```bash
just envio dev
just envio start
just envio stop
```

The recipe passes `--directory` and `--config` to `pnpm envio` and toggles TUI mode with `ENVIO_TUI`. Do not use the old
`ts-node ./bindings/src/Index.res.mjs` start path.

## After GraphQL Schema Changes

**1. Update `bindings.ts`** — Add/remove imports to match new schema types

**2. Update `ENVIO_HASURA_PUBLIC_AGGREGATE`** (each indexer's `justfile`, e.g. `envio/streams/justfile`) — Add new
aggregate entities

```bash
# Example: Adding a new aggregate entity "Baz"
export ENVIO_HASURA_PUBLIC_AGGREGATE := "Foo&Bar&Baz"
```

## Production URLs

For tasks involving GraphQL queries, use these endpoints:

- **Airdrops**: https://indexer.hyperindex.xyz/508d217/v1/graphql
- **Streams**: https://indexer.hyperindex.xyz/53b7e25/v1/graphql

## Querying Envio

Envio exposes a **Hasura-style** GraphQL API — different from The Graph's subgraph syntax.

**Entity names** are PascalCase singular and prefixed per protocol vertical (`LockupStream`, `FlowStream`,
`LockupAction`, `FlowAction`, `LockupBatch`, `FlowBatch`, …). Canonical list per indexer:

- `envio/streams/streams.graphql`
- `envio/airdrops/airdrops.graphql`

**Query shape** — root field is the entity name itself, filters use Hasura operators:

```graphql
query LockupStreamsBySender {
  LockupStream(
    where: { sender: { _eq: "0x0298f4332e3857631385b39766325058a93e249f" }, chainId: { _eq: "1" } }
    limit: 1000
    order_by: { startTime: desc }
  ) {
    id
    chainId
    sender
    tokenId
  }
}
```

**Gotchas**:

- `BigInt` scalars (e.g. `chainId`) must be passed as strings.
- `Bytes` scalars (e.g. `sender`, `recipient`) are stored lowercase — lowercase the input before `_eq`.
- Default `limit` is 10; pass it explicitly when you want more.
- Filter operators are `_eq`, `_in`, `_gt`, `_lt`, `_and`, `_or`, … (not `_contains`/`_not`-style from The Graph).
