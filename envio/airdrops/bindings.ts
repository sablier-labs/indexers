// biome-ignore-all assist/source/organizeImports: grouped exports
// Context
import type { HandlerContext } from "./bindings/src/Types";
export namespace Context {
  export type Handler = HandlerContext;
}

// Contracts
import {
  SablierV2MerkleStreamerFactory_v1_1,
  SablierV2MerkleStreamerLL_v1_1,
  SablierV2MerkleLockupFactory_v1_2,
  SablierV2MerkleLL_v1_2,
  SablierV2MerkleLT_v1_2,
  SablierMerkleFactory_v1_3,
  SablierMerkleInstant_v1_3,
  SablierMerkleLL_v1_3,
  SablierMerkleLT_v1_3,
  SablierMerkleInstant_v2_0,
  SablierMerkleLL_v2_0,
  SablierMerkleLT_v2_0,
  SablierMerkleVCA_v3_0,
  SablierFactoryMerkleInstant_v2_0,
  SablierFactoryMerkleLL_v2_0,
  SablierFactoryMerkleLT_v2_0,
  SablierFactoryMerkleVCA_v3_0,
} from "./bindings/src/Handlers.gen";
export namespace Contract {
  export namespace Factory {
    export const MerkleStreamerFactory_v1_1 = SablierV2MerkleStreamerFactory_v1_1;
    export const MerkleLockupFactory_v1_2 = SablierV2MerkleLockupFactory_v1_2;
    export const MerkleFactory_v1_3 = SablierMerkleFactory_v1_3;
    export const FactoryMerkleInstant_v2_0 = SablierFactoryMerkleInstant_v2_0;
    export const FactoryMerkleLL_v2_0 = SablierFactoryMerkleLL_v2_0;
    export const FactoryMerkleLT_v2_0 = SablierFactoryMerkleLT_v2_0;
    export const FactoryMerkleVCA_v3_0 = SablierFactoryMerkleVCA_v3_0;
  }

  export namespace Campaign {
    export const MerkleStreamerLL_v1_1 = SablierV2MerkleStreamerLL_v1_1;
    export const MerkleLL_v1_2 = SablierV2MerkleLL_v1_2;
    export const MerkleLT_v1_2 = SablierV2MerkleLT_v1_2;
    export const MerkleInstant_v1_3 = SablierMerkleInstant_v1_3;
    export const MerkleLL_v1_3 = SablierMerkleLL_v1_3;
    export const MerkleLT_v1_3 = SablierMerkleLT_v1_3;
    export const MerkleInstant_v2_0 = SablierMerkleInstant_v2_0;
    export const MerkleLL_v2_0 = SablierMerkleLL_v2_0;
    export const MerkleLT_v2_0 = SablierMerkleLT_v2_0;
    export const MerkleVCA_v3_0 = SablierMerkleVCA_v3_0;
  }
}

// Enum
import type { ActionCategory_t, CampaignCategory_t } from "./bindings/src/db/Enums.gen";
export namespace Enum {
  export type ActionCategory = ActionCategory_t;
  export type CampaignCategory = CampaignCategory_t;
}

// Entities
import type {
  Action as EntityAction,
  Activity as EntityActivity,
  Asset as EntityAsset,
  Campaign as EntityCampaign,
  Factory as EntityFactory,
  Tranche as EntityTranche,
  Watcher as EntityWatcher,
} from "./bindings/src/Types.gen";

export namespace Entity {
  export type Action = EntityAction;
  export type Activity = EntityActivity;
  export type Asset = EntityAsset;
  export type Campaign = EntityCampaign;
  export type Factory = EntityFactory;
  export type Tranche = EntityTranche;
  export type Watcher = EntityWatcher;
}
