import type { Sablier } from "sablier";
import { sablier } from "sablier";
import type { Address } from "viem";
import type { Indexer, Model } from "../../src/types.js";
import { CriticalError } from "./errors.js";

/**
 * Inlined from `contracts/index.ts` to avoid a cross-boundary ESM/CJS import.
 * Envio's ts-node runtime transpiles to CJS, but `contracts/` lives under the
 * root `package.json` which declares `"type": "module"`.
 */
function convertToIndexed(contract: Sablier.Contract, version: Model.Version): Model.Contract {
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
