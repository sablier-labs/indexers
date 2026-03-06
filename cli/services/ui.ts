import chalk from "chalk";
import { Console, Context, Effect, Layer } from "effect";

export type TableTheme = "cyan" | "gray" | "green" | "magenta" | "red" | "yellow";

function getThemeFormatter(theme: TableTheme): typeof chalk.cyan {
  switch (theme) {
    case "cyan":
      return chalk.cyan;
    case "gray":
      return chalk.gray;
    case "green":
      return chalk.green;
    case "magenta":
      return chalk.magenta;
    case "red":
      return chalk.red;
    default:
      return chalk.yellow;
  }
}

export class CliUi extends Context.Tag("CliUi")<
  CliUi,
  {
    readonly blankLine: () => Effect.Effect<void>;
    readonly displayHeader: (text: string, theme?: TableTheme) => Effect.Effect<void>;
    readonly logLine: (line: string) => Effect.Effect<void>;
  }
>() {}

export const CliUiLive = Layer.succeed(CliUi, {
  blankLine: () => Console.log(""),
  displayHeader: (text: string, theme: TableTheme = "cyan") =>
    Effect.gen(function* () {
      const separator = "=".repeat(60);
      const format = getThemeFormatter(theme);

      yield* Console.log("");
      yield* Console.log(separator);
      yield* Console.log(format.bold(text));
      yield* Console.log(separator);
    }),
  logLine: (line: string) => Console.log(line),
});
