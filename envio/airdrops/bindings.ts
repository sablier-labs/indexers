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

const campaignBaseEvents = ["TransferAdmin", "Clawback"] as const;
const v2CampaignBaseEvents = [...campaignBaseEvents, "LowerMinFeeUSD"] as const;

export namespace Contract {
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
      "CreateMerkleInstant",
      "CreateMerkleLL",
      "CreateMerkleLT",
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
      ...v2CampaignBaseEvents,
      "ClaimInstant",
    ] as const);
    export const MerkleLL_v2_0 = contract("SablierMerkleLL_v2_0", [
      ...v2CampaignBaseEvents,
      "ClaimLLWithTransfer",
      "ClaimLLWithVesting",
    ] as const);
    export const MerkleLT_v2_0 = contract("SablierMerkleLT_v2_0", [
      ...v2CampaignBaseEvents,
      "ClaimLTWithTransfer",
      "ClaimLTWithVesting",
    ] as const);

    /* -------------------------------------------------------------------------- */
    /*                                    v3.0                                    */
    /* -------------------------------------------------------------------------- */
    export const MerkleInstant_v3_0 = contract("SablierMerkleInstant_v3_0", [
      ...v2CampaignBaseEvents,
      "ClaimInstant",
    ] as const);
    export const MerkleLL_v3_0 = contract("SablierMerkleLL_v3_0", [
      ...v2CampaignBaseEvents,
      "ClaimLLWithTransfer",
      "ClaimLLWithVesting",
    ] as const);
    export const MerkleLT_v3_0 = contract("SablierMerkleLT_v3_0", [
      ...v2CampaignBaseEvents,
      "ClaimLTWithTransfer",
      "ClaimLTWithVesting",
    ] as const);
    export const MerkleVCA_v3_0 = contract("SablierMerkleVCA_v3_0", [
      ...v2CampaignBaseEvents,
      "ClaimVCA",
      "EnableRedistribution",
    ] as const);
  }
}

/* -------------------------------------------------------------------------- */
/*                                    v1.1                                    */
/* -------------------------------------------------------------------------- */
export type SablierV2MerkleStreamerLL_v1_1_Claim_handler = EventHandler<
  "SablierV2MerkleStreamerLL_v1_1",
  "Claim"
>;
export type SablierV2MerkleStreamerLL_v1_1_Clawback_handler = EventHandler<
  "SablierV2MerkleStreamerLL_v1_1",
  "Clawback"
>;
export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handler = EventHandler<
  "SablierV2MerkleStreamerLL_v1_1",
  "TransferAdmin"
>;

/* -------------------------------------------------------------------------- */
/*                                    v1.2                                    */
/* -------------------------------------------------------------------------- */
export type SablierV2MerkleLL_v1_2_Claim_handler = EventHandler<"SablierV2MerkleLL_v1_2", "Claim">;
export type SablierV2MerkleLL_v1_2_Clawback_handler = EventHandler<
  "SablierV2MerkleLL_v1_2",
  "Clawback"
>;
export type SablierV2MerkleLL_v1_2_TransferAdmin_handler = EventHandler<
  "SablierV2MerkleLL_v1_2",
  "TransferAdmin"
>;
export type SablierV2MerkleLT_v1_2_Claim_handler = EventHandler<"SablierV2MerkleLT_v1_2", "Claim">;
export type SablierV2MerkleLT_v1_2_Clawback_handler = EventHandler<
  "SablierV2MerkleLT_v1_2",
  "Clawback"
>;
export type SablierV2MerkleLT_v1_2_TransferAdmin_handler = EventHandler<
  "SablierV2MerkleLT_v1_2",
  "TransferAdmin"
>;

/* -------------------------------------------------------------------------- */
/*                                    v1.3                                    */
/* -------------------------------------------------------------------------- */
export type SablierMerkleInstant_v1_3_Claim_handler = EventHandler<
  "SablierMerkleInstant_v1_3",
  "Claim"
>;
export type SablierMerkleInstant_v1_3_Clawback_handler = EventHandler<
  "SablierMerkleInstant_v1_3",
  "Clawback"
>;
export type SablierMerkleInstant_v1_3_TransferAdmin_handler = EventHandler<
  "SablierMerkleInstant_v1_3",
  "TransferAdmin"
>;
export type SablierMerkleLL_v1_3_Claim_handler = EventHandler<"SablierMerkleLL_v1_3", "Claim">;
export type SablierMerkleLL_v1_3_Clawback_handler = EventHandler<
  "SablierMerkleLL_v1_3",
  "Clawback"
>;
export type SablierMerkleLL_v1_3_TransferAdmin_handler = EventHandler<
  "SablierMerkleLL_v1_3",
  "TransferAdmin"
>;
export type SablierMerkleLT_v1_3_Claim_handler = EventHandler<"SablierMerkleLT_v1_3", "Claim">;
export type SablierMerkleLT_v1_3_Clawback_handler = EventHandler<
  "SablierMerkleLT_v1_3",
  "Clawback"
>;
export type SablierMerkleLT_v1_3_TransferAdmin_handler = EventHandler<
  "SablierMerkleLT_v1_3",
  "TransferAdmin"
>;

/* -------------------------------------------------------------------------- */
/*                                    v2.0                                    */
/* -------------------------------------------------------------------------- */
export type SablierMerkleInstant_v2_0_ClaimInstant_handler = EventHandler<
  "SablierMerkleInstant_v2_0",
  "ClaimInstant"
>;
export type SablierMerkleInstant_v2_0_Clawback_handler = EventHandler<
  "SablierMerkleInstant_v2_0",
  "Clawback"
