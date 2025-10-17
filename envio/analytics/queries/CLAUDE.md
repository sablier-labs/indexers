# Analytics Queries

## Production GraphQL Endpoint

```
https://indexer.hyperindex.xyz/7672d32/v1/graphql
```

## Hasura GraphQL Types

Envio uses Hasura GraphQL, which means:

- Timestamp type is **`timestamptz`**, not `Timestamp`

## Aggregation Queries

The production endpoint includes auto-generated aggregation queries that are not visible in `analytics.graphql`. These
allow you to perform aggregate operations (count, sum, avg, min, max) on entity fields.

For any entity type (e.g., `User`), the production API provides a corresponding `_aggregate` query type (e.g.,
`User_aggregate`).

**Reference:** [Hasura Aggregation Queries](https://hasura.io/docs/2.0/queries/postgres/aggregation-queries/)

### Example

```graphql
query {
  User_aggregate {
    aggregate {
      count
    }
  }
}
```
