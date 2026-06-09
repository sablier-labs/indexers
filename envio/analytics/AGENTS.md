# Envio Analytics

Private Envio indexer for internal Sablier analytics.

## Stack

- Envio v3 TypeScript indexer.
- Directly maintained `analytics.graphql`.
- Shared local recipes from `envio/indexer.just`.

## Commands

```bash
just --list            # Show local recipes
just codegen           # Full Envio codegen for analytics
just codegen-bindings  # Regenerate bindings
just codegen-config    # Regenerate config.yaml
just codegen-schema    # Skips generated analytics schema where applicable
just envio dev         # Run local Envio dev mode
just envio start       # Start Envio
just envio stop        # Stop Envio
just test              # Run local Vitest tests
```

Root helpers:

```bash
just envio::prices-check
just envio::prices-sync
just query::average-mau --quarter <YYYY-qN>
just query::unique-txs --quarter <YYYY-qN>
just query::usd-fees --quarter <YYYY-qN>
```

## Architecture

- `analytics.graphql` - Source schema; edit directly.
- `mappings/` - Versioned airdrops, flow, and lockup handlers.
- `store/` - Fee, fee-collection, custom-fee, user, and monthly-active-user entities.
- `effects/` - External price/forex integrations.
- `presets/` - Preset data and helper queries.
- `tests/` - Analytics-specific tests.
- `justfile` - Sets `ENVIO_INDEXER_NAME`, `INDEXER_NAME`, and `ENVIO_HASURA_PUBLIC_AGGREGATE`.

## Production URL

The analytics indexer is private and is not exposed via `envioDeployments`. For GraphQL query tasks, use:

- Endpoint: `https://indexer.hyperindex.xyz/7672d32/v1/graphql`
- Playground: `https://envio.dev/app/sablier-labs/analytics/48b96e0/playground`

Source of truth: `ENVIO_ANALYTICS_ENDPOINT` and `ENVIO_ANALYTICS_PLAYGROUND_URL` in
`cli/commands/query/clients/envio.ts`.

## Schema Rules

Edit `analytics.graphql` directly. The shared `schema/` directory does not own analytics.

## Payable Releases

Only certain contract versions support `payable` and charge native currency fees through `msg.value`. Add
`Store.Fees.createOrUpdate` only to handlers for payable versions.

| Protocol | Payable versions | Non-payable versions |
| -------- | ---------------- | -------------------- |
| Airdrops | v1.3, v2.0, v3.0 | v1.1, v1.2           |
| Lockup   | v2.0, v3.0, v4.0 | v1.0, v1.1, v1.2     |
| Flow     | v1.1, v2.0, v3.0 | v1.0                 |

See `isEvmReleasePayable` in the `sablier` SDK (`src/evm/helpers.ts`) for the canonical source of truth.

## Contribution Workflow

Follow the parent `envio/AGENTS.md` and root validation flow. Analytics changes usually need local tests plus
`just envio::type-check`.
