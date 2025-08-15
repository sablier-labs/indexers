import { Address, DataSourceContext, ethereum } from "@graphprotocol/graph-ts";
import { readChainId, readContractVersion } from "../../../../common/context";
import { isOfficialLockup } from "../../../helpers";
import { Params } from "../../../helpers/types";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                  MERKLE LL                                 */
/* -------------------------------------------------------------------------- */
export function handleCreateMerkleLL(
  templateCreator: (address: Address, context: DataSourceContext) => void,
  event: ethereum.Event,
  paramsBase: Params.CreateCampaignBase,
  paramsLL: Params.CreateCampaignLL,
): void {
  const lockup = paramsLL.lockup;
  if (!isOfficialLockup(lockup)) {
    return;
  }

  createTemplate(templateCreator, paramsBase.campaignAddress);
  Store.Campaign.createLL(event, paramsBase, paramsLL);
}

/* -------------------------------------------------------------------------- */
/*                                  MERKLE LL                                 */
/* -------------------------------------------------------------------------- */
export function handleCreateMerkleLT(
  templateCreator: (address: Address, context: DataSourceContext) => void,
  event: ethereum.Event,
  paramsBase: Params.CreateCampaignBase,
  paramsLT: Params.CreateCampaignLT,
): void {
  const lockup = paramsLT.lockup;
  if (!isOfficialLockup(lockup)) {
    return;
  }

  createTemplate(templateCreator, paramsBase.campaignAddress);
  Store.Campaign.createLT(event, paramsBase, paramsLT);
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

function createTemplate(
  templateCreator: (address: Address, context: DataSourceContext) => void,
  campaignAddress: Address,
): void {
  const context = new DataSourceContext();
  context.setBigInt("chainId", readChainId());
  context.setString("version", readContractVersion());
  templateCreator(campaignAddress, context);
}
