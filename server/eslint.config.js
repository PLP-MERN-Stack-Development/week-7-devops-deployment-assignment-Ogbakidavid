// eslint.config.js
import { javascript } from '@eslint/js';
import globals from 'globals';

export default [
  javascript.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
