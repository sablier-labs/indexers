import { Contract } from "../../bindings.js";
import * as common from "../common.js";

Contract.Campaign.MerkleInstant_v1_3.Claim.handler(common.claimInstant.handler);
Contract.Campaign.MerkleInstant_v1_3.Clawback.handler(common.clawback.handler);
Contract.Campaign.MerkleInstant_v1_3.TransferAdmin.handler(common.transferAdmin.handler);
