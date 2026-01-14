/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: $ sign needed in string */

import _ from "lodash";
import { comptroller, sablier } from "sablier";
import { indexedContracts } from "../../../../contracts";
import { sanitizeContractName } from "../../../../lib/helpers";
import { logger, messages } from "../../../../lib/logger";
import { envioChains } from "../../../../src/indexers/envio";
import type { Indexer } from "../../../../src/types";
import { CodegenError } from "../error";
import type { EnvioConfig } from "./config-types";

export function createNetworks(protocol: Indexer.Protocol): EnvioConfig.Network[] {
  const networks: EnvioConfig.Network[] = [];

  for (const chain of envioChains) {
    const contracts = extractContracts(protocol, chain.id);
    const hypersync_config = chain.config?.hypersync
      ? { url: `https://${chain.config.hypersync}.hypersync.xyz` }
      : undefined;
    const rpc = getRPCs(chain.id, chain.config?.rpcOnly);

    // Order matters for readability in the YAML config file.
    networks.push({
      id: chain.id,
      start_block: 0,
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
 * Adds the Comptroller contract to networks that have a Comptroller deployment.
 * Uses the sablier SDK to get the correct address for each chain (handles Linea exception).
 */
export function addComptrollerToNetworks(networks: EnvioConfig.Network[]): EnvioConfig.Network[] {
  return networks.map((network) => {
    const comptrollerDeployment = comptroller.get(network.id);
    if (!comptrollerDeployment) {
      return network;
    }

    const comptrollerNetworkContract: EnvioConfig.NetworkContract = {
      address: comptrollerDeployment.address,
      name: "SablierComptroller",
      start_block: comptrollerDeployment.block,
    };

    return {
      ...network,
      contracts: [...network.contracts, comptrollerNetworkContract],
    };
  });
}

/**
 * Will return a string URL like this:https://eth-mainnet.g.alchemy.com/v2/${ENVIO_ALCHEMY_API_KEY}
 * The API keys will be loaded from the .env file. Make sure to set them!
 */
function getRPCs(chainId: number, rpcOnly?: boolean): EnvioConfig.NetworkRPC[] | undefined {
  const RPCs: EnvioConfig.NetworkRPC[] = [];
  const chain = sablier.chains.getOrThrow(chainId);

  // If it's HyperSync, we use Alchemy as fallback RPC.
  if (!rpcOnly) {
    if (chain.rpc.alchemy) {
      RPCs.push({
        for: "fallback",
        initial_block_interval: 2000,
        interval_ceiling: 2000,
        url: chain.rpc.alchemy("${ENVIO_ALCHEMY_API_KEY}"),
      });
    }
  }
  else {
    throw new Error("RPC-only mode is temporary disabled");
  }

  if (RPCs.length === 0) {
    return undefined;
  }

  return RPCs;
}

/**
 * Extracts contracts for a specific protocol and chain.
 * @returns Object containing extracted contracts and the earliest start block
 *
 * This function:
 * 1. Iterates through all releases for the given protocol
 * 2. Finds the deployment for that release on the specified chain
 * 3. Filters contracts that are indexed
 * 4. Validates contracts have required properties (alias and block)
 * 5. Collects the contract address, name, and start block
 * 6. Throws errors if required contracts are missing or no contracts found
 */
function extractContracts(
  protocol: Indexer.Protocol,
  chainId: number,
): EnvioConfig.NetworkContract[] {
  const networkContracts: EnvioConfig.NetworkContract[] = [];

  for (const release of sablier.releases.getAll({ protocol })) {
    const deployment = sablier.deployments.get({ chainId, release });

    // Some contracts are not deployed on all chains, so we skip them.
    if (!deployment) {
      const chainName = sablier.chains.get(chainId)?.name ?? "chain";
      logger.debug(`No deployment found for ${protocol} ${release.version} on ${chainName}`);
      continue;
    }

    // Filter all contracts that match the release version.
    const filteredContracts = indexedContracts[protocol].filter((c) =>
      c.versions.includes(release.version),
    );

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
        throw new CodegenError.ContractAliasNotFound(release, chainId, contractName);
      }
      if (!contract.block) {
        throw new CodegenError.BlockNotFound(release, chainId, contractName);
      }
      if (!contract.version) {
        throw new CodegenError.ContractVersionNotFound(release, chainId, contractName);
      }
      networkContracts.push({
        address: contract.address.toLowerCase() as `0x${string}`,
        name: sanitizeContractName(contractName, release.version),
        start_block: contract.block,
      });
    }
  }

  // At least one contract must be found for the indexer to work.
  if (networkContracts.length === 0) {
    throw new CodegenError.ContractsNotFound(protocol, chainId);
  }

  return networkContracts;
}
