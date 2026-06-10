# Envio Airdrops

Public Envio indexer for Sablier airdrop campaigns.

## Stack

- Envio v3 TypeScript indexer.
- Generated `config.yaml` and `airdrops.graphql`.
- Shared local recipes from `envio/indexer.just`.

## Commands

```bash
just --list            # Show local recipes
just codegen           # Full Envio codegen for airdrops
just codegen-bindings  # Regenerate bindings
just codegen-config    # Regenerate config.yaml
just codegen-schema    # Regenerate airdrops.graphql
just envio dev         # Run local Envio dev mode
just envio start       # Start Envio
just envio stop        # Stop Envio
just test              # Run local Vitest tests
```

From the repo root, `just codegen::envio airdrops` runs the same full codegen flow.

## Architecture

- `mappings/` - Versioned event handlers.
- `store/` - Entity upsert helpers.
- `helpers/` - Protocol-specific helper logic.
- `bindings.ts` - Hand-maintained facade over generated Envio types.
- `justfile` - Sets `ENVIO_INDEXER_NAME`, `INDEXER_NAME`, and `ENVIO_HASURA_PUBLIC_AGGREGATE`.

## Handler Wrapper Files

Each versioned mapping directory, e.g. `mappings/v3.0/`, requires a wrapper `.ts` file for every factory contract
alongside its subdirectory. The wrapper is a single import that re-exports the subdirectory's handler:

```text
mappings/v3.0/SablierFactoryMerkleInstant.ts
mappings/v3.0/SablierFactoryMerkleInstant/create-instant.ts
```

Generated `config.yaml` points to wrapper files, and the Envio runtime imports them at startup. If a wrapper is missing,
the indexer fails with `Cannot find module`. When adding a new factory contract version, create both the subdirectory
and its wrapper file.

## Schema Rules

Do not edit `airdrops.graphql` directly. Modify `schema/`, then run `just codegen-schema` locally or
`just codegen::schema envio airdrops` from the repo root. Update `bindings.ts` and `ENVIO_HASURA_PUBLIC_AGGREGATE` when
entities change.

## Contribution Workflow

Follow the parent `envio/AGENTS.md` and root validation flow.
