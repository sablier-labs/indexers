# SablierBob rindexer (mainnet)

Standalone `rindexer` no-code indexer for SablierBob on Ethereum mainnet.

## Scope

This indexer tracks:

- Pool creation (`CreateVault`)
- Pool activity (`Enter`, `ExitWithinGracePeriod`, `Redeem`, `SyncPriceFromOracle`, `UnstakeFromAdapter`)

It stores:

- Raw event tables for the six events above
- Derived state tables:
  - `pool_states`
  - `pool_user_states`

## Production

Deployed on [Railway](https://railway.com/project/0fc03b8a-9848-451e-8eac-ec9e05dc0d04) (project `sablier-bob`,
environment `production`).

- GraphQL endpoint: <https://sablier-bob-rindexer.up.railway.app/graphql>
- GraphQL playground: <https://sablier-bob-rindexer.up.railway.app/playground>
- Services: Postgres + rindexer (Docker image from `Dockerfile`)
