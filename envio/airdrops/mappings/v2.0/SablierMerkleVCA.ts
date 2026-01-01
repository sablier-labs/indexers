import { Contract } from "../../bindings";
import * as common from "../common";
import { claimVCA } from "../common/campaign/claim-vca";

Contract.Campaign.MerkleVCA_v2_0.ClaimVCA.handler(claimVCA.handler);
Contract.Campaign.MerkleVCA_v2_0.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleVCA_v2_0.LowerMinFeeUSD.handler(common.lowerMinFeeUSD.handler);
Contract.Campaign.MerkleVCA_v2_0.TransferAdmin.handler(common.transferAdmin.handler);
