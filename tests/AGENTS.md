# Tests

Vitest covers indexer metadata, CLI behavior, Envio helpers, and vendor equivalence. Run the narrowest
`just test <path>` that proves a changed test or its behavior; broaden only for shared fixtures or vendor behavior.

Vendor tests require `just test-vendors` (or `TEST_VENDORS=true pnpm vitest run`). CI retries external-service tests and
writes its JSON output through `vitest.config.ts`; test logs are written under `.logs/tests/`.
