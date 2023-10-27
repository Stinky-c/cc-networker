/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  "rules": {
    "eqeqeq": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "prefer-const": "off",
    "no-constant-condition": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};