/**
 * @see {@link: file://./../schema.graphql}
 */
import { formatEther } from "viem";
import type { Envio } from "../../common/bindings";
import { getDateTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { Id } from "../helpers";

type Params = {
  admin: string;
  airdropContract: string | undefined;
  amount: bigint;
  contractType: "Airdrops" | "Flow" | "Lockup";
};

export async function create(context: HandlerContext, event: Envio.Event, params: Params): Promise<void> {
  const { admin, airdropContract, amount, contractType } = params;

  const id = Id.feesCollectionTransaction(event.chainId, event.transaction.hash, event.logIndex);

  // Check if already exists
  const existing = await context.FeesCollectionTransaction.get(id);
  if (existing) {
    return;
  }

  const transaction: Entity.FeesCollectionTransaction = {
    admin: admin.toLowerCase(),
    airdropContract: airdropContract?.toLowerCase(),
    amount: Number(formatEther(amount)),
    block: BigInt(event.block.number),
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress.toLowerCase(),
    contractType,
    hash: event.transaction.hash,
    id,
    logIndex: BigInt(event.logIndex),
    timestamp: getDateTimestamp(event.block.timestamp),
  };

  context.FeesCollectionTransaction.set(transaction);
}
