import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { resolveEventHandler as resolve } from "../cli/commands/codegen/graph-manifest/event-resolver.js";
import { FileSystemLive } from "../cli/services/filesystem.js";

function runResolveEventHandler(...args: Parameters<typeof resolve>) {
  return Effect.runPromise(resolve(...args).pipe(Effect.provide(FileSystemLive)));
}

describe("Event handlers", () => {
  describe("Resolver function", () => {
    it("should resolve simple event without indexed params", async () => {
      const actual = await runResolveEventHandler("streams", {
        contractName: "SablierFlow",
        eventName: "MetadataUpdate",
        indexers: ["streams"],
        protocol: "flow",
        version: "v1.0",
      });

      const expectedEvent = "MetadataUpdate(uint256)";
      const expectedHandler = "handle_SablierFlow_v1_0_MetadataUpdate";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });

    it("should resolve simple event with indexed params", async () => {
      const actual = await runResolveEventHandler("streams", {
        contractName: "SablierFlow",
        eventName: "Approval",
        indexers: ["streams"],
        protocol: "flow",
        version: "v1.0",
      });

      const expectedEvent = "Approval(indexed address,indexed address,indexed uint256)";
      const expectedHandler = "handle_SablierFlow_v1_0_Approval";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });

    it("should resolve event handler for event with tuple", async () => {
      const actual = await runResolveEventHandler("streams", {
        contractName: "SablierV2LockupLinear",
        eventName: "CreateLockupLinearStream",
        indexers: ["streams"],
        protocol: "lockup",
        version: "v1.0",
      });

      const expectedEvent =
        "CreateLockupLinearStream(uint256,address,indexed address,indexed address,(uint128,uint128,uint128),indexed address,bool,(uint40,uint40,uint40),address)";
      const expectedHandler = "handle_SablierV2LockupLinear_v1_0_CreateLockupLinearStream";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });

    it("should resolve event handler for event with arrays of tuples", async () => {
      const actual = await runResolveEventHandler("streams", {
        contractName: "SablierV2LockupDynamic",
        eventName: "CreateLockupDynamicStream",
        indexers: ["streams"],
        protocol: "lockup",
        version: "v1.0",
      });

      const expectedEvent =
        "CreateLockupDynamicStream(uint256,address,indexed address,indexed address,(uint128,uint128,uint128),indexed address,bool,(uint128,uint64,uint40)[],(uint40,uint40),address)";
      const expectedHandler = "handle_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });

    it("should resolve event handler for event with tuple nested within tuple", async () => {
      const actual = await runResolveEventHandler("streams", {
        contractName: "SablierLockup",
        eventName: "CreateLockupLinearStream",
        indexers: ["streams"],
        protocol: "lockup",
        version: "v2.0",
      });

      const expectedEvent =
        "CreateLockupLinearStream(indexed uint256,(address,address,address,(uint128,uint128),address,bool,bool,(uint40,uint40),string,address),uint40,(uint128,uint128))";
      const expectedHandler = "handle_SablierLockup_v2_0_CreateLockupLinearStream";

      expect(actual).toBeDefined();
      expect(actual!.event).toBe(expectedEvent);
      expect(actual!.handler).toBe(expectedHandler);
    });
  });
});
