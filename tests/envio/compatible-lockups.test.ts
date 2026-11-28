/// <reference types="vite/client" />

import { sablier } from "sablier";
import { chains, contracts, Version } from "sablier/evm";
import type { Address } from "viem";
import { zeroAddress } from "viem";
import { describe, expect, it, vi } from "vitest";
import { getCompatibleLockupAddresses } from "../../contracts/compatible-lockups.js";
import type { Envio } from "../../envio/common/bindings.js";
import { isOfficialLockup } from "../../envio/common/helpers.js";

type Registration = { contract: string; event: string };
type Handler = (input: {
  context: ReturnType<typeof createContext>;
  event: Envio.Event;
}) => void | Promise<void>;

const indexer = vi.hoisted(() => ({
  contractRegister: vi.fn<(options: Registration, handler: Handler) => void>(),
  onEvent: vi.fn<(options: Registration, handler: Handler) => void>(),
}));

vi.mock("envio", async (importOriginal) => ({
  ...(await importOriginal<typeof import("envio")>()),
  indexer,
}));

// Load the real handlers without requiring Envio's generated indexer types in the root TS project.
import.meta.glob(
  [
    "../../envio/airdrops/mappings/v1.1/SablierV2MerkleStreamerFactory.ts",
    "../../envio/airdrops/mappings/v*/**/create-l[lt].ts",
  ],
  { eager: true }
);

const { names } = contracts;
const chainId = chains.sepolia.id;
const asset = "0x1000000000000000000000000000000000000001";
const campaignAddress = "0x2000000000000000000000000000000000000002";
const admin = "0x3000000000000000000000000000000000000003";

function deployedAddress(
  protocol: "airdrops" | "lockup",
  version: Version.Airdrops | Version.Lockup,
  contractName: string,
  deploymentChainId: number = chainId
): Address {
  const release = sablier.releases.get({ protocol, version });
  const deployment =
    release && sablier.contracts.get({ chainId: deploymentChainId, contractName, release });
  if (!deployment) {
    throw new Error(`Missing ${contractName} ${version} on ${deploymentChainId}`);
  }
  return deployment.address;
}

const linearV11 = deployedAddress("lockup", Version.Lockup.V1_1, names.SABLIER_V2_LOCKUP_LINEAR);
const linearV12 = deployedAddress("lockup", Version.Lockup.V1_2, names.SABLIER_V2_LOCKUP_LINEAR);
const tranchedV12 = deployedAddress(
  "lockup",
  Version.Lockup.V1_2,
  names.SABLIER_V2_LOCKUP_TRANCHED
);
const dynamicV12 = deployedAddress("lockup", Version.Lockup.V1_2, names.SABLIER_V2_LOCKUP_DYNAMIC);
const lockupV2 = deployedAddress("lockup", Version.Lockup.V2_0, names.SABLIER_LOCKUP);
const lockupV3 = deployedAddress("lockup", Version.Lockup.V3_0, names.SABLIER_LOCKUP);
const lockupV4 = deployedAddress("lockup", Version.Lockup.V4_0, names.SABLIER_LOCKUP);
const mainnetLockupV3 = deployedAddress(
  "lockup",
  Version.Lockup.V3_0,
  names.SABLIER_LOCKUP,
  chains.mainnet.id
);

function createEvent(srcAddress: Address, params: Record<string, unknown> = {}): Envio.Event {
  return {
    block: { hash: "0x01", number: 1, timestamp: 1_700_000_000 },
    chainId,
    logIndex: 0,
    params,
    srcAddress,
    transaction: { from: admin, hash: "0x02", to: srcAddress, transactionIndex: 0, value: 0n },
  };
}

function createContext(campaign = "") {
  const add = vi.fn();
  const store = () => ({ get: vi.fn(), set: vi.fn() });
  return {
    Action: store(),
    Asset: store(),
    Campaign: store(),
    chain: { [campaign]: { add } },
    effect: vi.fn().mockResolvedValue({ decimals: 18, name: "Test Token", symbol: "TEST" }),
    Factory: store(),
    log: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
    Tranche: store(),
    Watcher: store(),
  };
}

