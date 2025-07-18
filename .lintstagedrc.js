/**
 * @type {import("lint-staged").Configuration}
 */
module.exports = {
  "*.{graphql,js,json,jsonc,ts}": "pnpm biome check --write",
  "*.{js,ts}": "pnpm biome lint --unsafe --write --only correctness/noUnusedImports",
  "*.{md,yaml,yml}": "pnpm prettier --cache --write",
  "src/exports/schemas/*.graphql": (_stagedFiles) => {
    const codegenSchemas = "just codegen-schema envio all";
    const exportSchemas = "just export-schema";
    return [codegenSchemas, exportSchemas];
  },
};
