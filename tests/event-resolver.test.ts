import { describe, expect, it } from "vitest";
import { resolveEventHandler as resolve } from "../codegen/graph-manifest/event-resolver";

describe("Event handlers", () => {
  describe("Resolver function", () => {
    it("should resolve simple event without indexed params", () => {
      const actual = resolve("flow", {
        contractName: "SablierFlow",
        eventName: "MetadataUpdate",
        indexers: ["flow"],
        protocol: "flow",
        version: "v1.0",
      });

      const expectedEvent = "MetadataUpdate(uint256)";
      const expectedHandler = "handle_SablierFlow_v1_0_MetadataUpdate";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });

    it("should resolve simple event with indexed params", () => {
      const actual = resolve("flow", {
        contractName: "SablierFlow",
        eventName: "Approval",
        indexers: ["flow"],
        protocol: "flow",
        version: "v1.0",
      });

      const expectedEvent = "Approval(indexed address,indexed address,indexed uint256)";
      const expectedHandler = "handle_SablierFlow_v1_0_Approval";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });

    it("should resolve event handler for event with tuple", () => {
      const actual = resolve("lockup", {
        contractName: "SablierV2LockupLinear",
        eventName: "CreateLockupLinearStream",
        indexers: ["lockup"],
        protocol: "lockup",
        version: "v1.0",
      });

      // See https://github.com/sablier-labs/lockup/blob/v1.0/src/interfaces/ISablierV2LockupLinear.sol#L28-L38
      const expectedEvent =
        "CreateLockupLinearStream(uint256,address,indexed address,indexed address,(uint128,uint128,uint128),indexed address,bool,(uint40,uint40,uint40),address)";
      const expectedHandler = "handle_SablierV2LockupLinear_v1_0_CreateLockupLinearStream";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });

    it("should resolve event handler for event with arrays of tuples", () => {
      const actual = resolve("lockup", {
        contractName: "SablierV2LockupDynamic",
        eventName: "CreateLockupDynamicStream",
        indexers: ["lockup"],
        protocol: "lockup",
        version: "v1.0",
      });

      // See https://github.com/sablier-labs/lockup/blob/v1.0/src/interfaces/ISablierV2LockupDynamic.sol#L28-L39
      const expectedEvent =
        "CreateLockupDynamicStream(uint256,address,indexed address,indexed address,(uint128,uint128,uint128),indexed address,bool,(uint128,uint64,uint40)[],(uint40,uint40),address)";
      const expectedHandler = "handle_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });

    it("should resolve event handler for event with tuple nested within tuple", () => {
      const actual = resolve("lockup", {
        contractName: "SablierLockup",
        eventName: "CreateLockupLinearStream",
        indexers: ["lockup"],
        protocol: "lockup",
        version: "v2.0",
      });

      // See https://github.com/sablier-labs/lockup/blob/v2.0/src/interfaces/ISablierLockup.sol#L22-L33
      const expectedEvent =
        "CreateLockupLinearStream(indexed uint256,(address,address,address,(uint128,uint128),address,bool,bool,(uint40,uint40),string,address),uint40,(uint128,uint128))";
      const expectedHandler = "handle_SablierLockup_v2_0_CreateLockupLinearStream";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });
  });
});
