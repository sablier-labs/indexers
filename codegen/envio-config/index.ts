import _ from "lodash";
import type { Indexer } from "../../src";
import type { EnvioConfig } from "./config-types";
import { createContracts } from "./contracts";
import { createNetworks } from "./networks";
import { topSections } from "./top-sections";

/**
 * Creates a Graph manifest for a given protocol and chain.
 * @see https://docs.envio.dev/docs/HyperIndex/configuration-file#interactive-schema-explorer
 */
export function createEnvioConfig(indexer: Indexer.Name): EnvioConfig.TopSection {
  const topSection = topSections[indexer];

  let contracts: EnvioConfig.Contract[] = [];
  let networks: EnvioConfig.Network[] = [];

  // The Analytics indexers monitors all protocols.
  if (indexer === "analytics") {
    const includeProtocolInPath = true;
    contracts = [
      ...createContracts("airdrops", includeProtocolInPath),
      ...createContracts("flow", includeProtocolInPath),
      ...createContracts("lockup", includeProtocolInPath),
    ];
    networks = mergeNetworks([...createNetworks("airdrops"), ...createNetworks("flow"), ...createNetworks("lockup")]);
  } else {
    const protocol = indexer as Indexer.Protocol;
    contracts = createContracts(protocol);
    networks = createNetworks(protocol);
  }

  networks = setMinimumStartBlock(networks);

  const config = {
    ...topSection,
    contracts,
    networks,
  } as EnvioConfig.TopSection;

  return config;
}

/**
 * Sets the start_block of each network to the minimum start_block among its contracts.
 * @param networks Array of EnvioConfig.Network objects to process
 * @returns The same array with updated start_block values
 */
function setMinimumStartBlock(networks: EnvioConfig.Network[]): EnvioConfig.Network[] {
  return networks.map((network) => {
    const contractStartBlocks = network.contracts
      .map((contract) => contract.start_block)
      .filter((startBlock): startBlock is number => startBlock !== undefined);

    if (contractStartBlocks.length === 0) {
      // If no contracts have start_block defined, keep the network's current start_block
      return network;
    }

    const minimumStartBlock = Math.min(...contractStartBlocks);

    return {
      ...network,
      start_block: minimumStartBlock,
    };
  });
}

/**
 * Merge networks that share the same `id` by deep-merging objects and
 * concatenating + de-duplicating arrays (e.g., `contracts`, `rpc`).
 */
function mergeNetworks(networks: EnvioConfig.Network[]): EnvioConfig.Network[] {
  return _.chain(networks)
    .groupBy("id")
    .map((group) =>
      _.mergeWith({}, ...group, (objValue: unknown, srcValue: unknown): unknown => {
        if (Array.isArray(objValue) && Array.isArray(srcValue)) {
          return _.uniqWith([...objValue, ...srcValue], _.isEqual);
        }
        return undefined;
      }),
    )
    .value();
}
