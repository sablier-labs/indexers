import type { Logger } from "envio";
import { createEffect, S } from "envio";
import { sablier } from "sablier";

const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 500;
const MISS_RETRIES = 2;
const MISS_RETRY_DELAY_MS = 300;
const TIMEOUT_MS = 30_000;
const TX_NOT_FOUND = /transaction not found/iu;

const TRACE_METHODS = ["debug_traceTransaction", "trace_transaction"] as const;
type TraceMethod = (typeof TRACE_METHODS)[number];

const TRANSIENT_RPC_CODES = new Set([-32_005, -32_603]);
const UNSUPPORTED_RPC_CODES = new Set([-32_601, -32_053]);
const UNSUPPORTED_MESSAGE =
  /method not found|invalid method|not supported|not available|does not exist|not allowed/iu;
/** Generic phrases like "does not exist" also describe missing transactions, so they must name the method. */
const MENTIONS_METHOD = /method|debug_|trace_/iu;

/**
 * Consecutive transactions per `chainId:method` whose trace ended with an unsupported-method answer. RouteMesh can
 * return such an answer from one upstream while others serve the method, so a method is skipped for the chain only once
 * the streak reaches `UNSUPPORTED_STREAK_LIMIT`. Any other answer proves that the chain serves the method and resets the
 * streak.
 */
const UNSUPPORTED_STREAK_LIMIT = 3;
const unsupportedStreaks = new Map<string, number>();

/**
 * Sums the native value that successful `CALL` frames sent to `contract` in a transaction, i.e. the `msg.value` the
 * contract received. `null` means no trace was available, which is distinct from a traced zero.
 */
export const fetchNativeValueReceived = createEffect(
  {
    cache: true,
    input: S.tuple((t) => ({
      chainId: t.item(0, S.number),
      contract: t.item(2, S.string),
      txHash: t.item(1, S.string),
    })),
    name: "nativeValueReceived",
    output: S.nullable(S.string),
    rateLimit: { calls: 20, per: "second" },
  },
  async ({ context, input }) => {
    const value = await traceNativeValueReceived(
      context.log,
      input.chainId,
      input.txHash,
      input.contract
    );
    if (value === undefined) {
      context.cache = false;
      return null;
    }
    return value.toString();
  }
);

/* -------------------------------------------------------------------------- */
/*                                   PARSERS                                  */
/* -------------------------------------------------------------------------- */

export type CallTracerFrame = {
  /** Absent when the node ignores the `callTracer` option and answers with struct logs. */
  type?: string;
  from?: string;
  to?: string;
  value?: string;
  error?: string;
  calls?: CallTracerFrame[];
};

export type ParityTraceFrame = {
  type: string;
  action: { callType?: string; from?: string; to?: string; value?: string; input?: string };
  error?: string;
  traceAddress: number[];
};

/**
 * Parses a `debug_traceTransaction` callTracer result. Returns undefined when no successful `CALL` frame targets the
 * contract, which means the trace is unusable since the contract emitted an event in this transaction.
 */
export function sumCallTracerValue(root: CallTracerFrame, contract: string): bigint | undefined {
  const target = contract.toLowerCase();
  let found = false;
  let sum = 0n;

  const stack: CallTracerFrame[] = [root];
  while (stack.length > 0) {
    const frame = stack.pop() as CallTracerFrame;
    // A reverted frame reverts its whole subtree.
    if (frame.error) {
      continue;
    }
    // ZK-stack chains return `Call` instead of `CALL`.
    if (frame.type?.toUpperCase() === "CALL" && frame.to?.toLowerCase() === target) {
      found = true;
      sum += BigInt(frame.value ?? "0x0");
    }
    stack.push(...(frame.calls ?? []));
  }

  return found ? sum : undefined;
}

/**
 * Parses a `trace_transaction` result. Returns undefined when the result is not a frame list or no successful `call`
 * frame targets the contract.
 */
