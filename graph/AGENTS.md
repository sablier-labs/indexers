# The Graph Subgraphs

AssemblyScript subgraphs for Sablier `airdrops` and `streams`.

## Stack

- AssemblyScript for The Graph, not TypeScript.
- `@graphprotocol/graph-ts` is the only allowed runtime dependency.
- Graph CLI recipes generate schemas, manifests, bindings, and builds.

## Commands

From the repo root:

```bash
just codegen::graph [indexer]            # Schema + manifests + bindings
just codegen::graph-bindings [indexer]   # Bindings only
just codegen::graph-manifest [indexer] [chain]
just codegen::schema graph [indexer]     # Graph schema only
just graph::build <indexer>              # Codegen and build one subgraph
just graph::build-all                    # Build airdrops and streams
just graph::revive [args]                # Ping Graph endpoints
```

From `graph/<indexer>/`:

```bash
just --list
just codegen
just codegen-bindings
just codegen-manifest [chain]
just codegen-schema
just build
just clean
just auth
just deploy <chain> <version_label>
just deploy-all <version_label> [args]
just deploy-custom <chain_slug> <version_label>
```

From `graph/common/bindings/`:

```bash
just codegen           # Generate all common bindings
just codegen-erc20     # Generate ERC-20 bindings
just codegen-prb-proxy # Generate PRBProxy bindings
```

## Architecture

- `airdrops/` - Airdrops subgraph mappings, manifests, helpers, store, and generated bindings.
- `streams/` - Combined Flow + Lockup streams subgraph mappings, manifests, helpers, store, and generated bindings.
- `common/` - Shared AssemblyScript helpers, constants, IDs, logging, context, fees, and bindings.
- `indexer.just` - Shared local recipe file imported by each subgraph.

## Schema Rules

Do not edit `graph/<indexer>/<indexer>.graphql` directly. Modify source in `schema/`, then run
`just codegen::schema graph <indexer>` or the local `just codegen-schema`.

| Indexer  | Schema Source               |
| -------- | --------------------------- |
| airdrops | `schema/airdrops/` + common |
| streams  | `schema/streams/` + common  |

## AssemblyScript Constraints

- No npm runtime dependencies besides `@graphprotocol/graph-ts`.
- No closures in array methods; prefer manual loops when outer variables are needed.
- Compare `BigInt` with `.gt()`, `.equals()`, and `.lt()`, not JS operators.
- Use `ONE`, `ZERO`, and other constants from `graph/common/constants.ts`.
- Use `areStringsEqual()` or `==` for strings; do not use `===`.
- Do not use object spread, optional chaining, or nullish coalescing.
- Use `changetype<T>()` instead of `as T` for type assertions.
- Use `try_*()` contract calls and handle `reverted` results.

Project utilities:

| Utility                                         | Import                | Purpose                     |
| ----------------------------------------------- | --------------------- | --------------------------- |
| `ONE`, `ZERO`                                   | `../common/constants` | BigInt constants            |
| `areStringsEqual()`                             | `../common/strings`   | String comparison           |
| `logDebug`, `logError`, `logInfo`, `logWarning` | `../common/logger`    | Prefixed logging            |
| `getDay()`                                      | `../common/helpers`   | Timestamp-to-day conversion |
| `Id` namespace                                  | `../common/id`        | Entity ID generation        |

## Adding a Protocol Version

1. Define the version constant in `graph/common/constants.ts`.
1. Add non-payable version arrays there when the new version is non-payable.
1. For Lockup versions, update `graph/streams/store/lockup/entity-stream.ts` if cliff handling differs or the version
   must join the existing comparison branches.
1. Regenerate manifests, bindings, and schemas before building.

## Contribution Workflow

Follow the root `AGENTS.md` validation flow. For `graph/` changes, use `just graph::build <indexer>` or
`just graph::build-all`; root `na tsc --noEmit` does not type-check AssemblyScript subgraphs.
