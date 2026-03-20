## Handler Wrapper Files

Each versioned mapping directory (e.g. `mappings/v3.0/`) requires a **wrapper `.ts` file** for every factory contract
alongside its subdirectory. The wrapper is a single import that re-exports the subdirectory's handler:

```
mappings/v3.0/SablierFactoryMerkleInstant.ts   ← wrapper (import "./SablierFactoryMerkleInstant/create-instant")
mappings/v3.0/SablierFactoryMerkleInstant/     ← implementation
```

The generated `config.yaml` points to these wrapper files, and the Envio bindings `require` them at runtime. If a
wrapper is missing, the indexer fails with `Cannot find module`.

When adding a new contract version, always create both the subdirectory **and** its wrapper file.

## GraphQL Schema Editing

`airdrops.graphql` should **NOT** be edited directly.

Modify the schema in the `schema/` directory, and run `just codegen-schema`.
