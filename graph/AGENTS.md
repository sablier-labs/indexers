# The Graph Subgraphs

**Language**: AssemblyScript (not TypeScript)

Cannot be refactored to share code with other parts of the codebase.

**Dependencies**: Only `@graphprotocol/graph-ts` is allowed. No other npm packages can be used.

## Schema Editing

**DO NOT** edit `{indexer}/schema.graphql` files directly.

Modify source in `schema/` directory, then run `just codegen-schema`.

| Indexer  | Schema Source               |
| -------- | --------------------------- |
| airdrops | `schema/airdrops/` + common |
| flow     | `schema/flow/` + common     |
| lockup   | `schema/lockup/` + common   |

## Building Subgraphs

When working inside an indexer directory (e.g., `graph/lockup/`), use justfile recipes:

```bash
just codegen  # Regenerate bindings and schema
just build    # Build the subgraph
```

From the repo root, use justfile recipes:

```bash
just codegen-graph lockup        # Codegen for a specific indexer
just codegen-graph               # Codegen for all indexers
just build-graph-indexer lockup  # Build a specific indexer
just build-graph-indexer         # Build all indexers
```

## AssemblyScript Constraints

Key limitations compared to TypeScript:

- **No closures** - Array methods like `findIndex()`, `filter()`, `every()` cannot use arrow functions with closures
- **BigInt comparison** - Use `.gt()`, `.equals()`, `.lt()` methods instead of `>`, `===`, `<`
- **BigInt constants** - Use `ONE` and `ZERO` from `graph/common/constants.ts` instead of literals
- **String comparison** - Use `areStringsEqual()` helper instead of `===`
- **No spread operators** - Use direct property assignment
