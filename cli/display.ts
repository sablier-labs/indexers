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
  wrapOnWordBoundary?: boolean;
};

/**
 * Create a formatted table with consistent styling
 */
export function createTable(options: TableOptions = {}): Table.Table {
  const { colWidths, head = [], theme = "cyan", wordWrap = true, wrapOnWordBoundary } = options;

  let themeColor: string;
  switch (theme) {
    case "cyan":
      themeColor = "cyan";
      break;
    case "gray":
      themeColor = "gray";
      break;
    case "green":
      themeColor = "green";
      break;
    case "magenta":
      themeColor = "magenta";
      break;
    case "red":
      themeColor = "red";
      break;
    default:
      themeColor = "yellow";
      break;
  }

  let chalkFn: typeof chalk.cyan;
  switch (theme) {
    case "cyan":
      chalkFn = chalk.cyan;
      break;
    case "gray":
      chalkFn = chalk.gray;
      break;
    case "green":
      chalkFn = chalk.green;
      break;
    case "magenta":
      chalkFn = chalk.magenta;
      break;
    case "red":
      chalkFn = chalk.red;
      break;
    default:
      chalkFn = chalk.yellow;
      break;
  }

  return new Table({
    colWidths,
    head: head.map((h) => chalkFn.bold(h)),
    style: {
      border: [themeColor],
      head: [],
    },
    wordWrap,
    wrapOnWordBoundary,
  });
}

/**
 * Create a summary statistics table
 */
export function createSummaryTable(
  data: Array<{ label: string; value: string | number }>,
  theme: TableTheme = "cyan"
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
  let chalkFn: typeof colors.info;
  switch (theme) {
    case "cyan":
      chalkFn = colors.info;
      break;
    case "gray":
      chalkFn = colors.dim;
      break;
    case "green":
      chalkFn = colors.success;
      break;
    case "magenta":
      chalkFn = chalk.magenta;
      break;
    case "red":
      chalkFn = colors.error;
      break;
    default:
      chalkFn = colors.warning;
      break;
  }

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
