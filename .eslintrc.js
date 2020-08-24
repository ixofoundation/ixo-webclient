module.exports = {
  env: {
    browser: true,
    node: true,
    "jest": true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  ignorePatterns: ['node_modules', 'build'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    createDefaultProgram: true,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'react/jsx-no-bind': [
      'off',
      {
        ignoreDOMComponents: true,
      },
    ],
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
