# Tests

Vitest suite for indexer metadata, CLI behavior, Envio helpers, and vendor equivalence.

## Stack

- Vitest `~3`.
- Global setup in `tests/setup.ts`.
- Vendor tests gated by `TEST_VENDORS=true`.

## Commands

```bash
just test                         # Run non-vendor tests
just test file.test.ts            # Run a specific test file/pattern
just test-vendors                 # Run vendor tests
TEST_VENDORS=true pnpm vitest run # Direct vendor-test invocation
pnpm vitest run tests/cli         # Direct targeted Vitest run
```

CI retries external-service tests and writes JSON output through `vitest.config.ts`.

## Architecture

- `tests/*.test.ts` - Core tests, including event resolution.
- `tests/cli/` - CLI command tests.
- `tests/envio/` - Envio-specific tests.
- `tests/indexers/` - Indexer key/protocol mapper tests.
- `tests/vendors/` - Vendor chain and equivalence tests.
- `tests/setup.ts` - Global setup and log path configuration.
- `summarize-test-failures.ts` - CI helper for Vitest JSON output.

## Logs

Test logs are written to `.logs/tests/{timestamp}.log`.

## Contribution Workflow

Follow the root `AGENTS.md` validation flow. For changed test files, run the narrowest `just test <path>` command that
proves the change, then broaden only when shared fixtures or vendor behavior changed.
