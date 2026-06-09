# Events

Defines which contract events are indexed by each protocol and vendor target.

## Stack

- TypeScript event maps.
- Consumed by Envio config generation and Graph manifest generation.

## Commands

```bash
na biome lint events/**/*.ts  # Lint event definitions
na tsc --noEmit               # Type-check root TS project
just codegen::envio [indexer] # Regenerate Envio schema/config/bindings
just codegen::graph [indexer] # Regenerate Graph schema/manifests/bindings
just codegen::all             # Regenerate all indexer artifacts
```

## Architecture

- `{protocol}.ts` - Event definitions per protocol (`airdrops`, `flow`, `lockup`).
- `common/` - Shared ERC-20/ERC-721 event definitions.
- `index.ts` - Exports `indexedEvents`.

Each protocol file exports a `Model.EventMap`:

```ts
{
  [contractName]: {
    [version]: Model.Event[];
  };
}
```

`Model.Event` includes `contractName`, `eventName`, `protocol`, `version`, and `indexers`.

## Conventions

- Use `indexers` to decide which targets receive the event, e.g. `["streams", "analytics"]`.
- Keep event names aligned with ABI event names from `sablier`.
- Regenerate vendor artifacts after changing events; generated handlers/manifests depend on this map.

## Contribution Workflow

Follow the root `AGENTS.md` validation flow. Event-map changes usually require codegen verification.
