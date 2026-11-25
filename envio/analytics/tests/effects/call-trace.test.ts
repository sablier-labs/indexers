import type { Logger } from "envio";
import { sablier } from "sablier";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CallTracerFrame, ParityTraceFrame } from "../../effects/call-trace.js";
import { sumCallTracerValue, sumParityTraceValue } from "../../effects/call-trace.js";

const CONTRACT = "0x6e0bad2c077d699841f1929b45bfb93fafbed395";
const OTHER = "0x00000000000000000000000000000000000000aa";
const WRAPPER = "0x00000000000000000000000000000000000000bb";
const TX_HASH = "0x2cd4334f8f4fd583d8ad9b92fa4bb694d5d34eb66564fa939237139df9a736b6";

const mockLogger = {
  debug: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
} satisfies Logger;

/* -------------------------------------------------------------------------- */
/*                                   PARSERS                                  */
/* -------------------------------------------------------------------------- */

function frame(overrides: Partial<CallTracerFrame>): CallTracerFrame {
  return { from: WRAPPER, to: CONTRACT, type: "CALL", value: "0x0", ...overrides };
}

function parity(
  traceAddress: number[],
  action: ParityTraceFrame["action"],
  overrides: Partial<ParityTraceFrame> = {}
): ParityTraceFrame {
  return {
    action: { callType: "call", from: WRAPPER, ...action },
    traceAddress,
    type: "call",
    ...overrides,
  };
}

describe("sumCallTracerValue", () => {
  it("sums the value of every CALL into the contract", () => {
    const root = frame({
      to: WRAPPER,
      value: "0x100",
      calls: [
        frame({ value: "0x10" }),
        frame({ calls: [frame({ value: "0x5" })], to: OTHER, value: "0x1" }),
      ],
    });
    expect(sumCallTracerValue(root, CONTRACT)).toBe(0x15n);
  });

  it("excludes reverted subtrees, including nested calls", () => {
    const root = frame({
      to: WRAPPER,
      calls: [
        frame({ value: "0x1" }),
        frame({ error: "execution reverted", value: "0x2" }),
        frame({ calls: [frame({ value: "0x4" })], error: "out of gas", to: OTHER }),
      ],
    });
    expect(sumCallTracerValue(root, CONTRACT)).toBe(1n);
  });

  it("ignores non-CALL frame types", () => {
    const root = frame({
      to: WRAPPER,
      calls: [
        frame({ value: "0x1" }),
        frame({ type: "DELEGATECALL", value: "0x2" }),
        frame({ type: "STATICCALL" }),
        frame({ type: "CALLCODE", value: "0x4" }),
        frame({ type: "CREATE2", value: "0x8" }),
        frame({ type: "SELFDESTRUCT", value: "0x10" }),
      ],
    });
    expect(sumCallTracerValue(root, CONTRACT)).toBe(1n);
  });

  it("matches ZK-stack camelCase frame types", () => {
    const root = frame({
      calls: [frame({ type: "call", value: "0x3" }), frame({ type: "delegateCall", value: "0x7" })],
      to: WRAPPER,
      type: "Call",
    });
    expect(sumCallTracerValue(root, CONTRACT)).toBe(3n);
  });

  it("compares addresses case-insensitively and treats a missing value as zero", () => {
    const root = frame({
      calls: [frame({ to: CONTRACT.toUpperCase().replace("0X", "0x"), value: undefined })],
      to: WRAPPER,
    });
    expect(sumCallTracerValue(root, CONTRACT.toUpperCase())).toBe(0n);
  });

  it("returns undefined when no successful CALL targets the contract", () => {
    const root = frame({
      calls: [frame({ to: OTHER }), frame({ error: "reverted" }), frame({ type: "STATICCALL" })],
      to: WRAPPER,
    });
    expect(sumCallTracerValue(root, CONTRACT)).toBeUndefined();
  });

  it("returns undefined for a struct-logger result, which has no frame types", () => {
    const structLogs: unknown = { failed: false, gas: 21_000, returnValue: "", structLogs: [] };
    expect(sumCallTracerValue(structLogs as CallTracerFrame, CONTRACT)).toBeUndefined();
  });
});