>;
export type SablierMerkleInstant_v2_0_LowerMinFeeUSD_handler = EventHandler<
  "SablierMerkleInstant_v2_0",
  "LowerMinFeeUSD"
>;
export type SablierMerkleInstant_v2_0_TransferAdmin_handler = EventHandler<
  "SablierMerkleInstant_v2_0",
  "TransferAdmin"
>;
export type SablierMerkleLL_v2_0_ClaimLLWithTransfer_handler = EventHandler<
  "SablierMerkleLL_v2_0",
  "ClaimLLWithTransfer"
>;
export type SablierMerkleLL_v2_0_ClaimLLWithVesting_handler = EventHandler<
  "SablierMerkleLL_v2_0",
  "ClaimLLWithVesting"
>;
export type SablierMerkleLL_v2_0_Clawback_handler = EventHandler<
  "SablierMerkleLL_v2_0",
  "Clawback"
>;
export type SablierMerkleLL_v2_0_LowerMinFeeUSD_handler = EventHandler<
  "SablierMerkleLL_v2_0",
  "LowerMinFeeUSD"
>;
export type SablierMerkleLL_v2_0_TransferAdmin_handler = EventHandler<
  "SablierMerkleLL_v2_0",
  "TransferAdmin"
>;
export type SablierMerkleLT_v2_0_ClaimLTWithTransfer_handler = EventHandler<
  "SablierMerkleLT_v2_0",
  "ClaimLTWithTransfer"
>;
export type SablierMerkleLT_v2_0_ClaimLTWithVesting_handler = EventHandler<
  "SablierMerkleLT_v2_0",
  "ClaimLTWithVesting"
>;
export type SablierMerkleLT_v2_0_Clawback_handler = EventHandler<
  "SablierMerkleLT_v2_0",
  "Clawback"
>;
export type SablierMerkleLT_v2_0_LowerMinFeeUSD_handler = EventHandler<
  "SablierMerkleLT_v2_0",
  "LowerMinFeeUSD"
>;
export type SablierMerkleLT_v2_0_TransferAdmin_handler = EventHandler<
  "SablierMerkleLT_v2_0",
  "TransferAdmin"
>;

/* -------------------------------------------------------------------------- */
/*                                    v3.0                                    */
/* -------------------------------------------------------------------------- */
export type SablierMerkleInstant_v3_0_ClaimInstant_handler = EventHandler<
  "SablierMerkleInstant_v3_0",
  "ClaimInstant"
>;
export type SablierMerkleInstant_v3_0_Clawback_handler = EventHandler<
  "SablierMerkleInstant_v3_0",
  "Clawback"
>;
export type SablierMerkleInstant_v3_0_LowerMinFeeUSD_handler = EventHandler<
  "SablierMerkleInstant_v3_0",
  "LowerMinFeeUSD"
>;
export type SablierMerkleInstant_v3_0_TransferAdmin_handler = EventHandler<
  "SablierMerkleInstant_v3_0",
  "TransferAdmin"
>;
export type SablierMerkleLL_v3_0_ClaimLLWithTransfer_handler = EventHandler<
  "SablierMerkleLL_v3_0",
  "ClaimLLWithTransfer"
>;
export type SablierMerkleLL_v3_0_ClaimLLWithVesting_handler = EventHandler<
  "SablierMerkleLL_v3_0",
  "ClaimLLWithVesting"
>;
export type SablierMerkleLL_v3_0_Clawback_handler = EventHandler<
  "SablierMerkleLL_v3_0",
  "Clawback"
>;
export type SablierMerkleLL_v3_0_LowerMinFeeUSD_handler = EventHandler<
  "SablierMerkleLL_v3_0",
  "LowerMinFeeUSD"
>;
export type SablierMerkleLL_v3_0_TransferAdmin_handler = EventHandler<
  "SablierMerkleLL_v3_0",
  "TransferAdmin"
>;
export type SablierMerkleLT_v3_0_ClaimLTWithTransfer_handler = EventHandler<
  "SablierMerkleLT_v3_0",
  "ClaimLTWithTransfer"
>;
export type SablierMerkleLT_v3_0_ClaimLTWithVesting_handler = EventHandler<
  "SablierMerkleLT_v3_0",
  "ClaimLTWithVesting"
>;
export type SablierMerkleLT_v3_0_Clawback_handler = EventHandler<
  "SablierMerkleLT_v3_0",
  "Clawback"
>;
export type SablierMerkleLT_v3_0_LowerMinFeeUSD_handler = EventHandler<
  "SablierMerkleLT_v3_0",
  "LowerMinFeeUSD"
>;
export type SablierMerkleLT_v3_0_TransferAdmin_handler = EventHandler<
  "SablierMerkleLT_v3_0",
  "TransferAdmin"
>;
export type SablierMerkleVCA_v3_0_ClaimVCA_handler = EventHandler<
  "SablierMerkleVCA_v3_0",
  "ClaimVCA"
>;
export type SablierMerkleVCA_v3_0_Clawback_handler = EventHandler<
  "SablierMerkleVCA_v3_0",
  "Clawback"
>;
export type SablierMerkleVCA_v3_0_EnableRedistribution_handler = EventHandler<
  "SablierMerkleVCA_v3_0",
  "EnableRedistribution"
>;
export type SablierMerkleVCA_v3_0_LowerMinFeeUSD_handler = EventHandler<
  "SablierMerkleVCA_v3_0",
  "LowerMinFeeUSD"
>;
export type SablierMerkleVCA_v3_0_TransferAdmin_handler = EventHandler<
  "SablierMerkleVCA_v3_0",
  "TransferAdmin"
>;
