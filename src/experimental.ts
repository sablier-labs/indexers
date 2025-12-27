/**
 * @file The experimental indexers are the staging environment where we test new
 * features before they are released. They run on the Sepolia testnet.
 *
 * The experimental indexers are used for generating the GraphQL bindings in:
 * @see {@link file://./gql/flow/envio/gql.ts}
 * @see {@link file://./gql/flow/graph/gql.ts}
 *
 * As well as for the equivalence tests in:
 * @see {@link file://./../tests/vendors/equivalence/create-test.ts}
 */
import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "./indexers/getters";
import type { Indexer } from "./types";

/**
 * The experimental indexers run on Sepolia.
 */
export function getExperimentalURL(opts: {
  protocol: Indexer.Protocol;
  vendor: Indexer.Vendor;
}): string {
  const { protocol, vendor } = opts;
  if (vendor === "envio") {
    const id = {
      airdrops: "508d217", // https://envio.dev/app/sablier-labs/merkle-envio
      flow: "3b4ea6b", // https://envio.dev/app/sablier-labs/flow-envio
      lockup: "53b7e25", // https://envio.dev/app/sablier-labs/lockup-envio
    };
    return `https://indexer.hyperindex.xyz/${id[protocol]}/v1/graphql`;
  }

  const indexer = getIndexer({ chainId: sepolia.id, protocol, vendor: "graph" });
  if (!indexer?.testingURL) {
    throw new Error(`Sepolia Indexer not found for protocol ${protocol}`);
  }
  return indexer.testingURL.replace("sepolia", "experimental");
}
