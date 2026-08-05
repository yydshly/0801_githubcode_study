import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

export default defineConfig({
  plugins: [
    {
      name: 'copy-project-docs',
      closeBundle() {
        cpSync(resolve(process.cwd(), 'docs'), resolve(process.cwd(), 'dist/docs'), { recursive: true });
      },
    },
  ],
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      input: {
        game: resolve(process.cwd(), 'index.html'),
        overview: resolve(process.cwd(), 'overview.html'),
      },
    },
  },
});
