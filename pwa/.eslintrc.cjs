/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 8,
    sourceType: "module",
  },
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
};
