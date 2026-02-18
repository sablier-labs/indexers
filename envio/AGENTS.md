## CJS-Only Directory

This directory is **CommonJS-only** (`"type": "commonjs"` in `package.json`). The Envio runtime requires CJS — it does
not support ESM.

Every other directory in this monorepo is ESM (`"type": "module"` at the root). Because CJS cannot import ESM, **code in
`envio/` must never import from any other directory** (e.g. `../src`, `../cli`, `../schema`). All shared logic must be
duplicated or vendored locally under `envio/common/`.

Exception: TypeScript type-only imports are allowed from ESM modules (e.g. `import type { Foo } from "../src/types"`),
because they are erased at compile time and produce no runtime CJS `require`.

## Type Errors in Bindings

Run `just codegen-envio` to regenerate bindings.

## After GraphQL Schema Changes

**1. Update `bindings.ts`** — Add/remove imports to match new schema types

**2. Update `ENVIO_HASURA_PUBLIC_AGGREGATE`** (root `justfile`) — Add new aggregate entities

```bash
# Example: Adding a new aggregate entity "Baz"
export ENVIO_HASURA_PUBLIC_AGGREGATE := "Foo&Bar&Baz"
```

## Production URLs

For tasks involving GraphQL queries, use these endpoints:

- **Airdrops**: https://indexer.hyperindex.xyz/508d217/v1/graphql
- **Flow**: https://indexer.hyperindex.xyz/3b4ea6b/v1/graphql
- **Lockup**: https://indexer.hyperindex.xyz/53b7e25/v1/graphql
