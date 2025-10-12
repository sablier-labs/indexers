import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleLL_v2_0.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLL_v2_0.ClaimLLWithTransfer.handler(common.claimInstant.handler);
Contract.Campaign.MerkleLL_v2_0.ClaimLLWithVesting.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLL_v2_0.TransferAdmin.handler(common.transferAdmin.handler);
