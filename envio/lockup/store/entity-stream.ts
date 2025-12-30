import { isVersionAfter, isVersionBefore } from "sablier";
import { Version } from "sablier/evm";
import type { Envio } from "../../common/bindings";
import { NOT_AVAILABLE } from "../../common/constants";
import { getContract } from "../../common/deployments";
import { sanitizeString } from "../../common/helpers";
import { Id } from "../../common/id";
import type { Context, Entity } from "../bindings";
import type { Params, Segment, Tranche } from "../helpers/types";
import { update as updateBatch } from "./entity-batch";
import {
  inferDynamicShape,
  inferLinearShape,
  inferTranchedShape,
  normalizeEventShape,
} from "./shape-inference";

type ShapeResult = Pick<Entity.Stream, "shape" | "shapeSource">;

export function createDynamic(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateStreamDynamic
): Entity.Stream {
  const baseStream = createBase(context, event, entities, params);
  const shape = addDynamicShape(baseStream, params.segments);
  const stream = { ...baseStream, ...shape };
  context.Stream.set(stream);
  addSegments(context, stream, params.segments);
  return stream;
}

export function createLinear(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateStreamLinear
): Entity.Stream {
  const baseStream = createBase(context, event, entities, params);

  const cliff = addCliff(baseStream, params);
  const initial = addInitial(params);
  const shape = addLinearShape(baseStream, cliff.cliff ?? false);

  const stream: Entity.Stream = {
    ...baseStream,
    ...cliff,
    ...initial,
    ...shape,
  };
  context.Stream.set(stream);
  return stream;
}

