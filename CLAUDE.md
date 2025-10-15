# Sablier Indexers

This document contains development instructions for AI agents working on the Sablier Indexers repository.

## Context

This repo provides data indexers for the [Sablier](https://sablier.com) protocol for onchain token distribution. The
indexers monitor Sablier's smart contract events and transform them into structured, queryable data APIs via GraphQL.
The data is used to power the [Sablier Interface](https://app.sablier.com).

We support two indexing services: [Envio](https://envio.dev) and [The Graph](https://thegraph.com).

## Most Important Thing

After generating code, follow these steps in order. Do not proceed to the next step unless the current step passes.

**File argument convention:** For commands that accept file arguments, pass specific file paths or globs when fewer than
10 files changed. Omit arguments to process all files when 10+ files changed.

**Order of operations:**

1. **Identify changed file types** — determine which linters/formatters are needed
2. **`just prettier-write <files>`** — auto-fix Markdown/YAML files (skip if none changed)
3. **`just biome-write <files>`** — auto-fix JS/TS/JSON/CSS/GraphQL files (skip if none changed)
4. **`just prettier-check <files>`** — verify Markdown/YAML files (skip if none changed)
5. **`just biome-check <files>`** — verify JS/TS/JSON/CSS/GraphQL files (skip if none changed)
6. **`just tsc-check`** — verify TypeScript types across entire project

**Examples:**

```bash
# Steps 2-5: Specific files (< 10 files changed)
just prettier-write README.md CHANGELOG.md
just biome-write app/page.tsx app/layout.tsx
just prettier-check README.md CHANGELOG.md
just biome-check app/page.tsx app/layout.tsx

# Steps 2-5: Glob patterns
just prettier-write "docs/**/*.md"
just biome-write "app/**/*.ts" "app/**/*.tsx"
just prettier-check "docs/**/*.md"
just biome-check "app/**/*.ts" "app/**/*.tsx"

# Steps 2-5: All files (10+ files changed)
just prettier-write
just biome-write
just prettier-check
just biome-check

# Step 6: Always runs on entire project
just tsc-check
```

If any step fails, think about how to fix it.

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