describe("sumParityTraceValue", () => {
  it("sums the value of every call into the contract", () => {
    const frames = [
      parity([], { to: WRAPPER, value: "0x100" }),
      parity([0], { to: CONTRACT, value: "0x10" }),
      parity([1], { to: OTHER, value: "0x1" }),
      parity([1, 0], { to: CONTRACT, value: "0x5" }),
    ];
    expect(sumParityTraceValue(frames, CONTRACT)).toBe(0x15n);
  });

  it("excludes reverted frames and every frame nested under them", () => {
    const frames = [
      parity([], { to: WRAPPER, value: "0x0" }),
      parity([0], { to: CONTRACT, value: "0x1" }),
      parity([1], { to: CONTRACT, value: "0x2" }, { error: "Reverted" }),
      parity([2], { to: OTHER, value: "0x0" }, { error: "Reverted" }),
      parity([2, 0], { to: CONTRACT, value: "0x4" }),
      parity([2, 0, 3], { to: CONTRACT, value: "0x8" }),
      parity([20], { to: CONTRACT, value: "0x10" }),
    ];
    expect(sumParityTraceValue(frames, CONTRACT)).toBe(0x11n);
  });

  it("ignores non-call frames and non-call call types", () => {
    const frames = [
      parity([], { to: WRAPPER, value: "0x0" }),
      parity([0], { to: CONTRACT, value: "0x1" }),
      parity([1], { callType: "delegatecall", to: CONTRACT, value: "0x2" }),
      parity([2], { callType: "staticcall", to: CONTRACT, value: "0x0" }),
      parity([3], { callType: "callcode", to: CONTRACT, value: "0x4" }),
      parity([4], { callType: undefined, to: CONTRACT, value: "0x8" }, { type: "create" }),
      parity([5], { callType: undefined, to: CONTRACT, value: "0x10" }, { type: "suicide" }),
    ];
    expect(sumParityTraceValue(frames, CONTRACT)).toBe(1n);
  });

  it("compares addresses case-insensitively", () => {
    const frames = [parity([0], { to: CONTRACT.toUpperCase().replace("0X", "0x"), value: "0x2" })];
    expect(sumParityTraceValue(frames, CONTRACT)).toBe(2n);
  });

  it("returns a zero sum when the contract received zero-value calls", () => {
    const frames = [
      parity([], { to: WRAPPER, value: "0x628d3a4b6e9a0000" }),
      parity([0], { to: CONTRACT, value: "0x0" }),
      parity([1], { to: CONTRACT, value: "0x0" }),
    ];
    expect(sumParityTraceValue(frames, CONTRACT)).toBe(0n);
  });

  it("returns undefined when no successful call targets the contract", () => {
    const frames = [
      parity([], { to: WRAPPER, value: "0x0" }),
      parity([0], { to: CONTRACT, value: "0x1" }, { error: "Reverted" }),
      parity([1], { callType: "delegatecall", to: CONTRACT, value: "0x0" }),
    ];
    expect(sumParityTraceValue(frames, CONTRACT)).toBeUndefined();
  });

  it("returns undefined when the result is not a frame list", () => {
    const result: unknown = { output: "0x" };
    expect(sumParityTraceValue(result as ParityTraceFrame[], CONTRACT)).toBeUndefined();
  });
});

/* -------------------------------------------------------------------------- */
/*                                    FETCH                                   */
/* -------------------------------------------------------------------------- */

const CHAIN_ID = 1;
const CHAIN_WITHOUT_ROUTEMESH = 5845;
const API_KEY = "test-key";

const CALL_TRACER_RESULT = frame({ calls: [frame({ value: "0x7" })], to: WRAPPER });
const PARITY_RESULT = [
  parity([], { to: WRAPPER, value: "0x0" }),
  parity([0], { to: CONTRACT, value: "0x9" }),
];

const fetchMock = vi.fn<typeof fetch>();

type TraceFn = typeof import("../../effects/call-trace.js").traceNativeValueReceived;
let traceNativeValueReceived: TraceFn;

function rpcResult(result: unknown): Response {
  return Response.json({ id: 1, jsonrpc: "2.0", result });
}

function rpcError(code: number, message: string): Response {
  return Response.json({ error: { code, message }, id: 1, jsonrpc: "2.0" });
}

function calledMethods(): string[] {
  return fetchMock.mock.calls.map(([, init]) => JSON.parse(String(init?.body)).method);
}

function countCalls(method: string): number {
  return calledMethods().filter((called) => called === method).length;
}

