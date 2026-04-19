import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                rose: {
                    50: '#FCF8F7',
                    100: '#FFF5F4',
                    200: '#FFEBE9',
                    300: '#F9D9D5',
                    400: '#E8B4B8',
                    500: '#D97777',
                    600: '#c15a5a',
                    700: '#8c5350',
                    800: '#4A2C2A',
                    900: '#4A2C2A',
                    950: '#2d1a19',
                }
            },
            fontFamily: {
                serif: ['var(--font-playfair)'],
                sans: ['var(--font-inter)'],
            },
            boxShadow: {
                'sleek': '0 4px 20px rgba(74, 44, 42, 0.03)',
            },
        },
    },
    plugins: [
        typography,
    ],
}

export default config
