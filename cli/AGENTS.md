# CLI Tools

Internal Effect CLI for Sablier Indexers development, codegen, querying, and deployment helpers.

## Stack

- TypeScript on Node.js `>=22`.
- `@effect/cli` for command declarations.
- Effect services under `cli/services/` for filesystem, HTTP, process execution, prompts, spinners, logging, and env.

## Commands

```bash
pnpm tsx cli/index.ts --help      # List all CLI commands
pnpm tsx cli/index.ts <command>   # Direct CLI invocation
just cli <command>                # Preferred root just wrapper

just export-schema                # Run cli export-schema and format src/schemas/*.graphql
just recover-tokens ...           # Root recipe for cli recover-tokens
just query::actions ...           # Query Graph actions
just query::assets ...            # Export Envio asset addresses
just query::average-mau ...       # Query analytics quarterly MAU
just query::unique-txs ...        # Query analytics unique transactions
just query::usd-fees ...          # Query analytics USD fees
just envio::prices-check          # CLI prices-check
just envio::prices-sync           # CLI prices-sync
just envio::check-vendors [chain] # CLI check-vendors
just graph::revive ...            # CLI revive-graphs
```

Use `just --dry-run cli <args>` to inspect the private helper expansion.

## Architecture

- `index.ts` wires the root command and subcommands.
- `commands/<name>/command.ts` declares options and command metadata.
- `commands/<name>/run.ts` contains execution logic.
- `services/` provides shared Effect services.
- `utils/` holds path, vendor, auth, text, logger, and constant helpers.

## Code Style

- Keep command declarations thin; put behavior in `run.ts`.
- Route filesystem, HTTP, process, prompt, spinner, and logging work through `cli/services/` when a service already
  exists.
- Keep option names synced with just recipes and tests under `tests/cli/`.

## Contribution Workflow

Follow the root `AGENTS.md` validation flow. For CLI changes, run `na biome lint cli tests/cli` and `na tsc --noEmit`.
