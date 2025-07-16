import { ADDRESS_ZERO } from "../../../../common/constants";
import { Id } from "../../../../common/id";
import { type Entity } from "../../../bindings";
import type {
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handler as Handler_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_handler as Handler_v1_2,
  SablierMerkleInstant_v1_3_TransferAdmin_handler as Handler_v1_3,
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_loader as Loader_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_loader as Loader_v1_2,
  SablierMerkleInstant_v1_3_TransferAdmin_loader as Loader_v1_3,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */
type LoaderReturn = {
  campaign?: Entity.Campaign;
  watcher?: Entity.Watcher;
};

type Loader<T> = Loader_v1_1<T> & Loader_v1_2<T> & Loader_v1_3<T>;

export const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  // Starting with v1.3, the constructor emits a TransferAdmin event.
  if (event.params.oldAdmin === ADDRESS_ZERO) {
    return { campaign: undefined, watcher: undefined };
  }

  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const campaign = await context.Campaign.getOrThrow(campaignId);

  const watcherId = event.chainId.toString();
  const watcher = await context.Watcher.getOrThrow(watcherId);

  return {
    campaign,
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_1<T> & Handler_v1_2<T> & Handler_v1_3<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { campaign, watcher } = loaderReturn;
  if (!campaign || !watcher) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateAdmin(context, campaign, event.params.newAdmin);

  /* --------------------------------- ACTION --------------------------------- */
  const entities = { campaign, watcher };
  Store.Action.create(context, event, entities, {
    category: "TransferAdmin",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transferAdmin = { handler, loader };
