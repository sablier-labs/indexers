# Events

Defines which contract events are indexed by each protocol.

## Structure

- **`{protocol}.ts`** - Event definitions per protocol (airdrops, flow, lockup)
- **`common/`** - Shared events (ERC721, ERC20)
- **`index.ts`** - Exports `indexedEvents` map

## Event Definitions

Each protocol file exports `Model.EventMap`:

```ts
{
  [contractName]: {
    [version]: Model.Event[]
  }
}
```

**`Model.Event`** includes:

- **`contractName`** - Contract emitting the event
- **`eventName`** - Event name
- **`protocol`** - Protocol name (flow, lockup, airdrops)
- **`version`** - Contract version
- **`indexers`** - Which indexers handle this event (e.g., `["streams", "analytics"]`)

## Usage

Used by codegen to generate event handlers for Envio and Graph manifests.

The `indexers` array controls which indexers receive each event.
