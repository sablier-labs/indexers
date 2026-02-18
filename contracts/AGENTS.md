# Contracts

Defines which Sablier contracts are indexed by each protocol.

## Structure

- **`{protocol}.ts`** - Contract sources per protocol (airdrops, flow, lockup)
- **`index.ts`** - Exports `indexedContracts` map and `convertToIndexed` helper

## Contract Sources

Each protocol file exports `Types.ContractSource[]`:

- **`name`** - Contract name (from sablier package)
- **`versions`** - Array of versions to index
- **`isTemplate`** - Whether contract is a template (for factory patterns)

## Usage

Used by codegen to generate Envio configs and Graph manifests.

The `convertToIndexed` function transforms contracts from `sablier` package format to indexer format (used by Envio
runtime).
