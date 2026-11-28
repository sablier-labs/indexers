# Envio Airdrops

Public Envio indexer for Sablier airdrop campaigns. Its `airdrops.graphql` is generated from `schema/`.

For each versioned factory contract, add the TypeScript entry module at the `handler` path in the generated
`config.yaml`. Envio imports this module at startup. Register handlers directly in the entry module or import modules
that register them. For example, the v3.0 Merkle Instant factory entry module imports its handler registration from a
subdirectory.

```text
mappings/v3.0/SablierFactoryMerkleInstant.ts
mappings/v3.0/SablierFactoryMerkleInstant/create-instant.ts
```

For linear and tranched campaign creation, pass the factory's Airdrops version to `isOfficialLockup`. In
`contractRegister`, check the Lockup before registering the campaign. In the creation handler, check it before
preloading entities so rejected events do not advance campaign or action counters.
