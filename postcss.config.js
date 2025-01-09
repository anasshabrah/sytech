// postcss.config.js

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    },
    ...(process.env.NODE_ENV === 'production'
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
                'active',
                'opened',
                /^nav-/,
                /^btn-/,
                /^text-/,
                /^bg-/,
                /^swiper/,
              ],
            },
          },
          'cssnano': {
            preset: 'default',
          },
        }
      : {}),
  },
};