describe("Lockup admission", () => {
  it("keeps the legacy Linear and Tranched addresses in release order", () => {
    expect(getCompatibleLockupAddresses(chainId, Version.Airdrops.V1_2)).toEqual(
      [linearV11, linearV12, tranchedV12].map((address) => address.toLowerCase())
    );
  });

  it("distinguishes a chain with no compatible releases from a chain with no Lockups", () => {
    expect(getCompatibleLockupAddresses(chains.zksyncSepolia.id, Version.Airdrops.V3_0)).toEqual(
      []
    );
    expect(getCompatibleLockupAddresses(-1, Version.Airdrops.V3_0)).toBeUndefined();
  });

  it.each([
    [Version.Airdrops.V2_0, lockupV2, false],
    [Version.Airdrops.V2_0, lockupV3, true],
    [Version.Airdrops.V1_3, lockupV2, true],
    [Version.Airdrops.V1_2, dynamicV12, false],
    [Version.Airdrops.V2_0, mainnetLockupV3, false],
    [Version.Airdrops.V2_0, zeroAddress, false],
  ] as const)("checks %s against %s on Sepolia (admit=%s)", (airdropsVersion, address, admit) => {
    const { log } = createContext();
    expect(isOfficialLockup(log, createEvent(zeroAddress), address, { airdropsVersion })).toBe(
      admit
    );
  });

  it("admits unknown addresses in private analytics before looking up deployments", () => {
    const { log } = createContext();
    const releases = vi.spyOn(sablier.releases, "getAll");
    try {
      expect(isOfficialLockup(log, createEvent(zeroAddress), zeroAddress, { allowAll: true })).toBe(
        true
      );
      expect(releases).not.toHaveBeenCalled();
      expect(log.debug).not.toHaveBeenCalled();
    } finally {
      releases.mockRestore();
    }
  });
});

const { V1_1, V1_2, V1_3, V2_0, V3_0 } = Version.Airdrops;
const mappings = [
  [
    V1_1,
    "LL",
    names.SABLIER_V2_MERKLE_STREAMER_FACTORY,
    names.SABLIER_V2_MERKLE_STREAMER_LL,
    linearV11,
    dynamicV12,
  ],
  [
    V1_2,
    "LL",
    names.SABLIER_V2_MERKLE_LOCKUP_FACTORY,
    names.SABLIER_V2_MERKLE_LL,
    linearV12,
    dynamicV12,
  ],
  [
    V1_2,
    "LT",
    names.SABLIER_V2_MERKLE_LOCKUP_FACTORY,
    names.SABLIER_V2_MERKLE_LT,
    tranchedV12,
    dynamicV12,
  ],
  [V1_3, "LL", names.SABLIER_MERKLE_FACTORY, names.SABLIER_MERKLE_LL, lockupV2, lockupV3],
  [V1_3, "LT", names.SABLIER_MERKLE_FACTORY, names.SABLIER_MERKLE_LT, lockupV2, lockupV3],
  [V2_0, "LL", names.SABLIER_FACTORY_MERKLE_LL, names.SABLIER_MERKLE_LL, lockupV3, lockupV2],
  [V2_0, "LT", names.SABLIER_FACTORY_MERKLE_LT, names.SABLIER_MERKLE_LT, lockupV3, lockupV2],
  [V3_0, "LL", names.SABLIER_FACTORY_MERKLE_LL, names.SABLIER_MERKLE_LL, lockupV4, lockupV3],
  [V3_0, "LT", names.SABLIER_FACTORY_MERKLE_LT, names.SABLIER_MERKLE_LT, lockupV4, lockupV3],
] as const;

