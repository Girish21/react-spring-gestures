/**
 * @type {import('prettier').ParserOptions}
 */
module.exports = {
  arrowParens: "avoid",
  trailingComma: "all",
  semi: false,
  jsxSingleQuote: true,
  singleQuote: true,
  plugins: [require("prettier-plugin-tailwindcss")],
};
