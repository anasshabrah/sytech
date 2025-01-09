// postcss.config.js

const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          purgecss({
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
          }),
          require('cssnano')({
            preset: 'default',
          }),
        ]
      : []),
  ],
};
