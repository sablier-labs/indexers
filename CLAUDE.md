# Sablier Indexers

This document contains development instructions for AI agents working on the Sablier Indexers repository.

## Context

This repo provides data indexers for the [Sablier](https://sablier.com) protocol for onchain token distribution. The
indexers monitor Sablier's smart contract events and transform them into structured, queryable data APIs via GraphQL.
The data is used to power the [Sablier Interface](https://app.sablier.com).

We support two indexing services: [Envio](https://envio.dev) and [The Graph](https://thegraph.com).

## Most Important Thing

After generating code: `just full-write` → then verify with targeted checks.

**Check by file type:**

- **CSS/JS/TS/JSON**: `just biome-check <paths>` — pass specific paths
- **Markdown/YAML**: `just prettier-check <globs>` — pass glob patterns
- **TypeScript**: `just tsc-check` — always have to check the entire project
- **Mixed**: `just full-check`

**Examples:**

```bash
just biome-check app/page.tsx app/layout.tsx
just prettier-check "**/*.md" "**/*.yml"
just tsc-check
```

If issues remain, investigate the root cause and fix them.

## Commands

### Dependency Management

```bash
ni                  # Install all dependencies
ni package-name     # Add runtime dependency
ni -D package-name  # Add dev dependency
nun package-name    # Remove dependency
nlx package-name    # Execute package
```

### Development Workflow

```bash
just dev             # Start dev server
just full-check      # Run all code checks
just biome-check     # Biome validation only
just tsc-check       # TypeScript validation only
just full-write      # Run all code fixes
just test            # Run tests
just test id.test.ts # Run tests for a specific file
```

## Codegen

The `mappings/*` code under `envio/` and `graph/` uses dynamically generated bindings.

### When to Regenerate

Regenerate bindings after:

- Modifying `schema/` directory or GraphQL files
- Updating `cli/commands/codegen/`
- Bumping `envio`, `@graphprotocol/graph-ts`, or `@graphprotocol/graph-cli` versions in `package.json`

### Regenerate Commands

```bash
just codegen-envio-bindings              # All Envio indexers
just codegen-envio-bindings flow         # Single indexer

just codegen-graph-bindings              # All Graph subgraphs
just codegen-graph-bindings lockup       # Single subgraph
```
