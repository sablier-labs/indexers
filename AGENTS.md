# Sablier Indexers

This repository indexes Sablier contract events for Envio and The Graph. Public indexers are `airdrops` and `streams`;
`analytics` is private and Envio-only.

Prefer `just` recipes and inspect them before changing flags or running code generation or deployment. Keep `.npmrc` for
the Envio codegen install workaround and `pnpm-workspace.yaml` for pnpm 11 settings. Preserve their duplicated
`onlyBuiltDependencies` allowlist until Envio codegen has been re-verified. `just ci-run <recipe>` provides CI-friendly
command logging.

## Validation

For docs-only edits, run `just prettier-check <changed docs>`. For changed JS, TS, JSON, CSS, or GraphQL files, run
`na biome lint <explicit changed-file paths>` regardless of file count.

For source or generated-code changes, type-check the changed scope: `cli/`, `contracts/`, `events/`, `schema/`, `src/`,
and `tests/` use `na tsc --noEmit`; `envio/` uses `just envio::type-check`; `graph/` uses `just graph::build <indexer>`
(or `just graph::build-all`).

When `events/`, `contracts/`, or `src/indexers/envio.ts` changes, run `just codegen::envio-config all` and inspect the
tracked public configs for unexpected changes.

## Codegen

`just codegen::envio <indexer>` runs schema generation, config generation, then bindings;
`just codegen::graph <indexer>` runs schema generation, manifest generation, then bindings. Generated Envio metadata
lives in ignored `envio/<indexer>/.envio/types.d.ts` and `envio/<indexer>/envio-env.d.ts`; regenerate it before Envio
type-checking when it is absent or stale.

Regenerate bindings after modifying `schema/` or GraphQL files, updating `cli/commands/codegen/`, or bumping `envio`,
`@graphprotocol/graph-ts`, or `@graphprotocol/graph-cli`.

`just codegen::schema <vendor> <indexer>` always follows its generator with
`just --quiet biome-write "envio/**/*.graphql"`. This applies to every vendor and indexer, including Graph generation
and analytics, whose source-schema generation is skipped. Snapshot the Envio GraphQL paths before this shared-tree
recipe for scope accounting and to attribute its resulting diffs; the formatter still processes concurrent input.

Public source schemas are in `schema/` for airdrops and streams, while `envio/analytics/analytics.graphql` is maintained
directly. The tracked public Envio outputs are `envio/airdrops/{config.yaml,airdrops.graphql}` and
`envio/streams/{config.yaml,streams.graphql}`; CI regenerates Envio and verifies precisely those four files.
`just export-schema` writes the tracked package exports in `src/schemas/`. GraphQL schema outputs under `graph/` are
ignored. `events/`, `contracts/`, and `src/indexers/envio.ts` drive Envio configs; changing `abi/*.json` does not.

A Husky pre-commit hook runs `lint-staged`. Schema-source changes regenerate all vendor schemas and package exports,
then lint their outputs; config-source changes run `just codegen::envio-config all` and verify the tracked public Envio
configs. If the hook reports drift, rerun the applicable generation command and stage its expected tracked output.

## Schema Rules

Edit source schemas, then use `just codegen::schema <vendor> <indexer>` for vendor outputs and `just export-schema` for
package exports. Do not edit generated public vendor schemas or package exports directly; analytics is the direct-schema
exception above.

## Changelog

`CHANGELOG.md` covers the published JavaScript package surface in `dist/**`: public API changes, shipped runtime
behavior, and `dependencies` or `peerDependencies` version changes. Do not add GraphQL schema, test, CI, or development
tooling changes.

## Conventions

Do not use TypeScript path aliases: they break Envio compatibility. Treat `graph/` as AssemblyScript and follow
`graph/AGENTS.md` for mapping changes. `just envio::deploy` force-pushes a deployment branch.

Use Conventional Commit subjects such as `feat:`, `fix:`, `chore:`, `docs:`, or `refactor(scope):`.
