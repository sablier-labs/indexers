# Sablier Indexers

This document contains development instructions for AI agents working on the Sablier Indexers repository.

## Context

This repo provides data indexers for the [Sablier](https://sablier.com) protocol for onchain token distribution. The
indexers monitor Sablier's smart contract events and transform them into structured, queryable data APIs via GraphQL.
The data is used to power the [Sablier Interface](https://app.sablier.com).

We support two indexing services: [Envio](https://envio.dev) and [The Graph](https://thegraph.com).

## Most Important Thing

After generating new code, run `just full-write` to format it, then run targeted checks:

**Granular Checks:**

- **CSS/JS/TS/JSON**: Run `just biome-check <paths>` and `just tsc-check <globs>`
- **Markdown/YAML**: Run `just prettier-check <globs>`
- **Mixed file types**: Run `just full-check`

**Targeted Approach:**

- Pass specific **paths** to `biome-check` (e.g., `just biome-check app/page.tsx app/layout.tsx`)
- Pass **globs** to `prettier-check` (e.g., `just prettier-check "**/*.md"`)
- Pass **globs** to `tsc-check` (e.g., `just tsc-check "app/**/*.ts"`)

If issues remain, identify and resolve the root cause.

**WORKFLOW**: After code changes → `just full-check` → `just full-write` (if errors) → fix remaining issues manually

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
