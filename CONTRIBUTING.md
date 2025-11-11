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

## Deployments

### Envio

Sync the changes to the `deployment/main` branch, and the Envio Hosted Service will automatically build and deploy the
new indexers.

### The Graph

#### Version Label

Each subgraph has a version label used to track changes made to the subgraph. The format is:

```text
v{PROTOCOL_VERSION}--v{SUBGRAPH_VERSION}
```

Here's an example for how to set the next version label if the current version label is `v2.0--v1.0.0`:

| Change                       | New Version Label     |
| ---------------------------- | --------------------- |
| Hot fix                      | `v2.0--v1.0.1`        |
| New addresses or features    | `v2.0--v1.1.0`        |
| Staging new protocol release | `v2.1--v1.0.0-beta.0` |
| New protocol release         | `v2.1--v1.0.0`        |

For a full list of protocol versions, see the [Sablier SDK](https://github.com/sablier-labs/sdk) (run the
`print-versions` command).

#### Scripts

Go to each protocol's directory and run the `deploy-all` recipe. For example:

```shell
cd graph/lockup
just deploy-all v2.1--v1.0.0
```

Then, do the same for the other protocols.

> [!NOTE]
>
> The Graph is not officially supported on some chains, e.g. Lightlink. To make deployments to these custom instances of
> The Graph, use the `deploy-custom` recipe.
