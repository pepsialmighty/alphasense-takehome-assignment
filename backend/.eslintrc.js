module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // Additional rules as needed
  },
};
