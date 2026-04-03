import { getOrCreateAsset } from "./entity-asset";
import { loadOrCreateFlowContract, loadOrCreateLockupContract } from "./entity-contract";
import { createDeprecatedStream, existsDeprecatedStream } from "./entity-deprecated-stream";
import {
  getOrCreateWatcher,
  incrementFlowActionCounter,
  incrementFlowCounters,
  incrementLockupActionCounter,
  incrementLockupCounters,
} from "./entity-watcher";

export { FlowStore } from "./flow/index";
export { Store as LockupStore } from "./lockup/index";

export namespace Store {
  export namespace Asset {
    export const getOrCreate = getOrCreateAsset;
  }

  export namespace Contract {
    export const loadOrCreateFlow = loadOrCreateFlowContract;
    export const loadOrCreateLockup = loadOrCreateLockupContract;
  }

  export namespace DeprecatedStream {
    export const create = createDeprecatedStream;
    export const exists = existsDeprecatedStream;
  }

  export namespace Watcher {
    export const getOrCreate = getOrCreateWatcher;
    export const incrementFlowAction = incrementFlowActionCounter;
    export const incrementFlow = incrementFlowCounters;
    export const incrementLockupAction = incrementLockupActionCounter;
    export const incrementLockup = incrementLockupCounters;
  }
}
