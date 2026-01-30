import baseConfig from '@justdx/config/eslint/base'

export default [
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/max-params': ['error', { max: 15 }],
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: [`${import.meta.dirname}/tsconfig.json`],
        },
      },
    },
  },
]
