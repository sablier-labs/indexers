import type { HandlerContext } from "../../bindings/src/Types";
import { Store } from "../../store";
import type { TransferEvent } from "../../store/types";
import { validateTransfer } from "./validation";

export async function processTransferEvent(
  context: HandlerContext,
  event: TransferEvent
): Promise<void> {
  const validation = validateTransfer(event);
  if (!validation.isValid) {
    return;
  }

  const user = await Store.User.getOrCreate(context, event);

  Store.Action.create(context, event, user.id);
}
