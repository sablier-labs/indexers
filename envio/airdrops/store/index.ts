import * as EntityAction from "./entity-action.js";
import * as EntityActivity from "./entity-activity.js";
import * as EntityCampaign from "./entity-campaign.js";
import * as EntityFactory from "./entity-factory.js";
import * as EntityWatcher from "./entity-watcher.js";

export const Store = {
  Action: EntityAction,
  Activity: EntityActivity,
  Campaign: EntityCampaign,
  Factory: EntityFactory,
  Watcher: EntityWatcher,
};
