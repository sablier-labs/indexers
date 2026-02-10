import { formatUnits } from "viem";
import type { HandlerContext } from "../bindings/src/Types";
import { Id, USDC_DECIMALS } from "../helpers";
import type { TransferEvent } from "./types";

export async function getOrCreate(context: HandlerContext, event: TransferEvent) {
  const address = event.transaction.from as string;
  const id = Id.user(event.chainId, address);
  const user = await context.User.get(id);

  if (user) {
    const totalAmount = user.totalAmount + event.params.value;
    const updated = {
      ...user,
      actionCount: user.actionCount + 1,
      totalAmount,
      totalAmountScaled: formatUnits(totalAmount, USDC_DECIMALS),
    };
    context.User.set(updated);
    return updated;
  }

  const newUser = {
    actionCount: 1,
    address,
    chainId: event.chainId,
    id,
    totalAmount: event.params.value,
    totalAmountScaled: formatUnits(event.params.value, USDC_DECIMALS),
  };
  context.User.set(newUser);
  return newUser;
}
