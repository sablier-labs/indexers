// Envio v3 bindings generate Indexer.gen.ts which imports from Indexer.res.mjs (compiled ReScript).
// That .mjs file ships without type declarations, causing TS7016. Since the bindings are generated
// code outside our control, we declare the module as untyped to suppress the error.
declare module "*.res.mjs";
