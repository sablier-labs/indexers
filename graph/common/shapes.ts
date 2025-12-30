/**
 * Lockup stream shape constants.
 *
 * These values must match the Shape.Lockup enum from the `sablier` package (sablier/evm/shapes).
 * We cannot import the package directly since AssemblyScript doesn't support npm dependencies.
 *
 * @see https://github.com/sablier-labs/sablier/blob/main/packages/sablier/src/evm/shapes/enums.ts
 */
export namespace LockupShape {
  export const Linear: string = "linear";
  export const Cliff: string = "cliff";
  export const DynamicExponential: string = "dynamicExponential";
  export const DynamicCliffExponential: string = "dynamicCliffExponential";
  export const TranchedBackweighted: string = "tranchedBackweighted";
  export const TranchedStepper: string = "tranchedStepper";
  export const TranchedMonthly: string = "tranchedMonthly";
  export const TranchedTimelock: string = "tranchedTimelock";
  export const LinearUnlockLinear: string = "linearUnlockLinear";
  export const LinearUnlockCliff: string = "linearUnlockCliff";
  export const DynamicDoubleUnlock: string = "dynamicDoubleUnlock";
}

/**
 * Normalize a shape from an event to its canonical prefixed form.
 * Historically, shapes didn't have prefixes, but now they do.
 */
export function normalizeEventShape(shape: string): string {
  /* -------------------------------------------------------------------------- */
  /*                                   DYNAMIC                                  */
  /* -------------------------------------------------------------------------- */
  if (shape == "exponential") {
    return LockupShape.DynamicExponential;
  }
  if (shape == "cliffExponential") {
    return LockupShape.DynamicCliffExponential;
  }
  if (shape == "doubleUnlock") {
    return LockupShape.DynamicDoubleUnlock;
  }
  // "Double Unlock" used to be called "Double Cliff".
  if (shape == "doubleCliff") {
    return LockupShape.DynamicDoubleUnlock;
  }
  if (shape == "dynamicDoubleCliff") {
    return LockupShape.DynamicDoubleUnlock;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   LINEAR                                   */
  /* -------------------------------------------------------------------------- */
  if (shape == "unlockLinear") {
    return LockupShape.LinearUnlockLinear;
  }
  if (shape == "unlockCliff") {
    return LockupShape.LinearUnlockCliff;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  TRANCHED                                  */
  /* -------------------------------------------------------------------------- */
  if (shape == "stepper") {
    return LockupShape.TranchedStepper;
  }
  if (shape == "timelock") {
    return LockupShape.TranchedTimelock;
  }
  if (shape == "monthly") {
    return LockupShape.TranchedMonthly;
  }
  if (shape == "backweighted") {
    return LockupShape.TranchedBackweighted;
  }

  return shape;
}
