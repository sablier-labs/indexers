import { Contract } from "../../bindings.js";
import * as common from "../common/index.js";

Contract.Campaign.MerkleLL_v2_0.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLL_v2_0.ClaimLLWithTransfer.handler(common.claimInstant.handler);
Contract.Campaign.MerkleLL_v2_0.ClaimLLWithVesting.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLL_v2_0.LowerMinFeeUSD.handler(common.lowerMinFeeUSD.handler);
Contract.Campaign.MerkleLL_v2_0.TransferAdmin.handler(common.transferAdmin.handler);
