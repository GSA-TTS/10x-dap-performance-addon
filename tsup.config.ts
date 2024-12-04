import { defineConfig, type Options } from 'tsup';
type PartialOptions = Partial<Options>;

const devConfig: Options = {
  entry: {
    'dap-performance-addon': 'src/index.ts',
  },
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  outDir: 'dist',
  globalName: 'dapPerformance',
  clean: true,
  noExternal: ['web-vitals'],
  minify: false,
  sourcemap: true,
};

const prodConfig: PartialOptions = {
  ...devConfig,
  entry: {
    'dap-performance-addon.min': 'src/index.ts',
  },
  dts: false,
  minify: true,
};

export default defineConfig([devConfig, prodConfig]);
