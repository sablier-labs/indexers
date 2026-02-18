import _ from "lodash";
import { sanitizeContractName } from "../../../../cli/contract-name.js";
import paths, { getRelativePath } from "../../../../cli/paths.js";
import { indexedContracts } from "../../../../contracts/index.js";
import { indexedEvents } from "../../../../events/index.js";
import type { Indexer, Model } from "../../../../src/types.js";
import type { EnvioConfig } from "./config-types.js";

/**
 * Comptroller is an upgradeable contract which is not a part of the normal versioned Sablier releases.
 * Only TransferFees event is tracked for the Comptroller contract.
 */
export function createComptrollerContract(indexer: Indexer.Name): EnvioConfig.Contract {
  const abiPath = paths.abi("SablierComptroller");
  const envioConfigDir = paths.envio.config(indexer);
  return {
    abi_file_path: getRelativePath(envioConfigDir, abiPath),
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
  version: Model.Version
): string {
  const envioConfigDir = paths.envio.config(protocol);
  const abiPath = paths.abi(contractName, protocol, version);
  return getRelativePath(envioConfigDir, abiPath);
}

function getEvents(indexer: Indexer.Name, indexedEvents: Model.Event[]): EnvioConfig.Event[] {
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
