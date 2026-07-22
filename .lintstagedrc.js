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
const ENVIO_CONFIG_OUTPUTS = [
  "envio/airdrops/config.yaml",
  "envio/streams/config.yaml",
];

const NON_SCHEMA_FILES = `!(schema/**/*).${BIOME_EXTENSIONS}`;
const SCHEMA_SOURCES = `schema/**/*.${BIOME_EXTENSIONS}`;
const ENVIO_CONFIG_SOURCES =
  "{events/**/*.ts,contracts/**/*.ts,src/indexers/envio.ts}";

const quote = (file) => `'${file.replaceAll("'", "'\\''")}'`;
const biomeLint = (files) => `na biome lint ${files.map(quote).join(" ")}`;
const biomeLintSchema = (files) => biomeLint([...SCHEMA_OUTPUTS, ...files]);
const biomeLintNonSchema = (files) => {
  const filesToLint = files.filter(
    (file) => !SCHEMA_OUTPUTS.some((output) => file.endsWith(output))
  );
  return filesToLint.length > 0 ? biomeLint(filesToLint) : [];
};
const verifyEnvioConfig = () =>
  `bash .github/scripts/verify-no-diff.sh ${quote(
    "Envio config files are out of sync. Run 'just codegen::envio-config all' and stage the result."
  )} ${quote("Envio config diff")} ${ENVIO_CONFIG_OUTPUTS.map(quote).join(" ")}`;

const config = {
  [SCHEMA_SOURCES]: [
    () => "just codegen::schema all all",
    () => "just export-schema",
    biomeLintSchema,
  ],
  [ENVIO_CONFIG_SOURCES]: [
    () => "just codegen::envio-config all",
    verifyEnvioConfig,
  ],
  [NON_SCHEMA_FILES]: biomeLintNonSchema,
  "*.{md,yaml,yml}": "pnpm prettier --cache --write",
};

export default config;
