import "../node_modules/@sablier/devkit/just/settings.just"

set no-cd

# ---------------------------------------------------------------------------- #
#                                     BUILD                                    #
# ---------------------------------------------------------------------------- #

# Run the complete build pipeline
#   1. Export GraphQL schemas
#   2. Clean the dist directory
#   3. Build all packages (CJS, ESM, types)
[group("build")]
@all:
    just --quiet export-schema

    nlx del-cli dist
    echo "🗑️  Cleaned build files"
    echo ""

    echo "🔨 Building all packages..."
    just build::tsc
    echo ""
    echo "✅ All packages built successfully"

# Build all packages in parallel
[group("build")]
@tsc:
    nlx concurrently --group \
        -n "cjs,esm,types" \
        -c "blue,green,yellow" \
        "just build::tsc-cjs" \
        "just build::tsc-esm" \
        "just build::tsc-types"
    mkdir -p dist/cjs dist/esm
    printf '{"type":"commonjs"}' > dist/cjs/package.json
    printf '{"type":"module","sideEffects":false}' > dist/esm/package.json

# Build the CJS package
[group("build")]
@tsc-cjs:
    echo ""
    echo "📦 Building CJS package..."
    pnpm tsc -p configs/tsconfig.cjs.json
    echo "✅ Built CJS package"

# Build the ESM package
[group("build")]
@tsc-esm:
    echo ""
    echo "📦 Building ESM package..."
    pnpm tsc -p configs/tsconfig.esm.json
    echo "✅ Built ESM package"

# Build the types package
[group("build")]
@tsc-types:
    echo ""
    echo "📦 Building types..."
    pnpm tsc -p configs/tsconfig.types.json
    echo "✅ Built types"
