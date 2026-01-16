/* biome-ignore-all assist/source/useSortedKeys: order matters */
import _ from "lodash";
import { indexedContracts } from "../../../../contracts";
import { indexedEvents } from "../../../../events";
import { sanitizeContractName } from "../../../../lib/helpers";
import paths, { getRelativePath } from "../../../../lib/paths";
import type { Types } from "../../../../lib/types";
import type { Indexer } from "../../../../src/types";
import type { EnvioConfig } from "./config-types";

/**
 * Comptroller is an upgradeable contract which is not a part of the normal versioned Sablier releases.
 * Only TransferFees event is tracked for the Comptroller contract.
 */
export function createComptrollerContract(): EnvioConfig.Contract {
  return {
    abi_file_path: "../../abi/SablierComptroller.json",
    events: [{ event: "TransferFees" }],
    handler: "mappings/comptroller/SablierComptroller.ts",
    name: "SablierComptroller",
  };
}

export function createProtocolContracts(
  indexer: Indexer.Name,
  protocol: Indexer.Protocol,
  includeProtocolInPath: boolean = false,
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
  version: Types.Version,
): string {
  const envioConfigDir = paths.envio.config(protocol);
  const abiPath = paths.abi(contractName, protocol, version);
  return getRelativePath(envioConfigDir, abiPath);
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
