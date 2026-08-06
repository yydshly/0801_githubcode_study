export default {
  build: {
    lib: {
      entry: "island-systems-runtime.mjs",
      formats: ["iife"],
      name: "IslandSystemsScene",
      fileName: () => "island-systems-scene.js",
    },
    outDir: ".island-systems-build",
    emptyOutDir: true,
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
};
