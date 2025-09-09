import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleInstant_v1_4.ClaimInstant.handlerWithLoader(common.claimInstant);
Contract.Campaign.MerkleInstant_v1_4.Clawback.handlerWithLoader(common.clawback);
Contract.Campaign.MerkleInstant_v1_4.TransferAdmin.handlerWithLoader(common.transferAdmin);
