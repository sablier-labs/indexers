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
| streams  | `schema/streams/` + common  |

## Building Subgraphs

When working inside an indexer directory (e.g., `graph/streams/`), use justfile recipes:

```bash
just codegen  # Regenerate bindings and schema
just build    # Build the subgraph
```

From the repo root, use justfile recipes:

```bash
just codegen::graph streams  # Codegen for a specific indexer
just codegen::graph          # Codegen for all indexers
just graph::build streams    # Build a specific indexer
just graph::build            # Build all indexers
```

## AssemblyScript Constraints

Key limitations compared to TypeScript:

- **No closures** - Array methods like `findIndex()`, `filter()`, `every()` cannot use arrow functions with closures
- **BigInt comparison** - Use `.gt()`, `.equals()`, `.lt()` methods instead of `>`, `===`, `<`
- **BigInt constants** - Use `ONE` and `ZERO` from `graph/common/constants.ts` instead of literals
- **String comparison** - Use `areStringsEqual()` helper instead of `===`
- **No spread operators** - Use direct property assignment

## Adding a New Protocol Version

When a new protocol version is added:

1. **Define the version constant** in `graph/common/constants.ts` (e.g., `export const LOCKUP_V5_0 = "v5.0";`)
1. **For Lockup versions**, add the new constant to the version comparison in
   `graph/streams/store/lockup/entity-stream.ts` (the `addCliff` function), which checks versions to determine
   cliff-handling behavior
