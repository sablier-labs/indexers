# Envio Analytics

Private Envio indexer for internal Sablier analytics. `analytics.graphql` is its directly maintained source schema; the
shared `schema/` directory does not own it. Its endpoint and playground source of truth are `ENVIO_ANALYTICS_ENDPOINT`
and `ENVIO_ANALYTICS_PLAYGROUND_URL` in `cli/commands/query/clients/envio.ts`.

## Payable Releases

Only payable releases charge native-currency fees through `msg.value`. Add `Store.Fees.createOrUpdate` only to handlers
for those releases.

| Protocol | Payable versions | Non-payable versions |
| -------- | ---------------- | -------------------- |
| Airdrops | v1.3, v2.0, v3.0 | v1.1, v1.2           |
| Lockup   | v2.0, v3.0, v4.0 | v1.0, v1.1, v1.2     |
| Flow     | v1.1, v2.0, v3.0 | v1.0                 |

`isEvmReleasePayable` in the `sablier` SDK (`src/evm/helpers.ts`) is the canonical source of truth.
