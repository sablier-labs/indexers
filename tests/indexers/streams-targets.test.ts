import { Protocol } from "sablier/evm";
import { mainnet } from "sablier/evm/chains";
import { describe, expect, it } from "vitest";
import { INDEXER_KEYS } from "../../cli/constants.js";
import { envio } from "../../src/indexers/envio.js";
import { getEnvioDeployment } from "../../src/indexers/envio-deployments.js";
import { getIndexer, getIndexerEnvio, getIndexerGraph } from "../../src/indexers/getters.js";
import { getProtocolGraphIndexer, graph } from "../../src/indexers/graph.js";

describe("streams deployment targets", () => {
  it("reuses the internal lockup target on The Graph", () => {
    const streams = getIndexerGraph({ chainId: mainnet.id, indexer: "streams" });
    const lockup = getProtocolGraphIndexer({ chainId: mainnet.id, protocol: Protocol.Lockup });

    expect(streams).toBeDefined();
    expect(lockup).toBeDefined();

    if (!streams || !lockup) {
      throw new Error("Expected both Graph indexers to be configured");
    }

    expect(streams).toMatchObject({
      chainId: mainnet.id,
      endpoint: lockup.endpoint,
      explorerURL: lockup.explorerURL,
      indexer: "streams",
      kind: lockup.kind,
      name: lockup.name,
      testingURL: lockup.testingURL,
    });
  });

  it("reuses the public streams target on Envio", () => {
    const streams = getIndexerEnvio({ chainId: mainnet.id, indexer: "streams" });
    const deployment = getEnvioDeployment("streams");

    expect(streams).toBeDefined();

    if (!streams) {
      throw new Error("Expected the Streams Envio indexer to be configured");
    }

    expect(streams).toMatchObject({
      chainId: mainnet.id,
      explorerURL: deployment.explorerURL,
      indexer: "streams",
      name: "sablier-lockup",
    });
    expect(streams.endpoint).toEqual(deployment.endpoint);
  });

  it("keeps flow protocol deployments available for internal Graph callers", () => {
    expect(getProtocolGraphIndexer({ chainId: mainnet.id, protocol: Protocol.Flow })).toMatchObject(
      {
        chainId: mainnet.id,
        indexer: "flow",
        name: "sablier-flow-ethereum",
      }
    );
  });

  it("does not allow querying flow or lockup through the public getter helpers", () => {
    expect(
      getIndexer({
        chainId: mainnet.id,
        indexer: "flow" as never,
        vendor: "graph",
      })
    ).toBeUndefined();
    expect(
      getIndexer({
        chainId: mainnet.id,
        indexer: "lockup" as never,
        vendor: "envio",
      })
    ).toBeUndefined();
    expect(
      getIndexerGraph({
        chainId: mainnet.id,
        indexer: "flow" as never,
      })
    ).toBeUndefined();
    expect(
      getIndexerEnvio({
        chainId: mainnet.id,
        indexer: "lockup" as never,
      })
    ).toBeUndefined();
  });

  it("does not expose flow or lockup in the public registries", () => {
    expect(INDEXER_KEYS).toEqual(["airdrops", "streams"]);
    expect(Object.hasOwn(graph, "flow")).toBe(false);
    expect(Object.hasOwn(graph, "lockup")).toBe(false);
    expect(Object.hasOwn(envio, "flow")).toBe(false);
    expect(Object.hasOwn(envio, "lockup")).toBe(false);
  });
});
