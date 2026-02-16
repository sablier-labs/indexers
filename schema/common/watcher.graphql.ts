import { gql } from "graphql-tag";
import type { Indexer } from "../../src/types.js";

type SchemaIndexer = Indexer.Name | "bob";

export function getWatcherDefs(indexer: SchemaIndexer) {
  let counterField = "stream";
  if (indexer === "airdrops") {
    counterField = "campaign";
  } else if (indexer === "bob") {
    counterField = "vault";
  }

  return gql`
    type Watcher @entity(immutable: false) {
      """
      The chain ID. There is one watcher per subgraph.
      """
      id: String!

      """
      Global counter for actions.
      """
      actionCounter: BigInt!

      """
      Alias for id.
      """
      chainId: BigInt!

      """
      Global counter.
      """
      ${counterField}Counter: BigInt!
    }
  `;
}
