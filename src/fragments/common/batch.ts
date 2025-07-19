/**
 * This fragment is used only by Flow and Lockup.
 */
export const BatchFragment = /* GraphQL */ `
  fragment BatchFragment on Batch {
    id
    hash
    timestamp
    size
    batcher {
      id
    }
  }
`;
