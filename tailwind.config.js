const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			primary: '#025088',
			secondary: '#35B3E4',
			accent: '#DAEAEF',

			dark: '#001A2C',
			light: '#F1F1F1',

			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			black: '#000000',
		},

		fontFamily: {
			default: ['var(--font-fustat)', ...fontFamily.sans],
			secondary: ['var(--font-open-sans)', ...fontFamily.sans],
		},

		// Full spacing scale - customize all values here
		spacing: {
			0: '0',
			0.25: '0.25rem',
			0.5: '0.5rem',
			0.75: '0.75rem',
			1: '1rem',
			1.25: '1.25rem',
			1.5: '1.5rem',
			2: '2rem',
			2.5: '2.5rem',
			3: '3rem',
			3.75: '3.75rem',
			4: '4rem',
			5: '5rem',
			5.5: '5.5rem',
			6: '6rem',
			7.5: '7.5rem',
			8: '8rem',
			8.75: '8.75rem',
			10: '10rem',
			12: '12rem',
			16: '16rem',
			22: '22rem',
			24: '24rem',
			32: '32rem',
			// Design system spacing
			none: '0',
			xxs: '1rem', // 16px
			xs: '1.5rem', // 24px
			sm: '2rem', // 32px
			md: '2.5rem', // 40px
			lg: '4rem', // 64px
			xl: '5rem', // 80px
			xxl: '8.75rem', // 140px
		},
		zIndex: {
			0: '0',
			10: '10',
			20: '20',
			30: '30',
			40: '40',
			50: '50',
			auto: 'auto',
		},

		borderRadius: {
			none: '0',
			DEFAULT: '1rem',
			sm: '0.5rem',
			lg: '1rem',
			'2xl': '1rem',
			full: '9999px',
		},

		boxShadow: {
			none: 'none',
			soft: '0 1px 8px rgba(0, 0, 0, 0.08)',
			card: '0 4px 16px rgba(0, 0, 0, 0.1)',
			lifted: '0 8px 24px rgba(0, 0, 0, 0.12)',
		},

		extend: {
			screens: {
				'3xl': '1920px',
			},
			maxWidth: {
				'8xl': '1920px',
				container: '1440px',
			},
			transitionDuration: {
				DEFAULT: '300ms',
			},
			animation: {
				scroll: 'scroll 70s linear infinite',
			},
			keyframes: {
				scroll: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' },
				},
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-hide': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
				'.no-scroll': {
					overflow: 'hidden !important',
					height: '100% !important',
				},
			});
		},
	],
};
