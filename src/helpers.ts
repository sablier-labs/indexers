import { chains } from "sablier";
import { getIndexer, type Indexer } from "./exports";
import type { Types } from "./types";

/**
 * The experimental indexers run on Sepolia.
 */
export function getExperimentalEndpointURL(opts: { protocol: Indexer.Protocol; vendor: Indexer.Vendor }): string {
  const { protocol, vendor } = opts;
  if (vendor === "envio") {
    const ids = {
      airdrops: "f2f8992",
      flow: "8c212f9",
      lockup: "6cb1733",
    };
    return `https://indexer.hyperindex.xyz/${ids[protocol]}/v1/graphql`;
  }

  const indexer = getIndexer({ chainId: chains.sepolia.id, protocol, vendor: "graph" });
  if (!indexer?.testingURL) {
    throw new Error(`Indexer not found for protocol ${protocol} and vendor ${vendor}`);
  }

  // TODO: remove this once The Graph fixes their subgraph
  // https://thegraph.com/studio/subgraph/sablier-lockup-experimental/endpoints
  if (protocol === "lockup") {
    return "https://api.studio.thegraph.com/query/112500/sablier-lockup-experimental/v2.0--v1.0.0-beta.11";
  }

  return indexer.testingURL.replace("sepolia", "experimental");
}

/**
 * Sanitizes the name of a contract to be used in a YAML file.
 * @param name The name of the contract.
 * @param version The version of the contract.
 * @returns The sanitized name of the contract.
 */
export function sanitizeContractName(contractName: string, version: Types.Version): string {
  return `${contractName}_${sanitizeVersion(version)}`; // e.g. SablierLockup_v2_0
}

/**
 * Converts the version from v1.2 to v1_2.
 * @param version The version to sanitize.
 * @returns The sanitized version.
 */
export function sanitizeVersion(version: Types.Version): string {
  return version.replace(".", "_");
}
