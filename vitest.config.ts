import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const CI = Boolean(process.env.CI);
const TEST_VENDORS = Boolean(process.env.TEST_VENDORS);

function getInclude() {
  if (TEST_VENDORS) {
    return ["./tests/vendors/**/*.test.ts"];
  }

  return ["**/tests/**/*.test.ts", "!**/tests/vendors/**/*.ts"];
}

/**
 * The CI cron tests perform JSON-RPC calls to external services, which are flaky, so we have to retry them.
 */
function getRetry() {
  return CI ? 15 : 0;
}
function getTimeout() {
  return CI ? 100_000 : 10_000; // 10 seconds normally, 100 seconds in CI
}

function getReporters() {
  if (CI) {
    return ["github-actions", "json"];
  }
  return ["default"];
}

export default defineConfig({
  test: {
    env: loadEnv("", process.cwd(), ""),
    environment: "node",
    globalSetup: "./tests/setup.ts",
    globals: true,
    include: getInclude(),
    outputFile: CI ? "./test-results.json" : undefined,
    reporters: getReporters(),
    retry: getRetry(),
    testTimeout: getTimeout(),
  },
});
