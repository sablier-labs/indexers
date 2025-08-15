import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleLT_v1_3.Clawback.handlerWithLoader(common.clawback);
Contract.Campaign.MerkleLT_v1_3.Claim.handlerWithLoader(common.claimLockup);
Contract.Campaign.MerkleLT_v1_3.TransferAdmin.handlerWithLoader(common.transferAdmin);