export function createTranched(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateStreamTranched
): Entity.Stream {
  const baseStream = createBase(context, event, entities, params);
  const shape = addTranchedShape(baseStream, params.tranches);
  const stream = { ...baseStream, ...shape };
  context.Stream.set(stream);
  addTranches(context, stream, params.tranches);
  return stream;
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

function createBase(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.CreateStreamCommon
): Entity.Stream {
  const { asset, batch, batcher, watcher } = entities;

  const counter = watcher.streamCounter;
  const now = BigInt(event.block.timestamp);
  const tokenId = params.tokenId;
  const streamId = Id.stream(event.srcAddress, event.chainId, tokenId);
  const lockup = getContract("lockup", event.chainId, event.srcAddress);

  /* --------------------------------- STREAM --------------------------------- */
  const isProxied = Boolean(params.proxender && params.proxender !== NOT_AVAILABLE);
  const recipient = params.recipient;
  const sender = params.sender;

  // Some fields are set to 0/ undefined because they are set later depending on the stream category.
  let stream: Entity.Stream = {
    alias: Id.streamAlias(lockup.alias, event.chainId, tokenId),
    asset_id: asset.id,
    assetDecimalsValue: asset.decimals,
    batch_id: batch.id,
    cancelable: params.cancelable,
    canceled: false,
    canceledAction_id: undefined,
    canceledTime: undefined,
    category: params.category,
    chainId: BigInt(event.chainId),
    cliff: undefined,
    cliffAmount: undefined,
    cliffTime: undefined,
    contract: event.srcAddress,
    depleted: false,
    depositAmount: params.depositAmount,
    duration: params.endTime - params.startTime,
    endTime: params.endTime,
    funder: params.funder,
    hash: event.transaction.hash,
    id: streamId,
    initial: undefined,
    initialAmount: undefined,
    intactAmount: params.depositAmount,
    position: batch.size,
    proxender: isProxied ? params.proxender : undefined,
    proxied: isProxied,
    recipient,
    renounceAction_id: undefined,
    renounceTime: undefined,
    sender,
    shape: params.shape ? normalizeEventShape(sanitizeString(params.shape)) : undefined,
    shapeSource: params.shape ? "Event" : undefined,
    startTime: params.startTime,
    subgraphId: counter,
    timestamp: now,
    tokenId: params.tokenId,
    transferable: params.transferable,
    version: lockup.version,
    withdrawnAmount: 0n,
  };
  if (params.cancelable === false) {
    stream = {
      ...stream,
      renounceAction_id: Id.action(event),
      renounceTime: now,
    };
  }
  /* ---------------------------------- BATCH --------------------------------- */
  updateBatch(context, event, batch, batcher);

  return stream;
}

function addCliff(
  stream: Entity.Stream,
  params: Params.CreateStreamLinear
): Pick<Entity.Stream, "cliff" | "cliffAmount" | "cliffTime"> {
  const defaultCliff = { cliff: false, cliffAmount: undefined, cliffTime: undefined };

  // In v2.0 and later, the cliff time is set to zero if there is no cliff.
  // See https://github.com/sablier-labs/lockup/blob/v2.0/src/libraries/Helpers.sol#L204-L219
  if (isVersionAfter(stream.version as Version.Lockup, Version.Lockup.V1_2)) {
    if (params.cliffTime !== 0n) {
      return {
        cliff: true,
        cliffAmount: params.unlockAmountCliff,
        cliffTime: params.cliffTime,
      };
    }
    return defaultCliff;
  }

  const cliffDuration = BigInt(params.cliffTime - params.startTime);
  const totalDuration = BigInt(stream.duration);

  // Ditto for v1.2, but the cliff amount has to be calculated as a percentage of the deposit amount.
  // See https://github.com/sablier-labs/lockup/blob/v1.2/src/libraries/Helpers.sol#L157-L168
  if (stream.version === Version.Lockup.V1_2) {
    if (params.cliffTime !== 0n) {
      return {
        cliff: true,
        cliffAmount: (params.depositAmount * cliffDuration) / totalDuration,
        cliffTime: params.cliffTime,
      };
    }
    return defaultCliff;
  }

  // In v1.0 and v1.1, no cliff means the cliff time is equal to the start time.
  // See https://github.com/sablier-labs/lockup/blob/v1.1/src/libraries/Helpers.sol#L88-L103
  // See https://github.com/sablier-labs/lockup/blob/v1.0/src/libraries/Helpers.sol#L88-L103
  if (isVersionBefore(stream.version as Version.Lockup, Version.Lockup.V1_2)) {
    if (cliffDuration !== 0n) {
      return {
        cliff: true,
        cliffAmount: (params.depositAmount * cliffDuration) / totalDuration,
        cliffTime: params.cliffTime,
      };
    }
    return defaultCliff;
  }

  throw new Error(`Unknown Lockup version: ${stream.version}`);
}

function addInitial(
  params: Params.CreateStreamLinear
): Pick<Entity.Stream, "initial" | "initialAmount"> {
  if (params.unlockAmountStart && params.unlockAmountStart > 0n) {
    return {
      initial: true,
      initialAmount: params.unlockAmountStart,
    };
  }
  return {
    initial: false,
    initialAmount: undefined,
  };
}

/**
 * Older versions of Lockup did not have a shape field, but it can be inferred.
 * @see https://github.com/sablier-labs/interfaces/blob/30fffc0/packages/constants/src/stream/shape.ts#L12
 */
function addLinearShape(stream: Entity.Stream, cliff: boolean): ShapeResult {
  if (stream.shape) {
    return { shape: stream.shape, shapeSource: "Event" };
  }
  return { shape: inferLinearShape(cliff), shapeSource: "Inferred" };
}

function addDynamicShape(stream: Entity.Stream, segments: Segment[]): ShapeResult {
  if (stream.shape) {
    return { shape: stream.shape, shapeSource: "Event" };
  }
  const shape = inferDynamicShape(segments, stream.startTime);
  return { shape, shapeSource: shape ? "Inferred" : undefined };
}

function addTranchedShape(stream: Entity.Stream, tranches: Tranche[]): ShapeResult {
  if (stream.shape) {
    return { shape: stream.shape, shapeSource: "Event" };
  }
  const shape = inferTranchedShape(tranches, stream.startTime);
  return { shape, shapeSource: shape ? "Inferred" : undefined };
}

function addSegments(context: Context.Handler, stream: Entity.Stream, segments: Segment[]): void {
  let streamed = 0n;

  // The start time of the stream is the first segment's start time
  let previous: Segment = { amount: 0n, exponent: 0n, milestone: stream.startTime };

  for (let i = 0; i < segments.length; i++) {
    const current = segments[i];

    const segment: Entity.Segment = {
      amount: current.amount,
      endAmount: streamed + current.amount,
      endTime: current.milestone,
      exponent: current.exponent,
      id: Id.segment(stream.id, i),
      position: BigInt(i),
      startAmount: streamed,
      startTime: previous.milestone,
      stream_id: stream.id,
    };
    context.Segment.set(segment);

    streamed += current.amount;
    previous = current;
  }
}

function addTranches(context: Context.Handler, stream: Entity.Stream, tranches: Tranche[]): void {
  let streamedAmount = 0n;

  // The start time of the stream is the first tranche's start time
  let previous: Tranche = { amount: 0n, timestamp: stream.startTime };

  for (let i = 0; i < tranches.length; i++) {
    const current = tranches[i];
    const tranche: Entity.Tranche = {
      amount: current.amount,
      endAmount: streamedAmount + current.amount,
      endTime: current.timestamp,
      id: Id.tranche(stream.id, i),
      position: BigInt(i),
      startAmount: streamedAmount,
      startTime: previous.timestamp,
      stream_id: stream.id,
    };
    context.Tranche.set(tranche);

    streamedAmount += tranche.amount;
    previous = current;
  }
}
