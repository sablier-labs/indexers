import {
  Envio,
  EnvioRefactored,
  TheGraph,
  TheGraphRefactored,
} from "./setup/networking";
import { cleanup } from "./setup/cleanup";
import {
  CHAIN_ETHEREUM_ID,
  chainId,
  configuration,
  POWER_SKIP_SUBGRAPH_ID_ASC,
  SKIP_CLEANUP,
} from "./setup/constants";
import * as envioQueries from "./setup/queries-envio";
import * as theGraphQueries from "./setup/queries-the-graph";

describe(`Streams (Chain Id: ${chainId}, Envio: ${configuration.endpoint.Envio})`, () => {
  test("First 100 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("First 100 results from subgraph creation", async () => {
    const variables = {
      first: 100,
      chainId,
      subgraphId: 0,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_Asc, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_Asc, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender and recipient and ids and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      sender: configuration.sender.toLowerCase(),
      token: configuration.token.toLowerCase(),
      streamIds: configuration.streamIds,
    } as const;

    const received = cleanup.streams(
      await Envio(
        envioQueries.getStreams_BySenderByRecipientByIdsByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySenderByRecipientByIdsByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender or recipient or token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      sender: configuration.sender.toLowerCase(),
      token: configuration.token.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(
        envioQueries.getStreams_BySender_Or_ByRecipient_Or_ByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySender_Or_ByRecipient_Or_ByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender and recipient and ids yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      sender: configuration.sender.toLowerCase(),
      streamIds: configuration.streamIds,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySenderByRecipientByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySenderByRecipientByIds,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender and ids and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      sender: configuration.sender.toLowerCase(),
      token: configuration.token.toLowerCase(),
      streamIds: configuration.streamIds,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySenderByIdsByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySenderByIdsByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by recipient and ids and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      token: configuration.token.toLowerCase(),
      streamIds: configuration.streamIds,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByRecipientByIdsByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_ByRecipientByIdsByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender and recipient and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      sender: configuration.sender.toLowerCase(),
      token: configuration.token.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(
        envioQueries.getStreams_BySenderByRecipientByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySenderByRecipientByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter recipient and ids yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      streamIds: configuration.streamIds,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByRecipientByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByRecipientByIds, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender and ids yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      sender: configuration.sender.toLowerCase(),
      streamIds: configuration.streamIds,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySenderByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_BySenderByIds, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender and recipient yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      sender: configuration.sender.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySenderByRecipient, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_BySenderByRecipient, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by ids and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      token: configuration.token.toLowerCase(),
      streamIds: configuration.streamIds,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByIdsByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByIdsByToken, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by recipient and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      token: configuration.token.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByRecipientByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByRecipientByToken, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      sender: configuration.sender.toLowerCase(),
      token: configuration.token.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySenderByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_BySenderByToken, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender or recipient yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
      sender: configuration.sender.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySender_Or_ByRecipient, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySender_Or_ByRecipient,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by sender yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      sender: configuration.sender.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySender, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_BySender, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by recipient yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      recipient: configuration.recipient.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByRecipient, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByRecipient, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by ids yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      streamIds: configuration.streamIds,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByIds, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("Filter by token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
      token: configuration.token.toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByToken, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("All entries are the same (asc)", async () => {
    const received = { streams: [] } as ReturnType<typeof cleanup.streams>;
    const expected = { streams: [] } as ReturnType<typeof cleanup.streams>;

    const variables = {
      first: 1000,
      chainId,
      subgraphId: [CHAIN_ETHEREUM_ID].includes(chainId)
        ? POWER_SKIP_SUBGRAPH_ID_ASC
        : 0,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.streams(
        await Envio(envioQueries.getStreams_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      const expected_slice = cleanup.streams(
        await TheGraph(theGraphQueries.getStreams_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      received.streams.push(...received_slice.streams);
      expected.streams.push(...expected_slice.streams);

      const expected_subgraphId =
        expected_slice.streams?.[variables.first - 1]?.subgraphId;
      const received_subgraphId =
        received_slice.streams?.[variables.first - 1]?.subgraphId;

      if (
        received_slice.streams.length < variables.first &&
        expected_slice.streams.length < variables.first
      ) {
        done = true;
      } else if (
        !expected_subgraphId ||
        expected_subgraphId !== received_subgraphId
      ) {
        done = true;
      } else {
        variables.subgraphId = parseInt(
          expected_slice.streams[variables.first - 1].subgraphId,
        );
      }
    }

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  }, 1000000 /* test is sometimes slow due to query to theGraph */);

  test("All alias entries are the same (asc)", async () => {
    const received = { streams: [] } as ReturnType<typeof cleanup.streams>;
    const expected = { streams: [] } as ReturnType<typeof cleanup.streams>;

    const variables = {
      first: 1000,
      subgraphId: [CHAIN_ETHEREUM_ID].includes(chainId)
        ? POWER_SKIP_SUBGRAPH_ID_ASC
        : 0,
      chainId,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.streams(
        await Envio(envioQueries.getStreamAliases_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      const expected_slice = cleanup.streams(
        await TheGraph(theGraphQueries.getStreamAliases_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      received.streams.push(...received_slice.streams);
      expected.streams.push(...expected_slice.streams);

      const expected_subgraphId =
        expected_slice.streams?.[variables.first - 1]?.subgraphId;
      const received_subgraphId =
        received_slice.streams?.[variables.first - 1]?.subgraphId;

      if (
        received_slice.streams.length < variables.first &&
        expected_slice.streams.length < variables.first
      ) {
        done = true;
      } else if (
        !expected_subgraphId ||
        expected_subgraphId !== received_subgraphId
      ) {
        done = true;
      } else {
        variables.subgraphId = parseInt(
          expected_slice.streams[variables.first - 1].subgraphId,
        );
      }
    }

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  }, 500000 /* test is sometimes slow due to query to theGraph */);
});

describe(`Streams pre and post refactor -The GRAPH-`, () => {
  test.only("First 100 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
    } as const;

    const received = cleanup.streams(
      await TheGraphRefactored(theGraphQueries.getStreams, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });
  test("All entries are the same (asc)", async () => {
    const received = { streams: [] } as ReturnType<typeof cleanup.streams>;
    const expected = { streams: [] } as ReturnType<typeof cleanup.streams>;

    const variables = {
      first: 1000,
      chainId,
      subgraphId: [CHAIN_ETHEREUM_ID].includes(chainId)
        ? POWER_SKIP_SUBGRAPH_ID_ASC
        : 0,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.streams(
        await TheGraphRefactored(theGraphQueries.getStreams_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      const expected_slice = cleanup.streams(
        await TheGraph(theGraphQueries.getStreams_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      received.streams.push(...received_slice.streams);
      expected.streams.push(...expected_slice.streams);

      const expected_subgraphId =
        expected_slice.streams?.[variables.first - 1]?.subgraphId;
      const received_subgraphId =
        received_slice.streams?.[variables.first - 1]?.subgraphId;

      if (
        received_slice.streams.length < variables.first &&
        expected_slice.streams.length < variables.first
      ) {
        done = true;
      } else if (
        !expected_subgraphId ||
        expected_subgraphId !== received_subgraphId
      ) {
        done = true;
      } else {
        variables.subgraphId = parseInt(
          expected_slice.streams[variables.first - 1].subgraphId,
        );
      }
    }

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  }, 1000000 /* test is sometimes slow due to query to theGraph */);
});

describe.only(`Streams pre and post refactor -Envio-`, () => {
  test("First 100 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId,
    } as const;

    const received = cleanup.streams(
      await EnvioRefactored(envioQueries.getStreams, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await Envio(envioQueries.getStreams, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    console.log("id", received.streams[0].id);
    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });
  test.only("All entries are the same (asc)", async () => {
    const received = { streams: [] } as ReturnType<typeof cleanup.streams>;
    const expected = { streams: [] } as ReturnType<typeof cleanup.streams>;

    const variables = {
      first: 1000,
      chainId,
      subgraphId: [CHAIN_ETHEREUM_ID].includes(chainId)
        ? POWER_SKIP_SUBGRAPH_ID_ASC
        : 0,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.streams(
        await Envio(envioQueries.getStreams_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      const expected_slice = cleanup.streams(
        await EnvioRefactored(envioQueries.getStreams_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      received.streams.push(...received_slice.streams);
      expected.streams.push(...expected_slice.streams);

      const expected_subgraphId =
        expected_slice.streams?.[variables.first - 1]?.subgraphId;
      const received_subgraphId =
        received_slice.streams?.[variables.first - 1]?.subgraphId;

      if (
        received_slice.streams.length < variables.first &&
        expected_slice.streams.length < variables.first
      ) {
        done = true;
      } else if (
        !expected_subgraphId ||
        expected_subgraphId !== received_subgraphId
      ) {
        done = true;
      } else {
        variables.subgraphId = parseInt(
          expected_slice.streams[variables.first - 1].subgraphId,
        );
      }
    }

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  }, 1000000 /* test is sometimes slow due to query to theGraph */);
});
