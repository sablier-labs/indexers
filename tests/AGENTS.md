# Tests

**Framework**: Vitest

## Structure

- **`tests/*.test.ts`** - Core tests (event resolution)
- **`tests/cli/`** - CLI command tests (graph deploy, query, RPC, etc.)
- **`tests/envio/`** - Envio-specific tests (coingecko)
- **`tests/indexers/`** - Indexer tests (protocol ↔ indexer-key mappers)
- **`tests/vendors/`** - Vendor tests (chains, equivalence)
- **`tests/setup.ts`** - Global setup (log paths)

## Running Tests

```bash
just test                 # Core tests only
just test file.test.ts    # Specific file
just test-vendors         # Vendor tests (slower)
```

Vendor tests require `TEST_VENDORS=true` environment variable.

## Logs

Test logs written to `.logs/tests/{timestamp}.log` (configured in setup.ts).
