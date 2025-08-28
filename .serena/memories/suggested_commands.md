# Essential Development Commands

## Setup & Dependencies
```bash
pnpm install              # Install dependencies
just setup               # Setup Husky git hooks (first time only)
```

## Core Development Workflow
```bash
just --list              # Show all available commands
just full-check          # Run all quality checks (recommended before commit)
just full-write          # Auto-fix formatting and linting
just codegen             # Codegen everything (indexers + GraphQL)
just build               # Build the entire package
just test                # Run tests
just test-vendors        # Run vendor integration tests
```

## Indexer-Specific Commands  
```bash
# Envio indexers
just codegen-envio       # Codegen Envio configs and bindings
just codegen-envio-config # Codegen YAML configs only
just codegen-envio-bindings # Codegen bindings only

# Graph indexers  
just codegen-graph       # Codegen Graph manifests and bindings
just build-graph-indexer # Build Graph indexers
just codegen-graph-manifest # Codegen manifests only

# GraphQL
just codegen-gql         # Codegen GraphQL types and queries
just export-schema       # Export schemas to src/
```

## Utilities
```bash
just clean               # Remove build artifacts
just print-chains        # Show available blockchain networks
just print-protocols     # Show available indexer protocols
just fetch-assets        # Fetch assets from Graph subgraphs
```

## Darwin-Specific Commands
Standard unix commands available: `ls`, `cd`, `grep`, `find`, `git`
Package management via `pnpm` and `ni` (universal package manager)