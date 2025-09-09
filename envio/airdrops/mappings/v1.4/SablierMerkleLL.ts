import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleLL_v1_4.Clawback.handlerWithLoader(common.clawback);
Contract.Campaign.MerkleLL_v1_4.ClaimLLWithTransfer.handlerWithLoader(common.claimInstant);
Contract.Campaign.MerkleLL_v1_4.ClaimLLWithVesting.handlerWithLoader(common.claimLockup);
Contract.Campaign.MerkleLL_v1_4.TransferAdmin.handlerWithLoader(common.transferAdmin);
