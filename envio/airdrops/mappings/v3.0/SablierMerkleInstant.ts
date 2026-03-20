import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleInstant_v3_0.ClaimInstant.handler(common.claimInstant.handler);
Contract.Campaign.MerkleInstant_v3_0.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleInstant_v3_0.LowerMinFeeUSD.handler(common.lowerMinFeeUSD.handler);
Contract.Campaign.MerkleInstant_v3_0.TransferAdmin.handler(common.transferAdmin.handler);
