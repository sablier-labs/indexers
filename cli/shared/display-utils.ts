import chalk from "chalk";
import Table from "cli-table3";

/* -------------------------------------------------------------------------- */
/*                               COLOR THEME                                  */
/* -------------------------------------------------------------------------- */

/**
 * Semantic color theme for CLI output
 */
export const colors = {
  // Display colors
  dim: chalk.gray,
  // Status colors
  error: chalk.red,
  highlight: chalk.yellow,
  info: chalk.cyan,
  muted: chalk.gray,
  success: chalk.green,
  value: chalk.white,
  warning: chalk.yellow,
} as const;

/* -------------------------------------------------------------------------- */
/*                              TABLE HELPERS                                 */
/* -------------------------------------------------------------------------- */

type TableTheme = "cyan" | "gray" | "green" | "magenta" | "red" | "yellow";

type TableOptions = {
  colWidths?: number[];
  head?: string[];
  theme?: TableTheme;
  wordWrap?: boolean;
};

/**
 * Create a formatted table with consistent styling
 */
export function createTable(options: TableOptions = {}): Table.Table {
  const { colWidths, head = [], theme = "cyan", wordWrap = true } = options;

  const themeColor =
    theme === "cyan"
      ? "cyan"
      : theme === "gray"
        ? "gray"
        : theme === "green"
          ? "green"
          : theme === "magenta"
            ? "magenta"
            : theme === "red"
              ? "red"
              : "yellow";

  const chalkFn =
    theme === "cyan"
      ? chalk.cyan
      : theme === "gray"
        ? chalk.gray
        : theme === "green"
          ? chalk.green
          : theme === "magenta"
            ? chalk.magenta
            : theme === "red"
              ? chalk.red
              : chalk.yellow;

  return new Table({
    colWidths,
    head: head.map((h) => chalkFn.bold(h)),
    style: {
      border: [themeColor],
      head: [],
    },
    wordWrap,
  });
}

/**
 * Create a summary statistics table
 */
export function createSummaryTable(
  data: Array<{ label: string; value: string | number }>,
  theme: TableTheme = "cyan",
): Table.Table {
  const table = createTable({ head: ["Metric", "Value"], theme });

  for (const { label, value } of data) {
    table.push([colors.value(label), colors.value(String(value))]);
  }

  return table;
}

/* -------------------------------------------------------------------------- */
/*                             DISPLAY HELPERS                                */
/* -------------------------------------------------------------------------- */

/**
 * Display a section header
 */
export function displayHeader(text: string, theme: TableTheme = "cyan"): void {
  const separator = "=".repeat(60);
  const chalkFn =
    theme === "cyan"
      ? colors.info
      : theme === "gray"
        ? colors.dim
        : theme === "green"
          ? colors.success
          : theme === "magenta"
            ? chalk.magenta
            : theme === "red"
              ? colors.error
              : colors.warning;

  console.log("");
  console.log(separator);
  console.log(chalkFn.bold(text));
  console.log(separator);
}

/**
 * Format a checkmark status
 */
export function formatStatus(isSupported: boolean): string {
  return isSupported ? colors.success("✅") : colors.error("❌");
}

/**
 * Format a boolean as Yes/No with colors
 */
export function formatYesNo(value: boolean): string {
  return value ? colors.success("Yes") : colors.error("No");
}
