import { USDC } from "../../bindings/src/Handlers.gen";
import { TREASURY } from "../../helpers";
import { processTransferEvent } from "./processor";

USDC.Transfer.handler(
  async ({ context, event }) => {
    await processTransferEvent(context, event);
  },
  {
    eventFilters: () => [{ to: TREASURY }],
    wildcard: true,
  }
);
