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

## Lowercase Ethereum Addresses

**REQUIREMENT**: All Ethereum addresses must be lowercase.

- **Hard-coded addresses**: Always use lowercase format
- **Envio** (code under `envio/` directory): Convert checksummed addresses to lowercase before use
- **The Graph** (code under `graph/` directory): Already returns lowercase, no action needed when using functions like
  `dataSource.address()` or `toHexString()`
