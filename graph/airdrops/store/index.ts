import { createAction } from "./entity-action";
import { createOrUpdateActivity } from "./entity-activity";
import { getOrCreateAsset } from "./entity-asset";
import {
  createCampaignInstant,
  createCampaignLL,
  createCampaignLT,
  createCampaignVCA,
  getCampaign,
  updateCampaignAdmin,
  updateCampaignClaimed,
  updateCampaignClawback,
  updateCampaignForgoneAmount,
  updateCampaignMinFeeUsd,
} from "./entity-campaign";
import { getOrCreateWatcher } from "./entity-watcher";

export namespace Store {
  export namespace Action {
    export const create = createAction;
  }

  export namespace Activity {
    export const createOrUpdate = createOrUpdateActivity;
  }

  export namespace Asset {
    export const getOrCreate = getOrCreateAsset;
  }
  export namespace Campaign {
    export const createInstant = createCampaignInstant;
    export const createLL = createCampaignLL;
    export const createLT = createCampaignLT;
    export const createVCA = createCampaignVCA;
    export const get = getCampaign;
    export const updateAdmin = updateCampaignAdmin;
    export const updateClaimed = updateCampaignClaimed;
    export const updateClawback = updateCampaignClawback;
    export const updateFee = updateCampaignMinFeeUsd;
    export const updateForgoneAmount = updateCampaignForgoneAmount;
  }

  export namespace Watcher {
    export const getOrCreate = getOrCreateWatcher;
  }
}
