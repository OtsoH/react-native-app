import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';

export default [
  js.configs.recommended,

  {
    ...eslintPluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: eslintPluginReact,
      'react-native': eslintPluginReactNative,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        ...eslintPluginReactNative.environments['react-native'].globals,
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];