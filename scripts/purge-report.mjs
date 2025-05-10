import { PurgeCSS } from 'purgecss'

const result = await new PurgeCSS().purge({
  content: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
  ],
  css: ['styles/**/*.scss'],
  safelist: [
    'form-control','form-floating','form-label','is-invalid','invalid-feedback',
    /^form-/,
    /^is-/,
    /^invalid-/,
  ],
})

for (const file of result) {
  const used = file.css.match(/\.([\w-]+)/g)?.map(s => s.slice(1)) || []
  console.log(`\n—— ${file.file} ——`)
  console.log('Used selectors:\n', used.join(' '))
}
