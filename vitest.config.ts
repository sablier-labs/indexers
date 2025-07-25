import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const CI = Boolean(process.env.CI);
const CRON_TESTS = Boolean(process.env.CRON_TESTS);

function getInclude() {
  if (CRON_TESTS) {
    return ["tests/cron/**/*.test.ts"];
  }

  return ["tests/**/*.test.ts", "!tests/cron/**/*.ts"];
}

/**
 * The CI cron tests perform JSON-RPC calls to external services, which are flaky, so we have to retry them.
 */
function getRetry() {
  return !CI ? 0 : 10;
}
function getTimeout() {
  return !CI ? 10_000 : 100_000; // 10 seconds normally, 100 seconds in CI
}

export default defineConfig({
  test: {
    env: loadEnv("", process.cwd(), ""),
    environment: "node",
    globalSetup: "tests/setup.ts",
    globals: true,
    include: getInclude(),
    retry: getRetry(),
    testTimeout: getTimeout(),
  },
});
