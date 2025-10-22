/**
 * @file Base GraphQL Code Generator config
 * The CLI is run from the root of the project.
 *
 * @see https://github.com/dotansimha/graphql-code-generator/discussions/10365
 */

import { join } from "node:path";
import type { CodegenConfig } from "@graphql-codegen/cli";
import { sepolia } from "sablier/dist/chains";
import { EXPORTS_DIR } from "../../../../lib/paths";
import { getIndexer } from "../../../../src/indexers/getters";
import type { Indexer } from "../../../../src/types";

const FRAGMENTS_DIR = join(EXPORTS_DIR, "fragments");
const QUERIES_DIR = join(EXPORTS_DIR, "queries");

type V = Indexer.Vendor;
type P = Indexer.Protocol;

function getDocumentsPaths(vendor: V, protocol: P) {
  const base = [
    join(FRAGMENTS_DIR, "common", "asset.ts"),
    join(FRAGMENTS_DIR, protocol, "common.ts"),
    join(FRAGMENTS_DIR, protocol, `${vendor}.ts`),
    join(QUERIES_DIR, protocol, `${vendor}.ts`),
  ];

  if (protocol === "airdrops") {
    return base;
  }

  const fragments = [join(FRAGMENTS_DIR, "common", "action.ts"), join(FRAGMENTS_DIR, "common", "batch.ts")];
  const queries = [
    join(QUERIES_DIR, "common", "streams", `${vendor}.ts`),
    join(QUERIES_DIR, "common", "actions", `${vendor}.ts`),
  ];
  return [...base, ...fragments, ...queries];
}

function getOutPath(vendor: V, protocol: P) {
  return `${EXPORTS_DIR}/gql/${protocol}/${vendor}/`;
}

export function getConfig(vendor: V, protocol: P): CodegenConfig {
  const indexer = getIndexer({ chainId: sepolia.id, protocol, vendor });
  if (!indexer || !indexer.endpoint.url || !indexer.testingURL) {
    throw new Error(`Indexer not found for protocol ${protocol} and vendor ${vendor}`);
  }
  const url = vendor === "envio" ? indexer.endpoint.url : indexer.testingURL;
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
    schema: [url],
  };
}
