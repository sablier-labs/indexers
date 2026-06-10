# Sablier Indexers

Development instructions for agents working on the Sablier Indexers repository.

## Context

This repo provides data indexers for the [Sablier](https://sablier.com) protocol. The indexers monitor Sablier
smart-contract events and transform them into structured GraphQL APIs used by the Sablier Interface.

We support two indexing services: [Envio](https://envio.dev) and [The Graph](https://thegraph.com). Public indexer keys
are `airdrops` and `streams`; `analytics` is a private Envio target.

## Stack

- Node.js `>=22`, pnpm `11.5.1`, TypeScript, ESM-first package output with CJS/types builds.
- Effect + `@effect/cli` for internal CLI commands.
- Envio `3.1.2` for HyperIndex indexers.
- The Graph CLI `0.98.1` and `@graphprotocol/graph-ts` `0.38.2` for AssemblyScript subgraphs.
- Vitest for tests; Biome, Prettier, Ultracite, and devkit recipes for checks.

## Commands

Prefer `just` recipes. Inspect recipes before changing flags or invoking deploy/codegen flows.

### Dependency Management

```bash
ni                  # Install all dependencies
ni package-name     # Add runtime dependency
ni -D package-name  # Add dev dependency
nun package-name    # Remove dependency
nlx package-name    # Execute package
```

Keep both `.npmrc` and `pnpm-workspace.yaml`: `.npmrc` preserves the Envio codegen install workaround, while
`pnpm-workspace.yaml` holds pnpm 11 settings such as `minimumReleaseAge`. Preserve the duplicated
`onlyBuiltDependencies` allowlist unless Envio codegen has been re-verified.

### Root Recipes

```bash
just --list --list-submodules    # Show root and module recipes
just install --frozen            # Install dependencies through the devkit recipe
just full-check                  # Biome + Prettier + type-check
just full-write                  # Apply code-format fixes
just type-check                  # Root TS project only; excludes envio/ and graph/
just biome-check [globs]         # Biome check + lint
just biome-lint [globs]          # Biome lint only
just biome-write [globs]         # Biome write
just prettier-check [globs]      # Prettier check
just prettier-write [globs]      # Prettier write
just env-check                   # Lint .env.example and compare .env if present
just knip-check                  # Dead-code/dependency check
just knip-write                  # Apply knip fixes
just test [args]                 # Vitest, excluding vendor tests by default
just test-vendors [args]         # Vendor/equivalence tests
just ci-run <recipe> [args]      # CI-friendly logging wrapper
just clean                       # Delete build/generated artifacts
just clean-modules [globs]       # Remove node_modules recursively
```

### Build and Codegen

```bash
just build::all                         # Export schemas, clean dist, build CJS/ESM/types
just build::tsc                         # Build CJS/ESM/types in parallel
just build::tsc-cjs                     # Build CJS only
just build::tsc-esm                     # Build ESM only
just build::tsc-types                   # Build declarations only

just codegen::all                       # Envio + Graph codegen
just codegen::schema [vendor] [indexer] # Generate vendor GraphQL schemas
just codegen::envio [indexer]           # Envio schema + config + bindings
just codegen::envio-bindings [indexer]  # Envio bindings only
just codegen::envio-config [indexer]    # Envio config YAML only
just codegen::graph [indexer]           # Graph schema + manifests + bindings
just codegen::graph-bindings [indexer]  # Graph bindings only
just codegen::graph-manifest [indexer] [chain]
just export-schema                      # Export package schemas to src/schemas/
```

`indexer` is `airdrops`, `analytics`, `streams`, or `all` where supported. `analytics` is Envio-only.

### Envio

```bash
just envio::type-check             # Type-check all Envio TS projects
just envio::prices-check           # Compare price-data cache with node_modules
just envio::prices-sync            # Sync price-data cache
just envio::check-vendors [chain]  # Compare vendor assets
just envio::deploy [indexer]       # Force-push deployment branch; confirmed recipe
just envio::open                   # Open Envio dashboard
```

Inside `envio/<indexer>/`, run `just --list` for local recipes such as `just codegen`, `just envio dev`,
`just envio start`, `just envio stop`, and `just test`.

### The Graph

```bash
just graph::build <indexer>  # Codegen and build one subgraph
just graph::build-all        # Build airdrops and streams subgraphs
just graph::revive [args]    # Ping Graph endpoints
```

Inside `graph/<indexer>/`, run `just --list` for local recipes such as `just codegen`, `just build`, `just deploy`,
`just deploy-all`, and `just deploy-custom`.

### CLI and Querying

`cli` is a private just helper but is invokable from recipes and the command line.

```bash
just cli print chains
just cli print chains --graph
pnpm tsx cli/index.ts --help

just query::actions --chain-id <id>
just query::assets --indexer <airdrops|streams>
just query::average-mau --quarter <YYYY-qN>
just query::unique-txs --quarter <YYYY-qN>
just query::usd-fees --quarter <YYYY-qN>
just recover-tokens --protocol <flow|lockup> [--chain-id <id>|--all-chains]
```

Package scripts:

```bash
pnpm prepack  # Frozen install + just build::all
pnpm start    # envio start --directory ./envio/$ENVIO_INDEXER_NAME
```

## Validation

After generated code or source changes, run checks in order.

1. Identify changed file types.
1. For changed JS/TS/JSON/CSS/GraphQL files, run `na biome lint <files>`. If fewer than 10 files changed, pass paths or
   globs; if 10 or more changed, omit file arguments.
1. Type-check the scopes that changed:
   - `cli/`, `contracts/`, `events/`, `schema/`, `src/`, `tests/`: `na tsc --noEmit`
   - `envio/`: `just envio::type-check`
   - `graph/`: `just graph::build <indexer>` or `just graph::build-all`

For docs-only edits, run the narrowest formatter/check that touches the changed docs.

## Architecture

- `abi/` - ABI overrides and supplemental ABI assets.
- `cli/` - Effect CLI commands, services, and utilities.
- `configs/` - TypeScript build configs (`tsconfig.{build,cjs,esm,types}.json`).
- `contracts/` - Indexed Sablier contract sources per protocol/version.
- `events/` - Event maps that drive Envio and Graph handler generation.
- `schema/` - Source GraphQL schema fragments and generators.
- `src/` - Published package surface: indexer registries, mappers, constants, types, exported schemas.
- `envio/` - Envio indexers (`airdrops`, `analytics`, `streams`) plus shared facades, stores, and effects.
- `graph/` - The Graph subgraphs (`airdrops`, `streams`) and shared AssemblyScript utilities.
- `recipes/` - Root justfile modules.
- `tests/` - Vitest tests, CLI tests, Envio tests, and vendor equivalence tests.

## Codegen

The `mappings/*` code under `envio/` and `graph/` uses dynamically generated bindings.

Regenerate bindings after modifying `schema/` or GraphQL files, updating `cli/commands/codegen/`, or bumping `envio`,
`@graphprotocol/graph-ts`, or `@graphprotocol/graph-cli`.

Envio v3 writes generated type metadata to ignored `envio/<indexer>/.envio/types.d.ts` and
`envio/<indexer>/envio-env.d.ts`. Regenerate before `just envio::type-check` when those files are missing or stale.

## Schema Rules

- Edit `schema/` for public `airdrops` and `streams` schemas.
- Edit `envio/analytics/analytics.graphql` directly for analytics.
- Do not edit generated vendor schema files under `envio/<indexer>/` or `graph/<indexer>/` unless the local AGENTS file
  explicitly says analytics is the exception.
- Use `just codegen::schema <vendor> <indexer>` for vendor schemas and `just export-schema` for the package schemas in
  `src/schemas/`.

## Changelog

`CHANGELOG.md` documents changes to the published package surface shipped in `dist/**`. Do not record GraphQL schema
changes in `CHANGELOG.md`; schema evolution is tracked separately and is not part of the JS package contract.

Record public API additions/removals/renames, runtime behavior changes in shipped code, and `dependencies` or
`peerDependencies` version bumps. Skip schema edits, tests, CI, and development tooling.

## Code Style

- Do not use path aliases; root `tsconfig.json` warns that aliases break Envio compatibility.
- Keep Biome-compatible formatting; generated GraphQL is formatted through recipes.
- Keep Envio bindings facades hand-maintained; do not import generated internals from `envio/<indexer>/bindings/src/*`.
- Treat `graph/` as AssemblyScript, not TypeScript. See `graph/AGENTS.md` before changing mapping code.

## Contribution Workflow

- Default branch is `main`; branch off it and open PRs back into it.
- Use Conventional Commit subjects (`feat:`, `fix:`, `chore:`, `docs:`, `refactor(scope):`).
- A Husky `pre-commit` hook runs `lint-staged`; keep it green before pushing.
- Run the Validation flow above for the scopes you changed, and update `CHANGELOG.md` only when the shipped package
  surface changes.
