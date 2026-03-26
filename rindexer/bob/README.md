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
