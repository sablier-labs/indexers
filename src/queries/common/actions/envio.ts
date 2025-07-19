export const getActions = /* GraphQL */ `
  query getActions($first: Int!, $orderDirection: order_by!, $where: Action_bool_exp) {
    actions: Action(
      distinct_on: [subgraphId]
      limit: $first
      order_by: { subgraphId: $orderDirection }
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
