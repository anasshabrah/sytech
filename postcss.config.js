// postcss.config.js

const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const purgecss = require('@fullhuman/postcss-purgecss'); // Consider using a maintained fork or alternative
const cssnano = require('cssnano'); // Optional: For CSS minification

const purgecssConfig = purgecss({
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}', // Include if you have a pages directory
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: {
    standard: [
      'active',
      'opened',
      /^nav-/,
      /^btn-/,
      /^text-/,
      /^bg-/,
      // Add more patterns as needed
    ],
  },
});

module.exports = {
  plugins: [
    postcssImport,
    postcssPresetEnv({
      // You can add specific options here if needed
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          purgecssConfig,
          cssnano({
            preset: 'default',
          }),
        ]
      : []),
  ],
};
