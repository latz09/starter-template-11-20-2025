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
			primary: '#18a1ad',
			secondary: '#779E43',
			tertiary: '#ffee65',
			accent: '#FF6B35',
			dark: '#001D20',
			light: '#F8FEFF',

			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			black: '#000000',
		},

		fontFamily: {
			body: ['var(--font-barlow)', ...fontFamily.sans],
			heading: ['var(--font-barlow)', ...fontFamily.sans],
		},

		// Full spacing scale - customize all values here
		spacing: {
			0: '0',
			1: '0.25rem', // 4px
			2: '0.5rem', // 8px
			3: '0.75rem', // 12px
			4: '1rem', // 16px
			6: '1.5rem', // 24px
			8: '2rem', // 32px
			12: '3rem', // 48px
			16: '4rem', // 64px
			20: '5rem', // 80px
			24: '6rem', // 96px
			32: '8rem', // 128px
			// Your custom spacing
			section: '5rem', // 80px
			'section-sm': '3rem', // 48px
			container: '1.5rem', // 24px
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
			DEFAULT: '4px',
			sm: '4px',
			md: '4px',
			lg: '4px',
			xl: '4px',
			'2xl': '4px',
			full: '9999px',
		},

		boxShadow: {
			none: 'none',
			soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
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
