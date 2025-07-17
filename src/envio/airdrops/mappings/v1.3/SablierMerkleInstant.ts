import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleInstant_v1_3.Claim.handlerWithLoader(common.claimInstant);
Contract.Campaign.MerkleInstant_v1_3.Clawback.handlerWithLoader(common.clawback);
Contract.Campaign.MerkleInstant_v1_3.TransferAdmin.handlerWithLoader(common.transferAdmin);
