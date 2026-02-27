# Start local Postgres for the standalone Bob rindexer project
[group("rindexer")]
@rindexer-bob-up:
    cd rindexer/bob && docker compose up -d

# Stop local Postgres for the standalone Bob rindexer project
[group("rindexer")]
@rindexer-bob-down:
    cd rindexer/bob && docker compose down

# Run Bob indexer (raw events + derived tables)
[group("rindexer")]
@rindexer-bob-indexer:
    cd rindexer/bob && rindexer start indexer

# Run Bob GraphQL server only
[group("rindexer")]
@rindexer-bob-graphql:
    cd rindexer/bob && rindexer start graphql

# Run Bob indexer and GraphQL server together
[group("rindexer")]
@rindexer-bob-all:
    cd rindexer/bob && rindexer start all
