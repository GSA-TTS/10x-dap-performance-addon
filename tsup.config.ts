import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'dap-performance-addon': 'src/index.ts',
  },
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  outDir: 'dist',
  globalName: 'dapPerformance',
  clean: true,
});
