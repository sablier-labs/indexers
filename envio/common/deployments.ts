import { type Sablier, sablier } from "sablier";
import { convertToIndexed } from "../../contracts";
import type { Types } from "../../lib/types";
import type { Envio } from "./bindings";
import { CriticalError } from "./errors";

export function getContract(protocol: Types.Protocol, chainId: number, contractAddress: Envio.Address): Types.Contract {
  const lowercasedAddress = contractAddress.toLowerCase() as Sablier.Address;
  const contract = sablier.contracts.get({ chainId, contractAddress: lowercasedAddress, protocol });
  if (!contract) {
    throw new CriticalError.ContractNotFound(protocol, chainId, contractAddress);
  }
  if (!contract.alias) {
    throw new CriticalError.AliasNotFound(protocol, chainId, contractAddress);
  }
  return convertToIndexed(contract);
}

export function getContractAlias(protocol: Types.Protocol, chainId: number, contractAddress: Envio.Address) {
  const contract = getContract(protocol, chainId, contractAddress);
  if (!contract.alias) {
    throw new CriticalError.AliasNotFound(protocol, chainId, contractAddress);
  }
  return contract.alias;
}

export function getContractVersion(protocol: Types.Protocol, chainId: number, contractAddress: Envio.Address) {
  const contract = getContract(protocol, chainId, contractAddress);
  return contract.version;
}
