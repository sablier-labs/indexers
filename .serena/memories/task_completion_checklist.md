# Task Completion Checklist

## Before Committing
1. **Code Quality**: `just full-check`
   - Biome linting and formatting
   - TypeScript compilation
   - Knip unused code detection

2. **Code Generation**: `just codegen` (if schemas/configs changed)
   - Update GraphQL bindings
   - Regenerate indexer configs
   - Update schema exports

3. **Testing**: `just test`
   - Unit tests pass
   - Integration tests (optional: `just test-vendors`)

4. **Build Verification**: `just build`
   - TypeScript compilation successful
   - All exports properly generated

## For New Features
1. **Schema Updates**: Run `just export-schema` if GraphQL schemas changed
2. **Indexer Updates**: Run `just codegen-indexers` if new contracts/mappings
3. **Documentation**: Update CHANGELOG.md
4. **Chain Support**: Update both envio.ts and graph.ts if adding new chains

## Git Workflow
1. **Husky Hooks**: Pre-commit automatically runs linting
2. **Lint-staged**: Automatically formats staged files
3. **Branch Strategy**: Feature branches → main
4. **PR Requirements**: Full check must pass

## Deployment Considerations
- **Envio**: Sync to `deployment/main` branch for auto-deployment
- **The Graph**: Manual deployment via `just deploy-all` with version labels
- **Version Format**: `v{PROTOCOL_VERSION}--v{SUBGRAPH_VERSION}`

## Quality Gates
- All tests passing (including vendor tests if applicable)
- No TypeScript errors
- No unused code (Knip check)
- Proper formatting (Biome)
- Updated documentation