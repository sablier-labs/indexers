import path, { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getGraphChainSlug } from "../src/indexers/graph.js";
import type { Indexer, Model } from "../src/types.js";

export const ROOT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
export const ABI_DIR = join(ROOT_DIR, "abi");
export const ENVIO_DIR = join(ROOT_DIR, "envio");
export const EXPORTS_DIR = join(ROOT_DIR, "src");
export const GRAPH_DIR = join(ROOT_DIR, "graph");
export const SCHEMA_DIR = join(ROOT_DIR, "schema");

export function getQueryAssetsDirectoryName(dateSegment: string): string {
  return `assets-${dateSegment}`;
}

type Target = Indexer.Target;
type GraphTarget = Indexer.GraphTarget;
type V = Indexer.Vendor;

const paths = {
  abi: (contractName: string, protocol?: Indexer.Protocol, version?: Model.Version): string => {
    if (contractName === "SablierComptroller" && version) {
      return join(
        ROOT_DIR,
        "node_modules",
        "sablier",
        "abi",
        "comptroller",
        version,
        `${contractName}.json`
      );
    }
    if (protocol && version) {
      // Use sablier package for Sablier contracts
      return join(
        ROOT_DIR,
        "node_modules",
        "sablier",
        "abi",
        protocol,
        version,
        `${contractName}.json`
      );
    }
    // Keep local path for non-Sablier contracts (ERC20, PRBProxy)
    return join(ABI_DIR, `${contractName}.json`);
  },
  envio: {
    config: (target: Target): string => join(ENVIO_DIR, target, "config.yaml"),
    schema: (target: Target): string => join(ENVIO_DIR, target, `${target}.graphql`),
  },
  exports: {
    schema: (target: GraphTarget): string => join(EXPORTS_DIR, "schemas", `${target}.graphql`),
    schemas: (): string => join(EXPORTS_DIR, "schemas"),
  },
  generated: {
    queryAssets: {
      dir: (dateSegment: string): string =>
        join(ROOT_DIR, "cli", "generated", getQueryAssetsDirectoryName(dateSegment)),
      file: (dateSegment: string, indexer: Indexer.IndexerKey, chainSlug: string): string =>
        join(
          ROOT_DIR,
          "cli",
          "generated",
          getQueryAssetsDirectoryName(dateSegment),
          indexer,
          `${chainSlug}.json`
        ),
      indexerDir: (dateSegment: string, indexer: Indexer.IndexerKey): string =>
        join(ROOT_DIR, "cli", "generated", getQueryAssetsDirectoryName(dateSegment), indexer),
    },
  },
  graph: {
    manifest: (target: GraphTarget, chainId: number): string => {
      const chainSlug = getGraphChainSlug(chainId);
      return join(GRAPH_DIR, target, "manifests", `${chainSlug}.yaml`);
    },
    manifests: (target: GraphTarget): string => join(GRAPH_DIR, target, "manifests"),
    schema: (target: GraphTarget): string => join(GRAPH_DIR, target, `${target}.graphql`),
  },
  schema: (vendor: V, target: GraphTarget): string =>
    join(ROOT_DIR, vendor, target, `${target}.graphql`),
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
  const fromDir = path.extname(from) === "" ? from : path.dirname(from);
  return path.relative(fromDir, to);
}
