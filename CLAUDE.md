# Sablier Indexers

This document contains instructions for AI agents working on the Sablier Indexers repository.

## Context

This repo provides data indexers for the [Sablier](https://sablier.com) protocol for onchain token distribution. The
indexers monitor Sablier's smart contract events and transform them into structured, queryable data APIs via GraphQL.
The data is used to power the [Sablier Interface](https://app.sablier.com).

We support two indexing services: [The Graph](https://thegraph.com) and [Envio](https://envio.dev).

## Development

**WORKFLOW**: After code changes → `just full-check` → `just full-write` (if errors) → fix remaining issues manually

**COMMON COMMANDS**:

- `just tsc-check` - TypeScript type checking only
- `ni <package>` - Install dependency (`ni -D` for dev dependency)
- `just test` - Run all tests
- `just test "tests/<file>.test.ts"` - Run specific test file

## Codegen

After modifying the `mappings` directory in `envio/` or `graph/`, regenerate bindings:

- `just codegen-envio-bindings` - All Envio indexers
- `just codegen-graph-bindings` - All Graph subgraphs

For a specific indexer:

- `just codegen-envio-bindings INDEXER_NAME` (e.g., `just codegen-envio-bindings flow`)
- `just codegen-graph-bindings INDEXER_NAME` (e.g., `just codegen-graph-bindings lockup`)
