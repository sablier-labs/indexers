/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: $ sign needed in string */

import _ from "lodash";
import { sablier } from "sablier";
import { indexedContracts } from "../../../../contracts/index.js";
import { sanitizeContractName } from "../../../../lib/helpers.js";
import { logger, messages } from "../../../../lib/logger/index.js";
import { envioChains } from "../../../../src/indexers/envio.js";
import type { Indexer } from "../../../../src/types.js";
import { usdc } from "../../../../src/usdc.js";
import { CodegenError } from "../errors.js";
import type { EnvioConfig } from "./config-types.js";

export function createNetworksForProtocols(protocol: Indexer.Protocol): EnvioConfig.Network[] {
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

/**
 * Adds the USDC contract to networks that have a known USDC deployment.
 */
export function addUsdcToNetworks(networks: EnvioConfig.Network[]): EnvioConfig.Network[] {
  return networks.map((network) => {
    const usdcInfo = usdc[network.id];
    if (!usdcInfo) {
      return network;
    }

    const usdcNetworkContract: EnvioConfig.NetworkContract = {
      address: usdcInfo.address,
      name: "USDC",
    };

    return {
      ...network,
      contracts: [...network.contracts, usdcNetworkContract],
    };
  });
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

/**
 * Adds the Comptroller contract to networks that have a Comptroller deployment.
 * @see https://etherscan.io/address/0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399#code
 * @see https://docs.sablier.com/concepts/governance
 */
export function addComptrollerToNetworks(networks: EnvioConfig.Network[]): EnvioConfig.Network[] {
  return networks.map((network) => {
    const comptrollerDeployment = sablier.comptroller.get(network.id);
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
 * Will return a string URL like this: https://eth-mainnet.g.alchemy.com/v2/${ENVIO_ALCHEMY_API_KEY}
 * The API keys will be loaded from the .env file. Make sure to set them!
 */
function getRPCs(chainId: number, rpcOnly?: boolean): EnvioConfig.NetworkRPC[] | undefined {
  const RPCs: EnvioConfig.NetworkRPC[] = [];
  const chain = sablier.chains.getOrThrow(chainId);
  const alchemyApiKey = process.env.ENVIO_ALCHEMY_API_KEY;

  // If it's HyperSync, we use Alchemy as fallback RPC.
  if (rpcOnly) {
    throw new Error("RPC-only mode is temporary disabled");
  }
  if (chain.rpc.alchemy && alchemyApiKey) {
    RPCs.push({
      for: "fallback",
      initial_block_interval: 2000,
      interval_ceiling: 2000,
      url: chain.rpc.alchemy("${ENVIO_ALCHEMY_API_KEY}"),
    });
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
  chainId: number
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
      c.versions.includes(release.version)
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
