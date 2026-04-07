import { Contract } from "../../bindings.js";
import * as common from "../common.js";

Contract.Campaign.MerkleLT_v3_0.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLT_v3_0.ClaimLTWithTransfer.handler(common.claimInstant.handler);
Contract.Campaign.MerkleLT_v3_0.ClaimLTWithVesting.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLT_v3_0.LowerMinFeeUSD.handler(common.lowerMinFeeUSD.handler);
Contract.Campaign.MerkleLT_v3_0.Sponsor.handler(common.sponsorship.handler);
Contract.Campaign.MerkleLT_v3_0.TransferAdmin.handler(common.transferAdmin.handler);
