import type { Sablier } from "sablier";
import { sablier } from "sablier";
import type { Version } from "sablier/evm";
import { contracts, isLockupCompatible } from "sablier/evm";

const LOCKUP_NAMES = [
  contracts.names.SABLIER_LOCKUP,
  contracts.names.SABLIER_V2_LOCKUP_LINEAR,
  contracts.names.SABLIER_V2_LOCKUP_TRANCHED,
];

/** Returns eligible Lockup addresses in release order, or undefined if the chain has no Lockup deployments. */
export function getCompatibleLockupAddresses(
  chainId: number,
  airdropsVersion: Version.Airdrops
): Sablier.Address[] | undefined {
  let addresses: Sablier.Address[] | undefined;

  for (const release of sablier.releases.getAll({ protocol: "lockup" })) {
    const compatible = isLockupCompatible(airdropsVersion, release.version as Version.Lockup);
    for (const deployment of release.deployments) {
      if (deployment.chainId !== chainId || deployment.contracts.length === 0) {
        continue;
      }
      addresses ??= [];
      if (!compatible) {
        continue;
      }
      for (const contract of deployment.contracts) {
        if (LOCKUP_NAMES.includes(contract.name)) {
          addresses.push(contract.address.toLowerCase() as Sablier.Address);
        }
      }
    }
  }

  return addresses;
}
