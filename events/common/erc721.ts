/**
 * Configuration mapping for ERC721 standard events to their handler functions.
 * This file defines the event signatures and their corresponding handler names
 * that will be used by the subgraph to process ERC721 events.
 *
 * @see https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.3.0/contracts/token/ERC721/ERC721.sol
 */
import type { Sablier } from "sablier";
import type { Types } from "../../lib/types";
import type { Indexer } from "../../src";

export function erc721(
  protocol: Indexer.Protocol,
  version: Sablier.Version.Lockup,
  contractName: string,
): Types.Event[] {
  return [
    {
      contractName,
      eventName: "Approval",
      indexers: [protocol as Indexer.Name],
      protocol,
      version,
    },
    {
      contractName,
      eventName: "ApprovalForAll",
      indexers: [protocol as Indexer.Name],
      protocol,
      version,
    },
    {
      contractName,
      eventName: "Transfer",
      indexers: [protocol as Indexer.Name],
      protocol,
      version,
    },
  ];
}
