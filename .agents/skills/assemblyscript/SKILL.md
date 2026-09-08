---
name: assemblyscript
description: Use when maintaining AssemblyScript mappings, helpers, or stores under graph/ for The Graph subgraphs.
---

# AssemblyScript for The Graph

This guidance applies to hand-maintained code under `graph/`: mappings, helpers, and stores. Route generated-source
ownership, schema changes, Graph recipes, and version additions through [graph/AGENTS.md](../../../graph/AGENTS.md).
Apply it within the requested scope and keep review work read-only.

## Pinned Compiler Constraints

- `@graphprotocol/graph-ts` is the only runtime dependency.
- Array callbacks cannot capture outer variables; use a manual loop when they need surrounding state.
- Compare `BigInt` values with `.gt()`, `.equals()`, and `.lt()`, using constants from
  [graph/common/constants.ts](../../../graph/common/constants.ts).
- The pinned Graph compiler uses AssemblyScript 0.19 semantics: compare strings with `==` or `areStringsEqual()`, never
  `===`. See [graph/common/strings.ts](../../../graph/common/strings.ts).
- Do not use object spread, optional chaining, or nullish coalescing.
- Use `try_*()` contract calls and handle a reverted result before reading `value`.

Use ordinary `as` conversions for compatible types and contextual object casts, as in
[entity-campaign.ts](../../../graph/airdrops/store/entity-campaign.ts) and
[entity-stream.ts](../../../graph/streams/store/lockup/entity-stream.ts). Reserve `changetype<T>()` for an intentional
representation-compatible reinterpretation, such as generated store loads in
[graph/common/bindings/erc20/schema.ts](../../../graph/common/bindings/erc20/schema.ts).

## Repository Utilities

Paths in this table are repository-relative. Match each import to the caller’s directory rather than copying it
unchanged.

| Utility                                         | Source                                                          | Example caller import                                                    |
| ----------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `ONE`, `ZERO`                                   | [graph/common/constants.ts](../../../graph/common/constants.ts) | `graph/airdrops/store/entity-campaign.ts`: `../../common/constants`      |
| `areStringsEqual()`                             | [graph/common/strings.ts](../../../graph/common/strings.ts)     | `graph/streams/store/lockup/entity-stream.ts`: `../../../common/strings` |
| `logDebug`, `logError`, `logInfo`, `logWarning` | [graph/common/logger.ts](../../../graph/common/logger.ts)       | `graph/airdrops/store/entity-campaign.ts`: `../../common/logger`         |
| `getDay()`                                      | [graph/common/helpers.ts](../../../graph/common/helpers.ts)     | `graph/airdrops/store/entity-activity.ts`: `../../common/helpers`        |
| `Id`                                            | [graph/common/id.ts](../../../graph/common/id.ts)               | `graph/airdrops/store/entity-asset.ts`: `../../common/id`                |

`Id` derives chain context itself. Use `Id.asset(assetAddress)`, `Id.action(event)`, and
`Id.stream(contractAddress, tokenId)`.

## Asset Creation Pattern

Reuse the subgraph's `getOrCreateAsset(address)` helper. When editing it, preserve the required-field initialization
before saving, as in [graph/airdrops/store/entity-asset.ts](../../../graph/airdrops/store/entity-asset.ts) (identical in
Streams):

```typescript
const id = Id.asset(address);
let asset = Entity.Asset.load(id);

if (asset === null) {
  asset = new Entity.Asset(id);
  asset.address = address;
  asset.chainId = readChainId();
  asset.decimals = fetchAssetDecimals(address);
  asset.name = fetchAssetName(address);
  asset.symbol = fetchAssetSymbol(address);
  asset.save();
}
```

From `graph/airdrops/store/entity-asset.ts`, import the fetch helpers from `../../common/bindings/fetch`, `readChainId`
from `../../common/context`, `Id` from `../../common/id`, and `Entity` from `../bindings/schema`.

## Completion Evidence

For a maintained source change, use the affected target’s Graph build as completion evidence, following
[graph/AGENTS.md](../../../graph/AGENTS.md). For review or documentation work, statically check referenced declarations
and documentation paths without running generation.
