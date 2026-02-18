import type { Model } from "../src/types.js";
import airdrops from "./airdrops.js";
import flow from "./flow.js";
import lockup from "./lockup.js";

export const indexedEvents: Model.ProtocolMap<Model.EventMap> = {
  airdrops,
  flow,
  lockup,
};
