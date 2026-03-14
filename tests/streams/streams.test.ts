import { describe } from "vitest";
import { createStreamsTest } from "./create-test.js";
import { DeployedFlow, DeployedLockup, LocalFlow, LocalLockup } from "./queries.js";

const DEPLOYED_FLOW_ENDPOINT = "https://indexer.hyperindex.xyz/3b4ea6b/v1/graphql";
const DEPLOYED_LOCKUP_ENDPOINT = "https://indexer.hyperindex.xyz/53b7e25/v1/graphql";
const LOCAL_STREAMS_ENDPOINT = "http://localhost:8080/v1/graphql";

describe("Streams indexer — Sepolia", () => {
  describe("Flow", () => {
    createStreamsTest({
      label: "Flow streams",
      deployed: {
        endpoint: DEPLOYED_FLOW_ENDPOINT,
        query: DeployedFlow.getStreams,
      },
      local: {
        endpoint: LOCAL_STREAMS_ENDPOINT,
        query: LocalFlow.getStreams,
      },
    });

    createStreamsTest({
      label: "Flow actions",
      deployed: {
        endpoint: DEPLOYED_FLOW_ENDPOINT,
        query: DeployedFlow.getActions,
      },
      local: {
        endpoint: LOCAL_STREAMS_ENDPOINT,
        query: LocalFlow.getActions,
      },
    });
  });

  describe("Lockup", () => {
    createStreamsTest({
      label: "Lockup streams",
      deployed: {
        endpoint: DEPLOYED_LOCKUP_ENDPOINT,
        query: DeployedLockup.getStreams,
      },
      local: {
        endpoint: LOCAL_STREAMS_ENDPOINT,
        query: LocalLockup.getStreams,
      },
    });

    createStreamsTest({
      label: "Lockup actions",
      deployed: {
        endpoint: DEPLOYED_LOCKUP_ENDPOINT,
        query: DeployedLockup.getActions,
      },
      local: {
        endpoint: LOCAL_STREAMS_ENDPOINT,
        query: LocalLockup.getActions,
      },
    });
  });
});
