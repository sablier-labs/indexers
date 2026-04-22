import stripAnsi from "strip-ansi";

export function extractDeploymentId(stdout: string): string | undefined {
  const lines = stripAnsi(stdout).split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("Build completed:")) {
      const deploymentId = trimmedLine.replace("Build completed:", "").trim();
      return deploymentId;
    }
  }

  return undefined;
}

/**
 * Wrap long tokens like URLs so cli-table3 doesn't split ANSI escape sequences.
 */
export function wrapText(value: string, maxWidth: number): string {
  if (maxWidth <= 0 || value.length <= maxWidth) {
    return value;
  }

  const breakChars = ["/", "?", "&", "#", "=", "-", "_", "."];
  const chunks: string[] = [];
  let start = 0;

  while (start < value.length) {
    const end = Math.min(start + maxWidth, value.length);
    if (end === value.length) {
      chunks.push(value.slice(start));
      break;
    }

    const slice = value.slice(start, end);
    let breakIndex = -1;
    for (const char of breakChars) {
      const index = slice.lastIndexOf(char);
      if (index > breakIndex) {
        breakIndex = index;
      }
    }

    if (breakIndex <= 0) {
      chunks.push(slice);
      start = end;
      continue;
    }

    const splitAt = start + breakIndex + 1;
    chunks.push(value.slice(start, splitAt));
    start = splitAt;
  }

  return chunks.join("\n");
}
