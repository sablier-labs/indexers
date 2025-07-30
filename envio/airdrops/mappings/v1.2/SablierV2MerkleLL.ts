import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleLL_v1_2.Clawback.handlerWithLoader(common.clawback);
Contract.Campaign.MerkleLL_v1_2.Claim.handlerWithLoader(common.claimLockup);
Contract.Campaign.MerkleLL_v1_2.TransferAdmin.handlerWithLoader(common.transferAdmin);
