import _ from "lodash";
import { Version } from "sablier";
import type { Envio } from "../../../../common/bindings";
import { Effects } from "../../../../common/effects";
import { Id } from "../../../../common/id";
import { CommonStore } from "../../../../common/store";
import { type RPCData } from "../../../../common/types";
import type { Context, Entity } from "../../../bindings";
import type {
  SablierMerkleFactory_v1_3_CreateMerkleInstant_loader as CreateInstant_v1_3,
  SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_loader as CreateLL_v1_1,
  SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_loader as CreateLL_v1_2,
  SablierMerkleFactory_v1_3_CreateMerkleLL_loader as CreateLL_v1_3,
  SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_loader as CreateLT_v1_2,
  SablierMerkleFactory_v1_3_CreateMerkleLT_loader as CreateLT_v1_3,
} from "../../../bindings/src/Types.gen";
import { isOfficialLockup } from "../../../helpers";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

export namespace Loader {
  export type CreateReturn = {
    entities: {
      asset?: Entity.Asset;
      factory?: Entity.Factory;
      users: {
        admin?: Entity.User;
        caller?: Entity.User;
      };
      watcher?: Entity.Watcher;
    };
    rpcData: {
      assetMetadata: RPCData.ERC20Metadata;
    };
  };

  type EventParams = {
    admin: Envio.Address;
    asset: Envio.Address;
  };

  async function loader(context: Context.Loader, event: Envio.Event, params: EventParams): Promise<CreateReturn> {
    const assetId = Id.asset(event.chainId, params.asset);
    const factoryId = event.srcAddress;
    const watcherId = event.chainId.toString();

    const [asset, factory, watcher] = await Promise.all([
      context.Asset.get(assetId),
      context.Factory.get(factoryId),
      context.Watcher.get(watcherId),
    ]);

    const [admin, caller] = await Promise.all([
      context.User.get(Id.user(event.chainId, params.admin)),
      context.User.get(Id.user(event.chainId, event.transaction.from)),
    ]);

    let assetMetadata: RPCData.ERC20Metadata;
    if (asset) {
      assetMetadata = {
        decimals: Number(asset.decimals),
        name: asset.name,
        symbol: asset.symbol,
      };
    } else {
      assetMetadata = await context.effect(Effects.TokenMetadata.readOrFetchMetadata, {
        address: params.asset,
        chainId: event.chainId,
      });
    }

    return {
      entities: {
        asset,
        factory,
        users: { admin, caller },
        watcher,
      },
      rpcData: {
        assetMetadata,
      },
    };
  }

  type CreateV1_1<T> = CreateLL_v1_1<T>;
  const createV1_1: CreateV1_1<CreateReturn> = async ({ context, event }): Promise<CreateReturn> => {
    return loader(context, event, event.params);
  };

  /**
   * @see {@link: file://./../../v1.2/SablierV2MerkleLockupFactory/create-ll.ts}
   */
  type CreateV1_2<T> = CreateLL_v1_2<T> & CreateLT_v1_2<T>;
  const createV1_2: CreateV1_2<CreateReturn> = async ({ context, event }): Promise<CreateReturn> => {
    return loader(context, event, {
      admin: event.params.baseParams[3],
      asset: event.params.baseParams[0],
    });
  };

  /**
   * @see {@link: file://./../../v1.3/SablierMerkleFactory/create-instant.ts}
   */
  type CreateV1_3<T> = CreateInstant_v1_3<T> & CreateLL_v1_3<T> & CreateLT_v1_3<T>;
  const createV1_3: CreateV1_3<CreateReturn> = async ({ context, event }): Promise<CreateReturn> => {
    return loader(context, event, {
      admin: event.params.baseParams[2],
      asset: event.params.baseParams[0],
    });
  };

  export const create = {
    [Version.Airdrops.V1_1]: createV1_1,
    [Version.Airdrops.V1_2]: createV1_2,
    [Version.Airdrops.V1_3]: createV1_3,
  };
}

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
  loaderReturn: Loader.CreateReturn;
  params: P;
};

export async function createMerkle<P extends Params.CreateCampaignBase>(input: Input<P>): Promise<void> {
  const { context, createInStore, event, loaderReturn, params } = input;

  /* -------------------------------- CAMPAIGN -------------------------------- */
  // For lockup campaigns, check if it's an official lockup before proceeding.
  if (_.has(params, "lockup")) {
    const lockupAddress = _.get(params, "lockup") as Envio.Address;
    if (!isOfficialLockup(context.log, event, lockupAddress)) {
      return;
    }
  }

  const entities = getOrCreateEntities(context, event, loaderReturn, params);
  const campaign = createInStore(context, event, entities, params);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, entities.watcher, {
    campaignId: campaign.id,
    category: "Create",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementCounters(context, entities.watcher);

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: entities.users.caller },
    { address: params.admin, entity: entities.users.admin },
  ]);
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
    users: entities.users,
    watcher: entities.watcher ?? Store.Watcher.create(event.chainId),
  };
}
