import { sablier } from "sablier";
import { convertToIndexed } from "../../contracts";
import type { Types } from "../../lib/types";
import type { Indexer } from "../../src/types";
import type { Envio } from "./bindings";
import { CriticalError } from "./errors";

export function getContract(
  protocol: Indexer.Protocol,
  chainId: number,
  contractAddress: Envio.Address,
): Types.Contract {
  const contract = sablier.contracts.get({ chainId, contractAddress, protocol });
  if (!contract) {
    throw new CriticalError.ContractNotFound(protocol, chainId, contractAddress);
  }
  if (!contract.alias) {
    throw new CriticalError.ContractAliasNotFound(protocol, chainId, contractAddress);
  }
  if (!contract.version) {
    throw new CriticalError.ContractVersionNotFound(protocol, chainId, contractAddress);
  }
  return convertToIndexed(contract, contract.version);
}

export function getContractAlias(protocol: Indexer.Protocol, chainId: number, contractAddress: Envio.Address) {
  const contract = getContract(protocol, chainId, contractAddress);
  if (!contract.alias) {
    throw new CriticalError.ContractAliasNotFound(protocol, chainId, contractAddress);
  }
  return contract.alias;
}

export function getContractVersion(protocol: Indexer.Protocol, chainId: number, contractAddress: Envio.Address) {
  const contract = getContract(protocol, chainId, contractAddress);
  if (!contract.version) {
    throw new CriticalError.ContractVersionNotFound(protocol, chainId, contractAddress);
  }
  return contract.version;
}
