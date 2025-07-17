import _ from "lodash";
import { sablier } from "sablier";
import { indexedContracts } from "../../contracts";
import { envioChains } from "../../exports/indexers/envio";
import { sanitizeContractName } from "../../helpers";
import type { Types } from "../../types";
import { logger, messages } from "../../winston";
import { CodegenError } from "../error";
import type { EnvioConfig } from "./config-types";

export function createNetworks(protocol: Types.Protocol): EnvioConfig.Network[] {
  const networks: EnvioConfig.Network[] = [];

  for (const chain of envioChains) {
    const { contracts, startBlock } = extractContracts(protocol, chain.id);
    const hypersync_config = chain.config?.hypersync
      ? { url: `https://${chain.config.hypersync}.hypersync.xyz` }
      : undefined;
    const rpc = getRPCs(chain.id, chain.config?.rpcOnly);

    networks.push({
      id: chain.id,
      start_block: startBlock,
      hypersync_config,
      rpc,
      contracts,
    });
  }

  return networks;
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

/**
 * Will return an URL like this: https://mainnet.infura.io/v3/{ENVIO_INFURA_API_KEY}
 * The API key will be loaded from the .env file.
 */
function getRPCs(chainId: number, rpcOnly?: boolean): EnvioConfig.NetworkRPC[] {
  const RPCs: EnvioConfig.NetworkRPC[] = [];
  const chain = sablier.chains.getOrThrow(chainId);

  if (chain.rpc.infura && process.env.ENVIO_INFURA_API_KEY) {
    RPCs.push({
      url: chain.rpc.infura("{ENVIO_INFURA_API_KEY}"),
      for: "fallback",
    });
  }

  if (chain.rpc.alchemy && process.env.ENVIO_ALCHEMY_API_KEY) {
    RPCs.push({
      url: chain.rpc.alchemy("{ENVIO_ALCHEMY_API_KEY}"),
      for: "fallback",
    });
  }

  RPCs.push({
    url: chain.rpc.default,
    for: "fallback",
    initial_block_interval: 2000,
    interval_ceiling: 2000, // https://github.com/enviodev/hyperindex/issues/603
  });

  if (rpcOnly) {
    RPCs[0].for = "sync";
  }

  return RPCs;
}

type ExtractContractsReturn = {
  contracts: EnvioConfig.NetworkContract[];
  startBlock: number;
};

/**
 * Extracts contracts for a specific protocol and chain.
 * @returns Object containing extracted contracts and the earliest start block
 *
 * This function:
 * 1. Iterates through all releases for the given protocol
 * 2. Finds the deployment for that release on the specified chain
 * 3. Filters contracts that are indexed
 * 4. Validates contracts have required properties (alias and block)
 * 5. Collects contract addresses and names
 * 6. Determines the earliest block number to start indexing from
 * 7. Throws errors if required contracts are missing or no contracts found
 */
function extractContracts(protocol: Types.Protocol, chainId: number): ExtractContractsReturn {
  const networkContracts: EnvioConfig.NetworkContract[] = [];
  let startBlock = 0;

  for (const release of sablier.releases.getAll({ protocol })) {
    const deployment = sablier.deployments.get({ chainId, release });

    // Some contracts are not deployed on all chains, so we skip them.
    if (!deployment) {
      const chainName = sablier.chains.get(chainId)?.name ?? "chain";
      logger.debug(`No deployment found for ${protocol} ${release.version} on ${chainName}`);
      continue;
    }

    // Filter all contracts that match the release version.
    const filteredContracts = indexedContracts[protocol].filter((c) => c.versions.includes(release.version));

    const possibleStartBlocks: number[] = [];
    for (const filteredContract of filteredContracts) {
      const { name: contractName, isTemplate } = filteredContract;
      if (isTemplate) {
        networkContracts.push({
          name: sanitizeContractName(contractName, release.version),
        });
        continue;
      }

      const contract = _.find(deployment.contracts, (c) => c.name === contractName);

      // If it's a deployment that exists, the contract from the contract map must exist.
      if (!contract) {
        logger.debug(messages.contractNotFound(release, chainId, contractName));
        continue;
      }
      // If a contract is found, it must have an alias and a start block. These are required for indexing.
      if (!contract.alias) {
        throw new CodegenError.AliasNotFound(release, chainId, contractName);
      }
      if (!contract.block) {
        throw new CodegenError.BlockNotFound(release, chainId, contractName);
      }

      networkContracts.push({
        address: contract.address.toLowerCase() as `0x${string}`,
        name: sanitizeContractName(contractName, release.version),
      });
      if (startBlock === 0) {
        possibleStartBlocks.push(contract.block);
      }
    }

    // The first contract gives the start block for the entire indexer.
    if (startBlock === 0) {
      startBlock = Math.min(...possibleStartBlocks);
    }
  }

  // At least one contract must be found for the indexer to work.
  if (networkContracts.length === 0) {
    throw new CodegenError.ContractsNotFound(protocol, chainId);
  }

  return { contracts: networkContracts, startBlock };
}
