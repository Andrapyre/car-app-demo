module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "space-in-brackets": ["error", "always"],
    curly: ["error", "multi", "consistent"],
  },
}
