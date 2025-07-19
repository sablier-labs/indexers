import * as EntityAction from "./entity-action";
import * as EntityActivity from "./entity-activity";
import * as EntityCampaign from "./entity-campaign";
import * as EntityFactory from "./entity-factory";
import * as EntityWatcher from "./entity-watcher";

export namespace Store {
  export import Action = EntityAction;
  export import Activity = EntityActivity;
  export import Campaign = EntityCampaign;
  export import Factory = EntityFactory;
  export import Watcher = EntityWatcher;
}
