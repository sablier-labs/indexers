/**
 * @file LightLink preset data initialization.
 */

import { lightlink } from "sablier/evm/chains";
import type { HandlerContext } from "../../bindings.js";
import * as Helpers from "../helpers.js";
import feeCollections from "./lightlink-fee-collections.json";

/**
 * Initializes LightLink preset data by processing fee collections and actions.
 * @param context - The handler context
 */
export async function initializeLightLinkData(context: HandlerContext): Promise<void> {
  // Process hardcoded fee collections
  await Helpers.processFeeCollections(
    context,
    lightlink.id,
    feeCollections as Helpers.FeeCollectionPreset[],
    "lockup"
  );

  // Fetch actions from LightLink subgraph
  const actions = await Helpers.fetchAllActions(
    context,
    "https://graph.phoenix.lightlink.io/query/subgraphs/name/lightlink/sablier-lockup-lightlink"
  );

  // Process fetched actions
  await Helpers.processActions(context, lightlink.id, actions);
}
