# Envio Indexers

Shared helpers and the compatibility facade live under `envio/common/`; each `<indexer>/bindings.ts` is a
hand-maintained facade over Envio's generated `envio` module augmentation.

Envio v3 generates one module augmentation per indexer; keep each indexer a separate TS project during type-checking.

Keep a facade's contract and event exports aligned with contract, event, or config changes; a schema-field change alone
does not require a facade update. Update an indexer's `ENVIO_HASURA_PUBLIC_AGGREGATE` only when its affected entities'
aggregation permissions change.

For public endpoint discovery, use `src/indexers/envio-deployments.ts`.

## Querying Envio

Envio uses Hasura-style GraphQL. Use its operators (`_eq`, `_in`, `_gt`, `_lt`, `_and`, `_or`), lowercase address inputs
for `Bytes` equality filters, and pass `BigInt` values such as `chainId` as strings. Set explicit limits and paginate
when complete results are required.
