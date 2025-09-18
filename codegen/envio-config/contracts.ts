import _ from "lodash";
import { indexedContracts } from "../../contracts";
import { indexedEvents } from "../../events";
import { sanitizeContractName } from "../../lib/helpers";
import paths, { getRelativePath } from "../../lib/paths";
import type { Types } from "../../lib/types";
import type { Indexer } from "../../src";
import type { EnvioConfig } from "./config-types";

export function createContracts(
  protocol: Indexer.Protocol,
  includeProtocolInPath: boolean = false,
): EnvioConfig.Contract[] {
  const contracts: EnvioConfig.Contract[] = [];

  _.forEach(indexedContracts[protocol], (indexedContract) => {
    _.forEach(indexedContract.versions, (version) => {
      const handlerPath = includeProtocolInPath ? `${protocol}/${version}` : version;
      const sanitizedName = sanitizeContractName(indexedContract.name, version);
      contracts.push({
        abi_file_path: getRelativeAbiFilePath(protocol, indexedContract.name, version),
        events: getEvents(indexedEvents[protocol][indexedContract.name][version]),
        handler: `mappings/${handlerPath}/${indexedContract.name}.ts`,
        name: sanitizedName,
      });
    });
  });

  return contracts;
}

function getRelativeAbiFilePath(protocol: Indexer.Protocol, contractName: string, version: Types.Version): string {
  const envioConfigDir = paths.envio.config(protocol);
  const abiPath = paths.abi(contractName, protocol, version);
  return getRelativePath(envioConfigDir, abiPath);
}

function getEvents(indexedEvents: Types.Event[]): EnvioConfig.Event[] {
  const events: EnvioConfig.Event[] = [];
  _.forEach(indexedEvents, (indexedEvent) => {
    events.push({
      event: indexedEvent.eventName,
    });
  });
  return events;
}
