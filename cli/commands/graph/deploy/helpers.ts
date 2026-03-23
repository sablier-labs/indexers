import stripAnsi from "strip-ansi";

const LEADING_FAILURE_MARKER_PATTERN = /^[^A-Za-z0-9]+/;
const VERSION_LABEL_EXISTS_PATTERN = /version label already exists/i;

function getDeployOutput(stdout: string, stderr: string): string {
  return stripAnsi(`${stderr}\n${stdout}`);
}

export function extractDeployFailureMessage(
  stdout: string,
  stderr: string,
  exitCode: number
): string {
  const output = getDeployOutput(stdout, stderr);
  if (VERSION_LABEL_EXISTS_PATTERN.test(output)) {
    return "Version label already exists. Choose a new --version-label or delete the existing version in Graph Studio before retrying.";
  }

  const failureLine = output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .reverse()
    .find((line) => {
      const normalizedLine = line.replace(LEADING_FAILURE_MARKER_PATTERN, "");
      return normalizedLine.startsWith("Failed to deploy") || normalizedLine.startsWith("Error:");
    });

  if (failureLine) {
    return failureLine.replace(LEADING_FAILURE_MARKER_PATTERN, "");
  }

  return `Command failed with exit code ${exitCode}`;
}

export function hasVersionLabelConflict(stdout: string, stderr: string): boolean {
  return VERSION_LABEL_EXISTS_PATTERN.test(getDeployOutput(stdout, stderr));
}
