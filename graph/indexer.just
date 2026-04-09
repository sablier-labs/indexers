# NOTE: this file is not meant to be run directly.
# Go to each indexer's directory and run `just --list` to see the available recipes.
mod root "../justfile"
import "../node_modules/@sablier/devkit/just/settings.just"

# Load env vars from the repo root
set dotenv-path := "{{ source_dir() }}/../.env"

# ---------------------------------------------------------------------------- #
#                                   CONSTANTS                                  #
# ---------------------------------------------------------------------------- #

DENERGY_AUTH_TOKEN := env("DENERGY_AUTH_TOKEN", "")
GRAPH_DEPLOY_KEY := env("GRAPH_DEPLOY_KEY")
IPFS_URL := "https://api.thegraph.com/ipfs/"
IPFS_URL_DENERGY := "https://ipfs.denergychain.com"

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Authenticate with Graph hosted service
[group("graph")]
auth:
    pnpm --dir "{{ source_dir() }}/.." exec graph auth {{ GRAPH_DEPLOY_KEY }}

# Build the subgraph
@build:
    just root::graph::build $INDEXER_NAME
alias b := build

# Remove build files
clean:
    pnpm dlx del-cli bindings build

# ---------------------------------------------------------------------------- #
#                               RECIPES: CODEGEN                               #
# ---------------------------------------------------------------------------- #

# Codegen the subgraph
[group("codegen")]
@codegen:
    just root::codegen::graph $INDEXER_NAME
alias c := codegen

# Codegen the subgraph bindings
[group("codegen")]
@codegen-bindings:
    just root::codegen::graph-bindings $INDEXER_NAME
alias cb := codegen-bindings

# Codegen the subgraph manifest
[group("codegen")]
@codegen-manifest chain="mainnet":
    just root::codegen::graph-manifest $INDEXER_NAME {{ chain }}
alias cm := codegen-manifest

# Codegen the GraphQL schema
[group("codegen")]
@codegen-schema:
    just root::codegen::schema graph $INDEXER_NAME
alias cs := codegen-schema

# ---------------------------------------------------------------------------- #
#                                RECIPES: DEPLOY                               #
# ---------------------------------------------------------------------------- #

# Deploy the subgraph to a single chain (the chain arg is the Sablier chain slug, e.g. "arbitrum")
[confirm("Confirm you want to deploy? (y/N)")]
[group("deploy")]
@deploy chain version_label: codegen
    just root::cli graph-deploy-single \
        --chain {{ chain }} \
        --indexer $INDEXER_NAME \
        --version-label {{ version_label }}
alias d := deploy

# Deploy all officials subgraphs to The Decentralized Network
[group("deploy")]
@deploy-all version_label *args: codegen
    just root::cli graph-deploy-all \
        --indexer $INDEXER_NAME \
        --version-label {{ version_label }} \
        {{ args }}
alias da := deploy-all

# Deploy to a custom Graph node
[confirm("⚠️  Deploying to custom nodes overrides the production subgraph. Are you sure you want to do this? (y/N)")]
[group("deploy")]
@deploy-custom chain_slug version_label: codegen
    just root::cli graph-deploy-single \
        --chain {{ chain_slug }} \
        --indexer $INDEXER_NAME \
        --version-label {{ version_label }}
alias dc := deploy-custom
