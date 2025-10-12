## Type Errors in Bindings

Run `just codegen-envio` to regenerate binding.

## After GraphQL Schema Changes

**1. Update `bindings.ts`** - Add/remove imports to match new schema types

**2. Update `ENVIO_HASURA_PUBLIC_AGGREGATE`** (root `justfile`) - Add new aggregate entities

```bash
# Example: Adding a new aggregate entity "Baz"
export ENVIO_HASURA_PUBLIC_AGGREGATE := "Foo&Bar&Baz"
```
