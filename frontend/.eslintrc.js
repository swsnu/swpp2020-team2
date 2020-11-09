module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension":[1,{"extensions":[".js",".jsx"]}],
    "react/prop-types": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "no-unused-vars": 0,
    "import/prefer-default-export": 0,
    "react/prefer-stateless-function": 0,
  },
};
