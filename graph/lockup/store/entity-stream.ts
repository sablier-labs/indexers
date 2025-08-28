import { BigInt, dataSource, ethereum } from "@graphprotocol/graph-ts";
import { LOCKUP_V1_0, LOCKUP_V1_1, LOCKUP_V1_2, LOCKUP_V2_0, ONE, ZERO } from "../../common/constants";
import { readChainId, readContractVersion } from "../../common/context";
import { isDeprecatedContract as isDeprecatedLockupContract } from "../../common/deprecated";
import { Id } from "../../common/id";
import { logError } from "../../common/logger";
import { areStringsEqual } from "../../common/strings";
import { CommonParams } from "../../common/types";
import * as Entity from "../bindings/schema";
import { loadProxender } from "../helpers";
import { Params, Segment, Tranche } from "../helpers/types";
import { createAction } from "./entity-action";
import { getOrCreateAsset } from "./entity-asset";
import { createOrCreateBatch } from "./entity-batch";
import { getOrCreateWatcher } from "./entity-watcher";

export function createStreamDynamic(
  event: ethereum.Event,
  commonParams: Params.CreateStreamCommon,
  dynamicParams: Params.CreateStreamDynamic,
): void {
  if (isDeprecatedLockupContract(event, "lockup", commonParams.asset)) {
    return;
  }

  const stream = createBaseStream(event, commonParams);
  stream.save();
  addSegments(stream, dynamicParams.segments);
}

export function createStreamLinear(
  event: ethereum.Event,
  commonParams: Params.CreateStreamCommon,
  linearParams: Params.CreateStreamLinear,
): void {
  if (isDeprecatedLockupContract(event, "lockup", commonParams.asset)) {
    return;
  }

  let stream = createBaseStream(event, commonParams);

  const unlockAmountStart = linearParams.unlockAmountStart;
  if (unlockAmountStart !== null && unlockAmountStart.gt(ZERO)) {
    stream.initial = true;
    stream.initialAmount = unlockAmountStart;
  } else {
    stream.initial = false;
  }

  stream = addCliff(stream, commonParams, linearParams);
  stream = addLinearShape(stream, stream.cliff);
  stream.save();
}

export function createStreamTranched(
  event: ethereum.Event,
  commonParams: Params.CreateStreamCommon,
  tranchedParams: Params.CreateStreamTranched,
): void {
  if (isDeprecatedLockupContract(event, "lockup", commonParams.asset)) {
    return;
  }

  const stream = createBaseStream(event, commonParams);
  stream.save();
  addTranches(stream, tranchedParams.tranches);
}

