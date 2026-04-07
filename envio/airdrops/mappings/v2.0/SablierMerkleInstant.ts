import { Contract } from "../../bindings.js";
import * as common from "../common/index.js";

Contract.Campaign.MerkleInstant_v2_0.ClaimInstant.handler(common.claimInstant.handler);
Contract.Campaign.MerkleInstant_v2_0.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleInstant_v2_0.LowerMinFeeUSD.handler(common.lowerMinFeeUSD.handler);
Contract.Campaign.MerkleInstant_v2_0.TransferAdmin.handler(common.transferAdmin.handler);
