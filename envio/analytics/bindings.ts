// biome-ignore-all assist/source/organizeImports: grouped exports
import { contract } from "../common/facade.js";
import type { EventHandler as FacadeEventHandler } from "../common/facade.js";
import type { EvmOnEventContext } from "envio";

export type {
  Entity,
  Enum,
  EvmContractRegisterContext,
  EvmContractRegisterHandler,
  EvmEvent,
  EvmOnEventContext,
  EvmOnEventHandler,
  Logger,
} from "envio";

export namespace Context {
  export type Handler = EvmOnEventContext;
}

export type HandlerContext = Context.Handler;
export type EventHandler<
  ContractName extends string,
  EventName extends string,
> = FacadeEventHandler<ContractName, EventName>;

const flowEvents = [
  "Approval",
  "ApprovalForAll",
  "Transfer",
  "AdjustFlowStream",
  "CreateFlowStream",
  "DepositFlowStream",
  "PauseFlowStream",
  "RefundFromFlowStream",
  "RestartFlowStream",
  "VoidFlowStream",
  "WithdrawFromFlowStream",
] as const;

const lockupEvents = [
  "Approval",
  "ApprovalForAll",
  "Transfer",
  "CancelLockupStream",
  "RenounceLockupStream",
  "WithdrawFromLockupStream",
] as const;

const campaignBaseEvents = ["TransferAdmin", "Clawback"] as const;

export namespace Contract {
  export const Comptroller = contract("SablierComptroller", [
    "TransferFees",
    "UpdateCustomFeeUSD",
  ] as const);

  export namespace Airdrops {
    export namespace Factory {
      /* -------------------------------------------------------------------------- */
      /*                                    v1.1                                    */
      /* -------------------------------------------------------------------------- */
      export const MerkleStreamerFactory_v1_1 = contract("SablierV2MerkleStreamerFactory_v1_1", [
        "CreateMerkleStreamerLL",
      ] as const);

      /* -------------------------------------------------------------------------- */
      /*                                    v1.2                                    */
      /* -------------------------------------------------------------------------- */
      export const MerkleLockupFactory_v1_2 = contract("SablierV2MerkleLockupFactory_v1_2", [
        "CreateMerkleLL",
        "CreateMerkleLT",
      ] as const);

      /* -------------------------------------------------------------------------- */
      /*                                    v1.3                                    */
      /* -------------------------------------------------------------------------- */
      export const MerkleFactory_v1_3 = contract("SablierMerkleFactory_v1_3", [
        "CollectFees",
        "CreateMerkleInstant",
        "CreateMerkleLL",
        "CreateMerkleLT",
        "ResetCustomFee",
        "SetCustomFee",
      ] as const);

      /* -------------------------------------------------------------------------- */
      /*                                    v2.0                                    */
      /* -------------------------------------------------------------------------- */
      export const FactoryMerkleInstant_v2_0 = contract("SablierFactoryMerkleInstant_v2_0", [
        "CreateMerkleInstant",
      ] as const);
      export const FactoryMerkleLL_v2_0 = contract("SablierFactoryMerkleLL_v2_0", [
        "CreateMerkleLL",
      ] as const);
      export const FactoryMerkleLT_v2_0 = contract("SablierFactoryMerkleLT_v2_0", [
        "CreateMerkleLT",
      ] as const);

      /* -------------------------------------------------------------------------- */
      /*                                    v3.0                                    */
      /* -------------------------------------------------------------------------- */
      export const FactoryMerkleInstant_v3_0 = contract("SablierFactoryMerkleInstant_v3_0", [
        "CreateMerkleInstant",
      ] as const);
      export const FactoryMerkleLL_v3_0 = contract("SablierFactoryMerkleLL_v3_0", [
        "CreateMerkleLL",
      ] as const);
      export const FactoryMerkleLT_v3_0 = contract("SablierFactoryMerkleLT_v3_0", [
        "CreateMerkleLT",
      ] as const);
      export const FactoryMerkleVCA_v3_0 = contract("SablierFactoryMerkleVCA_v3_0", [
        "CreateMerkleVCA",
      ] as const);
    }

    export namespace Campaign {
      /* -------------------------------------------------------------------------- */
      /*                                    v1.1                                    */
      /* -------------------------------------------------------------------------- */
      export const MerkleStreamerLL_v1_1 = contract("SablierV2MerkleStreamerLL_v1_1", [
        ...campaignBaseEvents,
        "Claim",
      ] as const);

      /* -------------------------------------------------------------------------- */
      /*                                    v1.2                                    */
      /* -------------------------------------------------------------------------- */
      export const MerkleLL_v1_2 = contract("SablierV2MerkleLL_v1_2", [
        ...campaignBaseEvents,
        "Claim",
      ] as const);
      export const MerkleLT_v1_2 = contract("SablierV2MerkleLT_v1_2", [
        ...campaignBaseEvents,
        "Claim",
      ] as const);

      /* -------------------------------------------------------------------------- */
      /*                                    v1.3                                    */
      /* -------------------------------------------------------------------------- */
      export const MerkleInstant_v1_3 = contract("SablierMerkleInstant_v1_3", [
        ...campaignBaseEvents,
        "Claim",
      ] as const);
      export const MerkleLL_v1_3 = contract("SablierMerkleLL_v1_3", [
        ...campaignBaseEvents,
        "Claim",
      ] as const);
      export const MerkleLT_v1_3 = contract("SablierMerkleLT_v1_3", [
        ...campaignBaseEvents,
        "Claim",
      ] as const);

