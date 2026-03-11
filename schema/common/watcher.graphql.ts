import { gql } from "graphql-tag";
import type { Indexer } from "../../src/types.js";

export function getWatcherDefs(indexer: Indexer.Name) {
  if (indexer === "streams") {
    return gql`
      type Watcher @entity(immutable: false) {
        """
        The chain ID. There is one watcher per subgraph.
        """
        id: String!

        """
        Alias for id.
        """
        chainId: BigInt!

        """
        Global counter for Flow actions.
        """
        flowActionCounter: BigInt!

        """
        Global counter for Flow streams.
        """
        flowStreamCounter: BigInt!

        """
        Global counter for Lockup actions.
        """
        lockupActionCounter: BigInt!

        """
        Global counter for Lockup streams.
        """
        lockupStreamCounter: BigInt!
      }
    `;
  }

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
