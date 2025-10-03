import { ContractFunctionExecutionError } from "viem";
import type { Indexer } from "../../src/types";

export namespace CriticalError {
  export class AliasNotFound extends Error {
    constructor(protocol: Indexer.Protocol, chainId: number, contractAddress: string) {
      super(
        `Contract alias not available for contract: ${contractAddress}, protocol: ${protocol}, chain ID ${chainId}`,
      );
      this.name = "ContractAliasNotFoundError";
    }
  }

  export class ContractNotFound extends Error {
    constructor(protocol: Indexer.Protocol, chainId: number, contractAddress: string) {
      super(`Contract not found for address: ${contractAddress}, protocol: ${protocol}, chain ID ${chainId}`);
      this.name = "ContractNotFoundError";
    }
  }

  export class ClientNotFound extends Error {
    constructor(chainId: number) {
      super(`No client found for chain with ID ${chainId}`);
      this.name = "ClientNotFoundError";
    }
  }
}

/**
 * @see https://github.com/sablier-labs/indexers/issues/150
 */
export function isDecimalsRevertedError(error: unknown): error is ContractFunctionExecutionError {
  return (
    error instanceof ContractFunctionExecutionError &&
    error.message.includes('The contract function "decimals" reverted')
  );
}