      /* -------------------------------------------------------------------------- */
      /*                                    v2.0                                    */
      /* -------------------------------------------------------------------------- */
      export const MerkleInstant_v2_0 = contract("SablierMerkleInstant_v2_0", [
        ...campaignBaseEvents,
        "ClaimInstant",
      ] as const);
      export const MerkleLL_v2_0 = contract("SablierMerkleLL_v2_0", [
        ...campaignBaseEvents,
        "ClaimLLWithTransfer",
        "ClaimLLWithVesting",
      ] as const);
      export const MerkleLT_v2_0 = contract("SablierMerkleLT_v2_0", [
        ...campaignBaseEvents,
        "ClaimLTWithTransfer",
        "ClaimLTWithVesting",
      ] as const);

      /* -------------------------------------------------------------------------- */
      /*                                    v3.0                                    */
      /* -------------------------------------------------------------------------- */
      export const MerkleInstant_v3_0 = contract("SablierMerkleInstant_v3_0", [
        ...campaignBaseEvents,
        "ClaimInstant",
      ] as const);
      export const MerkleLL_v3_0 = contract("SablierMerkleLL_v3_0", [
        ...campaignBaseEvents,
        "ClaimLLWithTransfer",
        "ClaimLLWithVesting",
      ] as const);
      export const MerkleLT_v3_0 = contract("SablierMerkleLT_v3_0", [
        ...campaignBaseEvents,
        "ClaimLTWithTransfer",
        "ClaimLTWithVesting",
      ] as const);
      export const MerkleVCA_v3_0 = contract("SablierMerkleVCA_v3_0", [
        ...campaignBaseEvents,
        "ClaimVCA",
        "EnableRedistribution",
      ] as const);
    }
  }

  export namespace Flow {
    /* -------------------------------------------------------------------------- */
    /*                                    v1.0                                    */
    /* -------------------------------------------------------------------------- */
    export const Flow_v1_0 = contract("SablierFlow_v1_0", flowEvents);

    /* -------------------------------------------------------------------------- */
    /*                                    v1.1                                    */
    /* -------------------------------------------------------------------------- */
    export const Flow_v1_1 = contract("SablierFlow_v1_1", [...flowEvents, "CollectFees"] as const);

    /* -------------------------------------------------------------------------- */
    /*                                    v2.0                                    */
    /* -------------------------------------------------------------------------- */
    export const Flow_v2_0 = contract("SablierFlow_v2_0", flowEvents);

    /* -------------------------------------------------------------------------- */
    /*                                    v3.0                                    */
    /* -------------------------------------------------------------------------- */
    export const Flow_v3_0 = contract("SablierFlow_v3_0", flowEvents);
  }

  export namespace Lockup {
    /* -------------------------------------------------------------------------- */
    /*                                    v1.0                                    */
    /* -------------------------------------------------------------------------- */
    export const LockupDynamic_v1_0 = contract("SablierV2LockupDynamic_v1_0", [
      ...lockupEvents,
      "CreateLockupDynamicStream",
    ] as const);
    export const LockupLinear_v1_0 = contract("SablierV2LockupLinear_v1_0", [
      ...lockupEvents,
      "CreateLockupLinearStream",
    ] as const);

    /* -------------------------------------------------------------------------- */
    /*                                    v1.1                                    */
    /* -------------------------------------------------------------------------- */
    export const LockupDynamic_v1_1 = contract("SablierV2LockupDynamic_v1_1", [
      ...lockupEvents,
      "CreateLockupDynamicStream",
    ] as const);
    export const LockupLinear_v1_1 = contract("SablierV2LockupLinear_v1_1", [
      ...lockupEvents,
      "CreateLockupLinearStream",
    ] as const);

    /* -------------------------------------------------------------------------- */
    /*                                    v1.2                                    */
    /* -------------------------------------------------------------------------- */
    export const LockupDynamic_v1_2 = contract("SablierV2LockupDynamic_v1_2", [
      ...lockupEvents,
      "CreateLockupDynamicStream",
    ] as const);
    export const LockupLinear_v1_2 = contract("SablierV2LockupLinear_v1_2", [
      ...lockupEvents,
      "CreateLockupLinearStream",
    ] as const);
    export const LockupTranched_v1_2 = contract("SablierV2LockupTranched_v1_2", [
      ...lockupEvents,
      "CreateLockupTranchedStream",
    ] as const);

    /* -------------------------------------------------------------------------- */
    /*                                    v2.0                                    */
    /* -------------------------------------------------------------------------- */
    export const Lockup_v2_0 = contract("SablierLockup_v2_0", [
      ...lockupEvents,
      "CollectFees",
      "CreateLockupDynamicStream",
      "CreateLockupLinearStream",
      "CreateLockupTranchedStream",
    ] as const);

    /* -------------------------------------------------------------------------- */
    /*                                    v3.0                                    */
    /* -------------------------------------------------------------------------- */
    export const Lockup_v3_0 = contract("SablierLockup_v3_0", [
      ...lockupEvents,
      "CreateLockupDynamicStream",
      "CreateLockupLinearStream",
      "CreateLockupTranchedStream",
    ] as const);

    /* -------------------------------------------------------------------------- */
    /*                                    v4.0                                    */
    /* -------------------------------------------------------------------------- */
    export const Lockup_v4_0 = contract("SablierLockup_v4_0", [
      ...lockupEvents,
      "CreateLockupDynamicStream",
      "CreateLockupLinearStream",
      "CreateLockupTranchedStream",
    ] as const);
  }
}
