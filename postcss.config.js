const purgecss = require('@fullhuman/postcss-purgecss');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    'postcss-import': {}, 
    'postcss-preset-env': {
      stage: 3,
      features: { 'nesting-rules': true },
    },
    // only purge in production
    ...(isProd
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './app/**/*.{js,jsx,ts,tsx}',
              './components/**/*.{js,jsx,ts,tsx}',
              './pages/**/*.{js,jsx,ts,tsx}',
            ],
            defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: [
                // core form classes
                'form-control',
                'form-floating',
                'form-label',
                'is-invalid',
                'invalid-feedback',
                // anything that starts with these
                /^form-/,
                /^is-/,
                /^invalid-/,
              ],
            },
          },
          cssnano: { preset: 'default' },
        }
      : {}),
  },
};
