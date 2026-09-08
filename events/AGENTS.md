# Events

`events/` defines the protocol event maps consumed by Envio config and Graph manifest generation. Protocol files export
`Model.EventMap`; `index.ts` exports `indexedEvents`, and `common/` currently contains shared ERC-721 definitions.

Keep event names aligned with the `sablier` ABI and use each event's `indexers` list to select targets, for example
`["streams", "analytics"]`. Regenerate affected vendor artifacts after an event-map change, then use the root validation
routing.
