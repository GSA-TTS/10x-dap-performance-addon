import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    files: ['web-test-runner.config.js', 'web-dev-server.config.js'],
    languageOptions: { globals: globals.node },
  },
  { ignores: ['dist/**'] },
  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.recommended,
];
