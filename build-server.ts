import { build } from 'esbuild';
import path from 'path';

build({
  entryPoints: ['server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: path.join('dist', 'server.cjs'),
  external: ['express', 'vite'],
  format: 'cjs',
}).catch(() => process.exit(1));
