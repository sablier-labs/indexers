## Bindings Errors

If there are type errors related to `bindings` imports, run `just codegen-envio` to regenerate bindings.

## Update `ENVIO_HASURA_PUBLIC_AGGREGATE`

When modifying GraphQL entities or adding new ones, update `ENVIO_HASURA_PUBLIC_AGGREGATE` in the root `justfile`:

```bash
# Before
export ENVIO_HASURA_PUBLIC_AGGREGATE := "Foo&Bar"

# After
export ENVIO_HASURA_PUBLIC_AGGREGATE := "Foo&Bar&Baz"
```
