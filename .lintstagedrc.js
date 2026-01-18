/**
 * @type {import("lint-staged").Configuration}
 */
const config = {
  "*.{graphql,js,json,jsonc,ts}": "pnpm biome check --no-errors-on-unmatched --write",
  "*.{js,ts}":
    "pnpm biome lint --no-errors-on-unmatched --unsafe --write --only correctness/noUnusedImports",
  "*.{md,yaml,yml}": "pnpm prettier --cache --write",
  "src/schemas/*.graphql": (_stagedFiles) => {
    const codegenSchemas = "just codegen-schema envio all";
    const exportSchemas = "just export-schema";
    return [codegenSchemas, exportSchemas];
  },
};

export default config;
