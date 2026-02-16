import { createAction } from "./entity-action";
import { getOrCreateAsset } from "./entity-asset";
import { upsertDefaultAdapter } from "./entity-default-adapter";
import {
  applyEnter as applyEnterPosition,
  applyExitWithinGracePeriod as applyExitWithinGracePeriodPosition,
  applyRedeem as applyRedeemPosition,
  applyShareTransfer as applyShareTransferPosition,
  getOrCreatePosition,
} from "./entity-position";
import {
  addTransferredFees as addTransferredFeesState,
  getOrCreateState,
  syncStateCounters,
  touchState,
} from "./entity-state";
import {
  applySyncPrice as applySyncPriceVault,
  bumpShares as bumpSharesVault,
  createVault,
  decreaseShares as decreaseSharesVault,
  getVault,
  getVaultEntityId,
  refreshStatus as refreshStatusVault,
} from "./entity-vault";
import { getOrCreateWatcher } from "./entity-watcher";

export namespace Store {
  export namespace Action {
    export const create = createAction;
  }

  export namespace Asset {
    export const getOrCreate = getOrCreateAsset;
  }

  export namespace DefaultAdapter {
    export const upsert = upsertDefaultAdapter;
  }

  export namespace Position {
    export const applyEnter = applyEnterPosition;
    export const applyExitWithinGracePeriod = applyExitWithinGracePeriodPosition;
    export const applyRedeem = applyRedeemPosition;
    export const applyShareTransfer = applyShareTransferPosition;
    export const getOrCreate = getOrCreatePosition;
  }

  export namespace State {
    export const addTransferredFees = addTransferredFeesState;
    export const getOrCreate = getOrCreateState;
    export const syncCounters = syncStateCounters;
    export const touch = touchState;
  }

  export namespace Vault {
    export const applySyncPrice = applySyncPriceVault;
    export const bumpShares = bumpSharesVault;
    export const create = createVault;
    export const decreaseShares = decreaseSharesVault;
    export const get = getVault;
    export const getEntityId = getVaultEntityId;
    export const refreshStatus = refreshStatusVault;
  }

  export namespace Watcher {
    export const getOrCreate = getOrCreateWatcher;
  }
}
