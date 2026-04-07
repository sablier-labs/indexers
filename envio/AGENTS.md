## ESM Directory

This directory is ESM (`"type": "module"` in `package.json`), matching the rest of the monorepo. Envio v3 requires ESM —
Node.js 22+ is the minimum runtime.

## Type Checking

The root `tsconfig.json` excludes `envio/`. Running `just tsc-check` or `na tsc --noEmit` will **not** catch type errors
here. Use the Envio-specific tsconfig:

```bash
na tsc --noEmit -p envio/tsconfig.json
```

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
- **Streams**: https://indexer.hyperindex.xyz/0dbf2ab/v1/graphql
