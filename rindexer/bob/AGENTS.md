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
