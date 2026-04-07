import { sablier } from "sablier";
import type { Address } from "viem";
import { convertToIndexed } from "../../contracts/index.js";
import type { Indexer, Model } from "../../src/types.js";
import { CriticalError } from "./errors.js";

export function getContract(
  protocol: Indexer.Protocol,
  chainId: number,
  contractAddress: Address
): Model.Contract {
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

export function getContractAlias(
  protocol: Indexer.Protocol,
  chainId: number,
  contractAddress: Address
) {
  const contract = getContract(protocol, chainId, contractAddress);
  if (!contract.alias) {
    throw new CriticalError.ContractAliasNotFound(protocol, chainId, contractAddress);
  }
  return contract.alias;
}

export function getContractVersion(
  protocol: Indexer.Protocol,
  chainId: number,
  contractAddress: Address
) {
  const contract = getContract(protocol, chainId, contractAddress);
  if (!contract.version) {
    throw new CriticalError.ContractVersionNotFound(protocol, chainId, contractAddress);
  }
  return contract.version;
}
