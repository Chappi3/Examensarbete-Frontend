module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off'
  },

  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended'
  ]
}
