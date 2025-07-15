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
import { sepolia } from "sablier/dist/chains";
import { getIndexer, type Indexer } from ".";

/**
 * The experimental indexers run on Sepolia.
 */
export function getExperimentalURL(opts: { protocol: Indexer.Protocol; vendor: Indexer.Vendor }): string {
  const { protocol, vendor } = opts;
  if (vendor === "envio") {
    const id = {
      airdrops: "65412b7", // https://envio.dev/app/sablier-labs/merkle-envio
      flow: "7baf60e", // https://envio.dev/app/sablier-labs/flow-envio
      lockup: "27fe0c4", // https://envio.dev/app/sablier-labs/lockup-envio
    };
    return `https://indexer.hyperindex.xyz/${id[protocol]}/v1/graphql`;
  }

  const indexer = getIndexer({ chainId: sepolia.id, protocol, vendor: "graph" });
  if (!indexer?.testingURL) {
    throw new Error(`Sepolia Indexer not found for protocol ${protocol}`);
  }
  return indexer.testingURL.replace("sepolia", "experimental");
}
