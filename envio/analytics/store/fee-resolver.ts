import { sablier } from "sablier";
import type { Envio } from "../../common/bindings.js";
import type { HandlerContext } from "../bindings.js";
import { fetchNativeValueReceived } from "../effects/call-trace.js";
import { fetchMinFeeWei } from "../effects/min-fee.js";

export type FeeSource = "TX_VALUE" | "TRACE" | "MIN_FEE";

export type FeePolicy = {
  /** Where this release's fees accumulate until swept. */
  ledger: "contract" | "comptroller" | "none";
  /** On-chain minimum fee enforced for this call, if any. Absent means the fee is voluntary. */
  minFee?: { fn: "FEE" } | { fn: "calculateMinFeeWei"; streamId?: bigint };
};

export const FeePolicies = {
  /** Airdrops v1.3 claims: immutable `FEE()` on the campaign, swept per campaign. */
  airdropFixed: { ledger: "contract", minFee: { fn: "FEE" } },
  /** Airdrops v2.0+ claims: `calculateMinFeeWei()` on the campaign, forwarded to the comptroller. */
  airdropOracle: { ledger: "comptroller", minFee: { fn: "calculateMinFeeWei" } },
  /** Synthetic preset events: fee is supplied by the preset, no reconciliation. */
  preset: { ledger: "none" },
  /** Lockup v3.0+ and Flow v2.0+ withdrawals: `calculateMinFeeWei(streamId)`. */
  streamWithdraw: (streamId: bigint): FeePolicy => ({
    ledger: "comptroller",
    minFee: { fn: "calculateMinFeeWei", streamId },
  }),
  /** Lockup v3.0+ and Flow v2.0+ payable calls with no enforced minimum (creates). */
  voluntaryComptroller: { ledger: "comptroller" },
  /** Lockup v2.0 and Flow v1.1: payable, no minimum, no getter, swept per contract. */
  voluntaryContract: { ledger: "contract" },
} satisfies Record<string, FeePolicy | ((streamId: bigint) => FeePolicy)>;

export type ResolvedFee = { amount: bigint; source: FeeSource };

/** Returns undefined when no fee was paid or none can be established. */
export async function resolveFee(
  context: Pick<HandlerContext, "effect" | "log">,
  event: Envio.Event,
  policy: FeePolicy
): Promise<ResolvedFee | undefined> {
  const { chainId } = event;
  const contract = event.srcAddress.toLowerCase();
  const to = event.transaction.to?.toLowerCase();

  if (to === contract) {
    return toResolvedFee(event.transaction.value, "TX_VALUE");
  }

  // Sablier contracts never forward native value to another fee-charging Sablier contract: BatchLockup and the Merkle
  // factories have no payable functions, and campaigns forward fees only to the comptroller.
  if (to && sablier.contracts.get({ chainId, contractAddress: to })) {
    return undefined;
  }

  const traced = await context.effect(fetchNativeValueReceived, {
    chainId,
    contract,
    txHash: event.transaction.hash,
  });
  if (traced !== null) {
    return toResolvedFee(BigInt(traced), "TRACE");
  }

  if (!policy.minFee) {
    return undefined;
  }

  const isFixed = policy.minFee.fn === "FEE";
  const minFee = await context.effect(fetchMinFeeWei, {
    // `FEE()` is immutable, so a constant block makes the cache hit once per campaign.
    blockNumber: isFixed ? 0 : event.block.number,
    chainId,
    contract,
    fn: policy.minFee.fn,
    streamId: policy.minFee.fn === "calculateMinFeeWei" ? policy.minFee.streamId : undefined,
  });
  return minFee === null ? undefined : toResolvedFee(BigInt(minFee), "MIN_FEE");
}

function toResolvedFee(amount: bigint, source: FeeSource): ResolvedFee | undefined {
  return amount === 0n ? undefined : { amount, source };
}
