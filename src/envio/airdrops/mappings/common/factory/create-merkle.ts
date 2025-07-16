import type { Envio } from "../../../../common/bindings";
import { CommonStore } from "../../../../common/store";
import type { Context } from "../../../bindings";
import { isOfficialLockup } from "../../../helpers";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";
import { type Loader } from "../../common/loader";

type Input<P extends Params.CreateCampaignBase> = {
  context: Context.Handler;
  event: Envio.Event;
  loaderReturn: Loader.CreateReturn;
  params: P;
};

/* -------------------------------------------------------------------------- */
/*                               MERKLE INSTANT                               */
/* -------------------------------------------------------------------------- */

export function createMerkleInstant(input: Input<Params.CreateCampaignBase>): void {
  const { context, event, loaderReturn, params } = input;

  /* -------------------------------- CAMPAIGN -------------------------------- */
  const createEntities = getOrCreateEntities(context, event, loaderReturn, params);
  const campaign = Store.Campaign.createInstant(context, event, createEntities, params);

  /* --------------------------------- ACTION --------------------------------- */
  const actionEntities = { campaign, ...createEntities };
  Store.Action.create(context, event, actionEntities, { category: "Create" });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementCounters(context, createEntities.watcher);
}

/* -------------------------------------------------------------------------- */
/*                                  MERKLE LL                                 */
/* -------------------------------------------------------------------------- */

export function createMerkleLL(input: Input<Params.CreateCampaignLL>): void {
  const { context, event, loaderReturn, params } = input;

  /* -------------------------------- CAMPAIGN -------------------------------- */
  if (!isOfficialLockup(context.log, event, params.lockup)) {
    return;
  }
  const createEntities = getOrCreateEntities(context, event, loaderReturn, params);
  const campaign = Store.Campaign.createLL(context, event, createEntities, params);

  /* --------------------------------- ACTION --------------------------------- */
  const actionEntities = { campaign, ...createEntities };
  Store.Action.create(context, event, actionEntities, { category: "Create" });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementCounters(context, createEntities.watcher);
}

/* -------------------------------------------------------------------------- */
/*                                  MERKLE LT                                 */
/* -------------------------------------------------------------------------- */

export function createMerkleLT(input: Input<Params.CreateCampaignLT>): void {
  const { context, event, loaderReturn, params } = input;

  /* -------------------------------- CAMPAIGN -------------------------------- */
  if (!isOfficialLockup(context.log, event, params.lockup)) {
    return;
  }
  const createEntities = getOrCreateEntities(context, event, loaderReturn, params);
  const campaign = Store.Campaign.createLT(context, event, createEntities, params);

  /* --------------------------------- ACTION --------------------------------- */
  const actionEntities = { campaign, ...createEntities };
  Store.Action.create(context, event, actionEntities, { category: "Create" });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementCounters(context, createEntities.watcher);
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

function getOrCreateEntities(
  context: Context.Handler,
  event: Envio.Event,
  loaderReturn: Loader.CreateReturn,
  params: { asset: Envio.Address },
): Params.CreateEntities {
  const { entities, rpcData } = loaderReturn;
  return {
    asset: entities.asset ?? CommonStore.Asset.create(context, event.chainId, params.asset, rpcData.assetMetadata),
    factory: entities.factory ?? Store.Factory.create(context, event.chainId, event.srcAddress),
    watcher: entities.watcher ?? Store.Watcher.create(event.chainId),
  };
}
