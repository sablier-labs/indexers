import { COMPTROLLER } from "../../../common/constants.js";
import { Contract } from "../../bindings.js";
import { Store } from "../../store.js";

Contract.Comptroller.TransferFees.handler(async ({ context, event }) => {
  await Store.FeeCollection.create(context, event, {
    admin: event.params.feeRecipient,
    airdropCampaign: undefined,
    amount: event.params.feeAmount,
    protocol: COMPTROLLER,
  });
});
