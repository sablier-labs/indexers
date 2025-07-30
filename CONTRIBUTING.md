## Contributing

### Prerequisites

- [Node.js](https://nodejs.org) (v20+)
- [Just](https://github.com/casey/just) (command runner)
- [Pnpm](https://pnpm.io/) (package manager)
- [Ni](https://github.com/antfu-collective/ni) (package manager resolver)

### Setup

```bash
git clone https://github.com/sablier-labs/indexers.git sablier-indexers
cd sablier-indexers
pnpm install
```

### Available Commands

```bash
just --list                 # Show all available commands
just codegen                # Codegen all indexers
just full-check             # Run all code quality checks
just full-write             # Auto-fix formatting and linting
```

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `just full-check` to verify code quality
5. Submit a pull request

### Indexing New Chains

TODO

### Indexing New Contracts

TODO
