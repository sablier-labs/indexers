# Sablier Indexers

This document contains development instructions for AI agents working on the Sablier Indexers repository.

## Context

This repo provides data indexers for the [Sablier](https://sablier.com) protocol for onchain token distribution. The
indexers monitor Sablier's smart contract events and transform them into structured, queryable data APIs via GraphQL.
The data is used to power the [Sablier Interface](https://app.sablier.com).

We support two indexing services: [Envio](https://envio.dev) and [The Graph](https://thegraph.com).

## Most Important Thing

After generating code, run these commands **in order**.

**File argument rules:**

- Changed fewer than 10 files? → Pass specific paths or globs
- Changed 10+ files? → Omit file arguments to process all files

**Command sequence:**

1. **Identify which file types changed**

2. **`na biome lint <files>`** — lint JS/TS/JSON/GraphQL (skip if none changed)

3. **`na tsc`** — verify TypeScript types (always run on entire project)

**Examples:**

```bash
# Fewer than 10 files: use specific paths
na biome lint "app/page.tsx" "app/layout.tsx"

# More than 10 files: use globs
na biome lint "app/**/*.ts" "app/**/*.tsx"

# 10+ files: omit file arguments
na biome lint

# TypeScript check always runs on entire project
na tsc
```

If any command fails, analyze the errors and fix it before continuing.

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
