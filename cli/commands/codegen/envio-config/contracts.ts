import * as _ from "lodash-es";
import { sanitizeContractName } from "../../../../cli/utils/contract-name.js";
import paths, { getRelativePath } from "../../../../cli/utils/paths.js";
import { indexedContracts } from "../../../../contracts/index.js";
import { indexedEvents } from "../../../../events/index.js";
import type { Indexer, Model } from "../../../../src/types.js";
import type { EnvioConfig } from "./config-types.js";

/**
 * Comptroller is an upgradeable contract, not part of versioned Sablier releases.
 * We use the v1.1 ABI because v1.1 merged v1.0's SetCustomFeeUSD + DisableCustomFeeUSD
 * into a single UpdateCustomFeeUSD event (which we index). The TransferFees signature
 * is unchanged from v1.0.
 */
export function createComptrollerContract(indexer: Indexer.Target): EnvioConfig.Contract {
  const abiPath = paths.abi("SablierComptroller", undefined, "v1.1");
  const envioConfigDir = paths.envio.config(indexer);
  return {
    abi_file_path: getRelativePath(envioConfigDir, abiPath),
    events: [{ event: "TransferFees" }, { event: "UpdateCustomFeeUSD" }],
    handler: "mappings/comptroller/SablierComptroller.ts",
    name: "SablierComptroller",
  };
}

export function createProtocolContracts(
  target: Indexer.Target,
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
        abi_file_path: getRelativeAbiFilePath(target, protocol, indexedContract.name, version),
        events: getEvents(target, indexedEvents[protocol][indexedContract.name][version]),
      });
    });
  });

  return contracts;
}

/**
 * USDC is an external ERC-20 contract tracked for sponsorship purposes.
 * Uses a local ABI file (not from the sablier package) and a dedicated handler.
 */
export function createUsdcContract(target: Indexer.Target): EnvioConfig.Contract {
  const abiPath = paths.abi("ERC20");
  const envioConfigDir = paths.envio.config(target);
  const handler = "mappings/lockup/common/sponsorship.ts";
  return {
    abi_file_path: getRelativePath(envioConfigDir, abiPath),
    events: [{ event: "Transfer" }],
    handler,
    name: "USDC",
  };
}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function getRelativeAbiFilePath(
  target: Indexer.Target,
  protocol: Indexer.Protocol,
  contractName: string,
  version: Model.Version
): string {
  const envioConfigDir = paths.envio.config(target);
  const abiPath = paths.abi(contractName, protocol, version);
  return getRelativePath(envioConfigDir, abiPath);
}

function getEvents(target: Indexer.Target, indexedEvents: Model.Event[]): EnvioConfig.Event[] {
  const events: EnvioConfig.Event[] = [];
  _.forEach(indexedEvents, (indexedEvent) => {
    if (indexedEvent.indexers.includes(target)) {
      events.push({
        event: indexedEvent.eventName,
      });
    }
  });
  return events;
}
