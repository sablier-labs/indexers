/**
 * @see {@link: file://./../schema.graphql}
 */

import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { formatEther } from "viem";
import type { Envio } from "../../common/bindings";
import { getDateTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { Id } from "../helpers";

type Params = {
  admin: string;
  airdropCampaign: string | undefined;
  amount: bigint;
  protocol: Sablier.Protocol;
};

export async function create(context: HandlerContext, event: Envio.Event, params: Params): Promise<void> {
  const { admin, airdropCampaign, amount, protocol } = params;

  const id = Id.feeCollectionTransaction(event.chainId, event.transaction.hash, event.logIndex);

  // Check if already exists
  const existing = await context.FeeCollectionTransaction.get(id);
  if (existing) {
    return;
  }

  const chain = sablier.chains.getOrThrow(event.chainId);
  const currency = chain.nativeCurrency.symbol;

  const transaction: Entity.FeeCollectionTransaction = {
    admin: admin.toLowerCase(),
    airdropCampaign: airdropCampaign?.toLowerCase(),
    amount: Number(formatEther(amount)),
    block: BigInt(event.block.number),
    caller: event.transaction.from?.toLowerCase() || "",
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress.toLowerCase(),
    currency,
    hash: event.transaction.hash,
    id,
    logIndex: BigInt(event.logIndex),
    protocol,
    timestamp: getDateTimestamp(event.block.timestamp),
  };

  context.FeeCollectionTransaction.set(transaction);
}
