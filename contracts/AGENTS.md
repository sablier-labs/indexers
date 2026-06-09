# Contracts

Defines which Sablier contracts are indexed by each protocol.

## Stack

- TypeScript data definitions.
- Sablier SDK contract names and version metadata.
- Consumed by codegen for Envio configs and Graph manifests.

## Commands

```bash
na biome lint contracts/**/*.ts       # Lint contract definitions
na tsc --noEmit                       # Type-check root TS project
just codegen::envio-config [indexer]  # Refresh Envio config YAML
just codegen::graph-manifest [indexer] [chain]
just codegen::all                     # Regenerate all indexer artifacts
```

## Architecture

- `{protocol}.ts` - Contract sources per protocol (`airdrops`, `flow`, `lockup`).
- `index.ts` - Exports `indexedContracts` and `convertToIndexed`.

Each protocol file exports `Model.ContractSource<Sablier.Version.*>[]`:

- `name` - Contract name from the Sablier package.
- `versions` - Versions to index.
- `isTemplate` - Whether the contract is a template/factory-derived source.

## Conventions

- Keep contract names aligned with `sablier` package ABI names.
- Use `isTemplate` for factory-created contracts so codegen emits the right dynamic data-source behavior.
- After adding contract versions, regenerate both vendor manifests/configs before type-checking.

## Contribution Workflow

Follow the root `AGENTS.md` validation flow. Contract edits usually require codegen verification, not changelog entries
unless the published TypeScript package surface changes.
