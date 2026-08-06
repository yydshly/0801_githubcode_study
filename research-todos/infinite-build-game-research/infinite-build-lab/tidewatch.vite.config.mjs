export default {
  build: {
    lib: {
      entry: "tidewatch-runtime.mjs",
      formats: ["iife"],
      name: "TidewatchScene",
      fileName: () => "tidewatch-scene.js",
    },
    outDir: ".tidewatch-build",
    emptyOutDir: true,
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
};
