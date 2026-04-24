/**
 * @see {@link: file://./../analytics.graphql}
 */

import type { Envio } from "../../common/bindings.js";
import type { Entity, HandlerContext } from "../bindings.js";
import { Id } from "../helpers/index.js";

/**
 * Matches the `ISablierComptroller.Protocol` enum.
 * @see https://github.com/sablier-labs/utils/blob/main/src/interfaces/ISablierComptroller.sol
 */
const ProtocolEnum = {
  Airdrops: 0n,
  Flow: 1n,
  Lockup: 2n,
} as const;

type ComptrollerFeeParams = {
  newMinFeeUSD: bigint;
  protocol: bigint;
  user: string;
};

type MerkleFactoryV13FeeParams = {
  campaignCreator: string;
  customFee: bigint;
};

type MerkleFactoryV13ResetParams = {
  campaignCreator: string;
};

/**
 * Upserts the Comptroller custom min-fee for a `(user, protocol)` pair. Applies to
 * Lockup v3.0+, Flow v2.0+, and Airdrops v2.0+. Treats `newMinFeeUSD === 0n` as a
 * disable (nulls the matching protocol field). Skips protocols not covered by the
 * Analytics schema (Staking, Bob).
 */
export async function upsertComptrollerFee(
  context: HandlerContext,
  event: Envio.Event,
  params: ComptrollerFeeParams
): Promise<void> {
  const { newMinFeeUSD, protocol, user } = params;

  const field = resolveComptrollerField(protocol);
  if (!field) {
    return;
  }

  const entity = await loadOrInit(context, event, user);
  const newValue = newMinFeeUSD === 0n ? undefined : newMinFeeUSD;

  context.CustomFee.set({
    ...entity,
    [field]: newValue,
  });
}

/**
 * Upserts the SablierMerkleFactory v1.3 per-campaign-creator fee. Applies to Airdrops
 * v1.3 only — affects only *newly-created* campaigns.
 */
export async function upsertMerkleFactoryV13Fee(
  context: HandlerContext,
  event: Envio.Event,
  params: MerkleFactoryV13FeeParams
): Promise<void> {
  const { campaignCreator, customFee } = params;

  const entity = await loadOrInit(context, event, campaignCreator);

  context.CustomFee.set({
    ...entity,
    merkleFactoryV13Fee: customFee,
  });
}

/**
 * Clears the SablierMerkleFactory v1.3 per-campaign-creator fee.
 */
export async function resetMerkleFactoryV13Fee(
  context: HandlerContext,
  event: Envio.Event,
  params: MerkleFactoryV13ResetParams
): Promise<void> {
  const { campaignCreator } = params;

  const entity = await loadOrInit(context, event, campaignCreator);

  context.CustomFee.set({
    ...entity,
    merkleFactoryV13Fee: undefined,
  });
}

async function loadOrInit(
  context: HandlerContext,
  event: Envio.Event,
  user: string
): Promise<Entity<"CustomFee">> {
  const id = Id.customFee(event.chainId, user);
  const existing = await context.CustomFee.get(id);
  if (existing) {
    return existing;
  }
  return {
    airdropsFeeUSD: undefined,
    chainId: BigInt(event.chainId),
    flowFeeUSD: undefined,
    id,
    lockupFeeUSD: undefined,
    merkleFactoryV13Fee: undefined,
    user: user.toLowerCase(),
  };
}

function resolveComptrollerField(
  protocol: bigint
): "airdropsFeeUSD" | "flowFeeUSD" | "lockupFeeUSD" | undefined {
  switch (protocol) {
    case ProtocolEnum.Airdrops:
      return "airdropsFeeUSD";
    case ProtocolEnum.Flow:
      return "flowFeeUSD";
    case ProtocolEnum.Lockup:
      return "lockupFeeUSD";
    default:
      return undefined;
  }
}
