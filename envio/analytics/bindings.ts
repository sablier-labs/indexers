// biome-ignore-all assist/source/organizeImports: grouped exports

// Context
export type { HandlerContext } from "./bindings/src/Types";

// Contracts
import {
  // Airdrops v1.1
  SablierV2MerkleStreamerFactory_v1_1,
  SablierV2MerkleStreamerLL_v1_1,
  // Airdrops v1.2
  SablierV2MerkleLockupFactory_v1_2,
  SablierV2MerkleLL_v1_2,
  SablierV2MerkleLT_v1_2,
  // Airdrops v1.3
  SablierMerkleFactory_v1_3,
  SablierMerkleInstant_v1_3,
  SablierMerkleLL_v1_3,
  SablierMerkleLT_v1_3,
  // Airdrops v2.0
  SablierFactoryMerkleInstant_v2_0,
  SablierFactoryMerkleLL_v2_0,
  SablierFactoryMerkleLT_v2_0,
  SablierMerkleInstant_v2_0,
  SablierMerkleLL_v2_0,
  SablierMerkleLT_v2_0,
  // Flow v1.0
  SablierFlow_v1_0,
  // Flow v1.1
  SablierFlow_v1_1,
  // Flow v2.0
  SablierFlow_v2_0,
  // Lockup v1.0
  SablierV2LockupDynamic_v1_0,
  SablierV2LockupLinear_v1_0,
  // Lockup v1.1
  SablierV2LockupDynamic_v1_1,
  SablierV2LockupDynamic_v1_2,
  SablierV2LockupLinear_v1_1,
  // Lockup v1.2
  SablierV2LockupLinear_v1_2,
  SablierV2LockupTranched_v1_2,
  // Lockup v2.0
  SablierLockup_v2_0,
  // Lockup v3.0
  SablierLockup_v3_0,
} from "./bindings/src/Handlers.gen";

export namespace Contract {
  export namespace Airdrops {
    export namespace Factory {
      export const MerkleStreamerFactory_v1_1 = SablierV2MerkleStreamerFactory_v1_1;
      export const MerkleLockupFactory_v1_2 = SablierV2MerkleLockupFactory_v1_2;
      export const MerkleFactory_v1_3 = SablierMerkleFactory_v1_3;
      export const FactoryMerkleInstant_v2_0 = SablierFactoryMerkleInstant_v2_0;
      export const FactoryMerkleLL_v2_0 = SablierFactoryMerkleLL_v2_0;
      export const FactoryMerkleLT_v2_0 = SablierFactoryMerkleLT_v2_0;
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
    }
  }

  export namespace Flow {
    export const Flow_v1_0 = SablierFlow_v1_0;
    export const Flow_v1_1 = SablierFlow_v1_1;
    export const Flow_v2_0 = SablierFlow_v2_0;
  }

  export namespace Lockup {
    export const LockupDynamic_v1_0 = SablierV2LockupDynamic_v1_0;
    export const LockupDynamic_v1_1 = SablierV2LockupDynamic_v1_1;
    export const LockupDynamic_v1_2 = SablierV2LockupDynamic_v1_2;
    export const LockupLinear_v1_0 = SablierV2LockupLinear_v1_0;
    export const LockupLinear_v1_1 = SablierV2LockupLinear_v1_1;
    export const LockupLinear_v1_2 = SablierV2LockupLinear_v1_2;
    export const LockupTranched_v1_2 = SablierV2LockupTranched_v1_2;
    export const Lockup_v2_0 = SablierLockup_v2_0;
    export const Lockup_v3_0 = SablierLockup_v3_0;
  }
}

// Entities
import type {
  CryptoFeesDaily as EntityCryptoFeesDaily,
  FiatFeesDaily as EntityFiatFeesDaily,
  FeeCollection as EntityFeeCollection,
  FeeCollectionTransaction as EntityFeeCollectionTransaction,
  FeeTransaction as EntityFeeTransaction,
  User as EntityUser,
  UserTransaction as EntityUserTransaction,
} from "./bindings/src/Types.gen";

export namespace Entity {
  export type CryptoFeesDaily = EntityCryptoFeesDaily;
  export type FiatFeesDaily = EntityFiatFeesDaily;
  export type FeeCollection = EntityFeeCollection;
  export type FeeCollectionTransaction = EntityFeeCollectionTransaction;
  export type FeeTransaction = EntityFeeTransaction;
  export type User = EntityUser;
  export type UserTransaction = EntityUserTransaction;
}
