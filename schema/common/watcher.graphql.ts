import { gql } from "graphql-tag";
import type { Indexer } from "../../src/types";

export function getWatcherDefs(indexer: Indexer.Name) {
  const counterField = indexer === "airdrops" ? "campaign" : "stream";

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
