/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: $ sign needed in string */

import _ from "lodash";
import { sablier } from "sablier";
import { indexedContracts } from "../../contracts";
import { sanitizeContractName } from "../../lib/helpers";
import { logger, messages } from "../../lib/winston";
import { envioChains } from "../../src/indexers/envio";
import type { Indexer } from "../../src/types";
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
 * Will return an URL like this: https://mainnet.infura.io/v3/${ENVIO_INFURA_API_KEY}
 * The API key will be loaded from the .env file.
 */
function getRPCs(chainId: number, rpcOnly?: boolean): EnvioConfig.NetworkRPC[] {
  const RPCs: EnvioConfig.NetworkRPC[] = [];
  const chain = sablier.chains.getOrThrow(chainId);

  // If it's HyperSync, we use Infura and Alchemy as fallback RPCs.
  if (!rpcOnly) {
    if (chain.rpc.infura && process.env.ENVIO_INFURA_API_KEY) {
      RPCs.push({
        for: "fallback",
        url: chain.rpc.infura("${ENVIO_INFURA_API_KEY}"),
      });
    }

    if (chain.rpc.alchemy && process.env.ENVIO_ALCHEMY_API_KEY) {
      RPCs.push({
        for: "fallback",
        initial_block_interval: 2000,
        interval_ceiling: 2000,
        url: chain.rpc.alchemy("${ENVIO_ALCHEMY_API_KEY}"),
      });
    }
  }
  // Otherwise, use Routemesh as sync RPC.
  else {
    RPCs.push({
      for: "sync",
      url: `https://lb.routeme.sh/rpc/${chainId}/\${ENVIO_ROUTEMESH_API_KEY}`,
    });
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
function extractContracts(protocol: Indexer.Protocol, chainId: number): EnvioConfig.NetworkContract[] {
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
    const filteredContracts = indexedContracts[protocol].filter((c) => c.versions.includes(release.version));

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
