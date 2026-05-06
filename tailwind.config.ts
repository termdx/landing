/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'crt-black': '#030403',
        'crt-dark': '#051005',
        'crt-green': '#33ff00',
        'crt-green-dim': '#1a8000',
        'crt-green-glow': '#4dff1a',
        'crt-amber': '#ffb000',
        'crt-white': '#e0e0e0',
        'crt-gray': '#5a6b5a',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'cursor-blink': 'blink 1.2s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
      },
    },
  },
  plugins: [],
}
