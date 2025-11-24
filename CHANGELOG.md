# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Common Changelog](https://common-changelog.org/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.3.0]: https://github.com/sablier-labs/indexers/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/sablier-labs/indexers/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/sablier-labs/indexers/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/sablier-labs/indexers/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/sablier-labs/indexers/releases/tag/v1.0.0

## [1.3.0] - 2025-11-13

### Added

- Add new EVM chains: Core DAO, MONAD ([#249](https://github.com/sablier-labs/indexers/pull/249))
- Bump sablier package and fix the import paths

## [1.2.0] - 2025-10-22

### Added

- Add `Contract` entity in GraphQL schemas
- Add `Indexer.Name` type
- Add `DeprecatedStream` entity in GraphQL schemas, and deprecate fee-less contracts
  ([#189](https://github.com/sablier-labs/indexers/pull/189))
- Support the latest Sablier releases (Airdrops v2.0, and Flow v2.0, and Lockup v3.0)

### Changed

- Bump `sablier` package to v1.4.0
- Update documentation in GraphQL files
- Update `gql` bindings

### Fixed

- Fix subgraph names and testing URLs ([#205](https://github.com/sablier-labs/indexers/pull/205))

### Removed

- Remove `User`, `UserTransaction`, `Revenue`, and `RevenueTransaction` entities from GraphQL schemas
- Remove Envio support for Form Network, Lightlink, Sei, and Tangle
- Remove The Graph support for Form Network, IoTex, and Mode

## [1.1.1] - 2025-09-01

### Changed

- Bump viem to v2.35
- Bump sablier devkit dependency

### Fixed

- Fix subgraph names ([#205](https://github.com/sablier-labs/indexers/pull/205))

## [1.1.0] - 2025-08-25

### Changed

- Bump sablier devkit dependency to v1.1.0

### Added

- Add new EVM chains: Sonic and HyperEVM ([#193](https://github.com/sablier-labs/indexers/pull/193))

### Fixed

- Fix deployment ID for zkSync subgraph

## [1.0.0] - 2025-08-18

### Added

- Initial release
