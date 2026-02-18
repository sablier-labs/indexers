import type { Sablier } from "sablier";
import type { Indexer } from "../src/index.js";
import type { Model } from "../src/types.js";
import { airdropsContracts } from "./airdrops.js";
import { flowContracts } from "./flow.js";
import { lockupContracts } from "./lockup.js";

type CS = Model.ContractSource<Sablier.Version>;

export const indexedContracts: Model.ProtocolMap<CS[]> = {
  airdrops: airdropsContracts,
  flow: flowContracts,
  lockup: lockupContracts,
};

/**
 * This function is called from the Envio indexer so we should not use the Winston logger.
 */
export function convertToIndexed(
  contract: Sablier.Contract,
  version: Model.Version
): Model.Contract {
  return {
    address: contract.address.toLowerCase() as Sablier.Address,
    alias: contract.alias ?? "",
    block: contract.block ?? 0,
    chainId: contract.chainId,
    name: contract.name,
    protocol: contract.protocol as Indexer.Protocol,
    version,
  };
}
