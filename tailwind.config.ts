import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				blue: '#2A5EE9',
				'blue-dark': '#224bba',
				'blue-light': '#557eed',
				red: '#FF0000',
				'red-dark': '#cc0000',
				'red-light': '#ff3333',
				grey: '#636363',
				white: '#FFFFFF',
				black: '#000000',
			},
		},
	},
	plugins: [],
};
export default config;
