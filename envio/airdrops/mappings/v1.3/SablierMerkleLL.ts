import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleLL_v1_3.Clawback.handlerWithLoader(common.clawback);
Contract.Campaign.MerkleLL_v1_3.Claim.handlerWithLoader(common.claimLockup);
Contract.Campaign.MerkleLL_v1_3.TransferAdmin.handlerWithLoader(common.transferAdmin);
