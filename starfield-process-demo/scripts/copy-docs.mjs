import { copyFileSync, cpSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

mkdirSync(join(dist, 'docs'), { recursive: true });
cpSync(join(root, 'docs'), join(dist, 'docs'), { recursive: true });
cpSync(join(root, 'LICENSES'), join(dist, 'LICENSES'), { recursive: true });
for (const file of ['README.md', 'PROJECT_MANIFEST.json', 'UPSTREAM_SOURCE.md']) {
  copyFileSync(join(root, file), join(dist, file));
}

console.log('Copied research documents into dist/.');
