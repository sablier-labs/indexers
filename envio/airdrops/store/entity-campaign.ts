import type { Envio } from "../../common/bindings";
import { getContractVersion } from "../../common/deployments";
import { sanitizeString } from "../../common/helpers";
import { Id } from "../../common/id";
import type { Context, Entity } from "../bindings";
import { getNickname } from "../helpers/campaign";
import type { Params, TrancheWithPercentage } from "../helpers/types";

export function createInstant(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateCampaignBase
): Entity.Campaign {
  const campaign = createBaseCampaign(context, event, entities, params);
  context.Campaign.set(campaign);
  return campaign;
}

export function createLL(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateCampaignLL
): Entity.Campaign {
  let campaign = createBaseCampaign(context, event, entities, params);
  const lockupCampaign = createLockupCampaign(params);
  campaign = {
    ...campaign,
    ...lockupCampaign,
    streamCliff: params.cliffDuration > 0n,
    streamCliffDuration: params.cliffDuration,
    streamCliffPercentage: params.cliffPercentage,
    streamInitial: Boolean(params.startPercentage && params.startPercentage > 0n),
    streamInitialPercentage: params.startPercentage ?? undefined,
  };
  context.Campaign.set(campaign);
  return campaign;
}

export function createLT(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateCampaignLT
): Entity.Campaign {
  let campaign = createBaseCampaign(context, event, entities, params);
  const lockupCampaign = createLockupCampaign(params);
  campaign = {
    ...campaign,
    ...lockupCampaign,
  };
  context.Campaign.set(campaign);
  addTranchesWithPercentages(context, campaign, params.tranchesWithPercentages);
  return campaign;
}

export function createVCA(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateCampaignVCA
): Entity.Campaign {
  let campaign = createBaseCampaign(context, event, entities, params);
  campaign = {
    ...campaign,
    vcaUnlockPercentage: params.unlockPercentage ?? undefined,
    vcaVestingEndTime: params.vestingEndTime,
    vcaVestingStartTime: params.vestingStartTime,
  };
  context.Campaign.set(campaign);
  return campaign;
}

export async function updateAdmin(
  context: Context.Handler,
  campaign: Entity.Campaign,
  newAdmin: Envio.Address
): Promise<void> {
  const asset = await context.Asset.get(campaign.asset_id);
  if (!asset) {
    context.log.error("Asset not found", { asset_id: campaign.asset_id });
    return;
  }

  const updatedCampaign: Entity.Campaign = {
    ...campaign,
    admin: newAdmin,
    nickname: getNickname(newAdmin, campaign.name, asset),
  };
  context.Campaign.set(updatedCampaign);
}

export function updateClaimed(
  context: Context.Handler,
  campaign: Entity.Campaign,
  amount: bigint
): void {
  const updatedCampaign: Entity.Campaign = {
    ...campaign,
    claimedAmount: campaign.claimedAmount + amount,
    claimedCount: campaign.claimedCount + 1n,
  };
  context.Campaign.set(updatedCampaign);
}

export function updateClawback(
  context: Context.Handler,
  event: Envio.Event,
  campaign: Entity.Campaign
): void {
  const updatedCampaign: Entity.Campaign = {
    ...campaign,
    clawbackAction_id: Id.action(event),
    clawbackTime: BigInt(event.block.timestamp),
  };
  context.Campaign.set(updatedCampaign);
}

export function updateFee(
  context: Context.Handler,
  campaign: Entity.Campaign,
  newFee: bigint
): void {
  const updatedCampaign: Entity.Campaign = {
    ...campaign,
    fee: newFee,
  };
  context.Campaign.set(updatedCampaign);
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

function createBaseCampaign(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateCampaignBase
): Entity.Campaign {
  const factoryVersion = getContractVersion("airdrops", event.chainId, entities.factory.address);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  // Some fields are set to 0/ undefined because they are set later depending on the campaign category.
  const campaign: Entity.Campaign = {
    address: params.campaignAddress,
    admin: params.admin,
    aggregateAmount: params.aggregateAmount,
    asset_id: entities.asset.id,
    campaignStartTime: params.campaignStartTime,
    category: params.category,
    chainId: BigInt(event.chainId),
    claimedAmount: 0n,
    claimedCount: 0n,
    clawbackAction_id: undefined,
    clawbackTime: undefined,
    expiration: params.expiration,
    expires: params.expiration > 0n,
    factory_id: entities.factory.id,
    fee: params.minimumFee,
    hash: event.transaction.hash,
    id: Id.campaign(params.campaignAddress, event.chainId),
    ipfsCID: params.ipfsCID,
    lockup: undefined,
    name: params.name,
    nickname: getNickname(params.admin, params.name, entities.asset),
    position: entities.factory.campaignCounter,
    root: params.merkleRoot,
    streamCancelable: undefined,
    streamCliff: undefined,
    streamCliffDuration: undefined,
    streamCliffPercentage: undefined,
    streamInitial: undefined,
    streamInitialPercentage: undefined,
    streamShape: undefined,
    streamStart: undefined,
    streamStartTime: undefined,
    streamTotalDuration: undefined,
    streamTransferable: undefined,
    subgraphId: entities.watcher.campaignCounter,
    timestamp: BigInt(event.block.timestamp),
    totalRecipients: params.recipientCount,
    vcaUnlockPercentage: undefined,
    vcaVestingEndTime: undefined,
    vcaVestingStartTime: undefined,
    version: factoryVersion,
  };

  /* --------------------------------- FACTORY -------------------------------- */
  const updatedFactory = {
    ...entities.factory,
    campaignCounter: entities.factory.campaignCounter + 1n,
  };
  context.Factory.set(updatedFactory);

  return campaign;
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

function addTranchesWithPercentages(
  context: Context.Handler,
  campaign: Entity.Campaign,
  tranches: TrancheWithPercentage[]
): void {
  // The start time of the stream is the first tranche's start time, so we use zero for the initial duration.
  let previous = { duration: 0n, unlockPercentage: 0n };

  for (let i = 0; i < tranches.length; i++) {
    const current = tranches[i];

    const tranche: Entity.Tranche = {
      campaign_id: campaign.id,
      duration: current.duration,
      endDuration: previous.duration + current.duration,
      endPercentage: previous.unlockPercentage + current.unlockPercentage,
      id: Id.trancheCampaign(campaign.id, i),
      percentage: current.unlockPercentage,
      position: BigInt(i),
      startDuration: previous.duration,
      startPercentage: previous.unlockPercentage,
    };
    context.Tranche.set(tranche);

    previous = current;
  }
}

function createLockupCampaign(params: Params.CreateCampaignLockup): Partial<Entity.Campaign> {
  return {
    lockup: params.lockup,
    streamCancelable: params.cancelable,
    streamShape: params.shape ? sanitizeString(params.shape) : undefined,
    streamStart: Boolean(params.startTime && params.startTime > 0n),
    streamStartTime: params.startTime,
    streamTotalDuration: params.totalDuration,
    streamTransferable: params.transferable,
  };
}
