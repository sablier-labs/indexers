import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleLL_v3_0.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLL_v3_0.ClaimLLWithTransfer.handler(common.claimInstant.handler);
Contract.Campaign.MerkleLL_v3_0.ClaimLLWithVesting.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLL_v3_0.LowerMinFeeUSD.handler(common.lowerMinFeeUSD.handler);
Contract.Campaign.MerkleLL_v3_0.TransferAdmin.handler(common.transferAdmin.handler);
