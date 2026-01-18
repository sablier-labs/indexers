import type { Types } from "../lib/types.js";
import airdrops from "./airdrops.js";
import flow from "./flow.js";
import lockup from "./lockup.js";

export const indexedEvents: Types.ProtocolMap<Types.EventMap> = {
  airdrops,
  flow,
  lockup,
};
