import { describe } from "vitest";
import { createGraphStreamsTest } from "./create-test.js";
import { DeployedFlow, DeployedLockup, StreamsFlow, StreamsLockup } from "./queries.js";

const DEPLOYED_FLOW_ENDPOINT =
  "https://api.studio.thegraph.com/query/112500/sablier-flow-sepolia/version/latest";
const DEPLOYED_LOCKUP_ENDPOINT =
  "https://api.studio.thegraph.com/query/112500/sablier-lockup-sepolia/version/latest";
const STREAMS_ENDPOINT =
  "https://api.studio.thegraph.com/query/112500/sablier-streams-sepolia/version/latest";

describe("Graph Streams indexer — Sepolia", () => {
  describe("Flow", () => {
    createGraphStreamsTest({
      label: "Flow streams",
      deployed: {
        endpoint: DEPLOYED_FLOW_ENDPOINT,
        query: DeployedFlow.getStreams,
      },
      streams: {
        endpoint: STREAMS_ENDPOINT,
        query: StreamsFlow.getStreams,
      },
    });

    createGraphStreamsTest({
      label: "Flow actions",
      deployed: {
        endpoint: DEPLOYED_FLOW_ENDPOINT,
        query: DeployedFlow.getActions,
      },
      streams: {
        endpoint: STREAMS_ENDPOINT,
        query: StreamsFlow.getActions,
      },
    });
  });

  describe("Lockup", () => {
    createGraphStreamsTest({
      label: "Lockup streams",
      deployed: {
        endpoint: DEPLOYED_LOCKUP_ENDPOINT,
        query: DeployedLockup.getStreams,
      },
      streams: {
        endpoint: STREAMS_ENDPOINT,
        query: StreamsLockup.getStreams,
      },
    });

    createGraphStreamsTest({
      label: "Lockup actions",
      deployed: {
        endpoint: DEPLOYED_LOCKUP_ENDPOINT,
        query: DeployedLockup.getActions,
      },
      streams: {
        endpoint: STREAMS_ENDPOINT,
        query: StreamsLockup.getActions,
      },
    });
  });
});
