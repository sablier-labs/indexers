import { loadOrCreateLockupContract } from "../entity-contract";
import { createDeprecatedStream, existsDeprecatedStream } from "../entity-deprecated-stream";
import { createAction } from "./entity-action";
import {
  createStreamDynamic,
  createStreamLinear,
  createStreamTranched,
  getStream,
} from "./entity-stream";

export namespace Store {
  export namespace Action {
    export const create = createAction;
  }

  export namespace Contract {
    export const loadOrCreate = loadOrCreateLockupContract;
  }

  export namespace DeprecatedStream {
    export const create = createDeprecatedStream;
    export const exists = existsDeprecatedStream;
  }

  export namespace Stream {
    export const createDynamic = createStreamDynamic;
    export const createLinear = createStreamLinear;
    export const createTranched = createStreamTranched;
    export const get = getStream;
  }
}
