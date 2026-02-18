# GraphQL Schema

**Source of truth** for GraphQL schemas (except `analytics` - edits directly in `envio/analytics/`).

## Structure

- **`{indexer}/`** - Indexer-specific definitions (airdrops/, flow/, lockup/)
- **`common/`** - Shared definitions across indexers
- **`*.graphql`** - Static schema files
- **`*.graphql.ts`** - TypeScript generators (dynamic schemas)
- **`merger.ts`** - Combines common + bespoke + generators
- **`enums.ts`** - Shared enum generators

## Workflow

1. Edit files in `schema/`
2. Run `just export-schema`
3. Output written to `envio/{indexer}/{indexer}.graphql` and `graph/{indexer}/{indexer}.graphql`

**NEVER** edit generated files directly.

## Indexer Rules

| Indexer   | Schema Source               | Pattern                                              |
| --------- | --------------------------- | ---------------------------------------------------- |
| airdrops  | `schema/airdrops/` + common | bespoke + BASE generators                            |
| analytics | `envio/analytics/`          | No schema/ files, direct edit in `analytics.graphql` |
| flow      | `schema/flow/` + common     | common + BASE + stream generator                     |
| lockup    | `schema/lockup/` + common   | common + bespoke + BASE + stream                     |
