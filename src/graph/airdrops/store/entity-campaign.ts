import { Address, BigInt, dataSource, ethereum } from "@graphprotocol/graph-ts";
import { ONE, ZERO } from "../../common/constants";
import { readChainId, readContractVersion } from "../../common/context";
import { Id } from "../../common/id";
import { logError } from "../../common/logger";
import * as Entity from "../bindings/schema";
import { getNickname } from "../helpers";
import { Params } from "../helpers/types";
import { createAction } from "./entity-action";
import { getOrCreateAsset } from "./entity-asset";
import { getOrCreateFactory } from "./entity-factory";
import { createTranchesWithPercentages } from "./entity-tranche";
import { getOrCreateWatcher } from "./entity-watcher";

export function createCampaignInstant(event: ethereum.Event, params: Params.CreateCampaignBase): Entity.Campaign {
  const campaign = createBaseCampaign(event, params);
  campaign.save();
  return campaign;
}

export function createCampaignLL(
  event: ethereum.Event,
  paramsBase: Params.CreateCampaignBase,
  paramsLL: Params.CreateCampaignLL,
): Entity.Campaign {
  let campaign = createBaseCampaign(event, paramsBase);

  campaign = initLockupCampaign(campaign, paramsLL);
  campaign.streamCliff = paramsLL.cliffDuration.gt(ZERO);
  campaign.streamCliffDuration = paramsLL.cliffDuration;
  campaign.streamCliffPercentage = paramsLL.cliffPercentage;
  const startPercentage = paramsLL.startPercentage;
  if (startPercentage !== null) {
    campaign.streamInitial = startPercentage.gt(ZERO);
    campaign.streamInitialPercentage = startPercentage;
  } else {
    campaign.streamInitial = false;
  }

  campaign.save();
  return campaign;
}

export function createCampaignLT(
  event: ethereum.Event,
  paramsBase: Params.CreateCampaignBase,
  paramsLT: Params.CreateCampaignLT,
): Entity.Campaign {
  let campaign = createBaseCampaign(event, paramsBase);

  campaign = initLockupCampaign(campaign, paramsLT);
  campaign = createTranchesWithPercentages(campaign, paramsLT.tranchesWithPercentages);

  campaign.save();
  return campaign;
}

export function getCampaign(address: Address): Entity.Campaign | null {
  const id = Id.campaign(address);
  const campaign = Entity.Campaign.load(id);
  if (campaign === null) {
    logError("Campaign entity not saved for address: {}", [address.toHexString()]);
  }
  return campaign;
}

export function updateCampaignAdmin(campaign: Entity.Campaign, admin: Address): void {
  campaign.admin = admin;
  const asset = Entity.Asset.load(campaign.asset);
  const nickname = getNickname(Address.fromBytes(campaign.admin), campaign.name, asset);
  campaign.nickname = nickname;
  campaign.save();
}

export function updateCampaignClaimed(campaign: Entity.Campaign, amount: BigInt): void {
  campaign.claimedAmount = campaign.claimedAmount.plus(amount);
  campaign.claimedCount = campaign.claimedCount.plus(ONE);
  campaign.save();
}

export function updateCampaignClawback(event: ethereum.Event, campaign: Entity.Campaign, actionId: string): void {
  campaign.clawbackAction = actionId;
  campaign.clawbackTime = event.block.timestamp;
  campaign.save();
}

function createBaseCampaign(event: ethereum.Event, params: Params.CreateCampaignBase): Entity.Campaign {
  const campaignId = Id.campaign(params.campaignAddress);
  const campaign = new Entity.Campaign(campaignId);
  const asset = getOrCreateAsset(params.asset);
  const factory = getOrCreateFactory(dataSource.address());
  const watcher = getOrCreateWatcher();

  /* --------------------------------- CAMPAIGN -------------------------------- */
  campaign.address = params.campaignAddress;
  campaign.admin = params.admin;
  campaign.aggregateAmount = params.aggregateAmount;
  campaign.asset = asset.id;
  campaign.category = params.category;
  campaign.chainId = readChainId();
  campaign.claimedAmount = ZERO;
  campaign.claimedCount = ZERO;
  campaign.expiration = params.expiration;
  campaign.expires = params.expiration.gt(ZERO);
  campaign.factory = factory.id;
  campaign.hash = event.transaction.hash;
  campaign.ipfsCID = params.ipfsCID;
  campaign.name = params.name;
  campaign.nickname = getNickname(params.admin, params.name, asset);
  campaign.position = factory.campaignCounter;
  campaign.root = params.merkleRoot;
  campaign.subgraphId = watcher.campaignCounter;
  campaign.timestamp = event.block.timestamp;
  campaign.totalRecipients = params.recipientCount;
  campaign.version = readContractVersion();

  const minimumFee = params.minimumFee;
  if (minimumFee) {
    campaign.fee = minimumFee;
  }

  /* --------------------------------- WATCHER -------------------------------- */
  watcher.campaignCounter = watcher.campaignCounter.plus(ONE);
  watcher.save();

  /* --------------------------------- FACTORY -------------------------------- */
  factory.campaignCounter = factory.campaignCounter.plus(ONE);
  factory.save();

  /* --------------------------------- ACTION --------------------------------- */
  createAction(event, { campaign: campaign.id, category: "Create" } as Params.Action);

  return campaign;
}

function initLockupCampaign(campaign: Entity.Campaign, params: Params.CreateCampaignLockup): Entity.Campaign {
  campaign.lockup = params.lockup;
  campaign.streamCancelable = params.cancelable;
  campaign.streamShape = params.shape;
  campaign.streamTotalDuration = params.totalDuration;
  campaign.streamTransferable = params.transferable;

  const startTime = params.startTime;
  if (startTime !== null) {
    campaign.streamStart = startTime.gt(ZERO);
    campaign.streamStartTime = startTime;
  } else {
    campaign.streamStart = false;
  }

  return campaign;
}
