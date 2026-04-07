import _ from "lodash";
import { sablier } from "sablier";
import type { Indexer } from "../../../../src/types.js";
import type { EnvioConfig } from "./config-types.js";
import {
  createComptrollerContract,
  createProtocolContracts,
  createUsdcContract,
} from "./contracts.js";
import { addComptrollerToChains, addUsdcToChains, createChainsForProtocols } from "./networks.js";
import { topSections } from "./top-sections.js";

/**
 * Creates an Envio config for a given target.
 * @see https://docs.envio.dev/docs/HyperIndex/configuration-file#interactive-schema-explorer
 */
export function createEnvioConfig(target: Indexer.Target): EnvioConfig.TopSection {
  const topSection = topSections[target];

  let contracts: EnvioConfig.Contract[] = [];
  let chains: EnvioConfig.Chain[] = [];

  /* -------------------------------- ANALYTICS ------------------------------- */

  // The Analytics indexers monitors all protocols and the Comptroller contract.
  if (target === "analytics") {
    const includeProtocolInPath = true;
    contracts = [
      ...createProtocolContracts(target, "airdrops", includeProtocolInPath),
      ...createProtocolContracts(target, "flow", includeProtocolInPath),
      ...createProtocolContracts(target, "lockup", includeProtocolInPath),
      createComptrollerContract(target),
    ];
    chains = mergeChains([
      ...createChainsForProtocols("airdrops"),
      ...createChainsForProtocols("flow"),
      ...createChainsForProtocols("lockup"),
    ]);
    // Filter out testnets from analytics indexer.
    chains = chains.filter((chain) => {
      const c = sablier.chains.get(chain.id);
      return c && !c.isTestnet;
    });
    chains = addComptrollerToChains(chains);
  }
  /* --------------------------------- STREAMS -------------------------------- */

  // The Streams indexer combines Flow and Lockup protocols.
  else if (target === "streams") {
    const includeProtocolInPath = true;
    contracts = [
      ...createProtocolContracts(target, "flow", includeProtocolInPath),
      ...createProtocolContracts(target, "lockup", includeProtocolInPath),
      createUsdcContract(target),
    ];
    chains = mergeChains([
      ...createChainsForProtocols("flow"),
      ...createChainsForProtocols("lockup"),
    ]);
    chains = addUsdcToChains(chains);
  }
  // Each protocol indexer tracks its own contracts and chains.
  else {
    contracts = createProtocolContracts(target, target);
    chains = createChainsForProtocols(target);
  }

  chains = setMinimumStartBlock(chains);

  const config = {
    ...topSection,
    contracts,
    chains,
  } as EnvioConfig.TopSection;

  return config;
}

/**
 * Sets the start_block of each chain to the minimum start_block among its contracts.
 */
function setMinimumStartBlock(chains: EnvioConfig.Chain[]): EnvioConfig.Chain[] {
  return chains.map((chain) => {
    const contractStartBlocks = chain.contracts
      .map((contract) => contract.start_block)
      .filter((startBlock): startBlock is number => startBlock !== undefined);

    if (contractStartBlocks.length === 0) {
      return chain;
    }

    const minimumStartBlock = Math.min(...contractStartBlocks);

    return {
      ...chain,
      start_block: minimumStartBlock,
    };
  });
}

/**
 * Merge chains that share the same `id` by deep-merging objects and
 * concatenating + de-duplicating arrays (e.g., `contracts`, `rpc`).
 */
function mergeChains(chains: EnvioConfig.Chain[]): EnvioConfig.Chain[] {
  return _.chain(chains)
    .groupBy("id")
    .map((group) =>
      _.mergeWith({}, ...group, (objValue: unknown, srcValue: unknown): unknown => {
        if (Array.isArray(objValue) && Array.isArray(srcValue)) {
          return _.uniqWith([...objValue, ...srcValue], _.isEqual);
        }
        return undefined;
      })
    )
    .value();
}
