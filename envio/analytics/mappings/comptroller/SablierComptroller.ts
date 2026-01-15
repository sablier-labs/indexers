import { COMPTROLLER } from "../../../common/constants";
import { Contract } from "../../bindings";
import { Store } from "../../store";

Contract.Comptroller.TransferFees.handler(async ({ context, event }) => {
  await Store.FeeCollection.create(context, event, {
    admin: event.params.feeRecipient,
    airdropCampaign: undefined,
    amount: event.params.feeAmount,
    protocol: COMPTROLLER,
  });
});
