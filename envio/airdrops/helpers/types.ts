import type { Envio } from "../../common/bindings";
import type { Entity, Enum } from "../bindings";

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
    claimRecipient?: Envio.Address;
    claimStreamId?: string;
    claimTo?: Envio.Address;
    claimTokenId?: bigint;
    clawbackAmount?: bigint;
    clawbackFrom?: Envio.Address;
    clawbackTo?: Envio.Address;
    fee?: bigint;
    forgoneAmount?: bigint;
  };

  export type CreateEntities = {
    asset: Entity.Asset;
    factory: Entity.Factory;
    watcher: Entity.Watcher;
  };

  export type CreateCampaignBase = {
    admin: Envio.Address;
    asset: Envio.Address;
    aggregateAmount: bigint;
    campaignAddress: Envio.Address;
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
    lockup: Envio.Address;
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
    enableRedistribution: boolean;
    unlockPercentage: bigint | undefined;
    vestingEndTime: bigint;
    vestingStartTime: bigint;
  };
}

export type TrancheWithPercentage = {
  unlockPercentage: bigint;
  duration: bigint;
};
