/**
 * @file Base GraphQL Code Generator config
 * The CLI is run from the root of the project.
 * @see https://github.com/dotansimha/graphql-code-generator/discussions/10365
 */
import { type CodegenConfig } from "@graphql-codegen/cli";
import { type Indexer } from "../../exports";
import { getExperimentalEndpointURL } from "../../helpers";

const EXPORTS_DIR = "./src/exports";
const FRAGMENTS_DIR = `${EXPORTS_DIR}/fragments`;
const QUERIES_DIR = `${EXPORTS_DIR}/queries`;

type V = Indexer.Vendor;
type P = Indexer.Protocol;

function getDocumentsPaths(vendor: V, protocol: P) {
  const base = [
    `${FRAGMENTS_DIR}/common/asset.ts`,
    `${FRAGMENTS_DIR}/${protocol}/common.ts`,
    `${FRAGMENTS_DIR}/${protocol}/${vendor}.ts`,
    `${QUERIES_DIR}/${protocol}/${vendor}.ts`,
  ];

  if (protocol === "airdrops") {
    return base;
  }

  const fragments = [`${FRAGMENTS_DIR}/common/action.ts`, `${FRAGMENTS_DIR}/common/batch.ts`];
  const queries = [`${QUERIES_DIR}/common/streams/${vendor}.ts`];
  return [...base, ...fragments, ...queries];
}

function getOutPath(vendor: V, protocol: P) {
  return `${EXPORTS_DIR}/gql/${protocol}/${vendor}/`;
}

export function getConfig(vendor: V, protocol: P): CodegenConfig {
  return {
    documents: getDocumentsPaths(vendor, protocol),
    generates: {
      [getOutPath(vendor, protocol)]: {
        preset: "client",
        presetConfig: {
          fragmentMasking: false,
          gqlTagName: "gql",
          useTypeImports: true,
        },
      },
    },
    schema: [getExperimentalEndpointURL({ protocol, vendor })],
  };
}
