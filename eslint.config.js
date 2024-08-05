import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginNode from 'eslint-plugin-node';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: globals.node
    },
    plugins: {
      node: pluginNode,
      prettier: pluginPrettier
    },
    rules: {
      // Possible Errors
      'no-console': 'warn',
      'no-debugger': 'error',

      // Best Practices
      curly: 'error',
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-var': 'error',

      // Node.js and CommonJS
      'node/no-missing-require': 'off', // Disable temporarily to troubleshoot
      'node/no-unpublished-require': 'error',
      'node/no-extraneous-require': 'error',
      'node/no-deprecated-api': 'warn',

      // Stylistic Issues
      'prettier/prettier': 'error',
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'space-before-function-paren': ['error', 'never']
    }
  },
  pluginJs.configs.recommended,
  configPrettier
];