export function getStream(tokenId: BigInt): Entity.Stream | null {
  const id = Id.stream(dataSource.address(), tokenId);
  return Entity.Stream.load(id);
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

function createBaseStream(event: ethereum.Event, params: Params.CreateStreamCommon): Entity.Stream {
  const chainId = readChainId();
  const tokenId = params.streamId;
  const streamId = Id.stream(dataSource.address(), tokenId);
  const stream = new Entity.Stream(streamId);

  /* --------------------------------- WATCHER -------------------------------- */
  const watcher = getOrCreateWatcher();
  stream.subgraphId = watcher.streamCounter;
  watcher.streamCounter = watcher.streamCounter.plus(ONE);
  watcher.save();

  /* ---------------------------------- ASSET --------------------------------- */
  const asset = getOrCreateAsset(params.asset);
  stream.asset = asset.id;
  stream.assetDecimalsValue = asset.decimals;

  /* ---------------------------------- BATCH --------------------------------- */
  const batch = createOrCreateBatch(event, params.sender);
  stream.batch = batch.id;
  stream.position = batch.size.minus(ONE);

  /* ---------------------------------- PROXY --------------------------------- */
  const contractVersion = readContractVersion();
  stream.proxied = false;

  // PRBProxy was only used in Lockup v1.0
  if (areStringsEqual(contractVersion, LOCKUP_V1_0)) {
    const proxender = loadProxender(params.sender);
    if (proxender) {
      stream.proxied = true;
      stream.proxender = proxender;
    }
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.alias = Id.streamAlias(chainId, tokenId);
  stream.canceled = false;
  stream.cancelable = params.cancelable;
  stream.category = params.category;
  stream.chainId = chainId;
  stream.contract = event.address;
  stream.depositAmount = params.depositAmount;
  stream.duration = params.endTime.minus(params.startTime);
  stream.endTime = params.endTime;
  stream.funder = params.funder;
  stream.hash = event.transaction.hash;
  stream.intactAmount = params.depositAmount;
  stream.recipient = params.recipient;
  stream.sender = params.sender;
  stream.shape = params.shape;
  stream.startTime = params.startTime;
  stream.timestamp = event.block.timestamp;
  stream.tokenId = tokenId;
  stream.transferable = params.transferable;
  stream.version = contractVersion;
  stream.withdrawnAmount = ZERO;

  /* --------------------------------- ACTION --------------------------------- */
  const action = createAction(event, {
    addressA: params.sender,
    addressB: params.recipient,
    amountA: params.depositAmount,
    category: "Create",
    streamId: stream.id,
  } as CommonParams.Action);
  if (stream.cancelable === false) {
    stream.renounceAction = action.id;
    stream.renounceTime = event.block.timestamp;
  }

  return stream;
}

function addCliff(
  stream: Entity.Stream,
  commonParams: Params.CreateStreamCommon,
  linearParams: Params.CreateStreamLinear,
): Entity.Stream {
  // In v2.0, no cliff means the cliff time is zero.
  // See https://github.com/sablier-labs/lockup/blob/v2.0.1/src/libraries/Helpers.sol#L204-L219
  if (areStringsEqual(stream.version, LOCKUP_V2_0)) {
    if (linearParams.cliffTime.gt(ZERO)) {
      stream.cliff = true;
      stream.cliffAmount = linearParams.unlockAmountCliff;
      stream.cliffTime = linearParams.cliffTime;
    } else {
      stream.cliff = false;
    }
    return stream;
  }

  const cliffDuration = linearParams.cliffTime.minus(commonParams.startTime);
  const totalDuration = stream.duration;

  // Ditto for v1.2, but the cliff amount has to be calculated as a percentage of the deposit amount.
  // See https://github.com/sablier-labs/lockup/blob/v1.2.0/src/libraries/Helpers.sol#L157-L168
  if (areStringsEqual(stream.version, LOCKUP_V1_2)) {
    if (linearParams.cliffTime.gt(ZERO)) {
      stream.cliff = true;
      stream.cliffAmount = commonParams.depositAmount.times(cliffDuration).div(totalDuration);
      stream.cliffTime = linearParams.cliffTime;
    } else {
      stream.cliff = false;
    }
    return stream;
  }

  // In v1.0 and v1.1, no cliff means the cliff duration is zero, i.e., cliff time is the same as start time.
  // See https://github.com/sablier-labs/lockup/blob/v1.1.2/src/libraries/Helpers.sol#L88-L103
  // See https://github.com/sablier-labs/lockup/blob/v1.0.2/src/libraries/Helpers.sol#L88-L103
  if (areStringsEqual(stream.version, LOCKUP_V1_0) || areStringsEqual(stream.version, LOCKUP_V1_1)) {
    if (cliffDuration.gt(ZERO)) {
      stream.cliff = true;
      stream.cliffAmount = commonParams.depositAmount.times(cliffDuration).div(totalDuration);
      stream.cliffTime = linearParams.cliffTime;
    } else {
      stream.cliff = false;
    }
    return stream;
  }

  logError("Unknown Lockup version: {}", [stream.version]);
  return stream;
}

/**
 * Older versions of Lockup did not have a shape field, but it can be inferred.
 * @see https://github.com/sablier-labs/interfaces/blob/30fffc0/packages/constants/src/stream/shape.ts#L12
 */
function addLinearShape(stream: Entity.Stream, cliff: boolean): Entity.Stream {
  // If the shape was already provided by the user, return it.
  const shape = stream.shape;
  if (shape !== null) {
    return stream;
  }

  // Note: <v1.2 streams didn't have the unlock shapes.
  const isV1_0 = areStringsEqual(stream.version, LOCKUP_V1_0);
  const isV1_1 = areStringsEqual(stream.version, LOCKUP_V1_1);
  const isV1_2 = areStringsEqual(stream.version, LOCKUP_V1_2);
  if (!isV1_0 && !isV1_1 && !isV1_2) {
    return stream;
  }

  if (cliff) {
    stream.shape = "cliff";
  } else {
    stream.shape = "linear";
  }
  return stream;
}

function addSegments(stream: Entity.Stream, segments: Segment[]): Entity.Stream {
  let streamed = ZERO;

  // The start time of the stream is the first segment's start time
  let previous = new Segment(ZERO, ZERO, stream.startTime);

  for (let i = 0; i < segments.length; i++) {
    const current = segments[i];

    const id = Id.segment(stream.id, i);
    const segment = new Entity.Segment(id);
    segment.position = BigInt.fromI32(i);
    segment.stream = stream.id;

    segment.amount = current.amount;
    segment.endTime = current.milestone;
    segment.exponent = current.exponent;

    segment.startAmount = streamed;
    segment.startTime = previous.milestone;
    segment.endAmount = streamed.plus(current.amount);

    segment.save();

    streamed = streamed.plus(current.amount);
    previous = current;
  }

  return stream;
}

function addTranches(stream: Entity.Stream, tranches: Tranche[]): void {
  let streamedAmount = ZERO;

  // The start time of the stream is the first tranche's start time
  let previous = new Tranche(ZERO, stream.startTime);

  for (let i = 0; i < tranches.length; i++) {
    const current = tranches[i];

    const id = Id.tranche(stream.id, i);
    const tranche = new Entity.Tranche(id);
    tranche.stream = stream.id;
    tranche.position = BigInt.fromU32(i);

    tranche.amount = current.amount;
    tranche.endTime = current.timestamp;

    tranche.endAmount = streamedAmount.plus(current.amount);
    tranche.startAmount = streamedAmount;
    tranche.startTime = previous.timestamp;

    tranche.save();

    streamedAmount = streamedAmount.plus(tranche.amount);
    previous = current;
  }
}
