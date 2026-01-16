import * as EntityAction from "./entity-action";
import * as EntityActivity from "./entity-activity";
import * as EntityCampaign from "./entity-campaign";
import * as EntityFactory from "./entity-factory";
import * as EntityWatcher from "./entity-watcher";

export const Store = {
  Action: EntityAction,
  Activity: EntityActivity,
  Campaign: EntityCampaign,
  Factory: EntityFactory,
  Watcher: EntityWatcher,
};
