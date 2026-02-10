import { formatUnits } from "viem";
import type { HandlerContext } from "../bindings/src/Types";
import { Id, USDC_DECIMALS } from "../helpers";
import type { TransferEvent } from "./types";

export function create(context: HandlerContext, event: TransferEvent, userEntityId: string) {
  const id = Id.action(event.chainId, event.transaction.hash, event.logIndex);
  context.Action.set({
    amount: event.params.value,
    amountScaled: formatUnits(event.params.value, USDC_DECIMALS),
    block: event.block.number,
    chainId: event.chainId,
    from: event.params.from,
    id,
    logIndex: event.logIndex,
    sender: event.transaction.from as string,
    timestamp: event.block.timestamp,
    to: event.params.to,
    txHash: event.transaction.hash,
    user_id: userEntityId,
  });
}