export function sumParityTraceValue(
  frames: ParityTraceFrame[],
  contract: string
): bigint | undefined {
  if (!Array.isArray(frames)) {
    return undefined;
  }
  const target = contract.toLowerCase();
  const reverted = frames.filter((frame) => frame.error).map((frame) => frame.traceAddress);
  const isReverted = (address: number[]) =>
    reverted.some(
      (prefix) =>
        prefix.length <= address.length && prefix.every((index, i) => index === address[i])
    );

  let found = false;
  let sum = 0n;
  for (const frame of frames) {
    if (
      frame.type !== "call" ||
      frame.action.callType !== "call" ||
      frame.action.to?.toLowerCase() !== target ||
      isReverted(frame.traceAddress)
    ) {
      continue;
    }
    found = true;
    sum += BigInt(frame.action.value ?? "0x0");
  }

  return found ? sum : undefined;
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

/**
 * Traces the transaction through RouteMesh only: viem's fallback transport surfaces the last public RPC's error, which
 * makes error classification unreliable. Returns undefined when no method yields a usable trace, and throws on
 * transient failures so that the handler fails closed instead of recording nondeterministic data.
 */
export async function traceNativeValueReceived(
  logger: Logger,
  chainId: number,
  txHash: string,
  contract: string
): Promise<bigint | undefined> {
  const apiKey = process.env.ENVIO_ROUTEMESH_API_KEY;
  const url = apiKey ? sablier.chains.getOrThrow(chainId).rpc.routemesh?.(apiKey) : undefined;
  if (!url) {
    logger.debug("No RouteMesh endpoint for call traces", { chainId });
    return undefined;
  }

  // Methods run sequentially: each one is tried only when the previous one yields no usable trace.
  const tryMethods = async ([method, ...rest]: TraceMethod[]): Promise<bigint | undefined> => {
    if (method === undefined) {
      return undefined;
    }
    const value = await traceWithMethod(logger, chainId, url, method, txHash, contract);
    return value ?? tryMethods(rest);
  };
  return await tryMethods(
    TRACE_METHODS.filter(
      (method) => (unsupportedStreaks.get(`${chainId}:${method}`) ?? 0) < UNSUPPORTED_STREAK_LIMIT
    )
  );
}

/** Returns undefined when the method yields no usable trace, and tracks the chain's unsupported-method streak. */
async function traceWithMethod(
  logger: Logger,
  chainId: number,
  url: string,
  method: TraceMethod,
  txHash: string,
  contract: string
): Promise<bigint | undefined> {
  const params =
    method === "debug_traceTransaction" ? [txHash, { tracer: "callTracer" }] : [txHash];
  const response = await traceWithMissRetries(url, method, params);
  const streakKey = `${chainId}:${method}`;

  if ("error" in response && isUnsupported(response.error)) {
    const { code, message } = response.error;
    const streak = (unsupportedStreaks.get(streakKey) ?? 0) + 1;
    unsupportedStreaks.set(streakKey, streak);
    logger.debug("Call trace method unsupported", { chainId, code, message, method, streak });
    return undefined;
  }
  unsupportedStreaks.delete(streakKey);

  if ("error" in response) {
    const { code, message } = response.error;
    logger.warn("Call trace unavailable", { chainId, code, message, method, txHash });
    return undefined;
  }

  const { result } = response;
  if (isEmptyResult(result)) {
    logger.warn("Call trace unavailable", { chainId, message: "empty result", method, txHash });
    return undefined;
  }

  const value =
    method === "debug_traceTransaction"
      ? sumCallTracerValue(result as CallTracerFrame, contract)
      : sumParityTraceValue(result as ParityTraceFrame[], contract);
  if (value === undefined) {
    logger.warn("Call trace has no successful CALL into the contract", {
      chainId,
      contract,
      method,
      txHash,
    });
  }
  return value;
}

type RpcError = { code: number; message: string };
type RpcResponse = { result: unknown } | { error: RpcError };

class TransientRpcError extends Error {}

function isUnsupported({ code, message }: RpcError): boolean {
  return (
    UNSUPPORTED_RPC_CODES.has(code) ||
    (UNSUPPORTED_MESSAGE.test(message) && MENTIONS_METHOD.test(message))
  );
}

function isEmptyResult(result: unknown): boolean {
  return !result || (typeof result === "object" && Object.keys(result).length === 0);
}

/**
 * RouteMesh load-balances across upstreams, some of which occasionally miss a transaction that exists or answer that
 * the method is unsupported while others serve it. Retries the same method on a null result, a "transaction not found"
 * error, or an unsupported-method error before giving up on the method for this transaction.
 */
async function traceWithMissRetries(
  url: string,
  method: TraceMethod,
  params: unknown[],
  attempt = 0
): Promise<RpcResponse> {
  const response = await rpcRequest(url, method, params);
  const isMiss =
    "error" in response
      ? TX_NOT_FOUND.test(response.error.message) || isUnsupported(response.error)
      : isEmptyResult(response.result);
  if (!isMiss || attempt >= MISS_RETRIES) {
    return response;
  }
  await sleep(MISS_RETRY_DELAY_MS * (attempt + 1));
  return traceWithMissRetries(url, method, params, attempt + 1);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Sends one JSON-RPC request, retrying transient failures. Returns the JSON-RPC result or a non-transient error object.
 */
async function rpcRequest(
  url: string,
  method: TraceMethod,
  params: unknown[],
  attempt = 0
): Promise<RpcResponse> {
  try {
    return await rpcRequestOnce(url, method, params);
  } catch (error) {
    if (!(error instanceof TransientRpcError) || attempt >= MAX_RETRIES) {
      throw error;
    }
    await sleep(RETRY_BASE_DELAY_MS * 2 ** attempt);
    return rpcRequest(url, method, params, attempt + 1);
  }
}

async function rpcRequestOnce(
  url: string,
  method: TraceMethod,
  params: unknown[]
): Promise<RpcResponse> {
  let response: Response;
  try {
    response = await fetch(url, {
      body: JSON.stringify({ id: 1, jsonrpc: "2.0", method, params }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (cause) {
    // Network failures and timeouts.
    throw new TransientRpcError(`${method} request failed`, { cause });
  }

  const { status } = response;
  if (status === 408 || status === 429 || status >= 500) {
    throw new TransientRpcError(`${method} failed with HTTP ${status}`);
  }

  const body = (await response.json().catch(() => undefined)) as
    | { result?: unknown; error?: Partial<RpcError> }
    | undefined;
  if (body?.error) {
    const error = { code: Number(body.error.code), message: String(body.error.message ?? "") };
    if (TRANSIENT_RPC_CODES.has(error.code)) {
      throw new TransientRpcError(`${method} failed with JSON-RPC ${error.code}: ${error.message}`);
    }
    return { error };
  }
  if (!response.ok || !body) {
    throw new Error(`${method} failed with HTTP ${status} and no JSON-RPC error`);
  }
  return { result: body.result };
}
