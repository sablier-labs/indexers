import { Contract } from "../../bindings";
import * as common from "../common";
import { claimVCA } from "../common/campaign/claim-vca";
import { redistributionEnabled } from "../common/campaign/redistribution-enabled";

Contract.Campaign.MerkleVCA_v3_0.ClaimVCA.handler(claimVCA.handler);
Contract.Campaign.MerkleVCA_v3_0.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleVCA_v3_0.LowerMinFeeUSD.handler(common.lowerMinFeeUSD.handler);
Contract.Campaign.MerkleVCA_v3_0.TransferAdmin.handler(common.transferAdmin.handler);
Contract.Campaign.MerkleVCA_v3_0.RedistributionEnabled.handler(redistributionEnabled.handler);
