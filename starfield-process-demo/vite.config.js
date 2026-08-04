import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        project: fileURLToPath(new URL('./project.html', import.meta.url)),
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        applications: fileURLToPath(new URL('./applications.html', import.meta.url)),
        skills: fileURLToPath(new URL('./skills.html', import.meta.url)),
        skillLab: fileURLToPath(new URL('./skill-lab.html', import.meta.url)),
      },
    },
  },
});
