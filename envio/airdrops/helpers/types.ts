import type { Address } from "viem";
import type { Entity, Enum } from "../bindings.js";

export namespace Params {
  export type ActionEntities = {
    campaign: Entity.Campaign;
    watcher: Entity.Watcher;
  };

  export type Action = {
    campaignId: string;
    category: Enum.ActionCategory;
    claimAmount?: bigint;
    claimIndex?: bigint;
    claimRecipient?: Address;
    claimStreamId?: string;
    claimTo?: Address;
    claimTokenId?: bigint;
    clawbackAmount?: bigint;
    clawbackFrom?: Address;
    clawbackTo?: Address;
    fee?: bigint;
    vcaForgoneAmount?: bigint;
  };

  export type CreateEntities = {
    asset: Entity.Asset;
    factory: Entity.Factory;
    watcher: Entity.Watcher;
  };

  export type CreateCampaignBase = {
    admin: Address;
    asset: Address;
    aggregateAmount: bigint;
    campaignAddress: Address;
    campaignStartTime: bigint;
    category: Enum.CampaignCategory;
    expiration: bigint;
    merkleRoot: string;
    minimumFee: bigint | undefined;
    ipfsCID: string;
    name: string | undefined;
    recipientCount: bigint;
  };

  export type CreateCampaignLockup = CreateCampaignBase & {
    cancelable: boolean;
    lockup: Address;
    shape: string | undefined;
    startTime: bigint | undefined;
    transferable: boolean;
    totalDuration: bigint;
  };

  export type CreateCampaignLL = CreateCampaignLockup & {
    category: "LockupLinear";
    cliffDuration: bigint;
    cliffPercentage: bigint | undefined;
    startPercentage: bigint | undefined;
  };

  export type CreateCampaignLT = CreateCampaignLockup & {
    category: "LockupTranched";
    tranchesWithPercentages: TrancheWithPercentage[];
  };

  export type CreateCampaignVCA = CreateCampaignBase & {
    category: "VariableClaimAmount";
    vcaRedistributionEnabled: boolean;
    vcaUnlockPercentage: bigint | undefined;
    vcaEndTime: bigint;
    vcaStartTime: bigint;
  };
}

export type TrancheWithPercentage = {
  unlockPercentage: bigint;
  duration: bigint;
};
