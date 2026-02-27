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

## Contract configuration

- Address: `0x801bb9bc8Ad2ac5D8f2BC6d98b3Da29011219E0a`
- Start block: `24493329`
- ABI source copied from `~/sablier/new-ui/core/isomorphic/contracts/abis/sablier-bob.ts`

## Quick start

1. Copy env template:

```bash
cd rindexer/bob
cp .env.example .env
```

2. `ETHEREUM_RPC_URL` defaults to RouteMesh in `.env.example`. Replace it only if you want a different provider.

3. Start Postgres:

```bash
if docker compose version > /dev/null 2>&1; then
  docker compose up -d
else
  docker-compose up -d
fi
```

4. Run indexer:

```bash
rindexer start indexer
```

5. Or run indexer + GraphQL:

```bash
rindexer start all
```

GraphQL is available at `http://localhost:3001/graphql` when running `rindexer start all`.

## Upgrade note

If you ran an earlier version of this indexer, `pool_states` metadata columns may still be `NOT NULL` in your existing
database. That can fail when activity events are indexed before a `CreateVault` row exists in the local state table.

Apply this one-time migration:

```bash
docker exec -i bob-postgresql-1 psql -U postgres -d postgres -c "
ALTER TABLE sablier_bob_mainnet_sablier_bob.pool_states
  ALTER COLUMN token DROP NOT NULL,
  ALTER COLUMN oracle DROP NOT NULL,
  ALTER COLUMN adapter DROP NOT NULL,
  ALTER COLUMN share_token DROP NOT NULL,
  ALTER COLUMN target_price DROP NOT NULL,
  ALTER COLUMN expiry DROP NOT NULL,
  ALTER COLUMN created_block DROP NOT NULL,
  ALTER COLUMN created_tx_hash DROP NOT NULL;
"
```

## Root shortcuts

From repository root:

```bash
just rindexer-bob-up
just rindexer-bob-indexer
just rindexer-bob-all
just rindexer-bob-down
```
