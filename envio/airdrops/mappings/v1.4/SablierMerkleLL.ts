import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleLL_v1_4.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLL_v1_4.ClaimLLWithTransfer.handler(common.claimInstant.handler);
Contract.Campaign.MerkleLL_v1_4.ClaimLLWithVesting.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLL_v1_4.TransferAdmin.handler(common.transferAdmin.handler);
