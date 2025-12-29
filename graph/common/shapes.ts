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
  export const Backweighted: string = "backweighted";
  export const Stepper: string = "stepper";
  export const Monthly: string = "monthly";
  export const Timelock: string = "timelock";
  export const UnlockLinear: string = "unlockLinear";
  export const UnlockCliff: string = "unlockCliff";
  export const DoubleUnlock: string = "doubleUnlock";
}
