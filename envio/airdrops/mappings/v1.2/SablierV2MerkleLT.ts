import { Contract } from "../../bindings.js";
import * as common from "../common.js";

Contract.Campaign.MerkleLT_v1_2.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLT_v1_2.Claim.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLT_v1_2.TransferAdmin.handler(common.transferAdmin.handler);
