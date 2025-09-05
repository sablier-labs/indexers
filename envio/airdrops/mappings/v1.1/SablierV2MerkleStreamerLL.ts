import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleStreamerLL_v1_1.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleStreamerLL_v1_1.Claim.handler(common.claimLockup.handler);
Contract.Campaign.MerkleStreamerLL_v1_1.TransferAdmin.handler(common.transferAdmin.handler);
