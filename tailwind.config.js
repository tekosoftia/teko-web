/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{astro,html,js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "void": "#070B14",
                "background-void": "#070B14",
                "primary": "#2563EB",
                "primary-dark": "#1E3A8A",
                "accent": "#38BDF8",
                "surface": "rgba(12, 19, 34, 0.7)",
                "surface-glass": "rgba(12, 19, 34, 0.7)",
                "muted": "#94A3B8",
                "text-muted": "#94A3B8",
                "text-light": "#F8FAFC",
            },
            fontFamily: {
                "jakarta": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
                "display": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
                "orbitron": ["Orbitron", "sans-serif"],
                "tech": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
                "body": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
            },
            boxShadow: {
                'neon': '0 0 20px rgba(56, 189, 248, 0.3)',
                'neon-strong': '0 0 35px rgba(56, 189, 248, 0.5)',
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #14203a 1px, transparent 1px), linear-gradient(to bottom, #14203a 1px, transparent 1px)",
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
