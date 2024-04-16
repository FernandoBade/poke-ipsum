/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'cor-offwhite': '#FFFDE3',
                'cor-amarelo': '#F2D544',
                'cor-laranja': '#CD8021',
                'cor-cinza': '#5B748D',
                'cor-carvao': '#303D4B',
                'cor-marrom': '#32272E'
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
            dropShadow: {
                '3xl': '0 0 4px rgba(0, 0, 0, 0.20)'
              }
        },
    },
    plugins: [],
};
