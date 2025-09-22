/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	safelist: [
		"bg-gray-400", "text-gray-100", "hover:bg-gray-400",
		"bg-red-800", "text-red-300", "hover:bg-red-700",
		"bg-blue-600", "text-blue-300", "hover:bg-blue-500",
		"bg-green-600", "text-green-300", "hover:bg-green-500",
		"bg-yellow-400", "text-yellow-900", "hover:bg-yellow-300",
		"bg-cyan-300", "text-cyan-900", "hover:bg-cyan-200",
		"bg-orange-800", "text-orange-200", "hover:bg-orange-700",
		"bg-purple-900", "text-purple-300", "hover:bg-purple-800",
		"bg-yellow-800", "text-yellow-200", "hover:bg-yellow-700",
		"bg-indigo-400", "text-indigo-900", "hover:bg-indigo-300",
		"bg-pink-600", "text-pink-200", "hover:bg-pink-500",
		"bg-lime-700", "text-lime-200", "hover:bg-lime-600",
		"bg-stone-700", "text-stone-200", "hover:bg-stone-600",
		"bg-violet-800", "text-violet-300", "hover:bg-violet-700",
		"bg-indigo-800", "text-indigo-300", "hover:bg-indigo-700",
		"bg-gray-900", "text-gray-300", "hover:bg-gray-800",
		"bg-slate-600", "text-slate-200", "hover:bg-slate-500",
		"bg-pink-300", "text-pink-800", "hover:bg-pink-200",
	],
	theme: {
		extend: {
			fontFamily: {
				'exo': [
					'Exo',
					'sans-serif'
				]
			},
			backgroundColor: {
				'primary': '#050a1a',                // deep navy (main bg)
				'header': 'hsla(219, 32%, 16%, 1)',  // slightly lighter navy
				'primary-card': 'hsla(219, 32%, 16%, 1)',
				'card-border': 'hsl(207, 90%, 72%)', // light blue border
				'secondary-card': 'hsl(207, 32%, 22%)', // muted bluish background
				'accent': 'hsl(330, 85%, 65%)',      // magenta-pink accent
				'accent-2': 'hsl(48, 100%, 60%)',    // golden yellow accent
				'success': 'hsl(150, 60%, 45%)',     // green accent
				'danger': 'hsl(0, 75%, 55%)',        // red accent
			},

			textColor: {
				'card': 'hsl(207,90%,72%)',          // light blue text
				'primary': 'hsl(207,90%,72%)',     // almost white
				'muted': 'hsl(219, 14%, 65%)',       // grayish text for secondary info
				'accent': 'hsl(330, 85%, 65%)',      // pink text highlight
				'accent-2': 'hsl(48, 100%, 60%)',    // yellow text highlight
				'success': 'hsl(150, 60%, 45%)',
				'danger': 'hsl(0, 75%, 55%)',
			},
			borderColor: {
				'primary': 'hsl(207, 90%, 72%)',     // consistent with card border
				'accent': 'hsl(330, 85%, 65%)',
				'accent-2': 'hsl(48, 100%, 60%)',
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
