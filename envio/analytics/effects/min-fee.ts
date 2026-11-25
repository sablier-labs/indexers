import type { Logger } from "envio";
import { createEffect, S } from "envio";
import type { Address } from "viem";
import {
  BaseError,
  ContractFunctionRevertedError,
  ContractFunctionZeroDataError,
  parseAbi,
} from "viem";
import { getClient } from "../../common/rpc-clients.js";

export type MinFeeFn = "FEE" | "calculateMinFeeWei";

const MIN_FEE_ABI = parseAbi([
  "function FEE() view returns (uint256)",
  "function calculateMinFeeWei() view returns (uint256)",
  "function calculateMinFeeWei(uint256 streamId) view returns (uint256)",
]);

/**
 * Reads the minimum fee in wei that the contract enforces. `null` means the read failed.
 *
 * This is a lower bound on the fee paid: the contracts enforce `msg.value >= minFeeWei`, and the read reflects
 * end-of-block state rather than the state at the time of the call.
 */
export const fetchMinFeeWei = createEffect(
  {
    cache: true,
    input: S.tuple((t) => ({
      chainId: t.item(0, S.number),
      contract: t.item(1, S.string),
      blockNumber: t.item(2, S.number),
      fn: t.item(3, S.union([S.schema("FEE" as const), S.schema("calculateMinFeeWei" as const)])),
      streamId: t.item(4, S.optional(S.bigint)),
    })),
    name: "minFeeWei",
    output: S.nullable(S.string),
    rateLimit: false,
  },
  async ({ context, input }) => {
    const value = await readMinFeeWei(
      context.log,
      input.chainId,
      input.contract,
      input.blockNumber,
      input.fn,
      input.streamId
    );
    if (value === undefined) {
      context.cache = false;
      return null;
    }
    return value.toString();
  }
);

/**
 * Returns undefined on a non-deterministic failure. A revert or empty return data is a deterministic answer, so it
 * yields zero. `FEE()` is immutable, so it is read at the latest block and `blockNumber` is ignored.
 */
export async function readMinFeeWei(
  logger: Logger,
  chainId: number,
  contract: string,
  blockNumber: number,
  fn: MinFeeFn,
  streamId?: bigint
): Promise<bigint | undefined> {
  const client = getClient(chainId);
  const address = contract as Address;

  try {
    if (fn === "FEE") {
      return await client.readContract({ abi: MIN_FEE_ABI, address, functionName: "FEE" });
    }
    return await client.readContract({
      abi: MIN_FEE_ABI,
      address,
      args: streamId === undefined ? [] : [streamId],
      blockNumber: BigInt(blockNumber),
      functionName: "calculateMinFeeWei",
    });
  } catch (error) {
    const isDeterministic =
      error instanceof BaseError &&
      Boolean(
        error.walk(
          (e) =>
            e instanceof ContractFunctionRevertedError || e instanceof ContractFunctionZeroDataError
        )
      );
    if (isDeterministic) {
      return 0n;
    }
    logger.warn("Failed to read the minimum fee", {
      blockNumber,
      chainId,
      contract,
      // A viem error's `message` embeds the RPC URL, which carries the RouteMesh API key.
      error: error instanceof BaseError ? error.shortMessage : String(error),
      fn,
      streamId: streamId?.toString(),
    });
    return undefined;
  }
}
