// postcss.config.js

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    },
    ...(isProd && {
      '@fullhuman/postcss-purgecss': {
        content: [
          './app/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
          './pages/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content =>
          content.match(/[\w\/:-]+(?<!:)/g) || [],
        safelist: {
          standard: [
            'form-control',
            'form-floating',
            'form-label',
            'is-invalid',
            'invalid-feedback',
            /^form-/,
            /^is-/,
            /^invalid-/,
          ],
        },
      },
      cssnano: {
        preset: 'default',
      },
    }),
  },
};
