// See https://vitest.dev/config/#globalsetup
export async function setup() {
  // Set a unique log file path for this test run, e.g. logs/tests/2024-04-25T12-00-00.log
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  process.env.LOG_FILE_PATH = `logs/tests/${timestamp}.log`;
}
