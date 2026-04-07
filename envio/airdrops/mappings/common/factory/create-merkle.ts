import _ from "lodash";
import type { Address } from "viem";
import type { Envio } from "../../../../common/bindings.js";
import { isDeprecatedContract as isDeprecatedFactory } from "../../../../common/deprecated.js";
import { isOfficialLockup } from "../../../../common/helpers.js";
import type { Context, Entity } from "../../../bindings.js";
import type { Params } from "../../../helpers/types.js";
import { Store } from "../../../store/index.js";

/* -------------------------------------------------------------------------- */
/*                                   MAPPING                                  */
/* -------------------------------------------------------------------------- */

type Input<P extends Params.CreateCampaignBase> = {
  context: Context.Handler;
  createInStore: (
    context: Context.Handler,
    event: Envio.Event,
    entities: Params.CreateEntities,
    params: P
  ) => Entity<"Campaign">;
  event: Envio.Event;
  entities: Params.CreateEntities;
  params: P;
};

// biome-ignore lint/suspicious/useAwait: TODO fix later
export async function createMerkle<P extends Params.CreateCampaignBase>(
  input: Input<P>
): Promise<void> {
  const { context, createInStore, event, entities, params } = input;

  /* -------------------------------- CAMPAIGN -------------------------------- */
  if (isDeprecatedFactory({ asset: params.asset, event, protocol: "airdrops" })) {
    return;
  }
  // For Lockup campaigns, check if it's an official lockup before proceeding.
  if (_.has(params, "lockup")) {
    const lockupAddress = _.get(params, "lockup") as Address;
    if (!isOfficialLockup(context.log, event, lockupAddress)) {
      return;
    }
  }

  const campaign = createInStore(context, event, entities, params);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, entities.watcher, {
    campaignId: campaign.id,
    category: "Create",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementCounters(context, entities.watcher);
}
