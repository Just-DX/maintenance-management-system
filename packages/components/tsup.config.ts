import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/shadcn-primitives/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  splitting: false,
  target: 'es2020',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx',
  },
  tsconfig: 'tsconfig.json',
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
