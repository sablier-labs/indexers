import * as EntityAction from "./entity-action";
import * as EntityAsset from "./entity-asset";
import * as EntityUser from "./entity-user";
import * as EntityWatcher from "./entity-watcher";

export namespace CommonStore {
  export import Action = EntityAction;
  export import Asset = EntityAsset;
  export import User = EntityUser;
  export import Watcher = EntityWatcher;
}
