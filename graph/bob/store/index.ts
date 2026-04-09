import { createEnter } from "./entity-enter";
import { getOrCreatePoolState } from "./entity-pool-state";
import { getOrCreatePoolUserState } from "./entity-pool-user-state";
import { createRedeem } from "./entity-redeem";
import { createSyncPriceFromOracle } from "./entity-sync-price-from-oracle";

export namespace Store {
  export namespace PoolState {
    export const getOrCreate = getOrCreatePoolState;
  }
  export namespace PoolUserState {
    export const getOrCreate = getOrCreatePoolUserState;
  }
  export namespace Enter {
    export const create = createEnter;
  }
  export namespace Redeem {
    export const create = createRedeem;
  }
  export namespace SyncPriceFromOracle {
    export const create = createSyncPriceFromOracle;
  }
}
