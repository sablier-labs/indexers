import { Contract } from "../../bindings.js";
import * as common from "../common/index.js";

Contract.Campaign.MerkleLL_v1_2.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleLL_v1_2.Claim.handler(common.claimLockup.handler);
Contract.Campaign.MerkleLL_v1_2.TransferAdmin.handler(common.transferAdmin.handler);
