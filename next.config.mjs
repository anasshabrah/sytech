// postcss.config.js

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    // Always run these
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 3,
      features: { 'nesting-rules': true },
    }),

    // Only in production, purge unused CSS and minify
    ...(
      isProd
        ? [
            require('@fullhuman/postcss-purgecss')({
              content: [
                './app/**/*.{js,jsx,ts,tsx}',
                './components/**/*.{js,jsx,ts,tsx}',
                './pages/**/*.{js,jsx,ts,tsx}',
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: {
                standard: [
                  // core form classes
                  'form-control',
                  'form-floating',
                  'form-label',
                  'is-invalid',
                  'invalid-feedback',
                  // patterns
                  /^form-/,
                  /^is-/,
                  /^invalid-/,
                ],
              },
            }),
            require('cssnano')({ preset: 'default' }),
          ]
        : []
    ),
  ],
};
