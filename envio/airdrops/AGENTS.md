# Envio Airdrops

Public Envio indexer for Sablier airdrop campaigns. Its `airdrops.graphql` is generated from `schema/`.

Each versioned mapping directory requires a wrapper `.ts` file for every factory contract alongside the factory's
handler subdirectory, for example:

```text
mappings/v3.0/SablierFactoryMerkleInstant.ts
mappings/v3.0/SablierFactoryMerkleInstant/create-instant.ts
```

The wrapper re-exports the handler. Generated `config.yaml` points to it and Envio imports it at startup, so add both
the wrapper and subdirectory when adding a factory contract version.
