import { Kind } from "graphql";
import _ from "lodash";
import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { convertToIndexed, indexedContracts } from "../../../contracts";
import { sanitizeContractName } from "../../../lib/helpers";
import type { Types } from "../../../lib/types";
import { logger, messages } from "../../../lib/winston";
import { getMergedSchema } from "../../../schema/merger";
import { getSubgraphYamlChainSlug } from "../../../src/indexers/graph";
import { CodegenError } from "../../error";
import { GRAPH_API_VERSION } from "../constants";
import type { GraphManifest } from "../manifest-types";
import { getABIEntries } from "./abi-entries";
import eventHandlers from "./event-handlers";

/**
 * Creates an array of data sources/templates for a subgraph manifest.
 */
export function getSources(protocol: Types.Protocol, chainId: number): GraphManifest.Source[] {
  const sources: GraphManifest.Source[] = [];
  for (const indexedContract of indexedContracts[protocol]) {
    for (const version of indexedContract.versions) {
      const release = sablier.releases.get({ protocol, version });
      if (!release) {
        throw new CodegenError.ReleaseNotFound(protocol, version);
      }

      const { name: contractName, isTemplate } = indexedContract;
      const contract = extractContract({ chainId, contractName, isTemplate, release });
      if (!contract) {
        continue;
      }

      const common = getCommon({ chainId, contract, isTemplate, protocol, version });
      const mapping = getMapping({ contractName: contract.name, protocol, version });
      const source = _.merge({}, common, { mapping }) as GraphManifest.Source;
      sources.push(source);
    }
  }

  return sources;
}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

type CreateSourcesParams = {
  protocol: Types.Protocol;
  chainId: number;
  version: Types.Version;
  contract: Types.Contract;
  isTemplate: boolean;
};

function getCommon(params: CreateSourcesParams) {
  const { protocol, chainId, version, contract, isTemplate } = params;
  const dataSourceName = sanitizeContractName(contract.name, version);

  const context = getContext({ chainId, contract, isTemplate, protocol, version });
  const contractAddress = contract.address.toLowerCase() as Sablier.Address;

  return {
    _type: isTemplate ? "template" : "data-source",
    context,
    kind: "ethereum/contract",
    mapping: {
      apiVersion: GRAPH_API_VERSION,
      kind: "ethereum/events",
      language: "wasm/assemblyscript",
    },
    name: dataSourceName,
    network: getSubgraphYamlChainSlug(chainId),
    source: {
      abi: contract.name,
      address: isTemplate ? undefined : contractAddress,
      startBlock: isTemplate ? undefined : contract.block,
    },
  };
}

function getContext(params: CreateSourcesParams): GraphManifest.Context | undefined {
  const { chainId, version, isTemplate, contract } = params;
  if (isTemplate) {
    return undefined;
  }

  return {
    alias: {
      data: contract.alias as string,
      type: "String",
    },
    chainId: {
      data: chainId.toString(),
      type: "BigInt",
    },
    version: {
      data: version,
      type: "String",
    },
  };
}

/**
 * Extracts all entity definitions from the merged schema for a given protocol.
 *
 * @param protocol - The protocol to extract entities for.
 * @returns An array of entity names available in the merged schema.
 */
function getEntities(protocol: Types.Protocol): string[] {
  const schema = getMergedSchema("graph", protocol);

  const entityNames: string[] = [];

  for (const definition of schema.definitions) {
    // Filter for type definitions (entities) and exclude enums, interfaces, etc.
    if (definition.kind === Kind.OBJECT_TYPE_DEFINITION && definition.name) {
      entityNames.push(definition.name.value);
    }
  }

  return entityNames.sort();
}

/**
 * Helper for accessing mapping configuration based on protocol and version.
 */
function getMapping(params: { protocol: Types.Protocol; contractName: string; version: Types.Version }) {
  const { protocol, version, contractName } = params;

  return {
    abis: getABIEntries(protocol, contractName, version),
    entities: getEntities(protocol),
    eventHandlers: eventHandlers[protocol][contractName][version],
    file: `../mappings/${version}/${contractName}.ts`,
  };
}

/**
 * Extracts contract information based on release, chain, name, and template status.
 * @returns The contract object if found, or undefined if not deployed on the specified chain
 *
 * For regular contracts: Validates that required fields (alias, block) exist before returning.
 * For templates: Returns a stub contract with just the name (templates don't need deployment details).
 *
 * @see https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/#data-source-templates
 */
function extractContract(params: {
  release: Sablier.Release;
  chainId: number;
  contractName: string;
  isTemplate: boolean;
}): Types.Contract | undefined {
  const { release, chainId, contractName, isTemplate } = params;

  if (isTemplate) {
    return {
      address: "0x",
      alias: "",
      block: 0,
      chainId,
      name: contractName,
      protocol: release.protocol as Types.Protocol,
      version: release.version as Types.Version,
    };
  }

  // Query contract deployment for this release and chain, skipping if not deployed because not all
  // chains are available for a particular release.
  const contract = sablier.contracts.get({ chainId, contractName, release });
  if (!contract) {
    logger.debug(messages.contractNotFound(release, chainId, contractName));
    return undefined;
  }

  // Validate required indexing fields
  // Both alias and block number are necessary for proper subgraph indexing
  if (!contract.alias) {
    throw new CodegenError.AliasNotFound(release, chainId, contractName);
  }
  if (!contract.block) {
    throw new CodegenError.BlockNotFound(release, chainId, contractName);
  }

  return convertToIndexed(contract);
}
