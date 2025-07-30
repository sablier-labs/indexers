export const getActions = /* GraphQL */ `
  query getActions($first: Int!, $orderDirection: OrderDirection!, $where: Action_filter) {
    actions(
      first: $first
      orderBy: subgraphId
      orderDirection: $orderDirection
      where: $where
    ) {
      ...ActionFragment
      stream {
        id
        alias
        asset {
          ...AssetFragment
        }
      }
    }
  }
`;
