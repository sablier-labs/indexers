# CLI Tools

Internal Effect CLI for development, codegen, querying, and deployment helpers. Prefer the root `just cli <command>`
wrapper; `pnpm tsx cli/index.ts <command>` remains available for direct invocation.

## Structure

- `index.ts` wires the root command and subcommands.
- `commands/<name>/command.ts` declares options and command metadata; `run.ts` contains behavior.
- `services/` owns shared filesystem, HTTP, process, prompt, spinner, logging, and environment effects.

Keep declarations thin, use an existing CLI service for its capability, and keep option names aligned with the matching
just recipes and `tests/cli/`.
