# Code Style and Conventions

## Formatting & Linting
- **Primary Tool**: Biome (replaces ESLint + Prettier)
- **Config**: `biome.jsonc` extends `@sablier/devkit/biome`
- **Enforcement**: Husky pre-commit hooks + lint-staged

## TypeScript Standards
- **Config**: Extends `@sablier/devkit/tsconfig/base.json`
- **Target**: Modern ES with strict type checking
- **Exclude**: Auto-generated bindings (`envio/**/bindings/**/*`, `graph/**/*`)
- **Include**: All TypeScript files (`**/*.ts`)

## File Organization
- **Tests**: Colocated in `tests/` directories or `*.test.ts` pattern
- **Bindings**: Auto-generated, excluded from linting
- **Schemas**: GraphQL schemas in `schema/` directory
- **Configs**: YAML configs auto-generated from TypeScript

## Naming Conventions
- **Files**: kebab-case for configs, camelCase for TypeScript
- **Functions**: camelCase
- **Types**: PascalCase
- **Constants**: SCREAMING_SNAKE_CASE

## Special Rules
- **AssemblyScript** (Graph mappings): Relaxed rules for compatibility
  - No optional chaining
  - No import type enforcement  
  - Allow double equals
- **YAML Codegen**: Sorted keys disabled for generated configs
- **Generated Code**: Excluded from quality checks

## Documentation
- JSDoc for public APIs
- README updates for new features
- CHANGELOG.md maintenance required