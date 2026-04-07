import { isOfficialLockup } from "../../../../common/helpers.js";
import { Contract } from "../../../bindings.js";
import { Store } from "../../../store.js";

Contract.Airdrops.Factory.MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.contractRegister(
  ({ context, event }) => {
    const lockupAddress = event.params.lockupLinear;
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const campaignAddress = event.params.merkleStreamer;
    context.addSablierV2MerkleStreamerLL_v1_1(campaignAddress);
  }
);

Contract.Airdrops.Factory.MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.handler(
  async ({ context, event }) => {
    const lockupAddress = event.params.lockupLinear;
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    await Store.User.createOrUpdate(context, event, [event.params.admin, event.transaction.from]);
  }
);
