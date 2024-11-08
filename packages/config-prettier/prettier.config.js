// config-prettier/prettier.config.js

module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 80,
  overrides: [
    {
      files: "*.json",
      options: { printWidth: 100 },
    },
  ],
};
