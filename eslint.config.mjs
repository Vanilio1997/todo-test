import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
    js.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: true,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },

    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            react: eslintReact,
            'react-hooks': eslintReactHooks,
            'react-refresh': eslintReactRefresh,
        },
        rules: {
            ...eslintReact.configs.recommended.rules,
            ...eslintReactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': 'warn',
            'react/react-in-jsx-scope': 'off',
        },
    },

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
        },
    },

    // {
    //     plugins: {
    //         prettier,
    //     },
    //     rules: {
    //         ...eslintConfigPrettier.rules,
    //         'prettier/prettier': ['error', { endOfLine: 'lf' }],
    //     },
    // },

    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            '*.config.js',
            '.eslintrc.js',
        ],
    },
]);
