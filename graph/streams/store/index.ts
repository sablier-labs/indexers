import { loadOrCreateFlowContract } from "./entity-contract";
import { createDeprecatedStream, existsDeprecatedStream } from "./entity-deprecated-stream";

export { FlowStore } from "./flow/index";

export namespace Store {
  export namespace Contract {
    export const loadOrCreateFlow = loadOrCreateFlowContract;
  }

  export namespace DeprecatedStream {
    export const create = createDeprecatedStream;
    export const exists = existsDeprecatedStream;
  }
}
