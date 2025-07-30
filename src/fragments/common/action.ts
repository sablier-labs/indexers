/**
 * This fragment is used only by Flow and Lockup.
 */
export const ActionFragment = /* GraphQL */ `
  fragment ActionFragment on Action {
    id
    addressA
    addressB
    amountA
    amountB
    block
    category
    chainId
    contract
    fee
    from
    hash
    subgraphId
    timestamp
    stream {
      id
    }
  }
`;
