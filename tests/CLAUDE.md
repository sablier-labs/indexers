# Tests

**Framework**: Vitest

## Structure

- **`tests/*.test.ts`** - Core tests (codegen, event resolution)
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
