import { ethereum } from "@graphprotocol/graph-ts";
import {
  AIRDROPS_V1_1,
  AIRDROPS_V1_2,
  FEE_LESS_CUTOFF_TIMESTAMP,
  FLOW_V1_0,
  LOCKUP_V1_0,
  LOCKUP_V1_1,
  LOCKUP_V1_2,
} from "./constants";
import { readContractVersion } from "./context";
import { shutDown } from "./logger";
import { areStringsEqual as cmp } from "./strings";

/**
 * Checks if the event is an unmonetizable contract that was deprecated on August 20, 2025.
 * Streams or airdrops created after this date will no longer be indexed.
 * @see https://github.com/sablier-labs/indexers/issues/82
 * @see https://x.com/Sablier/status/1914326014995620114
 */
export function isDeprecatedContract(event: ethereum.Event, protocol: string, asset: string): boolean {
  if (event.block.timestamp.lt(FEE_LESS_CUTOFF_TIMESTAMP)) {
    return false;
  }
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
function isExemptedAsset(asset: string): boolean {
  const EXEMPTED_ASSETS = new Array<string>(1);
  EXEMPTED_ASSETS[0] = "0xbea586a167853adddef12818f264f1f9823fbc18"; // esEXA
  return EXEMPTED_ASSETS.includes(asset.toLowerCase());
}
