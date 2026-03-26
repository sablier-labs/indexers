# SablierBob rindexer

@README.md

## Docs

- **rindexer**: <https://rindexer.xyz/docs/introduction/installation>

## Stack

- **rindexer** no-code indexer (`project_type: no-code`)
- PostgreSQL storage
- GraphQL API (port 3001)
- Docker Compose for local Postgres
- Railway for production deployment

## Contract

- **Address**: `0xC8AB7E45E6DF99596b86870c26C25c721eB5C9af`
- **Network**: Ethereum mainnet (chain 1)
- **Start block**: `24674959`
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
rindexer start all
```

GraphQL available at `http://localhost:3001/graphql`.
