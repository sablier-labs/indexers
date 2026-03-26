# SablierBob rindexer

@README.md

## Stack

- **rindexer** no-code indexer (`project_type: no-code`)
- PostgreSQL storage
- GraphQL API (port 3001)
- Docker Compose for local Postgres
- Railway for production deployment

## Contract

- **Address**: `0x801bb9bc8Ad2ac5D8f2BC6d98b3Da29011219E0a`
- **Network**: Ethereum mainnet (chain 1)
- **Start block**: `24493329`
- **ABI source**: `~/sablier/new-ui/core/isomorphic/contracts/abis/sablier-bob.ts`

## Indexed Events

- `CreateVault` — pool creation
- `Enter` — deposit into pool
- `Redeem` — withdraw from pool
- `SyncPriceFromOracle` — oracle price update
- `UnstakeFromAdapter` — unstake from adapter

## Derived State Tables

- `pool_states` — per-pool aggregates (counters, totals, latest oracle price)
- `pool_user_states` — per-pool-per-user aggregates (enter/redeem counts and totals)

## Quick Start

1. Copy env template:

```bash
cd rindexer/bob
cp .env.example .env
```

2. Set `ROUTEMESH_API_KEY` in `.env` — get key from <https://routeme.sh/app/consumer/api-keys>, or swap the URL for a
   different provider.

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

GraphQL available at `http://localhost:3001/graphql`.

## Production

Deployed on [Railway](https://railway.com/project/0fc03b8a-9848-451e-8eac-ec9e05dc0d04) (project `sablier-bob`,
environment `production`).

- GraphQL endpoint: <https://sablier-bob-rindexer.up.railway.app>
- GraphQL playground: <https://sablier-bob-rindexer.up.railway.app/graphql>
- Services: Postgres + rindexer (Docker image from `Dockerfile`)

## Upgrade Note

If upgrading from an earlier version, `pool_states` metadata columns may still be `NOT NULL`. Apply this one-time
migration:

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

## Root Shortcuts

From repository root:

```bash
just rindexer-bob-up
just rindexer-bob-indexer
just rindexer-bob-all
just rindexer-bob-down
```
