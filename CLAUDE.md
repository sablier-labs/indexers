# Sablier Indexers

Data indexers for the [Sablier](https://sablier.com) protocol for onchain token distribution. The indexers monitor
Sablier's smart contract events and transform them into structured, queryable data APIs via GraphQL. The data is used to
power the [Sablier Interface](https://app.sablier.com).

We support two indexing services: [The Graph](https://thegraph.com) and [Envio](https://envio.dev).

## Development

After you generate new code or update existing code, run `just full-check` to verify the code is correct. If there are
any errors, use `just full-write` to fix them. If there are issues still, figure out why and fix them.

- To check the TypeScript code only, run `just tsc-check`.
- To install dependencies, run `ni`, e.g. `ni some-package` or `ni -D some-package` to install a dev dependency.
- To run tests, run `just test`. Tu run specific tests, run `just test "tests/some-test.test.ts"`.
