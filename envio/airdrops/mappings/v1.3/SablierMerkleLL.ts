import { Contract } from "../../bindings.js";
import * as common from "../common/index.js";

Contract.Campaign.MerkleLL_v1_3.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLL_v1_3.Claim.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLL_v1_3.TransferAdmin.handler(common.transferAdmin.handler);
