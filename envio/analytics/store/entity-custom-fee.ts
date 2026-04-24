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
 * Lockup v3.0+, Flow v2.0+, and Airdrops v2.0+. A `newMinFeeUSD` of `0n` is stored
 * verbatim (the Comptroller emits `UpdateCustomFeeUSD` for zero as an explicit
 * override, not a reset). Skips protocols not covered by the Analytics schema
 * (Staking, Bob).
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

  commit(context, {
    ...entity,
    [field]: newMinFeeUSD,
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

  commit(context, {
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

  commit(context, {
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

/**
 * Persists the entity, or deletes it when every fee field has been cleared. A row
 * represents at least one active custom-fee override; once all overrides are gone
 * there is no reason to keep the row around.
 */
function commit(context: HandlerContext, entity: Entity<"CustomFee">): void {
  const hasAnyFee =
    entity.airdropsFeeUSD !== undefined ||
    entity.flowFeeUSD !== undefined ||
    entity.lockupFeeUSD !== undefined ||
    entity.merkleFactoryV13Fee !== undefined;

  if (hasAnyFee) {
    context.CustomFee.set(entity);
  } else {
    // `CustomFee` is a leaf entity — no other entity references it — so the
    // referential-integrity caveat behind `deleteUnsafe` does not apply here.
    context.CustomFee.deleteUnsafe(entity.id);
  }
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
