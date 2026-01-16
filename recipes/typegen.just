# Codegen all GraphQL types and queries
[group("codegen"), group("gql")]
@codegen-gql:
    just concurrent-vendors "just codegen-gql-envio" "just codegen-gql-graph"

# Codegen GraphQL types and queries for Envio indexers
[group("codegen"), group("envio"), group("gql")]
@codegen-gql-envio:
    just concurrent-protocol-indexers \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/airdrops/envio.ts" \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/flow/envio.ts" \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/lockup/envio.ts"

# Codegen GraphQL types and queries for Graph indexers
[group("codegen"), group("graph"), group("gql")]
@codegen-gql-graph:
    just concurrent-protocol-indexers \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/airdrops/graph.ts" \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/flow/graph.ts" \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/lockup/graph.ts"
