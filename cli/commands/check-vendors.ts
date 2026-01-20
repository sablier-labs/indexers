import { Command, Options } from "@effect/cli";
import { HttpClient } from "@effect/platform";
import { NetworksRegistry } from "@pinax/graph-networks-registry";
import { Console, Effect, Schedule } from "effect";
import _ from "lodash";
import { sablier } from "sablier";
import { envioChains } from "../../src/indexers/envio.js";
import { colors, createTable, displayHeader } from "../display-utils.js";
import { ValidationError, VendorApiError } from "../errors.js";

type VendorCheckResult = {
  note?: string;
  supported: boolean;
};

const chainIdOption = Options.integer("chain-id").pipe(
  Options.withDescription("Chain ID to check"),
  Options.withAlias("c")
);

const checkEnvioSupport = (chainId: number) =>
  Effect.gen(function* () {
    // Check if chain is in our local envio chains with hypersync support
    if (envioChains.some((c) => c.id === chainId && c.config?.hypersync)) {
      return {
        note: "Supported but not listed in public API",
        supported: true,
      } satisfies VendorCheckResult;
    }

    // Query Envio's public API
    const result = yield* HttpClient.get("https://chains.hyperquery.xyz/active_chains").pipe(
      Effect.flatMap((response) => response.json),
      Effect.flatMap((data) => {
        if (!Array.isArray(data)) {
          return Effect.fail(
            new VendorApiError({ message: "Unexpected API response format", vendor: "envio" })
          );
        }
        const supportedChainIds = (data as Array<{ chain_id: number }>).map((c) => c.chain_id);
        return Effect.succeed({
          note: undefined,
          supported: supportedChainIds.includes(chainId),
        } satisfies VendorCheckResult);
      }),
      // Retry with exponential backoff matching axios-retry behavior
      Effect.retry(
        Schedule.exponential("100 millis").pipe(
          Schedule.intersect(Schedule.recurs(3)),
          Schedule.jittered
        )
      ),
      // Catch all errors and return unsupported status
      Effect.catchAll((error) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return Effect.succeed({
          note: `API error: ${errorMessage}`,
          supported: false,
        } satisfies VendorCheckResult);
      })
    );

    return result;
  });

const checkGraphSupport = (chainId: number): Effect.Effect<VendorCheckResult> =>
  Effect.tryPromise({
    catch: (error) => (error instanceof Error ? error : new Error(String(error))),
    try: () => NetworksRegistry.fromLatestVersion(),
  }).pipe(
    Effect.map((registry) => {
      const supportedChainIds = registry.networks.map((c) => {
        const id = c.caip2Id.replace("eip155:", "");
        return _.toInteger(id);
      });
      return {
        note: undefined,
        supported: supportedChainIds.includes(chainId),
      } satisfies VendorCheckResult;
    }),
    Effect.catchAll((error) =>
      Effect.succeed({
        note: `API error: ${error.message}`,
        supported: false,
      } satisfies VendorCheckResult)
    )
  );

const checkVendorsLogic = (options: { readonly chainId: number }) =>
  Effect.gen(function* () {
    const chainId = options.chainId;

    // Validate chain ID
    if (chainId <= 0) {
      return yield* Effect.fail(
        new ValidationError({ field: "chainId", message: "Chain ID must be a positive number" })
      );
    }

    // Get chain name if available
    const chain = sablier.chains.get(chainId);
    const chainName = chain?.name || "Unknown";

    displayHeader("🔍 VENDOR SUPPORT CHECK", "cyan");

    // Display chain info
    yield* Console.log("");
    const chainInfoTable = createTable({
      colWidths: [20, 40],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    chainInfoTable.push(
      [colors.value("Chain ID"), colors.value(chainId.toString())],
      [colors.value("Chain Name"), colors.value(chainName)]
    );

    yield* Console.log(chainInfoTable.toString());

    // Check vendor support
    const envioResult = yield* checkEnvioSupport(chainId);
    const graphResult = yield* checkGraphSupport(chainId);

    // Display results table
    yield* Console.log("");
    const resultsTable = createTable({
      colWidths: [20, 20, 40],
      head: ["Vendor", "Status", "Notes"],
      theme: "cyan",
    });

    resultsTable.push(
      [
        colors.value("Envio HyperSync"),
        envioResult.supported ? colors.success("✅ Supported") : colors.error("❌ Not Supported"),
        colors.dim(envioResult.note || "—"),
      ],
      [
        colors.value("The Graph"),
        graphResult.supported ? colors.success("✅ Supported") : colors.error("❌ Not Supported"),
        colors.dim(graphResult.note || "—"),
      ]
    );

    yield* Console.log(resultsTable.toString());

    // Summary
    const totalSupported = [envioResult.supported, graphResult.supported].filter(Boolean).length;
    yield* Console.log("");
    if (totalSupported === 2) {
      yield* Console.log(colors.success("✅ Chain is supported by both vendors"));
    } else if (totalSupported === 1) {
      yield* Console.log(colors.warning("⚠️  Chain is partially supported (1 of 2 vendors)"));
    } else {
      yield* Console.log(colors.error("❌ Chain is not supported by any vendor"));
    }
  });

export const checkVendorsCommand = Command.make(
  "check-vendors",
  { chainId: chainIdOption },
  checkVendorsLogic
);
