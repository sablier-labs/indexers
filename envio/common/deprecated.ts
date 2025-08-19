import type { Sablier } from "sablier";
import { sablier, Version } from "sablier";
import type { Envio } from "./bindings";
import { FEE_LESS_CUTOFF_TIMESTAMP } from "./constants";

/**
 * Checks if the event is an unmonetizable contract that was deprecated on August 20, 2025.
 * Streams or airdrops created after this date will no longer be indexed.
 * @see https://github.com/sablier-labs/indexers/issues/82
 * @see https://x.com/Sablier/status/1914326014995620114
 */
export function isDeprecatedContract({
  event,
  protocol,
  asset,
}: {
  event: Envio.Event;
  protocol: Sablier.Protocol;
  asset: Envio.Address;
}): boolean {
  if (event.block.timestamp < FEE_LESS_CUTOFF_TIMESTAMP) {
    return false;
  }
  if (isExemptedAsset(asset)) {
    return false;
  }

  const foundContract = sablier.contracts.get({
    chainId: event.chainId,
    contractAddress: event.srcAddress.toLowerCase() as Sablier.Address,
    protocol,
  });
  if (!foundContract) {
    return false;
  }

  switch (protocol) {
    case "airdrops":
      return [Version.Airdrops.V1_1, Version.Airdrops.V1_2].includes(foundContract.version as Version.Airdrops);
    case "flow":
      return [Version.Flow.V1_0].includes(foundContract.version as Version.Flow);
    case "lockup":
      return [Version.Lockup.V1_0, Version.Lockup.V1_1, Version.Lockup.V1_2].includes(
        foundContract.version as Version.Lockup,
      );
  }

  return true;
}

/**
 * Checks if the token address is exempted from deprecation rules.
 */
function isExemptedAsset(asset: Envio.Address): boolean {
  const EXEMPTED_ASSETS = ["0xbea586a167853adddef12818f264f1f9823fbc18"];
  return EXEMPTED_ASSETS.includes(asset.toLowerCase());
}
