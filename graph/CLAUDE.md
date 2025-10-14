# The Graph Subgraphs

**Language**: AssemblyScript (not TypeScript)

Cannot be refactored to share code with other parts of the codebase.

## Schema Editing

**DO NOT** edit `{indexer}/schema.graphql` files directly.

Modify source in `schema/` directory, then run `just codegen-schema`.

| Indexer  | Schema Source               |
| -------- | --------------------------- |
| airdrops | `schema/airdrops/` + common |
| flow     | `schema/flow/` + common     |
| lockup   | `schema/lockup/` + common   |