function campaignParams(version: Version.Airdrops, role: "LL" | "LT", lockup: Address) {
  const common = {
    aggregateAmount: 10n,
    expiration: 0n,
    ipfsCID: "ipfs",
    merkleRoot: "0xab",
    recipientCount: 1n,
  };
  const streamDurations = { cliff: 0n, total: 100n };
  const tranchesWithPercentages = [
    { duration: 100n, unlockPercentage: 1_000_000_000_000_000_000n },
  ];
  const tranches = { totalDuration: 100n, tranchesWithPercentages };
  const flags = { cancelable: true, transferable: true };
  if (version === V1_1) {
    return {
      ...common,
      ...flags,
      admin,
      asset,
      lockupLinear: lockup,
      merkleStreamer: campaignAddress,
      recipientsCount: 1n,
      streamDurations,
    };
  }

  const campaign = role === "LL" ? { merkleLL: campaignAddress } : { merkleLT: campaignAddress };
  const baseParams = {
    campaignName: "Test Campaign",
    expiration: common.expiration,
    initialAdmin: admin,
    ipfsCID: common.ipfsCID,
    merkleRoot: common.merkleRoot,
    shape: "",
    token: asset,
  };
  if (version === V1_2) {
    const legacyLockup =
      role === "LL"
        ? { lockupLinear: lockup, streamDurations }
        : { ...tranches, lockupTranched: lockup };
    return {
      ...common,
      ...campaign,
      ...legacyLockup,
      baseParams: {
        ...flags,
        asset,
        expiration: common.expiration,
        initialAdmin: admin,
        ipfsCID: common.ipfsCID,
        merkleRoot: common.merkleRoot,
        name: baseParams.campaignName,
      },
    };
  }

  const schedule = {
    cliffDuration: 0n,
    cliffPercentage: 0n,
    startPercentage: 0n,
    startTime: 0n,
    totalDuration: 100n,
  };
  if (version === V1_3) {
    return {
      ...common,
      ...campaign,
      ...flags,
      ...tranches,
      baseParams,
      fee: 0n,
      lockup,
      schedule,
      streamStartTime: 0n,
    };
  }

  const constructorParams = {
    ...baseParams,
    ...flags,
    ...tranches,
    campaignStartTime: 0n,
    cliffDuration: 0n,
    cliffUnlockPercentage: 0n,
    lockup,
    startUnlockPercentage: 0n,
    vestingStartTime: 0n,
  };
  return {
    ...common,
    ...campaign,
    minFeeUSD: 0n,
    totalDuration: 100n,
    ...(version === V2_0 ? { params: constructorParams } : { campaignParams: constructorParams }),
  };
}

describe("Public Airdrops Lockup mappings", () => {
  it.each(mappings)(
    "enforces admission in %s Merkle%s registration and event processing",
    async (version, role, factory, campaign, accepted, rejected) => {
      const versionSuffix = version.replace(".", "_");
      const contract = `${factory}_${versionSuffix}`;
      const eventName = version === V1_1 ? "CreateMerkleStreamerLL" : `CreateMerkle${role}`;
      const matchingEvent = ([options]: [Registration, Handler]) =>
        options.contract === contract && options.event === eventName;
      const register = indexer.contractRegister.mock.calls.find(matchingEvent)?.[1];
      const handler = indexer.onEvent.mock.calls.find(matchingEvent)?.[1];
      if (!register || !handler) {
        throw new Error(`Missing callbacks for ${contract}.${eventName}`);
      }
      const srcAddress = deployedAddress("airdrops", version, factory);
      const campaignContract = `${campaign}_${versionSuffix}`;

      const rejectedContext = createContext(campaignContract);
      const rejectedEvent = createEvent(srcAddress, campaignParams(version, role, rejected));
      await register({ context: rejectedContext, event: rejectedEvent });
      await handler({ context: rejectedContext, event: rejectedEvent });

      expect(rejectedContext.chain[campaignContract].add).not.toHaveBeenCalled();
      expect(rejectedContext.effect).not.toHaveBeenCalled();
      for (const entity of [
        "Action",
        "Asset",
        "Campaign",
        "Factory",
        "Tranche",
        "Watcher",
      ] as const) {
        expect(rejectedContext[entity].get, entity).not.toHaveBeenCalled();
        expect(rejectedContext[entity].set, entity).not.toHaveBeenCalled();
      }

      const acceptedContext = createContext(campaignContract);
      const acceptedEvent = createEvent(srcAddress, campaignParams(version, role, accepted));
      await register({ context: acceptedContext, event: acceptedEvent });
      await handler({ context: acceptedContext, event: acceptedEvent });

      expect(acceptedContext.chain[campaignContract].add).toHaveBeenCalledExactlyOnceWith(
        campaignAddress
      );
      expect(acceptedContext.effect).toHaveBeenCalledExactlyOnceWith(expect.anything(), {
        address: asset,
        chainId,
      });
      expect(acceptedContext.Asset.set).toHaveBeenCalledTimes(1);
      expect(acceptedContext.Factory.set).toHaveBeenLastCalledWith(
        expect.objectContaining({ campaignCounter: 1n })
      );
      expect(acceptedContext.Campaign.set).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ address: campaignAddress, lockup: accepted })
      );
      expect(acceptedContext.Action.set).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ category: "Create" })
      );
      expect(acceptedContext.Watcher.set).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ actionCounter: 2n, campaignCounter: 2n })
      );
    }
  );
});
