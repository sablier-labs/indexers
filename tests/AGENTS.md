# Tests

Vitest covers indexer metadata, CLI behavior, Envio helpers, and vendor equivalence. Run the narrowest
`just test <path>` that proves a changed test or its behavior; broaden only for shared fixtures or vendor behavior.

Vendor tests require `just test-vendors` (or `TEST_VENDORS=true pnpm vitest run`). Vitest prints local results to the
terminal. CI retries external-service tests and writes `test-results.json` at the repo root. `just ci-run` captures
output under `.logs/ci/` in quiet mode and prints the log when a recipe fails.
