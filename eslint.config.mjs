import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error',
      indent: ['error', 2],
      quotes: ['error', 'single'],
    },
  },
  {
    files: ['*.config.js', 'webpack.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  globalIgnores(['dist', 'node_modules'])
]);
