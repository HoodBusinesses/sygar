module.exports = {
  root: true,
  extends: [
    '@repo/eslint-config/api', // Replace with the correct package name or relative path
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js'],
};
