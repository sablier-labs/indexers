import { indexedContracts } from "../../contracts";
import { indexedEvents } from "../../events";
import { sanitizeContractName } from "../../lib/helpers";
import paths, { getRelativePath } from "../../lib/paths";
import type { Types } from "../../lib/types";
import type { EnvioConfig } from "./config-types";

export function createContracts(protocol: Types.Protocol): EnvioConfig.Contract[] {
  const contracts: EnvioConfig.Contract[] = [];
  for (const indexedContract of indexedContracts[protocol]) {
    for (const version of indexedContract.versions) {
      const sanitizedName = sanitizeContractName(indexedContract.name, version);
      contracts.push({
        abi_file_path: getRelativeAbiFilePath(protocol, indexedContract.name, version),
        events: getEvents(indexedEvents[protocol][indexedContract.name][version]),
        handler: `mappings/${version}/${indexedContract.name}.ts`,
        name: sanitizedName,
      });
    }
  }

  return contracts;
}

function getRelativeAbiFilePath(protocol: Types.Protocol, contractName: string, version: Types.Version): string {
  const envioConfigDir = paths.envio.config(protocol);
  const abiPath = paths.abi(contractName, protocol, version);
  return getRelativePath(envioConfigDir, abiPath);
}

function getEvents(indexedEvents: Types.Event[]): EnvioConfig.Event[] {
  const events: EnvioConfig.Event[] = [];
  for (const indexedEvent of indexedEvents) {
    events.push({
      event: indexedEvent.eventName,
    });
  }
  return events;
}
