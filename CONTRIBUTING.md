## Contributing

### Prerequisites

- [Node.js](https://nodejs.org) (v20+)
- [Just](https://github.com/casey/just) (command runner)
- [Pnpm](https://pnpm.io/) (package manager)
- [Ni](https://github.com/antfu-collective/ni) (package manager resolver)

### Setup

```bash
git clone https://github.com/sablier-labs/indexers.git sablier-indexers
cd sablier-indexers
pnpm install
```

### Available Commands

```bash
just --list                 # Show all available commands
just codegen                # Codegen all indexers
just full-check             # Run all code quality checks
just full-write             # Auto-fix formatting and linting
```

### Development Workflow

1. Fork the repository
1. Create a feature branch
1. Make your changes
1. Run `just full-check` to verify code quality
1. Update the `CHANGELOG.md` file with the changes.
1. Commit the changes.
1. Submit a pull request

### Updating the GraphQL Schema

- Make changes in the `schema` directory.
- Run `just codegen` to update the auto-generated bindings.
- Run `just export-schema` to update the auto-generated GraphQL schemas.

### Indexing New Chains

1. Check if the chain is supported by Envio, The Graph, or both.
1. If the chain is supported by Envio, add it to the [`src/indexers/envio.ts`](./src/indexers/envio.ts) file.
   - If Envio doesn't provide HyperSync support, set `rpcOnly` to `true`.
1. If the chain is supported by The Graph, add it to the [`src/indexers/graph.ts`](./src/indexers/graph.ts) file.
   - Override the chain slug in `CHAIN_SLUG_GRAPH_OVERRIDES`, if necessary.
   - Override the chain slug in `CHAIN_SLUG_SUBGRAPH_YAML`, if necessary.
1. Run `just codegen` to update the auto-generated bindings.

> [!NOTE]
>
> Sablier Indexers can only index chains that are already part of the
> [Sablier SDK](https://github.com/sablier-labs/sdk). To list a new chain, submit a request there.

### Mappings for New Contracts

1. Add the new contracts on the [`staging`](https://github.com/sablier-labs/sdk/tree/staging) branch of the Sablier SDK.
1. Ship a new `sablier` `pnpm` package with the `beta` and a version like this: `v1.x-beta.y` (replace `x` and `y` with
   the actual version).
1. Install the staging version version of the Sablier SDK.
1. Implement the new mappings.
