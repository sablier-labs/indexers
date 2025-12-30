---
name: assemblyscript
description: This skill should be used when working with AssemblyScript code in the graph/ directory, writing subgraph mappings, event handlers, or store operations. Triggers: "AssemblyScript", "subgraph", "graph/", mapping handlers, BigInt operations, entity stores, The Graph indexer code.
---

# AssemblyScript for The Graph

The `graph/` directory uses AssemblyScript (not TypeScript) for The Graph subgraphs. AssemblyScript compiles to
WebAssembly and has critical differences from TypeScript.

## Critical Constraints

### No Closures

Array methods cannot capture outer variables:

```typescript
// WRONG - closure captures `targetId`
const index = items.findIndex((item) => item.id == targetId);

// CORRECT - use manual iteration
let index = -1;
for (let i = 0; i < items.length; i++) {
  if (items[i].id == targetId) {
    index = i;
    break;
  }
}
```

### BigInt Comparison

Use methods, not operators:

```typescript
import { ONE, ZERO } from "../common/constants";

// WRONG
if (amount > 0) { ... }
if (amount === ZERO) { ... }

// CORRECT
if (amount.gt(ZERO)) { ... }
if (amount.equals(ZERO)) { ... }
if (amount.lt(ONE)) { ... }
```

### String Comparison

Use `==` or the helper, never `===`:

```typescript
import { areStringsEqual } from "../common/strings";

// WRONG - strict equality compares object references
if (name === "linear") { ... }

// CORRECT
if (name == "linear") { ... }
if (areStringsEqual(name, "linear")) { ... }
```

### No Spread Operators

```typescript
// WRONG
const newObj = { ...oldObj, newField: value };

// CORRECT
const newObj = new MyType();
newObj.field1 = oldObj.field1;
newObj.field2 = oldObj.field2;
newObj.newField = value;
```

### No Nullish Coalescing or Optional Chaining

```typescript
// WRONG
const value = obj?.field ?? defaultValue;

// CORRECT
const value = obj !== null ? obj.field : defaultValue;
```

### Type Assertions

Use `changetype<T>()`, not `as T`:

```typescript
// WRONG
const addr = value as Address;

// CORRECT
const addr = changetype<Address>(value);
```

### Dependencies

Only `@graphprotocol/graph-ts` is allowed. No other npm packages.

## Common Patterns

### Error Handling with try\_\*()

Contract calls can revert. Use `try_` methods:

```typescript
const contract = ERC20.bind(address);
const decimals = contract.try_decimals();

if (decimals.reverted) {
  return ZERO;
}
return BigInt.fromI32(decimals.value);
```

### Entity Load/Save

```typescript
let asset = Entity.Asset.load(id);
if (asset === null) {
  asset = new Entity.Asset(id);
  asset.address = address;
  asset.chainId = chainId;
}
asset.symbol = symbol;
asset.save();
```

### Array Iteration

```typescript
// Process all items
for (let i = 0; i < segments.length; i++) {
  const segment = segments[i];
  // Process segment
}

// Find with condition
let found: Segment | null = null;
for (let i = 0; i < segments.length; i++) {
  if (segments[i].amount.gt(ZERO)) {
    found = segments[i];
    break;
  }
}
```

### Function Pointers (Generic Array Operations)

```typescript
function convertItems<T>(items: T[], getValue: (item: T) => BigInt): BigInt[] {
  const result: BigInt[] = [];
  for (let i = 0; i < items.length; i++) {
    result.push(getValue(items[i]));
  }
  return result;
}
```

## Project Utilities

Import with relative paths from your subgraph directory:

| Utility                       | Import                | Purpose                |
| ----------------------------- | --------------------- | ---------------------- |
| `ONE`, `ZERO`                 | `../common/constants` | BigInt constants       |
| `areStringsEqual()`           | `../common/strings`   | Safe string comparison |
| `logDebug/Error/Info/Warning` | `../common/logger`    | Prefixed logging       |
| `getDay()`                    | `../common/helpers`   | Timestamp to day       |
| `Id` namespace                | `../common/id`        | Entity ID generation   |

### Id Namespace Usage

```typescript
import { Id } from "../common/id";

const streamId = Id.stream(contractAddress, tokenId);
const assetId = Id.asset(chainId, assetAddress);
const actionId = Id.action(event, contractAddress, chainId);
```
