/** @type {import('lint-staged').Config} */
module.exports = {
  "**/*.{js,jsx,ts,tsx,astro,json,css,md,mjs,cjs}": ["prettier --check"],
};
