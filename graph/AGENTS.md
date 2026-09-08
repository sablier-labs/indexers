# The Graph Subgraphs

`graph/` contains the maintained AssemblyScript subgraphs for the public `airdrops` and `streams` indexers. For
hand-maintained mappings, helpers, and stores, follow the
[AssemblyScript skill](../.agents/skills/assemblyscript/SKILL.md).

## Source Ownership

- Edit mappings, stores, and shared helpers in `graph/`; never hand-edit generated bindings, manifests, schemas, or
  build output.
- Follow the root [schema ownership](../AGENTS.md#schema-rules) and [codegen guidance](../AGENTS.md#codegen), including
  the cross-vendor GraphQL formatting effect.
- Use `graph/common/bindings/` recipes only when a shared ERC-20 or PRB Proxy binding changes.

## Graph Recipes

Run these from the repository root:

```bash
just codegen::graph <indexer>               # target schema, manifests, and bindings
just codegen::graph-bindings <indexer>      # target bindings
just codegen::graph-manifest <indexer> all  # target manifests
just codegen::schema graph <indexer>        # generated target schema
just graph::build <indexer>                 # codegen and build one subgraph
```

For shared bindings, run `just codegen` from `graph/common/bindings/`, or use its `codegen-erc20` and
`codegen-prb-proxy` recipes.

## Adding a Protocol Version

Trace a version through every maintained source before generating output:

1. Add its contract definitions under `contracts/` and event definitions under `events/`.
1. Add or update the actual versioned handler mappings under `graph/<indexer>/mappings/`.
1. Update version constants and the applicable non-payable version lists in `graph/common/constants.ts`.
1. For Lockup, check and update the cliff branches in `graph/streams/store/lockup/entity-stream.ts`; every version must
   join the applicable comparison branch, even when it shares an existing cliff representation or calculation.
1. Run `just graph::build <indexer>` for each affected target; it regenerates the target artifacts before building.

## Completion Evidence

For code changes, finish with the relevant Graph build or report the explicit blocker. For review or documentation work,
verify paths, links, and cited source declarations without running mutating generation recipes. Follow the root
`AGENTS.md` for general validation and authority.
