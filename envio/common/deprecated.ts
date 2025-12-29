import type { Sablier } from "sablier";
import { isReleasePayable, sablier } from "sablier";
import type { Envio } from "./bindings";
import { SEP_19_2025 } from "./constants";
import type { DeprecatedStreamContext } from "./store/entity-deprecated-stream";

/**
 * Checks if the event is an unmonetizable contract that was deprecated on Sep 19, 2025.
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
  // All actions before Sep 19, 2025 are indexed.
  if (event.block.timestamp < SEP_19_2025) {
    return false;
  }

  // Some assets are exempted from being deprecated even after Sep 19, 2025.
  if (isExemptedAsset(asset)) {
    return false;
  }

  const foundContract = sablier.contracts.get({
    chainId: event.chainId,
    contractAddress: event.srcAddress as Sablier.Address,
    protocol,
  });
  if (!foundContract) {
    return false;
  }

  /**
   * @see https://x.com/Sablier/status/1974130818139525131
   */
  switch (protocol) {
    case "airdrops":
    case "flow":
    case "lockup":
      return !isReleasePayable(protocol, foundContract.version as Sablier.EVM.Version);
  }

  return true;
}

export async function isDeprecatedStream(
  context: DeprecatedStreamContext,
  streamId: string
): Promise<boolean> {
  return Boolean(await context.DeprecatedStream.get(streamId));
}

/**
 * Checks if the token address is exempted from deprecation rules.
 */
function isExemptedAsset(asset: Envio.Address): boolean {
  const EXEMPTED_ASSETS = [
    "0xbea586a167853adddef12818f264f1f9823fbc18", // esEXA on Optimism (10)
    "0x111123ea4cee28cf010703593a8a2a3bbb91756c", // ARA on Base (8453)
    "0x70c4430f9d98b4184a4ef3e44ce10c320a8b7383", // GYFI on Ethereum (1)
  ];
  return EXEMPTED_ASSETS.includes(asset);
}
