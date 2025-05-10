// postcss.config.js

const isProd = process.env.NODE_ENV === 'production';
// Pull in the default export so purgecss is actually a function
const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 3,
      features: { 'nesting-rules': true },
    }),

    // In production only, purge unused CSS and minify
    ...(isProd
      ? [
          purgecss({
            content: [
              './app/**/*.{js,jsx,ts,tsx}',
              './components/**/*.{js,jsx,ts,tsx}',
              './pages/**/*.{js,jsx,ts,tsx}',
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: [
                'form-control',
                'form-floating',
                'form-label',
                'is-invalid',
                'invalid-feedback',
                // allow anything starting with these
                /^form-/,
                /^is-/,
                /^invalid-/,
              ],
            },
          }),

          // Then minify
          require('cssnano')({ preset: 'default' }),
        ]
      : []),
  ],
};
