import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleLT_v1_4.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLT_v1_4.ClaimLTWithTransfer.handler(common.claimInstant.handler);
Contract.Campaign.MerkleLT_v1_4.ClaimLTWithVesting.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLT_v1_4.TransferAdmin.handler(common.transferAdmin.handler);
