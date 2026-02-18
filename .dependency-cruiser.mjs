/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      comment: "envio/ is CJS-only and must not import from outside its own directory tree",
      from: { path: "^envio/" },
      name: "no-envio-external-imports",
      severity: "error",
      to: {
        // Only flag imports that resolve to a file (skips npm subpath exports
        // like "sablier/evm" that depcruise can't resolve without a tsconfig)
        couldNotResolve: false,
        // Allow Node.js built-ins, npm packages, and type-only imports
        dependencyTypesNot: [
          "core",
          "npm",
          "npm-dev",
          "npm-peer",
          "npm-bundled",
          "npm-optional",
          "type-only",
        ],
        path: "^(?!envio/)",
        pathNot: ["node_modules", "^abi/"],
      },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: ["node_modules", "envio/.+/bindings"] },
    tsPreCompilationDeps: true,
  },
};