function unsupportedDebug(): Response {
  return rpcError(-32_053, "API key is not allowed to access method");
}

/** Answers each request by its method; trace_transaction defaults to a usable parity trace. */
function routeByMethod(debug: () => Response, traceTx = () => rpcResult(PARITY_RESULT)): void {
  fetchMock.mockImplementation((_url, init) =>
    Promise.resolve(
      JSON.parse(String(init?.body)).method === "debug_traceTransaction" ? debug() : traceTx()
    )
  );
}

/** Runs the trace while advancing fake timers through retry delays. */
async function trace(chainId = CHAIN_ID): Promise<bigint | undefined> {
  const promise = traceNativeValueReceived(mockLogger, chainId, TX_HASH, CONTRACT);
  promise.catch(() => undefined);
  await vi.runAllTimersAsync();
  return promise;
}

describe("traceNativeValueReceived", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.stubEnv("ENVIO_ROUTEMESH_API_KEY", API_KEY);
    vi.stubGlobal("fetch", fetchMock);
    // Reset the module-level unsupported-method streaks.
    vi.resetModules();
    ({ traceNativeValueReceived } = await import("../../effects/call-trace.js"));
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("tries debug_traceTransaction with callTracer first, on the RouteMesh endpoint", async () => {
    fetchMock.mockResolvedValueOnce(rpcResult(CALL_TRACER_RESULT));

    await expect(trace()).resolves.toBe(7n);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(sablier.chains.getOrThrow(CHAIN_ID).rpc.routemesh?.(API_KEY));
    expect(JSON.parse(String(init?.body))).toMatchObject({
      method: "debug_traceTransaction",
      params: [TX_HASH, { tracer: "callTracer" }],
    });
  });

  it("retries an unsupported answer on the same method and keeps the method on success", async () => {
    fetchMock
      .mockResolvedValueOnce(rpcError(-32_053, "API key is not allowed to access method"))
      .mockResolvedValueOnce(rpcResult(CALL_TRACER_RESULT))
      .mockResolvedValueOnce(rpcResult(CALL_TRACER_RESULT));

    await expect(trace()).resolves.toBe(7n);
    await expect(trace()).resolves.toBe(7n);
    expect(calledMethods()).toEqual([
      "debug_traceTransaction",
      "debug_traceTransaction",
      "debug_traceTransaction",
    ]);
    expect(mockLogger.warn).not.toHaveBeenCalled();
  });

  it("memoizes a method after three consecutive unsupported transactions", async () => {
    routeByMethod(() => rpcError(-32_601, "the method debug_traceTransaction does not exist"));

    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(9n);
    // Each transaction tries the method once plus MISS_RETRIES times before falling through.
    expect(countCalls("debug_traceTransaction")).toBe(9);
    expect(countCalls("trace_transaction")).toBe(3);

    await expect(trace()).resolves.toBe(9n);
    expect(countCalls("debug_traceTransaction")).toBe(9);
    expect(countCalls("trace_transaction")).toBe(4);
    expect(mockLogger.warn).not.toHaveBeenCalled();
  });

  it("resets the unsupported streak after a usable trace", async () => {
    const debugQueue = [
      ...Array.from({ length: 6 }, unsupportedDebug),
      rpcResult(CALL_TRACER_RESULT),
      ...Array.from({ length: 6 }, unsupportedDebug),
    ];
    routeByMethod(() => debugQueue.shift() ?? rpcResult(CALL_TRACER_RESULT));

    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(7n);
    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(9n);
    // Two unsupported transactions since the reset, so the method is still tried.
    await expect(trace()).resolves.toBe(7n);
    expect(countCalls("debug_traceTransaction")).toBe(14);
    expect(countCalls("trace_transaction")).toBe(4);
  });

  it("resets the unsupported streak after any other answer, which proves the method is served", async () => {
    const debugQueue = [
      ...Array.from({ length: 6 }, unsupportedDebug),
      rpcError(-32_000, "missing trie node abc (path ) <nil>"),
      ...Array.from({ length: 6 }, unsupportedDebug),
    ];
    routeByMethod(() => debugQueue.shift() ?? rpcResult(CALL_TRACER_RESULT));

    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(9n);
    await expect(trace()).resolves.toBe(9n);
    // Two unsupported transactions since the per-transaction failure, so the method is still tried.
    await expect(trace()).resolves.toBe(7n);
    expect(countCalls("debug_traceTransaction")).toBe(14);
  });

  it("returns undefined without a request once both methods are memoized", async () => {
    routeByMethod(unsupportedDebug, () => rpcError(-32_000, "Method not found"));

    await expect(trace()).resolves.toBeUndefined();
    await expect(trace()).resolves.toBeUndefined();
    await expect(trace()).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(18);

    await expect(trace()).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(18);
  });

  it("falls through to trace_transaction when debug_traceTransaction is unavailable for the tx", async () => {
    fetchMock
      .mockResolvedValueOnce(rpcError(-32_000, "missing trie node abc (path ) <nil>"))
      .mockResolvedValueOnce(rpcResult(PARITY_RESULT))
      .mockResolvedValueOnce(rpcResult(CALL_TRACER_RESULT));

    await expect(trace()).resolves.toBe(9n);
    expect(mockLogger.warn).toHaveBeenCalledWith(
      "Call trace unavailable",
      expect.objectContaining({
        chainId: CHAIN_ID,
        message: expect.stringContaining("missing trie node"),
        method: "debug_traceTransaction",
      })
    );
    // Unavailability is per transaction, so the method is not memoized.
    await expect(trace()).resolves.toBe(7n);
    expect(calledMethods()).toEqual([
      "debug_traceTransaction",
      "trace_transaction",
      "debug_traceTransaction",
    ]);
  });

  it("treats a trace with no successful CALL into the contract as unusable", async () => {
    fetchMock
      .mockResolvedValueOnce(rpcResult(frame({ to: WRAPPER })))
      .mockResolvedValueOnce(rpcResult(PARITY_RESULT));

    await expect(trace()).resolves.toBe(9n);
    expect(calledMethods()).toEqual(["debug_traceTransaction", "trace_transaction"]);
  });

  it("retries a null result on the same method before succeeding", async () => {
    fetchMock
      .mockResolvedValueOnce(rpcResult(null))
      .mockResolvedValueOnce(rpcResult(null))
      .mockResolvedValueOnce(rpcResult(CALL_TRACER_RESULT));

    await expect(trace()).resolves.toBe(7n);
    expect(calledMethods()).toEqual([
      "debug_traceTransaction",
      "debug_traceTransaction",
      "debug_traceTransaction",
    ]);
    expect(mockLogger.warn).not.toHaveBeenCalled();
  });

  it("falls through after exhausting retries on misses", async () => {
    fetchMock
      .mockResolvedValueOnce(rpcResult(null))
      .mockResolvedValueOnce(rpcError(-32_000, "transaction not found"))
      .mockResolvedValueOnce(rpcResult(null))
      .mockResolvedValueOnce(rpcError(-32_000, "transaction not found"))
      .mockResolvedValueOnce(rpcResult([]))
      .mockResolvedValueOnce(rpcResult([]));

    await expect(trace()).resolves.toBeUndefined();
    expect(calledMethods()).toEqual([
      "debug_traceTransaction",
      "debug_traceTransaction",
      "debug_traceTransaction",
      "trace_transaction",
      "trace_transaction",
      "trace_transaction",
    ]);
    expect(mockLogger.warn).toHaveBeenCalledTimes(2);
  });

  it("retries transient HTTP failures and then throws", async () => {
    fetchMock.mockImplementation(async () => new Response("busy", { status: 503 }));

    await expect(trace()).rejects.toThrow("debug_traceTransaction failed with HTTP 503");
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it("throws on a persistent JSON-RPC internal error", async () => {
    fetchMock.mockImplementation(async () => rpcError(-32_603, "internal error"));

    await expect(trace()).rejects.toThrow("JSON-RPC -32603");
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it("recovers from a network failure on retry", async () => {
    fetchMock
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockResolvedValueOnce(new Response("", { status: 429 }))
      .mockResolvedValueOnce(rpcResult(CALL_TRACER_RESULT));

    await expect(trace()).resolves.toBe(7n);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("returns undefined without a request when the API key is unset", async () => {
    vi.stubEnv("ENVIO_ROUTEMESH_API_KEY", "");

    await expect(trace()).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns undefined without a request when the chain has no RouteMesh URL", async () => {
    await expect(trace(CHAIN_WITHOUT_ROUTEMESH)).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
