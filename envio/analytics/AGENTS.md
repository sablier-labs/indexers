## Production URL

The analytics indexer is private (not exposed via `envioDeployments`). For tasks involving GraphQL queries, use:

- **Endpoint**: https://indexer.hyperindex.xyz/7672d32/v1/graphql
- **Playground**: https://envio.dev/app/sablier-labs/analytics/48b96e0/playground

Source of truth: `ENVIO_ANALYTICS_ENDPOINT` in `cli/commands/query/clients/envio.ts`.

## GraphQL Schema Editing

`analytics.graphql` should be **edited directly** in this indexer.

## Payable Releases

Only certain contract versions support `payable` (i.e. charge native currency fees via `msg.value`). Fee tracking
(`Store.Fees.createOrUpdate`) should only be added to handlers for payable versions.

| Protocol | Payable versions | Non-payable versions |
| -------- | ---------------- | -------------------- |
| Airdrops | v1.3, v2.0, v3.0 | v1.1, v1.2           |
| Lockup   | v2.0, v3.0, v4.0 | v1.0, v1.1, v1.2     |
| Flow     | v1.1, v2.0, v3.0 | v1.0                 |

See `isEvmReleasePayable` in the `sablier` SDK (`src/evm/helpers.ts`) for the canonical source of truth.
