# NOTE: this file is not meant to be run directly.
# Go to each indexer's directory and run `just --list` to see the available recipes.
mod root "../justfile"

set allow-duplicate-variables
set dotenv-path := "{{ source_dir() }}/../../.env"
set shell := ["bash", "-euo", "pipefail", "-c"]
set unstable

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# Ni: https://github.com/antfu-collective/ni
ni := require("ni")

# ---------------------------------------------------------------------------- #
#                                   CONSTANTS                                  #
# ---------------------------------------------------------------------------- #

GRAPH_DEPLOY_KEY := env("GRAPH_DEPLOY_KEY")
IPFS_URL := "https://api.thegraph.com/ipfs/"
IPFS_CORE_URL := "https://thegraph.coredao.org/ipfs/"
INDEXER_NAME := env("INDEXER_NAME")
COREDAO_AUTH_TOKEN := env("COREDAO_AUTH_TOKEN")

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Authenticate with Graph hosted service
[group("graph")]
auth:
    pnpm graph auth {{ GRAPH_DEPLOY_KEY }}

# Build the subgraph
@build:
    just root::build-graph-indexer {{ INDEXER_NAME }}
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
    just root::codegen-graph {{ INDEXER_NAME }}
alias c := codegen

# Codegen the subgraph bindings
[group("codegen")]
@codegen-bindings:
    just root::codegen-graph-bindings {{ INDEXER_NAME }}
alias cb := codegen-bindings

# Codegen the subgraph manifest
[group("codegen")]
@codegen-manifest chain="mainnet":
    just root::codegen-graph-manifest {{ INDEXER_NAME }} {{ chain }}
alias cm := codegen-manifest

# Codegen the GraphQL schema
[group("codegen")]
@codegen-schema:
    just root::codegen-schema graph {{ INDEXER_NAME }}
alias cs := codegen-schema

# ---------------------------------------------------------------------------- #
#                                RECIPES: DEPLOY                               #
# ---------------------------------------------------------------------------- #

# Deploy the subgraph (the chain_slug is The Graph's chain slug)
[confirm("Confirm you want to deploy? (y/N)")]
[group("deploy")]
[script]
deploy chain_slug version_label: codegen-schema codegen-manifest
    subgraph_name=sablier-{{ INDEXER_NAME }}-{{ chain_slug }}
    manifest_path={{ justfile_dir() }}/manifests/{{ chain_slug }}.yaml
    pnpm graph deploy \
        $subgraph_name \
        $manifest_path \
        --version-label {{ version_label }}
alias d := deploy

# Deploy all officials subgraphs to The Decentralized Network
[confirm("Confirm you want to deploy all subgraphs? (y/N)")]
[group("deploy")]
@deploy-all version_label *args: codegen
    just root::cli graph-deploy-all \
        --indexer {{ INDEXER_NAME }} \
        --version-label {{ version_label }} \
        {{ args }}
alias da := deploy-all

# Deploy to a custom Graph node
[confirm("⚠️  Deploying to custom nodes overrides the production subgraph. Are you sure you want to do this? (y/N)")]
[group("deploy")]
[script]
@deploy-custom chain_slug version_label: codegen
    extra_args=""
    case {{ chain_slug }} in
        lightlink)
            node_url="https://graph.phoenix.lightlink.io/rpc"
            ipfs_url="{{ IPFS_URL }}"
            subgraph_name={{ chain_slug }}/sablier-{{ INDEXER_NAME }}-{{ chain_slug }}
            ;;
        core)
            node_url="https://thegraph.coredao.org/deploy/"
            ipfs_url="{{ IPFS_CORE_URL }}"
            extra_args="--deploy-key {{ COREDAO_AUTH_TOKEN }}"
            subgraph_name={{ chain_slug }}/sablier-{{ INDEXER_NAME }}-{{ chain_slug }}
            ;;
        *)
            echo "Error: Unsupported chain '{{ chain_slug }}'. Supported chains: lightlink, core-dao"
            exit 1
            ;;
    esac
    pnpm graph deploy \
        --version-label {{ version_label }} \
        --ipfs $ipfs_url \
        --node $node_url \
        $extra_args \
        $subgraph_name \
        {{ justfile_dir() }}/manifests/{{ chain_slug }}.yaml
alias dc := deploy-custom

# Deploy to experimental subgraph on Ethereum Sepolia
[group("deploy")]
[script]
deploy-experimental version_label: codegen-schema (codegen-manifest "sepolia")
    subgraph_name=sablier-{{ INDEXER_NAME }}-experimental
    manifest_path={{ justfile_dir() }}/manifests/sepolia.yaml
    pnpm graph deploy \
        $subgraph_name \
        $manifest_path \
        --version-label {{ version_label }}
alias de := deploy-experimental
