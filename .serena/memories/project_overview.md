# Sablier Indexers - Project Overview

## Purpose
Data indexers for the Sablier protocol for onchain token distribution. Monitors Sablier smart contract events and transforms them into structured, queryable data APIs via GraphQL. Powers the Sablier Interface (app.sablier.com).

## Tech Stack
- **Primary Language**: TypeScript
- **Indexing Services**: The Graph & Envio
- **Package Manager**: pnpm
- **Build Tool**: TypeScript compiler + Just (command runner)
- **Testing**: Vitest 
- **Linting/Formatting**: Biome
- **Code Quality**: Knip (unused code detection)
- **GraphQL**: Code generation with @graphql-codegen
- **Infrastructure**: Node.js 22+, Husky for git hooks

## Architecture
- `/envio/` - Envio indexer configurations and mappings
- `/graph/` - The Graph subgraph configurations and mappings  
- `/schema/` - GraphQL schemas
- `/cli/` - Command-line interface for operations
- `/codegen/` - Code generation tooling
- `/tests/` - Test suites including vendor tests

## Supported Protocols
- **Airdrops**: Distribution data
- **Flow**: Payment streams data  
- **Lockup**: Vesting streams data
- **Analytics**: Usage metrics (new)