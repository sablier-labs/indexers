import { Protocol } from "sablier/evm";
import { describe, expect, it } from "vitest";
import { getIndexerKeyForProtocol, getProtocolForIndexerKey } from "../../src/indexers/mappers.js";

describe("getIndexerKeyForProtocol", () => {
  it("maps airdrops → airdrops", () => {
    expect(getIndexerKeyForProtocol("airdrops")).toBe("airdrops");
  });

  it("maps flow → streams", () => {
    expect(getIndexerKeyForProtocol("flow")).toBe("streams");
  });

  it("maps lockup → streams", () => {
    expect(getIndexerKeyForProtocol("lockup")).toBe("streams");
  });
});

describe("getProtocolForIndexerKey", () => {
  it("maps airdrops → Protocol.Airdrops", () => {
    expect(getProtocolForIndexerKey("airdrops")).toBe(Protocol.Airdrops);
  });

  it("maps streams → Protocol.Lockup (canonical)", () => {
    expect(getProtocolForIndexerKey("streams")).toBe(Protocol.Lockup);
  });
});
