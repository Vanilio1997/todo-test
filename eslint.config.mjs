import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier'; // Добавлено
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
    {
        ignores: ['build', 'node_modules', 'eslint.config.mjs'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: eslintReact,
            'react-hooks': eslintReactHooks,
            'react-refresh': eslintReactRefresh,
            prettier,
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2020,
            },
            parserOptions: {
                project: ['tsconfig.json'],
            },
        },
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'prefer-const': 'error',
            'react/jsx-curly-brace-presence': [
                'warn',
                { props: 'never', children: 'never' },
            ],
            'react/function-component-definition': [
                'warn',
                { namedComponents: 'arrow-function' },
            ],
            'react/self-closing-comp': [
                'error',
                { component: true, html: true },
            ],
            'max-lines': ['warn', { max: 124 }],
            'max-params': ['error', 3],
        },
    },
);
