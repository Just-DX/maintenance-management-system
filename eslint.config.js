const { FlatCompat } = require('@eslint/eslintrc')

module.exports = (async () => {
  const baseConfig = (await import('@justdx/config/eslint/base')).default
  const globals = (await import('globals')).default
  const reactHooks = (await import('eslint-plugin-react-hooks')).default
  const reactRefresh = (await import('eslint-plugin-react-refresh')).default
  const eslintConfigPrettier = (await import('eslint-config-prettier')).default

  const compat = new FlatCompat({ baseDirectory: __dirname })

  const nextConfigs = compat.extends('next/core-web-vitals', 'next/typescript').map((config) => ({
    ...config,
    files: ['apps/landing/**/*.{js,jsx,ts,tsx}'],
  }))

  return [
    {
      ignores: [
        '**/dist/**',
        '**/.next/**',
        '**/coverage/**',
        '**/node_modules/**',
        '**/node_modules/.prisma/**',
        '**/prisma/migrations/**',
        '**/src/generated/**',
      ],
    },
    ...baseConfig,
    ...nextConfigs,
    {
      files: [
        'apps/web-app/**/*.{ts,tsx}',
        'apps/web-admin/**/*.{ts,tsx}',
        'packages/components/**/*.{ts,tsx}',
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-refresh/only-export-components': 'warn',
      },
    },
    {
      files: [
        'apps/api-*/**/*.{ts,js,cts,mts,cjs,mjs}',
        'apps/workers/**/*.{ts,js,cts,mts,cjs,mjs}',
      ],
      languageOptions: {
        sourceType: 'commonjs',
        globals: {
          ...globals.node,
        },
      },
    },
    {
      files: ['apps/api-*/**/*.{ts,js,cts,mts,cjs,mjs}'],
      rules: {
        '@typescript-eslint/max-params': ['error', { max: 15 }],
        '@typescript-eslint/consistent-type-exports': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
    {
      files: ['apps/workers/**/*.{ts,js,cts,mts,cjs,mjs}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
      },
    },
    {
      files: ['packages/*/**/*.{ts,tsx}'],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      files: [
        'apps/e2e/**/*.{ts,tsx,js,jsx}',
        '**/*.spec.{ts,tsx,js,jsx}',
        '**/*.test.{ts,tsx,js,jsx}',
      ],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
        },
      },
    },
    eslintConfigPrettier,
  ]
})()
