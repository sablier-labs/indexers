import _ from "lodash";
import { indexedContracts } from "../../../../contracts/index.js";
import { indexedEvents } from "../../../../events/index.js";
import { sanitizeContractName } from "../../../../lib/helpers.js";
import type { Types } from "../../../../lib/types.js";
import type { Indexer } from "../../../../src/types.js";
import type { EnvioConfig } from "./config-types.js";

/**
 * Comptroller is an upgradeable contract which is not a part of the normal versioned Sablier releases.
 * Only TransferFees event is tracked for the Comptroller contract.
 */
export function createComptrollerContract(): EnvioConfig.Contract {
  return {
    // biome-ignore lint/style/noUnusedTemplateLiteral: intentional - outputs literal ${ENVIO_ABI_PATH} for Envio config
    abi_file_path: `\${ENVIO_ABI_PATH}/comptroller/SablierComptroller.json`,
    events: [{ event: "TransferFees" }],
    handler: "mappings/comptroller/SablierComptroller.ts",
    name: "SablierComptroller",
  };
}

export function createProtocolContracts(
  indexer: Indexer.Name,
  protocol: Indexer.Protocol,
  includeProtocolInPath = false
): EnvioConfig.Contract[] {
  const contracts: EnvioConfig.Contract[] = [];

  _.forEach(indexedContracts[protocol], (indexedContract) => {
    _.forEach(indexedContract.versions, (version) => {
      const handlerPath = includeProtocolInPath ? `${protocol}/${version}` : version;
      const sanitizedName = sanitizeContractName(indexedContract.name, version);
      contracts.push({
        name: sanitizedName,
        handler: `mappings/${handlerPath}/${indexedContract.name}.ts`,
        abi_file_path: getRelativeAbiFilePath(protocol, indexedContract.name, version),
        events: getEvents(indexer, indexedEvents[protocol][indexedContract.name][version]),
      });
    });
  });

  return contracts;
}

function getRelativeAbiFilePath(
  protocol: Indexer.Protocol,
  contractName: string,
  version: Types.Version
): string {
  return `\${ENVIO_ABI_PATH}/${protocol}/${version}/${contractName}.json`;
}

function getEvents(indexer: Indexer.Name, indexedEvents: Types.Event[]): EnvioConfig.Event[] {
  const events: EnvioConfig.Event[] = [];
  _.forEach(indexedEvents, (indexedEvent) => {
    if (indexedEvent.indexers.includes(indexer)) {
      events.push({
        event: indexedEvent.eventName,
      });
    }
  });
  return events;
}
