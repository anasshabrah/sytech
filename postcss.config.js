// postcss.config.js

const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: [
      './app/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './pages/**/*.{js,jsx,ts,tsx}', // Include if you have a pages directory
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: {
      standard: [
        // Add any class names that should not be purged
        'active',
        'opened',
        /^nav-/,
        /^btn-/,
        /^text-/,
        /^bg-/,
        // Add more patterns as needed
      ],
    },
  },
];

module.exports = {
  plugins: [
    'postcss-import',
    'postcss-preset-env',
    ...(process.env.NODE_ENV === 'production' ? purgecss : []),
  ],
};
