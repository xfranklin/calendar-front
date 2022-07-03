module.exports = {
  parserOptions: {
    ecmaVersion: 13
  },
  env: {
    node: true
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  plugins: ["prettier"],
  rules: {
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    "prettier/prettier": ["error"],
    "max-len": [
      "warn",
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: '((grid-template-columns|backgroundImage|animation|:).*;?)|(:.*="(.|[\n\r])*")'
      }
    ]
  }
};
