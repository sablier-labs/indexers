import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const CI = Boolean(process.env.CI);
const VITE_VENDOR_CHAINS_TESTS = Boolean(process.env.VITE_VENDOR_CHAINS_TESTS);

function getInclude() {
  const paths: string[] = [];

  if (CI) {
    if (VITE_VENDOR_CHAINS_TESTS) {
      paths.push("tests/vendor-chains.test.ts");
    }
  }
  if (paths.length === 0) {
    // paths.push("tests/vendor-equivalence/lockup.test.ts");
    paths.push("tests/**/*.test.ts");
  }

  return paths;
}

/**
 * These tests perform JSON-RPC calls to external services, which are flaky, so we need to retry them.
 */
function getRetry() {
  return VITE_VENDOR_CHAINS_TESTS ? 10 : 0;
}

function getTimeout() {
  return !CI ? 10_000 : 60_000; // 10 seconds normally, 1 minute in CI
}

export default defineConfig({
  test: {
    env: loadEnv("", process.cwd(), ""),
    environment: "node",
    globals: true,
    include: getInclude(),
    retry: getRetry(),
    testTimeout: getTimeout(),
  },
});
