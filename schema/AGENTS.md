# GraphQL Schema

Source of truth for public GraphQL schemas. Analytics is the exception and is edited directly in
`envio/analytics/analytics.graphql`.

## Stack

- Static `.graphql` fragments.
- TypeScript GraphQL generators returning `DocumentNode`/SDL.
- `schema/merger.ts` combines common, target-specific, vendor-specific, and generated schema pieces.

## Commands

```bash
na biome lint schema/**/*.ts schema/**/*.graphql
na tsc --noEmit
just codegen::schema [vendor] [indexer] # Generate vendor schemas
just codegen::envio [indexer]           # Envio schema/config/bindings
just codegen::graph [indexer]           # Graph schema/manifests/bindings
just export-schema                      # Export package schemas to src/schemas/
just codegen::all                       # Regenerate all indexer artifacts
```

`vendor` is `envio`, `graph`, or `all`. `indexer` is `airdrops`, `analytics`, `streams`, or `all` where supported.
Analytics schema generation is skipped because its schema is maintained directly.

## Architecture

- `airdrops/` - Airdrops-specific schema fragments.
- `streams/` - Streams-specific schema fragments and generators.
- `common/` - Shared schema fragments and generators.
- `enums.ts` - Shared enum generators.
- `index.ts` - Public schema merger exports.
- `merger.ts` - Merge configuration and schema loading.

## Workflow

1. Edit source files in `schema/`.
1. Run `just codegen::schema <vendor> <indexer>` to update generated vendor schemas under `envio/<indexer>/` and
   `graph/<indexer>/`.
1. Run `just export-schema` when `src/schemas/*.graphql` needs to reflect the public package schema.
1. Run the relevant Envio/Graph codegen recipes when generated bindings or manifests depend on the schema change.

Never edit generated public schemas in `envio/airdrops/`, `envio/streams/`, `graph/airdrops/`, `graph/streams/`, or
`src/schemas/` directly.

## Indexer Rules

| Indexer   | Schema Source               | Pattern                                       |
| --------- | --------------------------- | --------------------------------------------- |
| airdrops  | `schema/airdrops/` + common | Indexer-specific + shared base definitions    |
| analytics | `envio/analytics/`          | Directly maintained `analytics.graphql`       |
| streams   | `schema/streams/` + common  | Common + indexer-specific + stream generators |

## Contribution Workflow

Follow the root `AGENTS.md` validation flow. Schema edits usually require vendor codegen plus package schema export.
