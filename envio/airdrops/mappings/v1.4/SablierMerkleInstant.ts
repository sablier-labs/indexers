import { Contract } from "../../bindings";
import * as common from "../common";

Contract.Campaign.MerkleInstant_v1_4.ClaimInstant.handler(common.claimInstant.handler);
Contract.Campaign.MerkleInstant_v1_4.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleInstant_v1_4.TransferAdmin.handler(common.transferAdmin.handler);
