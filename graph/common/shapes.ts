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
 * Handles uppercase first letters, spaces, and word reordering.
 * Historically, shapes didn't have prefixes, but now they do.
 */
export function normalizeEventShape(shape: string): string {
  // Normalize: lowercase and remove spaces for matching
  const key = shape.toLowerCase().replaceAll(" ", "");

  /* -------------------------------------------------------------------------- */
  /*                                   DYNAMIC                                  */
  /* -------------------------------------------------------------------------- */
  if (key == "exponential") {
    return LockupShape.DynamicExponential;
  }
  if (key == "exponentialdynamic") {
    return LockupShape.DynamicExponential;
  }
  if (key == "cliffexponential") {
    return LockupShape.DynamicCliffExponential;
  }
  if (key == "doubleunlock") {
    return LockupShape.DynamicDoubleUnlock;
  }
  // "Double Unlock" used to be called "Double Cliff".
  if (key == "doublecliff") {
    return LockupShape.DynamicDoubleUnlock;
  }
  if (key == "dynamicdoublecliff") {
    return LockupShape.DynamicDoubleUnlock;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   LINEAR                                   */
  /* -------------------------------------------------------------------------- */
  if (key == "clifflinear") {
    return LockupShape.Cliff;
  }
  if (key == "unlocklinear") {
    return LockupShape.LinearUnlockLinear;
  }
  if (key == "unlockcliff") {
    return LockupShape.LinearUnlockCliff;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  TRANCHED                                  */
  /* -------------------------------------------------------------------------- */
  if (key == "discreteweekly") {
    return LockupShape.TranchedStepper;
  }
  if (key == "stepper") {
    return LockupShape.TranchedStepper;
  }
  if (key == "timelock") {
    return LockupShape.TranchedTimelock;
  }
  if (key == "monthly") {
    return LockupShape.TranchedMonthly;
  }
  if (key == "backweighted") {
    return LockupShape.TranchedBackweighted;
  }

  // For canonical shapes, just lowercase the first character
  return shape.charAt(0).toLowerCase() + shape.substring(1);
}
