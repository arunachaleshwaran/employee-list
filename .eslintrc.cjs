module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:all',
    'plugin:@typescript-eslint/all',
    // 'plugin:react/all',
    // 'plugin:react-hooks/recommended'
  ],
  settings: {
    createClass: 'createReactClass',
    pragma: 'React',
    version: 'detect',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  rules: {
    'react/react-in-jsx-scope': "off",
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [1, { "extensions": [".tsx"] }],
    'func-style': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': ['warn',
      {
        selector: 'function',
        format: ['PascalCase', 'camelCase'], // React component names
      }],
    'sort-keys': 0,
    '@typescript-eslint/no-confusing-void-expression': [
      'warn',
      { ignoreArrowShorthand: true },
    ]
  }
}
