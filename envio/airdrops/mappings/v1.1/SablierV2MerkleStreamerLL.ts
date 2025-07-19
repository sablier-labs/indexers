import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleStreamerLL_v1_1.Clawback.handlerWithLoader(common.clawback);
Contract.Campaign.MerkleStreamerLL_v1_1.Claim.handlerWithLoader(common.claimLockup);
Contract.Campaign.MerkleStreamerLL_v1_1.TransferAdmin.handlerWithLoader(common.transferAdmin);
