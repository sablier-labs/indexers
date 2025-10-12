# CLI Tools

Internal CLI for Sablier Indexers development and deployment operations.

## Architecture

**Framework**: Commander.js

**Structure**:

- `cli/index.ts` - Entry point, command registration
- `cli/commands/` - Individual command implementations
- `cli/helpers.ts` - Shared utilities (createBaseCmd, parseIndexerOpt, etc.)
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
- `graph-deploy-all` - Deploy all indexers to The Graph
- `price-data-check` - Validate price data cache
- `price-data-sync` - Sync price data from @sablier/price-data

## Adding New Commands

1. Create `cli/commands/your-command.ts`:

   ```typescript
   import type { Command } from "commander";
   import * as helpers from "../helpers";

   function createYourCommand(): Command {
     const command = helpers.createBaseCmd("Description");

     // Add options
     command.option("-f, --flag <value>", "description");

     command.action(async (options) => {
       // Implementation
     });

     return command;
   }

   export const yourCmd = createYourCommand();
   ```

2. Register in `cli/index.ts`:

   ```typescript
   import { yourCmd } from "./commands/your-command";
   program.addCommand(yourCmd.name("your-command"));
   ```

3. (Optional) Add justfile recipe:
   ```just
   @your-command:
       just cli your-command
   ```
