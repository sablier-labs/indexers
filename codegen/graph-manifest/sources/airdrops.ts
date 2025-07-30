import _ from "lodash";
import { contracts, type Sablier, sablier, Version } from "sablier";
import type { GraphManifest } from "../manifest-types";
import { getSources } from "./get-sources";

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
    const airdropsVersion = context.version?.data as Sablier.Version.Airdrops;
    const lockupVersion = lockupRelease.version as Sablier.Version.Lockup;
    if (!areVersionsCompatible(airdropsVersion, lockupVersion)) {
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

/**
 * Notes:
 *   - Lockup v1.0 is not supported for airdrops at all.
 *   - Lockup v1.1/v1.2 is only compatible with Airdrops v1.1/v1.2.
 *   - Lockup v2.0 is only compatible with Airdrops v1.3.
 *
 * @see https://diffchecker.com/KCMfHn3A/
 */
function areVersionsCompatible(airdrops: Sablier.Version.Airdrops, lockup: Sablier.Version.Lockup): boolean {
  const compatiblePairs: Record<Sablier.Version.Airdrops, Sablier.Version.Lockup[]> = {
    [Version.Airdrops.V1_1]: [Version.Lockup.V1_1, Version.Lockup.V1_2],
    [Version.Airdrops.V1_2]: [Version.Lockup.V1_1, Version.Lockup.V1_2],
    [Version.Airdrops.V1_3]: [Version.Lockup.V2_0],
  };

  return compatiblePairs[airdrops]?.includes(lockup) ?? false;
}

function isLockupContractName(name: string): boolean {
  const supported = [
    contracts.names.SABLIER_LOCKUP,
    contracts.names.SABLIER_V2_LOCKUP_LINEAR,
    contracts.names.SABLIER_V2_LOCKUP_TRANCHED,
  ];
  return supported.includes(name);
}
