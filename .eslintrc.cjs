module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  plugins: ['react', 'react-refresh', 'react-hooks', 'prettier'],
  extends: [
    'eslint:all',
    'plugin:@typescript-eslint/all',
    'plugin:react/all',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '18.2',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'func-style': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'function',
        format: ['PascalCase', 'camelCase'], // React component names
      },
    ],
    'sort-keys': 0,
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true },
    ],
    'react/jsx-indent': 'off',
    'react/jsx-max-props-per-line': [
      'warn',
      { maximum: 4, when: 'always' },
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandLast: true,
        reservedFirst: true,
      },
    ],
    'react/jsx-max-depth': ['error', { max: 4 }],
    'react/jsx-newline': ['warn', { prevent: true }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-definitions': [
      'error',
      'type',
    ],
    '@typescript-eslint/array-type': [
      'error',
      { default: 'generic' },
    ],
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    'no-console': 'off',
    'one-var': 'off',
    'no-nested-ternary': 'off',
    'no-ternary': 'off',
    'no-duplicate-imports': 'off',
    'prettier/prettier': 'error',
  },
};
