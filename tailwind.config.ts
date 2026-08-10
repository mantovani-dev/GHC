import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border) / <alpha-value>)',
  			input: 'hsl(var(--input) / <alpha-value>)',
  			ring: 'hsl(var(--ring) / <alpha-value>)',
  			background: 'hsl(var(--background) / <alpha-value>)',
  			foreground: 'hsl(var(--foreground) / <alpha-value>)',
  			primary: {
  				DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
  				foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
  				foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
  				foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
  				foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
  				foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
  				foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card) / <alpha-value>)',
  				foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
  			},
  			/* Valores crus da marca, onde o alpha exato importa */
  			orbita: {
  				ink: 'var(--accent-ink)',
  				whatsapp: 'var(--whatsapp)',
  				elevated: 'var(--bg-elevated)'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			/* Raios do sistema Órbita */
  			tile:  '13px',
  			glass: '18px',
  			pane:  '20px',
  			frame: '22px',
  			mile:  '26px',
  			pill:  '100px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to:   { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to:   { height: '0' }
  			},
  			'fade-up': {
  				from: { opacity: '0', transform: 'translateY(20px)' },
  				to:   { opacity: '1', transform: 'translateY(0)' }
  			},
  			'fade-in': {
  				from: { opacity: '0' },
  				to:   { opacity: '1' }
  			},
  			'slide-in-left': {
  				from: { opacity: '0', transform: 'translateX(-20px)' },
  				to:   { opacity: '1', transform: 'translateX(0)' }
  			},
  			'slide-in-right': {
  				from: { opacity: '0', transform: 'translateX(20px)' },
  				to:   { opacity: '1', transform: 'translateX(0)' }
  			},
  			'scale-in': {
  				from: { opacity: '0', transform: 'scale(0.95)' },
  				to:   { opacity: '1', transform: 'scale(1)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up':   'accordion-up 0.2s ease-out',
  			'fade-up':        'fade-up 0.6s ease-out forwards',
  			'fade-in':        'fade-in 0.5s ease-out forwards',
  			'slide-in-left':  'slide-in-left 0.6s ease-out forwards',
  			'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
  			'scale-in':       'scale-in 0.4s ease-out forwards',
  		},
  		fontFamily: {
  			sans: [
  				'Space Grotesk',
  				'ui-sans-serif',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'Helvetica Neue',
  				'Arial',
  				'Noto Sans',
  				'sans-serif'
  			],
  			serif: [
  				'Lora',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'Space Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		/* Sombras de profundidade e glow — nenhuma sombra dura sobrevive.
  		   As chaves sm/md/lg/xl voltam aos padrões (difusos) do Tailwind. */
  		boxShadow: {
  			pane: 'var(--shadow-pane)',
  			nav:  'var(--shadow-nav)',
  			'glow-card': 'var(--glow-card)',
  			'glow-btn':  'var(--glow-btn)',
  			'glow-node': 'var(--glow-node)',
  			frame: '0 40px 90px -40px rgba(0, 0, 0, 0.95)',
  			'frame-active': '0 40px 100px -34px rgba(51, 186, 233, 0.4)',
  			whatsapp: '0 16px 40px -12px rgba(37, 211, 102, 0.7)',
  			'whatsapp-hover': '0 22px 50px -12px rgba(37, 211, 102, 0.9)'
  		},
  		transitionTimingFunction: {
  			orbita: 'cubic-bezier(0.2, 0.7, 0.3, 1)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
