# Contracts

`contracts/` defines indexed Sablier contract sources for code generation. Each protocol file exports
`Model.ContractSource<Sablier.Version.*>[]`; keep names aligned with the `sablier` ABI names and versions.

Set `isTemplate` for factory-created contracts so codegen emits dynamic data-source behavior. After contract changes,
regenerate the affected Envio configs and Graph manifests, then use the root validation routing.
