import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';

export default defineConfig([
	globalIgnores(['**/.next/**', '**/.next-e2e*/**', '**/dist/**', '**/coverage/**']),

	// Next.js core web vitals
	nextVitals,
	{
		settings: {
			next: {
				rootDir: ['apps/admin', 'apps/site', 'packages/components'],
			},
			react: {
				version: 'detect',
			},
		},
		rules: {
			// There is no pages directory since we use the App Router
			'@next/next/no-html-link-for-pages': 'off',
		},
	},

	// Base configurations
	js.configs.recommended,
	tseslint.configs.recommended,
	comments.recommended,

	// Custom rules
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				projectService: true,
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@eslint-community/eslint-comments/no-use': 'error',
			'@typescript-eslint/strict-boolean-expressions': [
				'error',
				{ allowNullableObject: false, allowNumber: false, allowString: false },
			],
			'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
		},
	},
]);
