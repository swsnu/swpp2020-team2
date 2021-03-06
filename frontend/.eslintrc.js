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
  parser: "babel-eslint",
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
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "no-underscore-dangle": 0,
    "react/state-in-constructor": 0,
    "react/destructuring-assignment": 0,
    "react/no-unused-state": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-alert": 0,
    "vars-on-top": 0,
    "no-var": 0,
    "no-plusplus": 0,
    "block-scoped-var": 0,
    "radix": ["error", "as-needed"],
    "no-nested-ternary": 0,
    "react/button-has-type": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "max-len": 0,
    "global-require": 0,
  },
};
