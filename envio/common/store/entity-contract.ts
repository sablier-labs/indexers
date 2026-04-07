import type { Address } from "viem";
import type { Indexer } from "../../../src/types.js";
import { getContract } from "../deployments.js";
import type { CommonEntities } from "../entities.js";
import { Id } from "../id.js";

type ContractContext = { Contract: { set: (contract: CommonEntities.Contract) => void } };

export function create(
  context: ContractContext,
  event: { chainId: number; srcAddress: Address },
  protocol: Indexer.Protocol
): CommonEntities.Contract {
  const contractMetadata = getContract(protocol, event.chainId, event.srcAddress);

  const contract: CommonEntities.Contract = {
    address: contractMetadata.address,
    alias: contractMetadata.alias,
    category: contractMetadata.protocol || "",
    chainId: BigInt(event.chainId),
    id: Id.contract(event.chainId, event.srcAddress),
  };

  context.Contract.set(contract);
  return contract;
}
