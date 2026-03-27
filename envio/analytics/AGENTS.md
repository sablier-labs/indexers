## GraphQL Schema Editing

`analytics.graphql` should be **edited directly** in this indexer.

## Payable Releases

Only certain contract versions support `payable` (i.e. charge native currency fees via `msg.value`). Fee tracking
(`Store.Fees.createOrUpdate`) should only be added to handlers for payable versions.

| Protocol | Payable versions | Non-payable versions |
| -------- | ---------------- | -------------------- |
| Lockup   | v2.0, v3.0, v4.0 | v1.0, v1.1, v1.2     |
| Flow     | v1.1, v2.0, v3.0 | v1.0                 |

See `isEvmReleasePayable` in the `sablier` SDK (`src/evm/helpers.ts`) for the canonical source of truth.
