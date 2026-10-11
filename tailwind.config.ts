import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {
    colors: { ink: '#172B40', navy: '#102D4C', blue: '#2067D6', sky: '#EAF3FF', cream: '#FFFCF7', mist: '#F3F7FB' },
    fontFamily: { sans: ['Arial', 'Helvetica', 'sans-serif'] },
    boxShadow: { soft: '0 16px 45px rgba(16,45,76,0.08)' }
  } },
  plugins: []
} satisfies Config;
