import { Contract } from "../../bindings.js";
import * as common from "../common/index.js";

Contract.Campaign.MerkleStreamerLL_v1_1.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleStreamerLL_v1_1.Claim.handler(common.claimLockup.handler);
Contract.Campaign.MerkleStreamerLL_v1_1.TransferAdmin.handler(common.transferAdmin.handler);
