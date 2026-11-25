import type { Logger } from "envio";
import {
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
  ContractFunctionZeroDataError,
  HttpRequestError,
} from "viem";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getClient } from "../../../common/rpc-clients.js";
import { readMinFeeWei } from "../../effects/min-fee.js";

vi.mock("../../../common/rpc-clients.js", () => ({ getClient: vi.fn() }));

const readContract = vi.fn();
vi.mocked(getClient).mockReturnValue({ readContract } as unknown as ReturnType<typeof getClient>);

const mockLogger = {
  debug: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
} satisfies Logger;

const CHAIN_ID = 1;
const CONTRACT = "0x00000000000000000000000000000000000000cc";

describe("readMinFeeWei", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads FEE() at the latest block", async () => {
    readContract.mockResolvedValueOnce(5n);

    await expect(readMinFeeWei(mockLogger, CHAIN_ID, CONTRACT, 0, "FEE")).resolves.toBe(5n);
    const [request] = readContract.mock.calls[0];
    expect(request).toMatchObject({ address: CONTRACT, functionName: "FEE" });
    expect(request).not.toHaveProperty("args");
    expect(request).not.toHaveProperty("blockNumber");
  });

  it("reads calculateMinFeeWei() at the event block", async () => {
    readContract.mockResolvedValueOnce(6n);

    await expect(
      readMinFeeWei(mockLogger, CHAIN_ID, CONTRACT, 123, "calculateMinFeeWei")
    ).resolves.toBe(6n);
    expect(readContract.mock.calls[0][0]).toMatchObject({
      address: CONTRACT,
      args: [],
      blockNumber: 123n,
      functionName: "calculateMinFeeWei",
    });
  });

  it("reads calculateMinFeeWei(streamId) at the event block", async () => {
    readContract.mockResolvedValueOnce(7n);

    await expect(
      readMinFeeWei(mockLogger, CHAIN_ID, CONTRACT, 123, "calculateMinFeeWei", 42n)
    ).resolves.toBe(7n);
    expect(readContract.mock.calls[0][0]).toMatchObject({
      address: CONTRACT,
      args: [42n],
      blockNumber: 123n,
      functionName: "calculateMinFeeWei",
    });
  });

  it("returns zero when the call reverts", async () => {
    const revert = new ContractFunctionRevertedError({
      abi: [],
      functionName: "calculateMinFeeWei",
      message: "reverted",
    });
    readContract.mockRejectedValueOnce(
      new ContractFunctionExecutionError(revert, { abi: [], functionName: "calculateMinFeeWei" })
    );

    await expect(
      readMinFeeWei(mockLogger, CHAIN_ID, CONTRACT, 123, "calculateMinFeeWei")
    ).resolves.toBe(0n);
    expect(mockLogger.warn).not.toHaveBeenCalled();
  });

  it("returns zero when the call returns no data", async () => {
    readContract.mockRejectedValueOnce(new ContractFunctionZeroDataError({ functionName: "FEE" }));

    await expect(readMinFeeWei(mockLogger, CHAIN_ID, CONTRACT, 0, "FEE")).resolves.toBe(0n);
  });

  it("returns undefined and warns on any other failure", async () => {
    readContract.mockRejectedValueOnce(
      new HttpRequestError({ status: 503, url: "https://rpc.example/secret-key" })
    );

    await expect(
      readMinFeeWei(mockLogger, CHAIN_ID, CONTRACT, 123, "calculateMinFeeWei", 42n)
    ).resolves.toBeUndefined();
    expect(mockLogger.warn).toHaveBeenCalledWith(
      "Failed to read the minimum fee",
      expect.objectContaining({ chainId: CHAIN_ID, contract: CONTRACT, streamId: "42" })
    );
    // The RPC URL carries the API key, so it must stay out of the logs.
    expect(JSON.stringify(mockLogger.warn.mock.calls)).not.toContain("secret-key");
  });
});
