/**
 * @file The experimental indexers are the staging environment where we test new
 * features before they are released. They run on the Sepolia testnet.
 *
 * The experimental indexers are used for generating the GraphQL bindings in:
 * @see {@link file://./exports/gql/flow/envio/gql.ts}
 * @see {@link file://./exports/gql/flow/graph/gql.ts}
 *
 * As well as for the equivalence tests in:
 * @see {@link file://./../tests/cron/vendor-equivalence/equivalence.ts}
 */
import { chains } from "sablier";
import { getIndexer, type Indexer } from "./exports";

/**
 * The experimental indexers run on Sepolia.
 */
export function getExperimentalURL(opts: { protocol: Indexer.Protocol; vendor: Indexer.Vendor }): string {
  const { protocol, vendor } = opts;
  if (vendor === "envio") {
    const id = {
      airdrops: "a8a8b3c", // https://envio.dev/app/sablier-labs/merkle-envio
      flow: "3a1b56e", // https://envio.dev/app/sablier-labs/flow-envio
      lockup: "52da35e", // https://envio.dev/app/sablier-labs/lockup-envio
    };
    return `https://indexer.hyperindex.xyz/${id[protocol]}/v1/graphql`;
  }

  const indexer = getIndexer({ chainId: chains.sepolia.id, protocol, vendor: "graph" });
  if (!indexer?.testingURL) {
    throw new Error(`Sepolia Indexer not found for protocol ${protocol}`);
  }

  // TODO: remove this once The Graph fixes their subgraph
  // https://thegraph.com/studio/subgraph/sablier-lockup-experimental/endpoints
  if (protocol === "lockup") {
    return "https://api.studio.thegraph.com/query/112500/sablier-lockup-experimental/v2.0--v1.0.0-beta.14";
  }

  return indexer.testingURL.replace("sepolia", "experimental");
}
