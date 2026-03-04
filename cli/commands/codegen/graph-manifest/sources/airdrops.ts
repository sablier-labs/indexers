import _ from "lodash";
import type { Sablier } from "sablier";
import { sablier } from "sablier";
import type { Version } from "sablier/evm";
import { contracts, isLockupCompatible } from "sablier/evm";
import type { GraphManifest } from "../manifest-types.js";
import { getSources } from "./get-sources.js";

export function getAirdropsSources(chainId: number): GraphManifest.Source[] {
  const sources = getSources("airdrops", chainId);

  for (const source of sources) {
    if (source._type === "template" || !source.context) {
      continue;
    }
    source.context.lockups = getLockups(source.context);
  }

  return sources;
}

/**
 * Retrieves the addresses of official Lockup contracts for a specific chain.
 * The Merkle contract creation functions take a Lockup contract address as a user-provided argument.
 * So users can provide any address when deploying an airdrop contract, but we only index official deployments.
 */
function getLockups(context: GraphManifest.Context): GraphManifest.ContextItem.ListAddress {
  const chainId = Number(context.chainId.data);
  const contracts = sablier.contracts.getAll({ chainId, protocol: "lockup" });
  if (_.isEmpty(contracts)) {
    throw new Error(`No Lockup contracts found on chain with ID ${context.chainId.data}`);
  }

  const data: GraphManifest.ContextItem.Address[] = [];

  for (const lockupRelease of sablier.releases.getAll({ protocol: "lockup" })) {
    const airdropsVersion = context.version?.data as Version.Airdrops;
    const lockupVersion = lockupRelease.version as Version.Lockup;
    if (!isLockupCompatible(airdropsVersion, lockupVersion)) {
      continue;
    }

    for (const deployment of lockupRelease.deployments) {
      if (deployment.chainId !== chainId) {
        continue;
      }
      for (const contract of deployment.contracts) {
        // Look only for Lockup contracts compatible with Merkle factories
        if (!isLockupContractName(contract.name)) {
          continue;
        }

        data.push({
          data: contract.address.toLowerCase() as Sablier.Address,
          type: "String",
        });
      }
    }
  }

  return {
    data,
    type: "List",
  };
}

function isLockupContractName(name: string): boolean {
  const supported = [
    contracts.names.SABLIER_LOCKUP,
    contracts.names.SABLIER_V2_LOCKUP_LINEAR,
    contracts.names.SABLIER_V2_LOCKUP_TRANCHED,
  ];
  return supported.includes(name);
}
