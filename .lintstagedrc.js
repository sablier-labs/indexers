/**
 * @type {import("lint-staged").Configuration}
 */
const BIOME_CHECK = "pnpm biome check --no-errors-on-unmatched --write";
const BIOME_LINT_UNUSED_IMPORTS =
  "pnpm biome lint --no-errors-on-unmatched --unsafe --write --only correctness/noUnusedImports";

const NON_SCHEMA_FILES = "!(schema/**/*).{graphql,js,json,jsonc,ts}";
const NON_SCHEMA_JS_TS = "!(schema/**/*).{js,ts}";
const SCHEMA_SOURCES = "schema/**/*.{graphql,ts}";

const config = {
  [NON_SCHEMA_FILES]: BIOME_CHECK,
  [NON_SCHEMA_JS_TS]: BIOME_LINT_UNUSED_IMPORTS,
  "*.{md,yaml,yml}": "pnpm prettier --cache --write",
  [SCHEMA_SOURCES]: [
    BIOME_CHECK,
    BIOME_LINT_UNUSED_IMPORTS,
    () => "just codegen::schema all all",
    () => "just export-schema",
  ],
};

export default config;
