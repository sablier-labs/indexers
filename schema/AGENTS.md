# GraphQL Schema

For a public schema change:

1. Edit the source fragments or generators in `schema/`.
1. Run `just codegen::schema <vendor> <indexer>` for the affected vendor schema.
1. Run `just export-schema` when the package exports in `src/schemas/` must change.
1. Run the affected Envio or Graph codegen recipe when bindings or manifests depend on that schema.
