// eslint.config.js

const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const eslintParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['node_modules', 'dist'], // Specify files/folders to ignore
    files: ['**/*.ts', '**/*.tsx'], // Specify file types for linting
    languageOptions: {
      parser: eslintParser, // Use TypeScript parser
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': eslintPlugin, // Add TypeScript ESLint plugin
    },
    rules: {
      'no-unused-vars': 'warn', // Warn on unused variables
      '@typescript-eslint/no-explicit-any': 'off', // Allow `any` type
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
