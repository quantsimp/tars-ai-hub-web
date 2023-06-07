module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    'no-unused-vars': 'off',
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'react/display-name': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

    //#region  //*=========== Temporary Disablings ===========
    '@typescript-eslint/no-explicit-any': 'off',
    'unused-imports/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    //#endregion  //*======== Temporary Disablings ===========
  },
  globals: {
    React: true,
    JSX: true,
  },
};
