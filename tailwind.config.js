/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm:      '1.5rem',
        lg:      '2rem',
      },
      screens: {
        lg: '1280px',
        xl: '1440px',
      },
    },
    extend: {
      colors: {
        // Custom color variables mapped to Tailwind utility names
        'neutral-bg':        'var(--neutral-bg)',
        'neutral-fg':        'var(--neutral-fg)',
        'primary-dark':      'var(--primary-dark)',
        'primary-dark-90':   'var(--primary-dark-90)',
        'accent-gold':       'var(--accent-gold)',
        'accent-gold-light': 'var(--accent-gold-light)',
        'deep-red':          'var(--deep-red)',
        'success-green':     'var(--success-green)',
        base:                'var(--neutral-bg)',
        dark:                'var(--neutral-fg)',
        black:               'var(--black)',
        white:               'var(--white)',
      },
      fontFamily: {
        readex: ['var(--font-readex)', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-back': 'cubic-bezier(0.34,1.56,0.64,1)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
    },
  },
  safelist: ['swiper-pagination-bullet-active'],
  plugins: [require('@tailwindcss/forms')],
};
