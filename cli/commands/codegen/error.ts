import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { formatRelease } from "../../../lib/logger/helpers";
import type { Types } from "../../../lib/types";
import type { Indexer } from "../../../src";

export namespace CodegenError {
  export class BlockNotFound extends Error {
    constructor(release: Sablier.Release, chainId: number, contractName: string) {
      const chainName = sablier.chains.get(chainId)?.name ?? "chain";
      const message = `Start block not found for contract ${contractName} in ${formatRelease(release)} on ${chainName}`;
      super(message);
    }
  }

  export class ChainNotFound extends Error {
    constructor(chainId: number) {
      const message = `Chain with ID ${chainId} not found`;
      super(message);
    }
  }

  export class ContractAliasNotFound extends Error {
    constructor(release: Sablier.Release, chainId: number, contractName: string) {
      const chainName = sablier.chains.get(chainId)?.name ?? "chain";
      const message = `Alias not found for contract ${contractName} in ${formatRelease(release)} on ${chainName}`;
      super(message);
    }
  }

  export class ContractVersionNotFound extends Error {
    constructor(release: Sablier.Release, chainId: number, contractName: string) {
      const chainName = sablier.chains.get(chainId)?.name ?? "chain";
      const message = `Version not found for contract ${contractName} in ${formatRelease(release)} on ${chainName}`;
      super(message);
    }
  }

  export class ContractsNotFound extends Error {
    constructor(protocol: Indexer.Protocol, chainId: number) {
      const chainName = sablier.chains.get(chainId)?.name ?? "chain";
      const message = `No contracts found for ${protocol} on ${chainName}`;
      super(message);
    }
  }

  export class ReleaseNotFound extends Error {
    constructor(protocol: Indexer.Protocol, version: Types.Version) {
      const message = `Sablier release not found for ${protocol} ${version}`;
      super(message);
    }
  }
}
