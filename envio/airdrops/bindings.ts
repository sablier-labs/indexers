// biome-ignore-all assist/source/organizeImports: grouped exports
// Context
import type { HandlerContext } from "./bindings/src/Types.js";
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
  SablierMerkleInstant_v3_0,
  SablierMerkleLL_v3_0,
  SablierMerkleLT_v3_0,
  SablierMerkleVCA_v3_0,
  SablierFactoryMerkleInstant_v2_0,
  SablierFactoryMerkleLL_v2_0,
  SablierFactoryMerkleLT_v2_0,
  SablierFactoryMerkleInstant_v3_0,
  SablierFactoryMerkleLL_v3_0,
  SablierFactoryMerkleLT_v3_0,
  SablierFactoryMerkleVCA_v3_0,
} from "./bindings/src/Indexer.gen.js";
export namespace Contract {
  export namespace Factory {
    export const MerkleStreamerFactory_v1_1 = SablierV2MerkleStreamerFactory_v1_1;
    export const MerkleLockupFactory_v1_2 = SablierV2MerkleLockupFactory_v1_2;
    export const MerkleFactory_v1_3 = SablierMerkleFactory_v1_3;
    export const FactoryMerkleInstant_v2_0 = SablierFactoryMerkleInstant_v2_0;
    export const FactoryMerkleLL_v2_0 = SablierFactoryMerkleLL_v2_0;
    export const FactoryMerkleLT_v2_0 = SablierFactoryMerkleLT_v2_0;
    export const FactoryMerkleInstant_v3_0 = SablierFactoryMerkleInstant_v3_0;
    export const FactoryMerkleLL_v3_0 = SablierFactoryMerkleLL_v3_0;
    export const FactoryMerkleLT_v3_0 = SablierFactoryMerkleLT_v3_0;
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
    export const MerkleInstant_v3_0 = SablierMerkleInstant_v3_0;
    export const MerkleLL_v3_0 = SablierMerkleLL_v3_0;
    export const MerkleLT_v3_0 = SablierMerkleLT_v3_0;
    export const MerkleVCA_v3_0 = SablierMerkleVCA_v3_0;
  }
}

// Entities & Enums
export type { Entity, Enum } from "./bindings/src/Types.js";
