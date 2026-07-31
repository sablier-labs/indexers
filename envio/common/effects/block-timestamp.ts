import { createEffect, S } from "envio";
import { getClient } from "../rpc-clients.js";

/**
 * Fetches a block timestamp from RPC. Envio block handlers currently expose only the block number.
 */
export const fetchBlockTimestamp = createEffect(
  {
    cache: true,
    input: S.tuple((t) => ({
      blockNumber: t.item(1, S.number),
      chainId: t.item(0, S.number),
    })),
    name: "blockTimestamp",
    output: S.bigint,
    rateLimit: false,
  },
  async ({ input }) => {
    const client = getClient(input.chainId);
    const block = await client.getBlock({ blockNumber: BigInt(input.blockNumber) });
    return block.timestamp;
  }
);
