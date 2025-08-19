# Codebase Architecture Patterns - Discovered Aug 25, 2025

## Type System Architecture
The Sablier indexers use a **dual-type architecture**:

### 1. Common Entities (`CommonEntities.*`)
- **Location**: `envio/common/entities.ts`
- **Purpose**: Shared types across all indexers (airdrops, flow, lockup, analytics)
- **Examples**: `CommonEntities.Asset`, `CommonEntities.StreamWatcher`, `CommonEntities.StreamAction`
- **Usage**: Created by `CommonStore.*` functions

### 2. Protocol-Specific Entities (`Entity.*`)
- **Location**: Generated bindings in each indexer's `bindings.ts`
- **Purpose**: Protocol-specific types with indexer-specific fields
- **Examples**: `Entity.Asset`, `Entity.Watcher`, `Entity.Stream`
- **Usage**: Expected by protocol-specific helper types like `Params.CreateEntities`

### Type Bridge Pattern
When common store functions create entities for protocol use:
```typescript
// Pattern: Cast common entities to protocol entities
asset: asset ?? (CommonStore.Asset.create(...) as Entity.Asset)
```

## Store Architecture
Two-tier store system:

### 1. CommonStore (`envio/common/store/`)
- **Entities**: Asset, Watcher, Action
- **Scope**: Cross-protocol shared functionality
- **Returns**: `CommonEntities.*` types

### 2. Protocol Store (`envio/{protocol}/store/`)
- **Entities**: Protocol-specific (Batch, Batcher, Stream, Segment, Tranche)
- **Scope**: Protocol-specific business logic
- **Returns**: `Entity.*` types

## Code Generation Strategy
- **GraphQL Schema** → **Envio Config** → **TypeScript Bindings**
- **Bi-directional**: Both common and protocol-specific types are generated
- **Consistency**: Type casting bridges the gap between generated types

## Quality Implications
- **Pros**: Clear separation of concerns, reusable common functionality
- **Cons**: Type casting required, potential for drift between type systems
- **Maintenance**: Changes to common types may require protocol-specific casts

## Related Files
- `envio/common/entities.ts` - Common type definitions
- `envio/{protocol}/bindings.ts` - Protocol entity namespace exports
- `envio/{protocol}/helpers/types.ts` - Protocol parameter types
- `envio/common/store/` - Common store implementations
- `envio/{protocol}/store/` - Protocol store implementations