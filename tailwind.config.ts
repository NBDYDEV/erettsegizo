import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				'primary': '#111111',
				'green': '#CEFF06',
				'nav-text': '#232323',
				'nav-button': '#232323',
				'nav-button-text': '#828282',
				'text-primary': '#ECECEC',
				'text-secondary': '#828282',
				'text-black': '#010B00',
			},
			textColor: {
				'primary': '#ECECEC',
				'secondary': '#828282',
				'black': '#000',
			},
			fontFamily: {
				'poppins-med': "Poppins-Medium",
				'poppins-semib': "Poppins-SemiBold",
				'poppins-extrab': "Poppins-ExtraBold",
				'poppins-bold': "Poppins-Bold",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
