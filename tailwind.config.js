/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{astro,html,js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "void": "#0B0B12",
                "background-void": "#0B0B12",
                "primary": "#6D28D9",
                "primary-dark": "#4C1D95",
                "accent": "#62C3F6",
                "surface": "rgba(20, 20, 35, 0.7)",
                "surface-glass": "rgba(20, 20, 35, 0.7)",
                "muted": "#94A3B8",
                "text-muted": "#94A3B8",
                "text-light": "#F8FAFC",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "orbitron": ["Orbitron", "sans-serif"],
                "tech": ["Rajdhani", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
                "body": ["Rajdhani", "sans-serif"],
            },
            boxShadow: {
                'neon': '0 0 20px rgba(98, 195, 246, 0.3)',
                'neon-strong': '0 0 35px rgba(98, 195, 246, 0.5)',
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #1f1f2e 1px, transparent 1px), linear-gradient(to bottom, #1f1f2e 1px, transparent 1px)",
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'spin-slow-12': 'spin 12s linear infinite',
                'spin-reverse-slow': 'spin 25s linear infinite reverse',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scanline': 'scanline 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.6' },
                    '50%': { opacity: '1' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                }
            }
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
