/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core "mirror" surface tones
        ink: {
          950: '#080B18',
          900: '#0B1120',
          800: '#111832',
          700: '#182247',
        },
        // Signature blue -> purple reflection gradient
        reflect: {
          blue: '#4F6BFF',
          indigo: '#6C63FF',
          violet: '#9B5DE5',
          purple: '#B15DE8',
        },
        mist: '#8A93B8',
        glow: {
          green: '#34D399',
          amber: '#FBBF24',
          rose: '#FB7185',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'aurora': 'radial-gradient(120% 120% at 10% 0%, rgba(108,99,255,0.35) 0%, rgba(11,17,32,0) 55%), radial-gradient(120% 120% at 90% 100%, rgba(155,93,229,0.30) 0%, rgba(11,17,32,0) 55%)',
        'mirror-line': 'linear-gradient(90deg, #4F6BFF 0%, #9B5DE5 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(8, 11, 24, 0.45)',
        glow: '0 0 40px rgba(108, 99, 255, 0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        floatSlow: '6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
