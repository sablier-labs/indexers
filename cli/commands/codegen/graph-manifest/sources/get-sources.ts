import { Effect } from "effect";
import { Kind } from "graphql";
import _ from "lodash";
import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { convertToIndexed, indexedContracts } from "../../../../../contracts/index.js";
import { indexedEvents } from "../../../../../events/index.js";
import { getMergedSchema } from "../../../../../schema/merger.js";
import type { Indexer } from "../../../../../src/index.js";
import { getSubgraphYamlChainSlug } from "../../../../../src/indexers/graph.js";
import type { Model } from "../../../../../src/types.js";
import { sanitizeContractName } from "../../../../contract-name.js";
import { CodegenError } from "../../errors.js";
import { GRAPH_API_VERSION } from "../constants.js";
import { resolveEventHandler } from "../event-resolver.js";
import type { GraphManifest } from "../manifest-types.js";
import { getABIEntries } from "./abi-entries.js";

/**
 * Creates an array of data sources/templates for a subgraph manifest.
 */
export function getSources(protocol: Indexer.Protocol, chainId: number) {
  return Effect.gen(function* () {
    const sources: GraphManifest.Source[] = [];
    for (const indexedContract of indexedContracts[protocol]) {
      for (const version of indexedContract.versions) {
        const release = sablier.releases.get({ protocol, version });
        if (!release) {
          return yield* Effect.fail(new CodegenError.ReleaseNotFound(protocol, version));
        }

        const { name: contractName, isTemplate } = indexedContract;
        const contract = yield* extractContract({ chainId, contractName, isTemplate, release });
        if (!contract) {
          continue;
        }

        const common = getCommon({ chainId, contract, isTemplate, protocol, version });
        const mapping = yield* getMapping({ contractName: contract.name, protocol, version });
        const source = _.merge({}, common, { mapping }) as GraphManifest.Source;
        sources.push(source);
      }
    }

    return sources;
  });
}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

type CreateSourcesParams = {
  protocol: Indexer.Protocol;
  chainId: number;
  version: Model.Version;
  contract: Model.Contract;
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
function getEntities(protocol: Indexer.Protocol): string[] {
  const schema = getMergedSchema(protocol);

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
function getMapping(params: {
  protocol: Indexer.Protocol;
  contractName: string;
  version: Model.Version;
}) {
  const { protocol, version, contractName } = params;

  return Effect.gen(function* () {
    const events = indexedEvents[protocol][contractName]?.[version];
    if (!events) {
      return yield* Effect.fail(
        new Error(`Events not found for contract ${contractName} (${protocol} ${version})`)
      );
    }

    const handlers = yield* Effect.forEach(events, (event) =>
      resolveEventHandler(protocol as Indexer.Name, event)
    );

    return {
      abis: yield* getABIEntries(protocol, contractName, version),
      entities: getEntities(protocol),
      eventHandlers: handlers.filter(
        (handler): handler is GraphManifest.EventHandler => handler !== null
      ),
      file: `../mappings/${version}/${contractName}.ts`,
    };
  });
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
}) {
  const { release, chainId, contractName, isTemplate } = params;

  return Effect.gen(function* () {
    if (isTemplate) {
      return {
        address: "0x" as Sablier.Address,
        alias: "",
        block: 0,
        chainId,
        name: contractName,
        protocol: release.protocol as Indexer.Protocol,
        version: release.version as Model.Version,
      };
    }

    // Query contract deployment for this release and chain, skipping if not deployed because not all
    // chains are available for a particular release.
    const contract = sablier.contracts.get({ chainId, contractName, release });
    if (!contract) {
      return undefined;
    }

    // Validate required indexing fields
    // Both alias and block number are necessary for proper subgraph indexing
    if (!contract.alias) {
      return yield* Effect.fail(
        new CodegenError.ContractAliasNotFound(release, chainId, contractName)
      );
    }
    if (!contract.block) {
      return yield* Effect.fail(new CodegenError.BlockNotFound(release, chainId, contractName));
    }
    if (!contract.version) {
      return yield* Effect.fail(
        new CodegenError.ContractVersionNotFound(release, chainId, contractName)
      );
    }

    return convertToIndexed(contract, release.version as Model.Version);
  });
}
