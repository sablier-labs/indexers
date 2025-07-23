import * as envioQueries from "./setup/queries-envio";
import * as theGraphQueries from "./setup/queries-the-graph";
import {
  Envio,
  EnvioRefactored,
  TheGraph,
  TheGraphRefactored,
} from "./setup/networking";
import { cleanup } from "./setup/cleanup";
import { chainId, configuration, SKIP_CLEANUP } from "./setup/constants";

describe(`Campaigns (Chain Id: ${chainId}, Envio: ${configuration.endpoint.Envio})`, () => {
  test("First 100 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      subgraphId: 99999,
      chainId,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  });

  test("Get campaignById results are the same", async () => {
    const variables = {
      airdropId: configuration.airdropIds[0],
    } as const;

    const received = cleanup.campaign(
      await Envio(envioQueries.getCampaignById, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaign(
      await TheGraph(theGraphQueries.getCampaignById, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    expect(received.actions).toEqual(expected.actions);
  });

  test("Get actions by airdrop results are the same", async () => {
    const variables = {
      first: 100,
      airdropId: configuration.airdropIds[0],
      subgraphId: 99999,
      chainId,
    } as const;

    const received = cleanup.actions(
      await Envio(envioQueries.getActions_ByCampaign, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.actions(
      await TheGraph(theGraphQueries.getActions_ByCampaign, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.actions.length}, ${expected.actions.length} results.`,
    );

    expect(received.actions.length).toBeGreaterThan(0);
    expect(received.actions.length).toEqual(expected.actions.length);
    expect(received.actions).toEqual(expected.actions);
  });

  test("Get 100 campaigns by asset results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      chainId,
      asset: configuration.asset,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByAsset, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByAsset, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  });

  test("Get campaignsByIds results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      airdropIds: configuration.airdropIds,
      chainId,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByIds, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  });

  test("Get campaignsByAdmin results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      admin: configuration.admin,
      chainId,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByAdmin, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByAdmin, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  });

  test("Get getCampaigns_ByAdminByAsset results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      admin: configuration.admin,
      chainId,
      asset: configuration.asset,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByAdminByAsset, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByAdminByAsset, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  });

  test("Get getCampaigns_ByAdminByIds results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      admin: configuration.admin,
      chainId,
      airdropIds: configuration.airdropIds,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByAdminByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByAdminByIds, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  });

  test("All entries are the same (asc)", async () => {
    const received = { campaigns: [] } as ReturnType<typeof cleanup.campaigns>;
    const expected = { campaigns: [] } as ReturnType<typeof cleanup.campaigns>;

    const variables = {
      first: 1000,
      subgraphId: 0,
      chainId,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.campaigns(
        await Envio(envioQueries.getCampaigns_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      const expected_slice = cleanup.campaigns(
        await TheGraph(theGraphQueries.getCampaigns_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      received.campaigns.push(...received_slice.campaigns);
      expected.campaigns.push(...expected_slice.campaigns);

      const expected_subgraphId =
        expected_slice.campaigns?.[variables.first - 1]?.subgraphId;
      const received_subgraphId =
        received_slice.campaigns?.[variables.first - 1]?.subgraphId;

      if (
        received_slice.campaigns.length < variables.first &&
        expected_slice.campaigns.length < variables.first
      ) {
        done = true;
      } else if (
        !expected_subgraphId ||
        expected_subgraphId !== received_subgraphId
      ) {
        done = true;
      } else {
        variables.subgraphId = parseInt(
          expected_slice.campaigns[variables.first - 1].subgraphId,
        );
      }
    }

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  }, 500000 /* test is sometimes slow due to query to theGraph */);
});

describe(`Campaigns pre and post refactor - The Graph-`, () => {
  test.only("All entries are the same (asc)", async () => {
    const received = { campaigns: [] } as ReturnType<typeof cleanup.campaigns>;
    const expected = { campaigns: [] } as ReturnType<typeof cleanup.campaigns>;

    const variables = {
      first: 1000,
      subgraphId: 0,
      chainId,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.campaigns(
        await TheGraphRefactored(theGraphQueries.getCampaigns_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      const expected_slice = cleanup.campaigns(
        await TheGraph(theGraphQueries.getCampaigns_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      received.campaigns.push(...received_slice.campaigns);
      expected.campaigns.push(...expected_slice.campaigns);

      const expected_subgraphId =
        expected_slice.campaigns?.[variables.first - 1]?.subgraphId;
      const received_subgraphId =
        received_slice.campaigns?.[variables.first - 1]?.subgraphId;

      if (
        received_slice.campaigns.length < variables.first &&
        expected_slice.campaigns.length < variables.first
      ) {
        done = true;
      } else if (
        !expected_subgraphId ||
        expected_subgraphId !== received_subgraphId
      ) {
        done = true;
      } else {
        variables.subgraphId = parseInt(
          expected_slice.campaigns[variables.first - 1].subgraphId,
        );
      }
    }

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  }, 500000 /* test is sometimes slow due to query to theGraph */);
});

describe(`Campaigns pre and post refactor - Envio-`, () => {
  test("First 100 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      subgraphId: 0,
      chainId,
    } as const;

    const received = cleanup.campaigns(
      await EnvioRefactored(envioQueries.getCampaigns_Asc, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_Asc, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    console.log("c1 id: ", received.campaigns[0].id);
    console.log("c2 id: ", expected.campaigns[0].id);
    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  }, 1000000);
  test.only("All entries are the same (asc)", async () => {
    const received = { campaigns: [] } as ReturnType<typeof cleanup.campaigns>;
    const expected = { campaigns: [] } as ReturnType<typeof cleanup.campaigns>;

    const variables = {
      first: 1000,
      subgraphId: 0,
      chainId,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.campaigns(
        await EnvioRefactored(envioQueries.getCampaigns_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      const expected_slice = cleanup.campaigns(
        await Envio(envioQueries.getCampaigns_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      received.campaigns.push(...received_slice.campaigns);
      expected.campaigns.push(...expected_slice.campaigns);

      const expected_subgraphId =
        expected_slice.campaigns?.[variables.first - 1]?.subgraphId;
      const received_subgraphId =
        received_slice.campaigns?.[variables.first - 1]?.subgraphId;

      if (
        received_slice.campaigns.length < variables.first &&
        expected_slice.campaigns.length < variables.first
      ) {
        done = true;
      } else if (
        !expected_subgraphId ||
        expected_subgraphId !== received_subgraphId
      ) {
        done = true;
      } else {
        variables.subgraphId = parseInt(
          expected_slice.campaigns[variables.first - 1].subgraphId,
        );
      }
    }

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  }, 500000 /* test is sometimes slow due to query to theGraph */);
});
