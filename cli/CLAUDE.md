# CLI Tools

Internal CLI for Sablier Indexers development and deployment operations.

## Architecture

**Framework**: @effect/cli (Effect-TS)

**Structure**:

- `cli/index.ts` - Entry point, command registration with @effect/cli
- `cli/commands/` - Individual command implementations using Effect patterns
- `cli/services/` - Service layers (http, filesystem, process, prompt, logging)
- `cli/errors.ts` - Tagged error definitions
- `cli/helpers.ts` - Shared utilities (parseIndexerOpt, dumpYAML, etc.)
- `cli/types.ts` - TypeScript types

**Invocation**:

- Direct: `pnpm tsx cli/index.ts <command>`
- Via justfile: `just cli <command>` (preferred)

**Command Groups**:

- `codegen` - Code generation (schema, envio-config, graph-manifest)
- `print` - Information display (chains)

**Standalone Commands**:

- `check-vendors` - Validate vendor configurations
- `export-schema` - Export GraphQL schemas
- `graph-deploy-all` - Deploy all indexers to The Graph (supports `--dry-run`)
- `prices-check` - Validate price data cache
- `prices-sync` - Sync price data from @sablier/price-data

## Adding New Commands

1. Create `cli/commands/your-command.ts`:

   ```typescript
   import { Command, Options } from "@effect/cli";
   import { Console, Effect } from "effect";

   export const yourCommand = Command.make(
     "your-command",
     {
       flag: Options.text("flag").pipe(Options.withAlias("f")),
     },
     ({ flag }) =>
       Effect.gen(function* () {
         // Implementation using Effect patterns
         yield* Console.log(`Flag value: ${flag}`);
       }),
   ).pipe(Command.withDescription("Description of your command"));
   ```

2. Register in `cli/index.ts`:

   ```typescript
   import { yourCommand } from "./commands/your-command";

   // Add to rootCommand subcommands array
   const rootCommand = Command.make("indexers-cli").pipe(
     Command.withSubcommands([
       // ... existing commands
       yourCommand,
     ]),
   );
   ```

3. (Optional) Add justfile recipe:
   ```just
   @your-command:
       just cli your-command
   ```

## Effect Patterns

Commands use Effect-TS patterns:

- `Effect.gen` for sequential effect composition
- `Console.log` for output (instead of console.log)
- `FileSystem.FileSystem` for file operations
- `HttpClient` for HTTP requests with automatic retry
- `CommandExecutor` for shell command execution
- Tagged errors from `cli/errors.ts` for typed error handling
