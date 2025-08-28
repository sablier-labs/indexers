import _ from "lodash";
import type { Envio } from "../../../../common/bindings";
import { isDeprecatedContract as isDeprecatedFactory } from "../../../../common/deprecated";
import { isOfficialLockup } from "../../../../common/helpers";
import type { Context, Entity } from "../../../bindings";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   MAPPING                                  */
/* -------------------------------------------------------------------------- */

type Input<P extends Params.CreateCampaignBase> = {
  context: Context.Handler;
  createInStore: (
    context: Context.Handler,
    event: Envio.Event,
    entities: Params.CreateEntities,
    params: P,
  ) => Entity.Campaign;
  event: Envio.Event;
  entities: Params.CreateEntities;
  params: P;
};

export async function createMerkle<P extends Params.CreateCampaignBase>(input: Input<P>): Promise<void> {
  const { context, createInStore, event, entities, params } = input;

  /* -------------------------------- CAMPAIGN -------------------------------- */
  if (isDeprecatedFactory({ asset: params.asset, event, protocol: "airdrops" })) {
    return;
  }
  // For Lockup campaigns, check if it's an official lockup before proceeding.
  if (_.has(params, "lockup")) {
    const lockupAddress = _.get(params, "lockup") as Envio.Address;
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
