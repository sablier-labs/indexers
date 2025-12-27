import { Address, ethereum } from "@graphprotocol/graph-ts";
import {
  AIRDROPS_V1_1,
  AIRDROPS_V1_2,
  FLOW_V1_0,
  LOCKUP_V1_0,
  LOCKUP_V1_1,
  LOCKUP_V1_2,
  SEP_19_2025,
} from "./constants";
import { readContractVersion } from "./context";
import { shutDown } from "./logger";
import { areStringsEqual as cmp } from "./strings";

/**
 * Checks if the event is an unmonetizable contract that was deprecated on Sep 19, 2025.
 * Streams or airdrops created after this date will no longer be indexed.
 * @see https://github.com/sablier-labs/indexers/issues/82
 * @see https://x.com/Sablier/status/1914326014995620114
 */
export function isDeprecatedContract(
  event: ethereum.Event,
  protocol: string,
  asset: Address
): boolean {
  // All actions before Sep 19, 2025 are indexed.
  if (event.block.timestamp.lt(SEP_19_2025)) {
    return false;
  }

  // Some assets are exempted from being deprecated even after Sep 19, 2025.
  if (isExemptedAsset(asset)) {
    return false;
  }

  const version = readContractVersion();
  if (cmp(protocol, "airdrops")) {
    if (cmp(version, AIRDROPS_V1_1) || cmp(version, AIRDROPS_V1_2)) {
      return true;
    }
  } else if (cmp(protocol, "flow")) {
    if (cmp(version, FLOW_V1_0)) {
      return true;
    }
  } else if (cmp(protocol, "lockup")) {
    if (cmp(version, LOCKUP_V1_0) || cmp(version, LOCKUP_V1_1) || cmp(version, LOCKUP_V1_2)) {
      return true;
    }
  } else {
    shutDown("Unknown protocol: {}", [protocol]);
  }
  return false;
}

/**
 * Checks if the token address is exempted from deprecation rules.
 */
function isExemptedAsset(asset: Address): boolean {
  const EXEMPTED_ASSETS = new Array<string>(3);
  EXEMPTED_ASSETS[0] = "0xbea586a167853adddef12818f264f1f9823fbc18"; // esEXA on Optimism (10)
  EXEMPTED_ASSETS[1] = "0x111123ea4cee28cf010703593a8a2a3bbb91756c"; // ARA on Base (8453)
  EXEMPTED_ASSETS[2] = "0x70c4430f9d98b4184a4ef3e44ce10c320a8b7383"; // GYFI on Ethereum (1)
  return EXEMPTED_ASSETS.includes(asset.toHexString());
}
