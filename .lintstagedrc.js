/**
 * @type {import("lint-staged").Configuration}
 */
const BIOME_EXTENSIONS = "{css,graphql,js,jsx,json,jsonc,ts,tsx}";
const SCHEMA_OUTPUTS = [
  "envio/airdrops/airdrops.graphql",
  "envio/streams/streams.graphql",
  "graph/airdrops/airdrops.graphql",
  "graph/streams/streams.graphql",
  "src/schemas/airdrops.graphql",
  "src/schemas/streams.graphql",
];

const NON_SCHEMA_FILES = `!(schema/**/*).${BIOME_EXTENSIONS}`;
const SCHEMA_SOURCES = `schema/**/*.${BIOME_EXTENSIONS}`;

const quote = (file) => `'${file.replaceAll("'", "'\\''")}'`;
const biomeLint = (files) => `na biome lint ${files.map(quote).join(" ")}`;
const biomeLintSchema = (files) => biomeLint([...SCHEMA_OUTPUTS, ...files]);
const biomeLintNonSchema = (files) => {
  const filesToLint = files.filter(
    (file) => !SCHEMA_OUTPUTS.some((output) => file.endsWith(output))
  );
  return filesToLint.length > 0 ? biomeLint(filesToLint) : [];
};

const config = {
  [SCHEMA_SOURCES]: [
    () => "just codegen::schema all all",
    () => "just export-schema",
    biomeLintSchema,
  ],
  [NON_SCHEMA_FILES]: biomeLintNonSchema,
  "*.{md,yaml,yml}": "pnpm prettier --cache --write",
};

export default config;
