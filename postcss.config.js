// postcss.config.js

const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: {
    'postcss-import': {}, // Allows using @import in CSS
    'postcss-preset-env': { // Enables modern CSS features
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    },
    ...(process.env.NODE_ENV === 'production' ? { // Only include these plugins in production
      '@fullhuman/postcss-purgecss': { // Removes unused CSS
        content: [
          './app/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
          './pages/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: { // Prevents specific classes from being purged
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
      'cssnano': { // Minifies CSS
        preset: 'default',
      },
    } : {}),
  },
};
