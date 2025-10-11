import type { Indexer } from "../../../src";
import type { Envio } from "../bindings";
import { getContract } from "../deployments";
import type { CommonEntities } from "../entities";
import { Id } from "../id";

type ContractContext = { Contract: { set: (contract: CommonEntities.Contract) => void } };

export function create(
  context: ContractContext,
  event: { chainId: number; srcAddress: Envio.Address },
  protocol: Indexer.Protocol,
): CommonEntities.Contract {
  const contractMetadata = getContract(protocol, event.chainId, event.srcAddress);

  const contract: CommonEntities.Contract = {
    address: contractMetadata.address.toLowerCase(),
    alias: contractMetadata.alias,
    category: contractMetadata.protocol || "",
    chainId: BigInt(event.chainId),
    id: Id.contract(event.chainId, event.srcAddress),
  };

  context.Contract.set(contract);
  return contract;
}
