import path, { join } from "node:path";
import appRoot from "app-root-path";
import * as fs from "fs-extra";
import type { Indexer } from "../src";
import { getGraphChainSlug } from "../src/indexers/graph";
import type { Types } from "./types";

export const ROOT_DIR = appRoot.path;
export const ABI_DIR = join(ROOT_DIR, "abi");
export const ENVIO_DIR = join(ROOT_DIR, "envio");
export const EXPORTS_DIR = join(ROOT_DIR, "src");
export const GRAPH_DIR = join(ROOT_DIR, "graph");
export const SCHEMA_DIR = join(ROOT_DIR, "schema");

type I = Indexer.Name;
type V = Indexer.Vendor;

const paths = {
  abi: (contractName: string, indexer?: I, version?: Types.Version): string => {
    if (indexer && version) {
      return join(ABI_DIR, `${indexer}-${version}`, `${contractName}.json`);
    }
    return join(ABI_DIR, `${contractName}.json`);
  },
  envio: {
    config: (indexer: I): string => join(ENVIO_DIR, indexer, "config.yaml"),
    schema: (indexer: I): string => join(ENVIO_DIR, indexer, "schema.graphql"),
  },
  exports: {
    schema: (indexer: I): string => join(EXPORTS_DIR, "schemas", `${indexer}.graphql`),
    schemas: (): string => join(EXPORTS_DIR, "schemas"),
  },
  graph: {
    manifest: (indexer: I, chainId: number): string => {
      const chainSlug = getGraphChainSlug(chainId);
      return join(GRAPH_DIR, indexer, "manifests", `${chainSlug}.yaml`);
    },
    manifests: (indexer: I): string => join(GRAPH_DIR, indexer, "manifests"),
    schema: (indexer: I): string => join(GRAPH_DIR, indexer, "schema.graphql"),
  },
  schema: (vendor: V, indexer: I): string => join(ROOT_DIR, vendor, indexer, "schema.graphql"),
};

export default paths;

/**
 * Returns the relative path from the directory of the start path to the end path.
 * Helpful so that we don't hardcode the paths in the codebase.
 * @param from The path to the directory to start from
 * @param to The path to the directory or file to end at
 * @returns The relative path from the start path to the end path
 */
export function getRelativePath(from: string, to: string): string {
  // Use the directory of the `from` path if it's a file.
  let fromDir = from;
  if (fs.lstatSync(from).isFile()) {
    fromDir = path.dirname(from);
  }
  return path.relative(fromDir, to);
}
