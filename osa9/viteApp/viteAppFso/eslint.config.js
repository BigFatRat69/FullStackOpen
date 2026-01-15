// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'eslint.config.js', 'vite.config.ts', 'package.json']),

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // TypeScript files
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: './tsconfig.app.json' },
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@stylistic/semi': 'error',       // missing semicolons
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  // JS/JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  }
]);
